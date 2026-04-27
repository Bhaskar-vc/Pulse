#!/usr/bin/env python3
"""
Pulse Dev Server
  - Serves static files
  - /api/comments  — GET / POST / PATCH / DELETE  (persisted to comments.json)
  - /api/projects  — GET / POST / DELETE           (persisted to projects.json)

Usage:  python3 server.py
        python3 server.py 8080
"""

import json
import os
import re
import shutil
import sys
import time
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT          = os.path.dirname(os.path.abspath(__file__))
COMMENTS_FILE = os.path.join(ROOT, "comments.json")
PROJECTS_FILE = os.path.join(ROOT, "projects.json")
PORT          = int(sys.argv[1]) if len(sys.argv) > 1 else 8080


# ── Helpers ───────────────────────────────────────────────────────────────────

def slugify(text):
    """Convert a name to a safe directory name: 'My Project!' → 'My-Project'"""
    text = text.strip()
    text = re.sub(r"[^\w\s-]", "", text)   # remove non-word chars except hyphen
    text = re.sub(r"[\s_]+", "-", text)    # spaces/underscores → hyphen
    text = re.sub(r"-{2,}", "-", text)     # collapse multiple hyphens
    return text.strip("-") or "project"


STARTER_HTML = """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Inter', sans-serif; min-height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: radial-gradient(ellipse 60% 50% at 60% 20%, rgba(167,139,250,.10) 0%, transparent 70%), #f6f6fc;
      color: #101828;
    }}
    .card {{
      background: #fff; border: 1px solid #e4e7ec; border-radius: 16px;
      padding: 48px 56px; text-align: center; max-width: 480px; width: 90%;
      box-shadow: 0 8px 40px rgba(16,24,40,.08);
    }}
    .icon {{
      width: 56px; height: 56px; border-radius: 14px;
      background: linear-gradient(135deg,#7c3aed,#a855f7);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
    }}
    .icon svg {{ width: 28px; height: 28px; color: #fff; }}
    h1 {{ font-size: 22px; font-weight: 700; margin-bottom: 8px; letter-spacing: -.3px; }}
    p  {{ font-size: 14px; color: #667085; line-height: 1.6; }}
    .meta {{ margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }}
    .badge {{
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 12px; border-radius: 20px;
      background: #f4f0fd; color: #6d28d9;
      font-size: 12px; font-weight: 600;
    }}
    .back {{
      margin-top: 32px; display: inline-flex; align-items: center; gap: 6px;
      color: #7c3aed; font-size: 13px; font-weight: 500; text-decoration: none;
      padding: 8px 16px; border-radius: 8px; border: 1px solid #e9d7fe;
      background: #faf5ff; transition: background .15s;
    }}
    .back:hover {{ background: #f4f0fd; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="3" width="7" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
      </svg>
    </div>
    <h1>{title}</h1>
    <p>This project workspace is ready. Start adding screens and content here.</p>
    <div class="meta">
      <span class="badge">&#128197; Started {date}</span>
      <span class="badge">&#128100; {assignee}</span>
    </div>
    <a class="back" href="../index.html">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Back to Workspace
    </a>
  </div>
</body>
</html>
"""


# ── Generic storage helpers ───────────────────────────────────────────────────

def load_file(path, default):
    if not os.path.exists(path):
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default

