# field-notes-essay (Claude Code skill)

Invoke this in **any project** to turn it into a new essay in the Field Notes
portfolio (`caduveloso/csf`). It reads the project's docs and code, drafts an
educative, idea-level essay in the Field Notes voice with correct front-matter,
optionally generates an image or short video, and publishes it as a new post on a
branch in the portfolio repo.

## Install once (global — available in every project)

Copy or symlink it into your personal skills directory:

```bash
# from a checkout of the portfolio repo:
mkdir -p ~/.claude/skills
ln -s "$PWD/.claude/skills/field-notes-essay" ~/.claude/skills/field-notes-essay
# (or: cp -r .claude/skills/field-notes-essay ~/.claude/skills/)
```

Symlinking keeps it updated whenever you `git pull` the portfolio.

## Optional configuration

The skill finds your portfolio automatically (common paths, else it clones). To be
explicit, point it at your local checkout:

```bash
export CADU_PORTFOLIO="$HOME/code/csf"          # your local portfolio path
# export CADU_PORTFOLIO_REMOTE="git@github.com:caduveloso/csf.git"  # clone URL
```

Add those to your shell profile so every session has them.

## Use

In any repo, just ask Claude Code:

> "Write a Field Note about this project."
> "Add this experiment to my portfolio."

Or invoke it explicitly with `/field-notes-essay`. It will gather context, ask a
couple of sharp questions if the angle isn't clear, draft the essay, optionally add
media, build-check the portfolio, and push a branch `essay/<slug>`. It asks before
opening a pull request.

## What's inside

```
SKILL.md                     # the workflow Claude follows
reference/post-schema.md     # front-matter, category→accent map, glyph list
reference/voice-and-structure.md  # how a Field Note reads and is shaped
reference/media.md           # when/how to add images & video
assets/post-template.md      # fill-in-the-blanks skeleton
scripts/locate-portfolio.sh  # find or clone the portfolio repo
scripts/next-index.sh        # compute the next post index
scripts/publish-essay.sh     # commit + push the essay on a branch
```
