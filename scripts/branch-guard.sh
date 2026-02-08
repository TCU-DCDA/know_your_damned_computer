#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "Not a git repository." >&2
  exit 2
fi

expected_branch="${1:-}"
expected_root="${2:-}"

current_branch=$(git rev-parse --abbrev-ref HEAD)
current_root=$(git rev-parse --show-toplevel)

if [[ -n "$expected_branch" && "$current_branch" != "$expected_branch" ]]; then
  echo "Branch mismatch. Expected: $expected_branch | Current: $current_branch" >&2
  exit 1
fi

if [[ -n "$expected_root" && "$current_root" != "$expected_root" ]]; then
  echo "Worktree mismatch. Expected: $expected_root | Current: $current_root" >&2
  exit 1
fi

echo "OK: $current_branch @ $current_root"
