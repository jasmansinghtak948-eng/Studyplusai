import os
import json
import re
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

# Optional integrations (openai, sympy). Keep optional to avoid breaking environments without them.
try:
    import openai
except Exception:
    openai = None

try:
    import sympy as sp
except Exception:
    sp = None

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

PLANS_FILE = "study_plans.json"

def load_plans():
    try:
        if os.path.exists(PLANS_FILE):
            with open(PLANS_FILE, "r") as f:
                data = json.load(f)
                return data if isinstance(data, list) else []
    except:
        pass
    return []

def save_plans(plans):
    try:
        with open(PLANS_FILE, "w") as f:
            json.dump(plans, f, indent=2)
        return True
    except:
        return False

@app.route("/")
def home():
    try:
        return render_template("index.html")
    except Exception as e:
        return f"Error: {str(e)}", 500

@app.route("/health")
def health():
    return jsonify({"status": "ok", "app": "Study Plus AI"})

@app.route("/calculate", methods=["POST"])
def calculate():
    try:
        data = request.get_json()
        if not data or "hours" not in data:
            return jsonify({"error": "Missing hours"}), 400
        
        hours = float(data["hours"])
        focus = min((hours / 16) * 100, 100)

        if hours < 6:
            tip = "Low consistency. Try focused short sessions."
        elif hours <= 12:
            tip = "Balanced study detected. Maintain breaks."
        else:
            tip = "Overstudy detected. AI recommends rest."

        return jsonify({
            "hours": hours,
            "focus": round(focus, 2),
            "tip": tip
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/api/plans", methods=["GET"])
def get_plans():
    return jsonify(load_plans())

@app.route("/api/plans", methods=["POST"])
def add_plan():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "error": "No data"}), 400
        
        plans = load_plans()
        plans.append({
            "id": len(plans),
            "subject": data.get("subject", ""),
            "hours": float(data.get("hours", 0)),
            "date": data.get("date", ""),
            "completed": False
        })
        save_plans(plans)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route("/api/plans/<int:plan_id>", methods=["PUT"])
def update_plan(plan_id):
    try:
        data = request.get_json()
        plans = load_plans()
        
        if plan_id < 0 or plan_id >= len(plans):
            return jsonify({"success": False, "error": "Plan not found"}), 404
        
        plans[plan_id].update(data)
        save_plans(plans)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route("/api/plans/<int:plan_id>", methods=["DELETE"])
def delete_plan(plan_id):
    try:
        plans = load_plans()
        
        if plan_id < 0 or plan_id >= len(plans):
            return jsonify({"success": False, "error": "Plan not found"}), 404
        
        plans.pop(plan_id)
        save_plans(plans)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

# ---------------- Jas AI endpoint ----------------
SESSIONS_FILE = 'jas_sessions.json'

def load_sessions():
    try:
        if os.path.exists(SESSIONS_FILE):
            with open(SESSIONS_FILE, 'r') as f:
                return json.load(f) or {}
    except Exception:
        pass
    return {}


def save_sessions(sessions):
    try:
        with open(SESSIONS_FILE, 'w') as f:
            json.dump(sessions, f, indent=2)
        return True
    except Exception:
        return False


def store_session_message(session_id, role, text):
    if not session_id:
        return
    sessions = load_sessions()
    messages = sessions.get(session_id, [])
    messages.append({'role': role, 'text': text})
    sessions[session_id] = messages
    save_sessions(sessions)


