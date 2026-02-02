let chart = null;

document.addEventListener("DOMContentLoaded", function() {
    console.log("App initializing...");
    loadPlans();
});

function scrollTo(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function addPlan() {
    const subject = document.getElementById("subject").value.trim();
    const hours = document.getElementById("hours").value.trim();
    const date = document.getElementById("date").value.trim();

    if (!subject || !hours || !date) {
        alert("Please fill in all fields");
        return;
    }

    const payload = {
        subject: subject,
        hours: parseFloat(hours),
        date: date
    };

    fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("subject").value = "";
            document.getElementById("hours").value = "";
            document.getElementById("date").value = "";
            loadPlans();
        } else {
            alert("Error adding plan: " + (data.error || "Unknown error"));
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error adding plan");
    });
}

function loadPlans() {
    fetch("/api/plans")
        .then(response => response.json())
        .then(plans => {
            const listElement = document.getElementById("plansList");
            
            if (!plans || plans.length === 0) {
                listElement.innerHTML = '<p style="text-align:center;color:#999;">No plans yet. Create one above!</p>';
                return;
            }

            listElement.innerHTML = plans.map((plan, index) => `
                <div class="plan-item ${plan.completed ? 'completed' : ''}">
                    <div class="plan-info">
                        <div class="subject">${escapeHtml(plan.subject)}</div>
                        <div class="meta">📅 ${plan.date} | ⏱️ ${plan.hours}h</div>
                    </div>
                    <div class="plan-actions">
                        <button class="btn-done" onclick="toggleComplete(${index})">
                            ${plan.completed ? '✓' : 'Done'}
                        </button>
                        <button class="btn-delete" onclick="deletePlan(${index})">Delete</button>
                    </div>
                </div>
            `).join("");
        })
        .catch(error => {
            console.error("Error loading plans:", error);
        });
}

function toggleComplete(id) {
    fetch(`/api/plans/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true })
    })
    .then(response => response.json())
    .then(() => loadPlans())
    .catch(error => console.error("Error:", error));
}

function deletePlan(id) {
    if (confirm("Delete this plan?")) {
        fetch(`/api/plans/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(() => loadPlans())
            .catch(error => console.error("Error:", error));
    }
}

