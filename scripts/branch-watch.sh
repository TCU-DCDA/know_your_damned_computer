#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "Not a git repository." >&2
  exit 2
fi

interval="${1:-30}"
expected_branch="${2:-$(git rev-parse --abbrev-ref HEAD)}"
expected_root="${3:-$(git rev-parse --show-toplevel)}"

if ! [[ "$interval" =~ ^[0-9]+$ ]]; then
  echo "Interval must be an integer number of seconds." >&2
  exit 2
fi

echo "Watching every ${interval}s"
echo "Expected branch: $expected_branch"
echo "Expected root:   $expected_root"

while true; do
  current_branch=$(git rev-parse --abbrev-ref HEAD)
  current_root=$(git rev-parse --show-toplevel)

  if [[ "$current_branch" != "$expected_branch" || "$current_root" != "$expected_root" ]]; then
    echo "Branch/worktree changed." >&2
    echo "Expected branch: $expected_branch | Current: $current_branch" >&2
    echo "Expected root:   $expected_root | Current: $current_root" >&2
    exit 1
  fi

  sleep "$interval"
done
