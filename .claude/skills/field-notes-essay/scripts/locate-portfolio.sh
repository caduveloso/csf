#!/usr/bin/env bash
# Resolve the Field Notes portfolio directory and print its path on stdout.
# Resolution order:
#   1) $CADU_PORTFOLIO, if it points to a valid checkout
#   2) common local paths
#   3) clone $CADU_PORTFOLIO_REMOTE (default caduveloso/csf) into a temp dir
# All diagnostics go to stderr so stdout is just the path.
set -euo pipefail

is_portfolio() {
  # A valid checkout has the posts dir and the dynamic post route.
  [[ -d "$1/posts" && -f "$1/pages/post/[slug].js" ]]
}

# 1) explicit override
if [[ -n "${CADU_PORTFOLIO:-}" ]]; then
  if is_portfolio "$CADU_PORTFOLIO"; then
    echo "$CADU_PORTFOLIO"; exit 0
  else
    echo "warn: \$CADU_PORTFOLIO is set but not a valid portfolio checkout: $CADU_PORTFOLIO" >&2
  fi
fi

# 2) common locations
for c in \
  "$HOME/code/csf" "$HOME/csf" "$HOME/projects/csf" \
  "$HOME/dev/csf" "$HOME/work/csf" "$PWD/../csf"; do
  if is_portfolio "$c"; then echo "$c"; exit 0; fi
done

# 3) clone fresh
remote="${CADU_PORTFOLIO_REMOTE:-https://github.com/caduveloso/csf}"
dest="$(mktemp -d)/csf"
echo "info: cloning portfolio from $remote into $dest" >&2
git clone --depth 1 "$remote" "$dest" >&2
if is_portfolio "$dest"; then
  echo "$dest"; exit 0
fi
echo "error: could not locate or clone a valid Field Notes portfolio" >&2
exit 1
