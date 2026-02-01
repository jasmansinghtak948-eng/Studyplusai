#!/usr/bin/env python
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from app import app

if __name__ == "__main__":
    print("\n" + "="*60)
    print("  🚀 Study Plus AI - Starting Server")
    print("="*60)
    print("\n  ✅ Server running at: http://127.0.0.1:5000")
    print("  ✅ Open this URL in your browser")
    print("  ✅ Press Ctrl+C to stop the server\n")
    app.run(debug=True, host="127.0.0.1", port=5000, use_reloader=False)