@app.route('/api/jas', methods=['POST'])
def jas_ai():
    try:
        data = request.get_json() or {}
        message = data.get('message', '').strip()
        mode = (data.get('mode') or '').lower()
        use_llm = bool(data.get('use_llm'))
        session_id = data.get('session_id')

        if not message:
            return jsonify({"reply": "Please say or type something so Jas AI can help."}), 400

        # 1) Doubt mode: try to resolve symbolically with SymPy (if installed)
        if mode == 'doubt' and sp is not None:
            lower = message.lower()

            # Derivative handling
            if 'derivative' in lower or 'differentiat' in lower or 'd/dx' in lower:
                # try to extract expression
                m = re.search(r'of (.+)', message, re.I)
                expr_text = m.group(1) if m else message
                expr_text = re.sub(r'(find|calculate|the|derivative|derivative of|d/dx|differentiat(e|ion))', '', expr_text, flags=re.I).strip(' .:?')
                x = sp.symbols('x')
                try:
                    expr = sp.sympify(expr_text, locals={'x': x})
                    deriv = sp.diff(expr, x)

                    # Attempt to show a simple step for polynomials
                    steps = ''
                    try:
                        term_steps = []
                        for term in sp.expand(expr).as_ordered_terms():
                            if term.has(x):
                                coeff, exp = term.as_coeff_exponent(x)
                                term_steps.append(f"d/dx({term}) = {coeff*exp}*x**{exp-1}")
                        if term_steps:
                            steps = 'Stepwise: ' + '; '.join(term_steps) + '\n'
                    except Exception:
                        steps = ''

                    reply = (f"Derivative of {str(expr)} w.r.t x is: {str(deriv)}\n\n"
                             f"{steps}Result (simplified): {str(sp.simplify(deriv))}")

                    if session_id:
                        store_session_message(session_id, 'user', message)
                        store_session_message(session_id, 'bot', reply)

                    return jsonify({'reply': reply})
                except Exception as e:
                    # fall through to generic doubt advice
                    pass

            # Solve/equation handling
            if 'solve' in lower or 'equation' in lower:
                try:
                    # Extract likely equation or expression
                    m = re.search(r'solve (.+) for (\w+)', message, re.I)
                    if m:
                        expr_text = m.group(1)
                        var = m.group(2)
                        var_sym = sp.symbols(var)
                        sol = sp.solve(sp.sympify(expr_text), var_sym)
                    else:
                        # try generic solve
                        expr_text = re.sub(r'solve', '', message, flags=re.I).strip()
                        sol = sp.solve(sp.sympify(expr_text))

                    reply = f"Solution: {sol}"
                    if session_id:
                        store_session_message(session_id, 'user', message)
                        store_session_message(session_id, 'bot', reply)

                    return jsonify({'reply': reply})
                except Exception:
                    pass

            # Fallback doubt message
            reply = (f"Doubt Solver — I saw your question: '{message}'.\n\n"
                     "1) Restate the problem to ensure understanding.\n"
                     "2) Break it into smaller steps and show attempted work.\n"
                     "3) If it's numeric, share values and units.\n\n"
                     "If you paste the specific question or your attempt, I can provide a step-by-step solution.")

            if session_id:
                store_session_message(session_id, 'user', message)
                store_session_message(session_id, 'bot', reply)

            return jsonify({"reply": reply})

        # 2) If cloud LLM requested and OpenAI configured, route to OpenAI
        if use_llm and openai is not None and os.environ.get('OPENAI_API_KEY'):
            try:
                openai.api_key = os.environ.get('OPENAI_API_KEY')
                system_prompt = (
                    "You are Jas AI, an expert concise study assistant for students. "
                    "Be helpful and provide step-by-step answers for doubts. Keep replies short and actionable.")

                messages = [
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': f"Mode: {mode}\nUser: {message}"}
                ]

                response = openai.ChatCompletion.create(
                    model=os.environ.get('OPENAI_MODEL', 'gpt-3.5-turbo'),
                    messages=messages,
                    max_tokens=600,
                    temperature=0.2,
                )

                content = response['choices'][0]['message']['content'].strip()

                if session_id:
                    store_session_message(session_id, 'user', message)
                    store_session_message(session_id, 'bot', content)

                return jsonify({'reply': content})
            except Exception as e:
                # Log and fall back to local behavior
                print('OpenAI error:', str(e))

        # 3) Fallback / rule-based behaviors
        reply = ''
        if mode == 'pcm':
            reply = (
                f"PCM Study Plan based on: '{message}'\n\n"
                "1) Core Concept Review: 45-60 mins focusing on theory and formulas.\n"
                "2) Practice: 30-45 mins solving 10 focused problems.\n"
                "3) Recall: 15 mins flashcards for key facts.\n"
                "4) Weekly Mock: 1 timed paper every 7 days.\n\n"
                "Tip: Rotate Physics/Chemistry/Math in blocks and review mistakes the same day.")
        else:
            reply = (
                f"Hello! I'm Jas AI. You asked: '{message}'\n\n"
                "I can: generate study plans, suggest practice problems, explain concepts step-by-step, or solve doubts.\n"
                "Try selecting 'PCM Study Mode' for curated PCM plans, or 'Doubt Solver' for stepwise help.")

        if session_id:
            store_session_message(session_id, 'user', message)
            store_session_message(session_id, 'bot', reply)

        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500
@app.route('/api/jas/history', methods=['GET'])
def get_jas_history():
    session_id = request.args.get('session_id')
    if not session_id:
        return jsonify({'error': 'Missing session_id'}), 400
    sessions = load_sessions()
    return jsonify(sessions.get(session_id, []))


@app.route('/api/jas/history', methods=['POST'])
def post_jas_history():
    try:
        data = request.get_json() or {}
        session_id = data.get('session_id')
        messages = data.get('messages', [])
        if not session_id:
            return jsonify({'success': False, 'error': 'Missing session_id'}), 400
        sessions = load_sessions()
        sessions[session_id] = messages
        save_sessions(sessions)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Server error"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port, threaded=True)