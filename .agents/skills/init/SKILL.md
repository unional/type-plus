---
name: init
description: Use this skill when the user wants to initialize or improve an AGENTS.md file with codebase documentation. Creates AGENTS.md and symlinks CLAUDE.md to it, or suggests improvements if AGENTS.md already exists.
---

Analyze this codebase and create or improve an AGENTS.md file, then symlink CLAUDE.md to it.

What to include:
1. Commands commonly used for building, linting, and running tests — including how to run a single test.
2. High-level architecture and code structure that requires reading multiple files to understand. Focus on the big picture, not file listings.

Usage notes:
- If there's already an AGENTS.md, suggest improvements to it.
- Avoid listing every component or file structure that can be easily discovered.
- Do not make up sections like "Common Development Tasks" or "Tips for Development" unless that content appears in existing project files.
- If there are Cursor rules (in `.cursor/rules/` or `.cursorrules`) or Copilot rules (in `.github/copilot-instructions.md`), include the important parts.
- If there is a README.md, include the important parts.
- Prefix the file with:

```
# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.
```

After writing AGENTS.md, create the CLAUDE.md symlink. Detect the platform first:

**Unix / macOS / Linux:**
```bash
[ -f CLAUDE.md ] && ! [ -L CLAUDE.md ] && rm CLAUDE.md
ln -sf AGENTS.md CLAUDE.md
```

**Windows (PowerShell):**
```powershell
if (Test-Path CLAUDE.md -PathType Leaf) { Remove-Item CLAUDE.md }
New-Item -ItemType SymbolicLink -Name CLAUDE.md -Target AGENTS.md
```
