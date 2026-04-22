#!/usr/bin/env python3
"""
Syncs the local project to GitHub in a single commit via the Git Data API.
Creates a blob for every file, then builds a tree with SHA references only.
Reads GITHUB_TOKEN and GITHUB_REPO from .env. No git CLI required.
"""

import base64
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

# ── Configuration ─────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).parent.parent.resolve()

EXCLUDE_PATHS = {
    "node_modules",
    "dist",
    "dist-ssr",
    ".git",
    ".github",   # workflow files need the 'workflow' token scope; already on GitHub
    ".netlify",
}

EXCLUDE_FILES = {
    ".env",
    ".env.local",
}

COMMIT_MESSAGE = "chore: sync project from Claude Code agent"

# ── .env loader ───────────────────────────────────────────────────────────────

def load_env(path: Path) -> dict:
    env = {}
    if not path.exists():
        return env
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        env[key.strip()] = value.strip()
    return env

# ── GitHub API ────────────────────────────────────────────────────────────────

def gh_request(method: str, url: str, token: str, data: dict = None) -> dict:
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(
        url,
        data=body,
        method=method,
        headers={
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "africagua-sync/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode()
        raise RuntimeError(f"GitHub API {e.code} [{url.split('/')[-1]}]: {body_text[:400]}")

# ── File collection ───────────────────────────────────────────────────────────

def collect_files() -> list[tuple[str, bytes]]:
    files = []
    for abs_path in PROJECT_ROOT.rglob("*"):
        if not abs_path.is_file():
            continue
        rel = abs_path.relative_to(PROJECT_ROOT)
        parts = rel.parts
        if any(p in EXCLUDE_PATHS for p in parts):
            continue
        if parts[-1] in EXCLUDE_FILES:
            continue
        try:
            content = abs_path.read_bytes()
        except OSError as e:
            print(f"  Warning: cannot read {rel}: {e}", file=sys.stderr)
            continue
        files.append((str(rel).replace("\\", "/"), content))
    return sorted(files, key=lambda x: x[0])

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    env = load_env(PROJECT_ROOT / ".env")
    token = env.get("GITHUB_TOKEN") or os.environ.get("GITHUB_TOKEN")
    repo = env.get("GITHUB_REPO") or os.environ.get("GITHUB_REPO")

    if not token or not repo:
        print("Error: GITHUB_TOKEN and GITHUB_REPO must be set in .env", file=sys.stderr)
        sys.exit(1)

    base_url = f"https://api.github.com/repos/{repo}"

    print(f"Syncing {len(collect_files())} files to {repo} ...")

    # Get current HEAD and base tree
    ref_data = gh_request("GET", f"{base_url}/git/refs/heads/main", token)
    head_sha = ref_data["object"]["sha"]
    commit_data = gh_request("GET", f"{base_url}/git/commits/{head_sha}", token)
    base_tree_sha = commit_data["tree"]["sha"]
    print(f"  HEAD: {head_sha[:12]}  base-tree: {base_tree_sha[:12]}")

    # Upload every file as a blob
    files = collect_files()
    tree_items = []

    print(f"  Uploading {len(files)} blobs ...")
    for i, (path, content) in enumerate(files, 1):
        print(f"  [{i:>2}/{len(files)}] {path}", end=" ... ", flush=True)
        blob = gh_request("POST", f"{base_url}/git/blobs", token, {
            "content": base64.b64encode(content).decode(),
            "encoding": "base64",
        })
        tree_items.append({
            "path": path,
            "mode": "100644",
            "type": "blob",
            "sha": blob["sha"],
        })
        print(blob["sha"][:8])

    # Create tree in chunks using SHA references only
    CHUNK = 50
    current_base = base_tree_sha
    chunks = [tree_items[i:i+CHUNK] for i in range(0, len(tree_items), CHUNK)]
    print(f"  Building tree in {len(chunks)} chunk(s) ...")
    for idx, chunk in enumerate(chunks, 1):
        print(f"  Chunk {idx}/{len(chunks)} ({len(chunk)} items) ...", end=" ", flush=True)
        result = gh_request("POST", f"{base_url}/git/trees", token, {
            "base_tree": current_base,
            "tree": chunk,
        })
        current_base = result["sha"]
        print(current_base[:12])

    new_tree_sha = current_base

    # Create commit
    print("  Creating commit ...", end=" ", flush=True)
    new_commit = gh_request("POST", f"{base_url}/git/commits", token, {
        "message": COMMIT_MESSAGE,
        "tree": new_tree_sha,
        "parents": [head_sha],
    })
    new_commit_sha = new_commit["sha"]
    print(new_commit_sha[:12])

    # Update branch ref
    print("  Updating main ...", end=" ", flush=True)
    gh_request("PATCH", f"{base_url}/git/refs/heads/main", token, {
        "sha": new_commit_sha,
        "force": False,
    })
    print("ok")

    print(f"\nDone! {len(files)} files -> {repo}/main")
    print(f"https://github.com/{repo}/commit/{new_commit_sha}")

if __name__ == "__main__":
    main()