def save_file(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ── Request handler ───────────────────────────────────────────────────────────

class Handler(SimpleHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    # ── GET ───────────────────────────────────────────────────────────────────
    def do_GET(self):
        path = self.path.split("?")[0]

        if path == "/api/projects":
            projects = load_file(PROJECTS_FILE, [])
            self._json(projects)

        elif path.startswith("/api/comments"):
            qs      = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            project = qs.get("project", [""])[0]
            screen  = qs.get("screen",  [""])[0]
            data    = load_file(COMMENTS_FILE, {})

            if project and screen:
                self._json(data.get(f"{project}/{screen}", []))
            elif project:
                prefix = project + "/"
                self._json({k[len(prefix):]: v for k, v in data.items()
                            if k.startswith(prefix) and v})
            else:
                self._json({k: len(v) for k, v in data.items() if v})

        else:
            super().do_GET()

    # ── POST ──────────────────────────────────────────────────────────────────
    def do_POST(self):
        path = self.path.split("?")[0]
        body = self._read_json()
        if body is None:
            return

        if path == "/api/projects":
            title   = body.get("title",   "").strip()
            project = body.get("project", "").strip()
            if not title:
                self._error(400, "title is required")
                return

            # ── Create project directory ──────────────────────────────────────
            # Use Folder/Category name if given, else derive from title
            raw_name  = project or title
            folder    = slugify(raw_name)          # filesystem-safe name
            proj_dir  = os.path.join(ROOT, folder)
            os.makedirs(proj_dir, exist_ok=True)

            # Write a starter index.html if one doesn't already exist
            starter   = os.path.join(proj_dir, "index.html")
            if not os.path.exists(starter):
                with open(starter, "w", encoding="utf-8") as f:
                    f.write(STARTER_HTML.format(
                        title    = title,
                        folder   = folder,
                        assignee = body.get("assignee", "Bhaskar"),
                        date     = body.get("date") or time.strftime("%Y-%m-%d"),
                    ))

            href = f"{folder}/index.html"

            record = {
                "id":            int(time.time() * 1000),
                "title":         title,
                "project":       project or "General",
                "status":        body.get("status", "todo"),
                "date":          body.get("date")   or time.strftime("%Y-%m-%d"),
                "target":        body.get("target") or None,
                "assignee":      body.get("assignee", "Bhaskar"),
                "href":          href,
                "folder":        folder,
                "commentProject": body.get("commentProject") or None,
                "createdAt":     time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            }

            projects = load_file(PROJECTS_FILE, [])
            projects.append(record)
            save_file(PROJECTS_FILE, projects)
            print(f"  \033[32m[DIR]\033[0m  Created: {proj_dir}")
            self._json(record, 201)

        elif path == "/api/comments":
            proj   = body.get("project", "").strip()
            screen = body.get("screen",  "").strip()
            author = body.get("author",  "").strip()
            text   = body.get("text",    "").strip()

            if not all([proj, screen, author, text]):
                self._error(400, "project, screen, author and text are required")
                return

            comment = {
                "id":       int(time.time() * 1000),
                "author":   author,
                "text":     text,
                "ts":       time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "resolved": False,
            }
            data = load_file(COMMENTS_FILE, {})
            data.setdefault(f"{proj}/{screen}", []).insert(0, comment)
            save_file(COMMENTS_FILE, data)
            self._json(comment, 201)

        else:
            self._error(404, "Not found")

    # ── DELETE ────────────────────────────────────────────────────────────────
    def do_DELETE(self):
        parts = self.path.split("/")   # ['', 'api', 'resource', 'id']
        if len(parts) < 4 or parts[1] != "api":
            self._error(404, "Not found")
            return

        try:
            rid = int(parts[3])
        except (ValueError, IndexError):
            self._error(400, "Invalid id")
            return

        resource = parts[2]

        if resource == "projects":
            projects = load_file(PROJECTS_FILE, [])
            target   = next((p for p in projects if p["id"] == rid), None)
            if target is None:
                self._error(404, "Project not found")
                return
            projects = [p for p in projects if p["id"] != rid]
            save_file(PROJECTS_FILE, projects)
            # Physically remove the project folder if it exists
            folder = target.get("folder", "")
            if folder:
                proj_dir = os.path.join(ROOT, folder)
                if os.path.isdir(proj_dir):
                    shutil.rmtree(proj_dir)
                    print(f"  \033[31m[DEL]\033[0m  Removed: {proj_dir}")
            self._json({"ok": True})

        elif resource == "comments":
            data    = load_file(COMMENTS_FILE, {})
            deleted = False
            for key, comments in data.items():
                for i, c in enumerate(comments):
                    if c["id"] == rid:
                        del comments[i]
                        deleted = True
                        break
                if deleted:
                    break
            if not deleted:
                self._error(404, "Comment not found")
                return
            save_file(COMMENTS_FILE, data)
            self._json({"ok": True})

        else:
            self._error(404, "Not found")

    # ── PATCH ─────────────────────────────────────────────────────────────────
    def do_PATCH(self):
        parts = self.path.split("/")
        if len(parts) < 4 or parts[1] != "api":
            self._error(404, "Not found")
            return

        try:
            rid = int(parts[3])
        except (ValueError, IndexError):
            self._error(400, "Invalid id")
            return

        body = self._read_json()
        if body is None:
            return

        resource = parts[2]

        if resource == "projects":
            projects = load_file(PROJECTS_FILE, [])
            found = False
            for p in projects:
                if p["id"] == rid:
                    for k in ("title","project","status","date","target","assignee","href"):
                        if k in body:
                            p[k] = body[k]
                    found = True
                    break
            if not found:
                self._error(404, "Project not found")
                return
            save_file(PROJECTS_FILE, projects)
            self._json({"ok": True})

        elif resource == "comments":
            data  = load_file(COMMENTS_FILE, {})
            found = False
            for comments in data.values():
                for c in comments:
                    if c["id"] == rid:
                        if "resolved" in body:
                            c["resolved"] = bool(body["resolved"])
                        if "text" in body:
                            c["text"] = str(body["text"])
                        found = True
                        break
                if found:
                    break
            if not found:
                self._error(404, "Comment not found")
                return
            save_file(COMMENTS_FILE, data)
            self._json({"ok": True})

        else:
            self._error(404, "Not found")

    # ── Helpers ───────────────────────────────────────────────────────────────
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin",  "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type",   "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self._cors()
        self.end_headers()
        self.wfile.write(body)

    def _error(self, status, msg):
        self._json({"error": msg}, status)

    def _read_json(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            return json.loads(self.rfile.read(length))
        except Exception as e:
            self._error(400, f"Invalid JSON: {e}")
            return None

    def log_message(self, fmt, *args):
        if "/api/" in str(args[0] if args else ""):
            print(f"  \033[35m[API]\033[0m  {fmt % args}")


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    os.chdir(ROOT)
    httpd = HTTPServer(("", PORT), Handler)
    print(f"\n  \033[1m\033[35mPulse Dev Server\033[0m  →  http://localhost:{PORT}")
    print(f"  Projects  → {PROJECTS_FILE}")
    print(f"  Comments  → {COMMENTS_FILE}")
    print(f"  Press Ctrl+C to stop.\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Server stopped.")