function analyze() {
    const hoursInput = document.getElementById("analyzeHours").value.trim();
    
    if (!hoursInput || parseFloat(hoursInput) <= 0) {
        alert("Please enter valid hours");
        return;
    }

    fetch("/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours: parseFloat(hoursInput) })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Error: " + data.error);
            return;
        }

        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
            <div>
                ⏱️ <strong>${data.hours} hours</strong><br>
                📊 <strong>Focus: ${data.focus}%</strong><br><br>
                🤖 <strong>${data.tip}</strong>
            </div>
        `;

        const chartCanvas = document.getElementById("chart");
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(chartCanvas, {
            type: "doughnut",
            data: {
                labels: ["Focus Score", "Remaining"],
                datasets: [{
                    data: [data.focus, 100 - data.focus],
                    backgroundColor: ["#6366f1", "#e5e7eb"],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error analyzing hours");
    });
}

function shareApp() {
    const modal = document.getElementById("shareModal");
    const shareLink = document.getElementById("shareLink");
    
    if (modal && shareLink) {
        shareLink.value = window.location.href;
        modal.style.display = "flex";
    }
}

function closeShare() {
    const modal = document.getElementById("shareModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function copyLink() {
    const shareLink = document.getElementById("shareLink");
    
    if (shareLink) {
        shareLink.select();
        try {
            document.execCommand("copy");
            alert("Link copied to clipboard!");
        } catch (err) {
            console.error("Copy failed:", err);
        }
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("shareModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/* ========== Jas AI Assistant JS ========== */
const jasToggle = document.getElementById('jasToggle');
const jasPanel = document.getElementById('jasPanel');
const jasClose = document.getElementById('jasClose');
const jasSend = document.getElementById('jasSend');
const jasInput = document.getElementById('jasInput');
const jasMessages = document.getElementById('jasMessages');
const jasMode = document.getElementById('jasMode');
const jasMic = document.getElementById('jasMic');
const jasAvatar = document.getElementById('jasAvatar');

if (jasToggle) {
    jasToggle.addEventListener('click', () => {
        const visible = jasPanel.style.display === 'flex';
        if (visible) {
            jasPanel.style.display = 'none';
            document.getElementById('jasWidget').setAttribute('aria-hidden', 'true');
        } else {
            jasPanel.style.display = 'flex';
            document.getElementById('jasWidget').setAttribute('aria-hidden', 'false');
            jasInput.focus();
            appendBotMessage('Hello! I\'m Jas AI — pick a mode and ask me anything. Try \"Explain photoelectric effect\" or ask for a PCM study plan.');
        }
    });
}

if (jasClose) { jasClose.addEventListener('click', () => { jasPanel.style.display = 'none'; }); }
if (jasSend) { jasSend.addEventListener('click', sendJasMessage); }
if (jasInput) { jasInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendJasMessage(); }); }

let recognition = null;
let recognizing = false;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener('result', (event) => {
        const text = event.results[0][0].transcript;
        jasInput.value = text;
        sendJasMessage();
    });

    recognition.addEventListener('end', () => { recognizing = false; jasMic.classList.remove('recording'); });
}

if (jasMic) {
    jasMic.addEventListener('click', () => {
        if (!recognition) { alert('Voice input not supported in this browser.'); return; }
        if (recognizing) { recognition.stop(); recognizing = false; jasMic.classList.remove('recording'); }
        else { recognition.start(); recognizing = true; jasMic.classList.add('recording'); }
    });
}

function appendUserMessage(text) {
    const el = document.createElement('div'); el.className = 'jas-bubble user'; el.innerHTML = escapeHtml(text);
    jasMessages.appendChild(el);
    jasMessages.scrollTop = jasMessages.scrollHeight;
}

function appendBotMessage(text) {
    const el = document.createElement('div'); el.className = 'jas-bubble bot'; el.innerHTML = text.replace(/\n/g, '<br>');
    jasMessages.appendChild(el);
    jasMessages.scrollTop = jasMessages.scrollHeight;
}

function showTyping() {
    const el = document.createElement('div'); el.id = 'jasTyping'; el.className = 'jas-bubble bot jas-typing'; el.innerText = 'Jas is typing...';
    jasMessages.appendChild(el);
    jasMessages.scrollTop = jasMessages.scrollHeight;
}

function hideTyping() {
    const t = document.getElementById('jasTyping'); if (t) t.remove();
}

function sendJasMessage() {
    const text = jasInput.value.trim();
    if (!text) return;

    appendUserMessage(text);
    jasInput.value = '';

    showTyping();
    // Prepare payload
    const payload = { message: text, mode: jasMode.value || 'general' };

    fetch('/api/jas', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(data => {
        hideTyping();
        if (data && data.reply) {
            appendBotMessage(data.reply);
            animateAvatarBounce();
            speakTextIfSupported(data.reply);
        } else {
            appendBotMessage('Sorry, something went wrong.');
        }
    })
    .catch(err => {
        console.error('Jas error', err); hideTyping(); appendBotMessage('Error contacting Jas AI. Try again later.');
    });
}

function animateAvatarBounce() {
    jasAvatar.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(-6px)' },
        { transform: 'translateY(0)' }
    ], { duration: 400, easing: 'ease-out' });
}

function speakTextIfSupported(text) {
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ''));
    utter.lang = 'en-US';
    utter.rate = 1.0; utter.pitch = 1.0;
    speechSynthesis.cancel(); // stop any ongoing
    speechSynthesis.speak(utter);
}

// Accessibility: close Jas panel on escape
window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && jasPanel && jasPanel.style.display === 'flex') { jasPanel.style.display = 'none'; } });

// Small welcome message when the page loads
window.addEventListener('load', () => {
    // Preload polite welcome into messages but don't show until opened
    // (We show when user opens widget)
});