import sqlite3

# Study Plus AI - Smart Study Planner Database
db = sqlite3.connect("users.db")
db.execute("CREATE TABLE IF NOT EXISTS users(username TEXT PRIMARY KEY, password TEXT)")
db.execute("INSERT OR IGNORE INTO users VALUES('test', 'test')")
db.commit()
db.close()
print("Study Plus AI Database initialized successfully!")

