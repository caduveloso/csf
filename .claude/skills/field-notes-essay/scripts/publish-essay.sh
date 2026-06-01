#!/usr/bin/env bash
# Commit a new essay (and any assets already written) and push it on a branch.
# Usage: publish-essay.sh <portfolio_dir> <NN-slug>
# Does NOT open a pull request — the caller should ask the user first.
set -euo pipefail

PORTFOLIO="${1:?usage: publish-essay.sh <portfolio_dir> <NN-slug>}"
KEY="${2:?usage: publish-essay.sh <portfolio_dir> <NN-slug>}"   # e.g. 11-my-experiment

cd "$PORTFOLIO"

post="posts/${KEY}.md"
[[ -f "$post" ]] || { echo "error: $post not found in $PORTFOLIO" >&2; exit 1; }

slug="${KEY#*-}"                      # strip the NN- prefix
branch="essay/${slug}"
title="$(grep -m1 '^title:' "$post" | sed 's/^title:[[:space:]]*//; s/^"//; s/"$//')"

# branch (reuse if it already exists)
git checkout -B "$branch" >&2

# stage the post plus any assets under its slug folders
git add "$post"
[[ -d "public/images/${slug}" ]] && git add "public/images/${slug}" || true
[[ -d "public/videos/${slug}" ]] && git add "public/videos/${slug}" || true

if git diff --cached --quiet; then
  echo "error: nothing staged to commit" >&2
  exit 1
fi

git commit -q -m "Add Field Note: ${title:-$slug}"

# push with simple retry/backoff for flaky networks
n=0
until git push -u origin "$branch" >&2; do
  n=$((n + 1))
  (( n >= 4 )) && { echo "error: push failed after $n attempts" >&2; exit 1; }
  sleep $((2 ** n))
done

echo "published: $post"
echo "branch:    $branch"
