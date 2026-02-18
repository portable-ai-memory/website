#!/usr/bin/env bash
# Installs git hooks from scripts/hooks/ into .git/hooks/

set -euo pipefail

HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)/hooks"
GIT_HOOKS_DIR="$(git rev-parse --git-dir)/hooks"

if [ ! -d "$HOOKS_DIR" ]; then
  exit 0
fi

for hook in "$HOOKS_DIR"/*; do
  hook_name=$(basename "$hook")
  target="$GIT_HOOKS_DIR/$hook_name"
  cp "$hook" "$target"
  chmod +x "$target"
done

echo "Git hooks installed."
