from __future__ import annotations

import posixpath
import subprocess
import sys
from ftplib import FTP, error_perm
from pathlib import Path

FTP_HOST = "www.weddingsbychristian.com"
FTP_USER = "chris@plansaver.ca"
FTP_PASS = "Fyw3emyi!B1chjg85!"
REMOTE_DIR = "/public_html/new"

REPO_ROOT = r"D:\wbc"
APP_DIR = r"D:\wbc\app"
GIT_BRANCH = "master"
DELETE_REMOTE_EXTRA = True

PROTECTED_REMOTE_FILES = {".htaccess"}


def run(cmd: list[str], cwd: str | None = None, allow_fail: bool = False) -> subprocess.CompletedProcess:
    print(f"\n>>> {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=cwd, text=True)
    if result.returncode != 0 and not allow_fail:
        print(f"Command failed with exit code {result.returncode}")
        sys.exit(result.returncode)
    return result


def ftp_mkdir_p(ftp: FTP, remote_path: str) -> None:
    parts = [p for p in remote_path.split("/") if p]
    current = ""
    for part in parts:
        current = f"{current}/{part}"
        try:
            ftp.mkd(current)
        except error_perm:
            pass


def ftp_list(ftp: FTP, remote_path: str) -> tuple[set[str], set[str]]:
    dirs: set[str] = set()
    files: set[str] = set()
    current = ftp.pwd()
    try:
        ftp.cwd(remote_path)
        for name, facts in ftp.mlsd():
            if name in {".", ".."}:
                continue
            kind = facts.get("type", "")
            if kind == "dir":
                dirs.add(name)
            elif kind == "file":
                files.add(name)
    finally:
        ftp.cwd(current)
    return dirs, files


def ftp_delete_tree(ftp: FTP, remote_path: str) -> None:
    try:
        dirs, files = ftp_list(ftp, remote_path)
        for name in files:
            ftp.delete(posixpath.join(remote_path, name))
        for name in dirs:
            ftp_delete_tree(ftp, posixpath.join(remote_path, name))
        ftp.rmd(remote_path)
    except error_perm:
        pass


def upload_dir(ftp: FTP, local_dir: Path, remote_dir: str, delete_remote_extra: bool) -> None:
    ftp_mkdir_p(ftp, remote_dir)

    local_dirs = {p.name for p in local_dir.iterdir() if p.is_dir()}
    local_files = {p.name for p in local_dir.iterdir() if p.is_file()}

    try:
        remote_dirs, remote_files = ftp_list(ftp, remote_dir)
    except Exception:
        remote_dirs, remote_files = set(), set()

    for file_name in sorted(local_files):
        local_path = local_dir / file_name
        remote_path = posixpath.join(remote_dir, file_name)
        print(f"Uploading {local_path} -> {remote_path}")
        with open(local_path, "rb") as fh:
            ftp.storbinary(f"STOR {remote_path}", fh)

    for dir_name in sorted(local_dirs):
        upload_dir(ftp, local_dir / dir_name, posixpath.join(remote_dir, dir_name), delete_remote_extra)

    if delete_remote_extra:
        for file_name in sorted(remote_files - local_files):
            if file_name in PROTECTED_REMOTE_FILES:
                print(f"Keeping protected remote file {posixpath.join(remote_dir, file_name)}")
                continue

            remote_path = posixpath.join(remote_dir, file_name)
            print(f"Deleting remote file {remote_path}")
            try:
                ftp.delete(remote_path)
            except error_perm:
                pass

        for dir_name in sorted(remote_dirs - local_dirs):
            remote_path = posixpath.join(remote_dir, dir_name)
            print(f"Deleting remote directory {remote_path}")
            ftp_delete_tree(ftp, remote_path)


def main() -> None:
    repo_root = Path(REPO_ROOT)
    app_dir = Path(APP_DIR)
    dist_dir = app_dir / "dist"

    if FTP_USER.startswith("REPLACE_") or FTP_PASS.startswith("REPLACE_"):
        print("Set FTP_USER and FTP_PASS in this script before running it.")
        sys.exit(1)

    if not repo_root.exists():
        print(f"Repo root not found: {repo_root}")
        sys.exit(1)

    if not app_dir.exists():
        print(f"App directory not found: {app_dir}")
        sys.exit(1)

    run(["git", "status"], cwd=str(repo_root))
    run(["git", "add", "-A"], cwd=str(repo_root))

    commit = run(["git", "commit", "-m", "deploy"], cwd=str(repo_root), allow_fail=True)
    if commit.returncode != 0:
        print("No commit created, continuing anyway.")

    run(["git", "push", "origin", GIT_BRANCH], cwd=str(repo_root))
    run(["cmd", "/c", "npm", "run", "build"], cwd=str(app_dir))

    if not dist_dir.exists():
        print(f"dist folder not found: {dist_dir}")
        sys.exit(1)

    print(f"\nConnecting to FTP host {FTP_HOST}...")
    with FTP(FTP_HOST) as ftp:
        ftp.login(FTP_USER, FTP_PASS)
        ftp.set_pasv(True)
        upload_dir(ftp, dist_dir, REMOTE_DIR, DELETE_REMOTE_EXTRA)

    print("\nDone. Git pushed, build created, and dist uploaded.")


if __name__ == "__main__":
    main()