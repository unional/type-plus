---
name: create-skill
description: Use this skill when the user asks to create a new agent skill. Creates the skill directory under ~/.agents/skills/ and links it into all detected agents so they can pick it up.
---

# Create Skill

When the user asks to create a new skill, follow this convention.

## Directory structure

Skills live in `~/.agents/skills/<name>/` and are linked into each agent's skills directory:

```
~/.agents/skills/
  <name>/
    SKILL.md        ← source of truth, edit this
~/.claude/skills/
  <name>            ← symlink → ~/.agents/skills/<name>  (Claude Code)
# ...and equivalent paths for other detected agents
```

## Steps

### 1. Create the skill

Check whether `npx skills` is available:

```bash
npx skills --version 2>/dev/null
```

**If available**, use it to scaffold the skill:

```bash
npx skills init <name> --dir ~/.agents/skills
```

This creates `~/.agents/skills/<name>/SKILL.md` with a starter template. Edit that file to fill in the real content.

**If not available**, create manually:

```bash
mkdir -p ~/.agents/skills/<name>
```

Then write `~/.agents/skills/<name>/SKILL.md` using this template:

```markdown
---
name: <name>
description: Use this skill when <trigger condition>. <One-line summary of what it does.>
---

# <Name>

## When to use

<Describe when this skill should be used.>

## Instructions

1. First step
2. Second step
```

### 2. Validate the skill

Invoke the `validate-skill` skill on the new file. Fix any CRITICAL findings before proceeding. Do not continue to step 3 if any CRITICAL findings remain.

### 3. Link to agents

**If `npx skills` is available:**

```bash
npx skills add ~/.agents/skills/<name>
```

This detects all installed agents and prompts the user to choose which ones to link. It handles the correct path for each agent (Claude Code, Cursor, Codex, OpenCode, etc.).

**Known issue:** `npx skills` has a bug where it may not create `~/.claude/skills/` if the directory doesn't exist yet. After linking, verify:

```bash
ls ~/.claude/skills/<name>
```

If missing, fall back to the manual step below.

**If `npx skills` is not available, or the symlink is missing after the above:**

```bash
ln -sf ~/.agents/skills/<name> ~/.claude/skills/<name>
```

Adjust the target path for other agents as needed (e.g., `~/.cursor/skills/`, `~/.opencode/skills/`).

## What makes a good skill

- **Decisions over documentation.** Encode what to decide and how — don't repeat reference material the model already knows.
- **Narrow and composable.** One workflow per skill. Skills can be triggered by situation (user-facing) or called by other skills (sub-skills). Sub-skills have no situational trigger — their `description` should say "Internal skill: called by X" to avoid accidental activation. Neither type should be loaded as ambient context.
- **No baked-in opinions.** Detect the user's setup (package manager, monorepo shape, tooling) at runtime rather than assuming a specific stack.

## Notes

- `~/.agents/skills/` is the source of truth — commit or back up this directory.
- Agent skills directories (e.g. `~/.claude/skills/`) only contain symlinks; never edit files there directly.
- The `description` frontmatter field is what agents read to decide when to activate the skill — make it specific and include "Use this skill when" trigger language. For sub-skills, prefix with "Internal skill:" to prevent unintended activation.
