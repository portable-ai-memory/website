#!/usr/bin/env bash
# Copies schemas from content-source/ to public/schemas/.
#
# Usage: ./scripts/sync-schemas.sh [--check]
#   --check  Verify schemas are in sync without modifying files (for CI)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SOURCE_DIR="$ROOT_DIR/content-source/schemas"
TARGET_DIR="$ROOT_DIR/public/schemas"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: content-source/schemas/ not found. Initialize the submodule first:"
  echo "  git submodule update --init"
  exit 1
fi

SCHEMAS=(
  "portable-ai-memory.schema.json"
  "portable-ai-memory-conversation.schema.json"
  "portable-ai-memory-embeddings.schema.json"
)

CHECK_MODE=false
if [ "${1:-}" = "--check" ]; then
  CHECK_MODE=true
fi

EXIT_CODE=0

for schema in "${SCHEMAS[@]}"; do
  SOURCE_FILE="$SOURCE_DIR/$schema"
  TARGET_FILE="$TARGET_DIR/$schema"

  if [ ! -f "$SOURCE_FILE" ]; then
    echo "Error: $SOURCE_FILE not found. Ensure the content-source submodule is up to date."
    exit 1
  fi

  if $CHECK_MODE; then
    if [ ! -f "$TARGET_FILE" ]; then
      echo "MISSING: $schema not found in public/schemas/"
      EXIT_CODE=1
    elif ! diff -q "$SOURCE_FILE" "$TARGET_FILE" > /dev/null 2>&1; then
      echo "OUT OF SYNC: $schema"
      diff "$SOURCE_FILE" "$TARGET_FILE" || true
      EXIT_CODE=1
    else
      echo "OK: $schema"
    fi
  else
    cp "$SOURCE_FILE" "$TARGET_FILE"
    echo "Synced: $schema"
  fi
done

if $CHECK_MODE && [ $EXIT_CODE -ne 0 ]; then
  echo ""
  echo "Schemas are out of sync. Run: ./scripts/sync-schemas.sh"
  exit 1
fi

if $CHECK_MODE; then
  echo "All schemas in sync."
fi
