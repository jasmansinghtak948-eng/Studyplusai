import os
import json
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

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

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Server error"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port, threaded=True)