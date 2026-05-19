---
name: fix-security-pr
description: "Fix a PR that is failing due to security or vulnerability issues — npm/pnpm/yarn/bun audit failures, CVE alerts, Dependabot merge conflicts, Snyk failures, or GitHub security advisory blocks. Use when asked to 'fix the security PR', 'resolve the vulnerability failure', or 'unblock the Dependabot PR'."
---

# Fix Security PR

Diagnose and remediate security/vulnerability failures in a pull request so CI passes.

## Step 1 — Identify the PR and failure

**Detect the PR:**
- If a PR URL or number is provided, use it directly
- If on a branch: `gh pr view --json number,url,headRefName,baseRefName`
- If unspecified: list recent failing PRs: `gh pr list --state open --json number,title,url | grep -i -E "security|vuln|cve|dependabot|snyk|audit"`

**Read the failure:**

```bash
gh run list --repo <owner>/<repo> --branch <branch> --limit 5 --json databaseId,conclusion,name
gh run view <run-id> --log-failed 2>&1 | head -100
```

Look for these patterns in the logs:

| Pattern | Source | Meaning |
|---|---|---|
| `npm audit` / `pnpm audit` / `yarn audit` exit non-zero | Audit step | Vulnerable dep in tree |
| `High` / `Critical` severity advisory | Audit output | Specific CVE needs fixing |
| `merge conflict` / `conflict` in PR | Git | Dependabot PR is stale; needs rebase |
| `Snyk found` / `snyk test` failure | Snyk | Vulnerable dep detected by Snyk |
| `GHSA-*` advisory ID | GitHub Advisory | Specific advisory blocking |

## Step 2 — Understand the vulnerability

Extract from the failure log:
- **Package name** (e.g. `lodash`)
- **Vulnerable version range** (e.g. `<4.17.21`)
- **Safe version** (e.g. `>=4.17.21`)
- **Severity** (critical / high / moderate / low)
- **Advisory ID** (CVE or GHSA number)
- **Whether it's a direct or transitive dependency**

For Dependabot PRs, also check:
```bash
gh pr view <number> --json body,title,commits
```

## Step 3 — Detect package manager and repo type

| File | Package manager |
|---|---|
| `pnpm-lock.yaml` | pnpm |
| `bun.lock` / `bun.lockb` | bun |
| `yarn.lock` | yarn |
| `package-lock.json` | npm |

Check for monorepo: `pnpm-workspace.yaml`, `workspaces` in root `package.json`, or `bun.workspace.ts`.

## Step 4 — Apply the fix

Choose the approach based on whether the dependency is direct or transitive:

### Direct dependency

Update the version in `package.json` to the safe version, then reinstall:

```bash
# pnpm
pnpm update <package>@<safe-version>

# npm
npm install <package>@<safe-version>

# yarn
yarn upgrade <package>@<safe-version>

# bun
bun update <package>
```

### Transitive dependency (you don't control the version directly)

Add an override to force the safe version across the entire tree:

**pnpm** (`package.json`):
```json
{
  "pnpm": {
    "overrides": {
      "<package>": ">=<safe-version>"
    }
  }
}
```

**npm** (`package.json`):
```json
{
  "overrides": {
    "<package>": ">=<safe-version>"
  }
}
```

**yarn** (`package.json`):
```json
{
  "resolutions": {
    "<package>": ">=<safe-version>"
  }
}
```

After adding the override, reinstall to regenerate the lockfile:
```bash
<pm> install
```

### Dependabot PR with merge conflicts

The PR branch is stale. Rebase it onto the base branch:

```bash
git fetch origin
git checkout <dependabot-branch>
git rebase origin/<base-branch>
# resolve any conflicts
git push --force-with-lease origin <dependabot-branch>
```

If the conflict is in the lockfile, delete it and reinstall after resolving `package.json` conflicts:
```bash
rm <lockfile>
<pm> install
git add <lockfile>
git rebase --continue
```

### Monorepo: vulnerability in a workspace package

Check which workspace contains the vulnerable dep:
```bash
<pm> audit --json 2>/dev/null | jq '.vulnerabilities | to_entries[] | {pkg: .key, via: .value.via}'
```

If the vulnerable dep is a transitive dep of a workspace, add the override to the **root** `package.json` (not the workspace's).

## Step 5 — Verify the fix locally

```bash
# Confirm no remaining vulnerabilities at the severity level that was failing
<pm> audit --audit-level=high   # or: critical / moderate

# If Snyk is used
npx snyk test
```

If the audit still fails after fixing one package, check for additional advisories in the output and repeat Step 4 for each.

## Step 6 — Commit and push

```bash
git add package.json <lockfile>
git commit -m "fix: patch <package> vulnerability (<CVE-or-GHSA>)"
git push origin <branch>
```

For Dependabot PRs where you rebased with `--force-with-lease`, the push is already done in Step 4.

## Step 7 — Re-trigger CI and verify

```bash
# Watch the new run
gh run list --branch <branch> --limit 3
gh run watch <new-run-id>
```

If CI passes, the PR is unblocked. If another security failure appears, return to Step 2 for the next advisory.

## Edge cases

**Audit level mismatch:** CI may fail on `moderate` while you're checking `high`. Check the CI command's `--audit-level` flag and match it when verifying locally.

**No safe version exists yet:** If the advisory has no fix available, options are:
1. Remove the package entirely if it's not truly needed
2. Add the package to an audit ignore list (`.nsprc`, `auditignore`, or `--ignore` flag) and leave a comment explaining why — inform the user before doing this
3. Wait for upstream to release a fix; inform the user

**Private registry:** If `npm audit` / `pnpm audit` fails to reach the registry, check for `.npmrc` or `.pnpmrc` with a private registry URL. The fix process is the same; just ensure the registry is reachable in CI.

**Dependabot already auto-merged:** Check if the PR is still open before starting. If it merged and CI still fails on `main`, the vulnerability is in the base branch — treat it as a direct fix to `main`, not a PR fix.
