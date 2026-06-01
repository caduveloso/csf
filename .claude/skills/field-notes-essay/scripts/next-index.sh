#!/usr/bin/env bash
# Print the next post index for the portfolio as shell assignments.
# Usage:  eval "$(next-index.sh /path/to/portfolio)"   # sets NN and ORDER
# NN is zero-padded (e.g. 11); ORDER is the same integer without padding.
set -euo pipefail

dir="${1:?usage: next-index.sh <portfolio_dir>}/posts"
[[ -d "$dir" ]] || { echo "error: no posts dir at $dir" >&2; exit 1; }

max=0
shopt -s nullglob
for f in "$dir"/*.md; do
  base="$(basename "$f")"
  num="${base%%-*}"          # leading NN before the first hyphen
  if [[ "$num" =~ ^[0-9]+$ ]]; then
    n=$((10#$num))           # force base-10 (avoid octal on leading zeros)
    (( n > max )) && max=$n
  fi
done

next=$((max + 1))
printf 'NN=%02d\n' "$next"
printf 'ORDER=%d\n' "$next"
