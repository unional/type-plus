---
name: setup-changesets
description: "Set up changesets in a new or existing repository. Use when asked to 'add changesets', 'set up releases', or 'configure versioning'. Handles single packages and monorepos. Detects and migrates from competing release tools. Optionally sets up a shared reusable workflow in a <user/org>/.github repo."
---

# Setup Changesets

Changesets automates versioning and changelog generation. Contributors add changeset files describing their changes; CI consumes them to bump versions, update changelogs, and publish packages.

## Step 1 — Gather context

Before doing anything, detect or ask:

**Detect automatically:**

| Check | How |
|---|---|
| Package manager | Look for `pnpm-lock.yaml`, `bun.lock`/`bun.lockb`, `yarn.lock`, `package-lock.yaml` |
| Monorepo | `pnpm-workspace.yaml`, `workspaces` field in root `package.json`, or `bun.workspace.ts` |
| Already initialized | `.changeset/` directory exists |

**Hosting platform** (informs CI workflow choice):

| Platform | How |
|---|---|
| GitHub | `.github/` directory exists |
| GitLab | `.gitlab-ci.yml` or `.gitlab/` directory exists |
| Bitbucket | `bitbucket-pipelines.yml` exists |
| Azure DevOps | `azure-pipelines.yml` exists |
| Gitea / Forgejo | Self-hosted; ask the user if no platform is detected |

**Existing CI system** (to know which workflow file to create or replace):

| CI system | Config file |
|---|---|
| GitHub Actions | `.github/workflows/*.yml` |
| GitLab CI | `.gitlab-ci.yml` |
| CircleCI | `.circleci/config.yml` |
| Azure Pipelines | `azure-pipelines.yml` |
| Bitbucket Pipelines | `bitbucket-pipelines.yml` |
| Jenkins | `Jenkinsfile` |
| Travis CI | `.travis.yml` |
| Drone CI | `.drone.yml` |
| AppVeyor | `appveyor.yml` |

**Competing release tools** (check `package.json` deps and config files):

| Tool | Detection |
|---|---|
| semantic-release | `semantic-release` in deps, OR `.releaserc` / `.releaserc.{json,js,cjs,yaml,yml}` / `release.config.{js,cjs,ts}` / `"release"` key in `package.json` |
| release-it | `release-it` in deps, OR `.release-it.{json,js,ts,yaml,yml}` / `"release-it"` key in `package.json` |
| standard-version | `standard-version` in deps, OR `.versionrc` / `.versionrc.{json,js}` / `"standard-version"` key in `package.json` |
| beachball | `beachball` in deps, OR `beachball.config.json` |
| release-please | `release-please-config.json` / `.release-please-manifest.json` |
| auto (Intuit) | `auto` in deps, OR `.autorc` / `.autorc.{json,js}` |
| Nx Release | `nx` in deps AND `"release"` key in `nx.json` |
| lerna | `lerna.json` exists |
| bumpp | `bumpp` in deps |
| changelogen | `changelogen` in deps |

**If a competing tool is detected**, ask before proceeding:

> "I found `<tool(s)>` in this repo. Changesets is a different approach to automated versioning. Do you want to migrate to changesets? I'll remove the old tool and its config, then set up changesets from scratch."

- **Yes** → follow the [Migration](#migration) section for the detected tool(s), then continue to Step 2
- **No** → stop here; do not set up changesets

**Ask the user:**

1. "Do you want to also create a reusable workflow in a `<org-or-user>/.github` repo, so other repos can share the same release pipeline?"
   - Yes → follow [Shared workflow setup](#shared-workflow-setup) after completing local setup
   - No → inline the workflow in the appropriate CI config file

2. If monorepo: "Are any packages versioned together (always share the same version)?" → `fixed` groups
3. "Are any packages private/internal and should be excluded from publishing?" → `ignore` list

---

## Migration

Remove the old release tool before initializing changesets. Follow the subsection for each detected tool.

### semantic-release

1. Remove packages: `<pm> remove semantic-release` and any `@semantic-release/*` plugins found in `package.json`
2. Delete config files (whichever exist): `.releaserc`, `.releaserc.json`, `.releaserc.js`, `.releaserc.cjs`, `.releaserc.yaml`, `.releaserc.yml`, `release.config.js`, `release.config.cjs`, `release.config.ts`; also remove the `"release"` key if it appears inside `package.json`
3. Remove any `"semantic-release"` call from the `"release"` script in `package.json`
4. In the detected CI config file(s), find the job/step that runs `semantic-release` — delete the step or the entire job; note the filename so the new changeset workflow can reuse it
5. Secrets: `GH_TOKEN` / `GITHUB_TOKEN` and `NPM_TOKEN` can be reused as-is

### release-it

1. Remove packages: `<pm> remove release-it` and any `@release-it/*` plugins
2. Delete config files (whichever exist): `.release-it.json`, `.release-it.js`, `.release-it.ts`, `.release-it.yaml`, `.release-it.yml`, `release-it.config.js`, `release-it.config.ts`; also remove the `"release-it"` key from `package.json` if present
3. Remove any `"release-it"` call from the `"release"` script in `package.json`
4. In the detected CI config file(s), find and remove the step running `release-it`; note the filename for reuse
5. Secrets: `GITHUB_TOKEN` and `NPM_TOKEN` can be reused as-is

### standard-version

1. Remove packages: `<pm> remove standard-version`
2. Delete config files (whichever exist): `.versionrc`, `.versionrc.json`, `.versionrc.js`; also remove the `"standard-version"` key from `package.json` if present
3. Remove any `"standard-version"` call from scripts in `package.json`
4. standard-version is often run locally rather than in CI; check for any CI step and remove if found
5. Secrets: usually none; `NPM_TOKEN` reusable if present

### beachball

1. Remove packages: `<pm> remove beachball`
2. Delete config files (whichever exist): `beachball.config.json`; remove any `"beachball"` key from root or package-level `package.json` files
3. Remove `change`, `checkchange`, and `release` scripts in `package.json` that call `beachball`
4. In CI config, find and remove the step running `beachball release`
5. Secrets: `NPM_TOKEN` reusable

### release-please

1. Remove packages: `<pm> remove release-please` (if installed as a CLI dep); the GitHub Action needs no package removal
2. Delete config files: `release-please-config.json`, `.release-please-manifest.json`
3. No `package.json` scripts to remove (release-please is entirely CI-driven)
4. In `.github/workflows/`, find and delete the workflow using `googleapis/release-please-action`
5. Secrets: `GITHUB_TOKEN` and `NPM_TOKEN` reusable

### auto (Intuit)

1. Remove packages: `<pm> remove auto` and any `@auto-it/*` plugins
2. Delete config files (whichever exist): `.autorc`, `.autorc.json`, `.autorc.js`
3. Remove any `"auto release"` or `"auto shipit"` calls from scripts in `package.json`
4. In CI config, find and remove the step running `auto release`; note the filename for reuse
5. Secrets: `GH_TOKEN` can be reused as `GITHUB_TOKEN`; `NPM_TOKEN` reusable

### Nx Release

1. No separate package to remove — `nx` itself provides the release functionality and stays installed
2. Remove the `"release"` key from `nx.json`; remove any `nx release` targets from `project.json` files
3. Remove any `"nx release"` calls from scripts in `package.json`
4. In CI config, find and remove the `nx release` step
5. Secrets: `GITHUB_TOKEN` and `NPM_TOKEN` reusable

### lerna

1. Remove packages: `<pm> remove lerna`
2. Delete config files: `lerna.json`
3. Remove any `"lerna publish"` or `"lerna version"` calls from scripts in `package.json`
4. In CI config, find and remove the step running `lerna publish`
5. Secrets: `GH_TOKEN` / `GITHUB_TOKEN` and `NPM_TOKEN` reusable

### bumpp

1. Remove packages: `<pm> remove bumpp`
2. Delete config: no dedicated config file; remove any `"bumpp"` key from `package.json` if present
3. Remove any `"bumpp"` calls from scripts in `package.json`
4. In CI config, find and remove any `bumpp` step
5. Secrets: `NPM_TOKEN` reusable if publishing was wired up

### changelogen

1. Remove packages: `<pm> remove changelogen`
2. Delete config: no dedicated config file; remove any `"changelogen"` key from `package.json` if present
3. Remove any `"changelogen"` calls from scripts in `package.json`
4. In CI config, find and remove any `changelogen` step
5. Secrets: `GITHUB_TOKEN` reusable if GitHub releases were used

---

## Step 2 — Initialize

```bash
# pnpm
pnpm dlx @changesets/cli init

# bun
bunx @changesets/cli init

# npm / yarn
npx @changesets/cli init
```

This creates `.changeset/config.json` and `.changeset/README.md`.

## Step 3 — Configure `.changeset/config.json`

Replace the generated config with appropriate settings:

**Single package:**
```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "access": "public",
  "baseBranch": "main"
}
```

**Monorepo with grouped packages:**
```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "access": "public",
  "baseBranch": "main",
  "fixed": [["package-a", "package-b"]],
  "linked": [],
  "ignore": ["internal-tools"],
  "updateInternalDependencies": "patch"
}
```

Key decisions:
- `"access": "public"` — required for publishing scoped packages (`@scope/name`) publicly; private packages ignore this
- `"fixed"` — packages that must always share the exact same version number
- `"linked"` — packages that share the highest bump type but keep independent version numbers
- `"ignore"` — packages excluded from changeset versioning entirely (e.g. `examples`, internal CLIs)
- `"commit": false` — recommended; `changeset version` won't auto-commit, giving you control

## Step 4 — Add scripts to `package.json`

```json
{
  "scripts": {
    "version": "changeset version",
    "release": "changeset publish",
    "cs": "changeset"
  }
}
```

`cs` is a shorthand for adding changesets during development. `version` and `release` are called by CI.

If the project has a build step that must run before publishing, update `release`:
```json
"release": "pnpm build && changeset publish"
```

## Step 5 — Set up the CI release workflow

Use the CI system detected in Step 1. If the project is on GitHub, prefer Option A or B below. For all other CI systems, use the platform-specific template.

### GitHub Actions — Option A (inline workflow)

Create `.github/workflows/release.yml`:

```yaml
name: release
on:
  push:
    branches: [main]

concurrency: ${{ github.workflow }}-${{ github.ref }}

permissions:
  contents: write
  pull-requests: write
  id-token: write

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      # Insert package manager setup here (see below)

      - run: <install-command>
      - run: <build-command>        # remove if no build step

      - name: Create Release PR or Publish
        uses: changesets/action@v1
        with:
          version: <pm> run version
          publish: <pm> run release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Replace `<pm>` with `pnpm`, `bun`, `npm`, or `yarn`. Replace `<install-command>` with `pnpm install --frozen-lockfile`, `bun install`, etc.

**Package manager setup snippets:**

pnpm:
```yaml
- uses: pnpm/action-setup@v4
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: pnpm
```

bun:
```yaml
- uses: oven-sh/setup-bun@v2
- uses: actions/setup-node@v4
  with:
    node-version: 22
```

npm/yarn:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm   # or: yarn
```

**Token note:** `GITHUB_TOKEN` is sufficient for most setups. If your repo has branch protection rules that require CI status checks on the "Version Packages" PR, you'll need a PAT with `repo` scope stored as a secret (e.g. `RELEASE_TOKEN`) and passed as `GITHUB_TOKEN: ${{ secrets.RELEASE_TOKEN }}` — this lets the action's commits trigger CI.

### GitHub Actions — Option B (shared workflow) <a name="shared-workflow-setup"></a>

Use this when you want all your repos to share one release pipeline definition. Changes to the shared workflow apply to all repos at once.

**In the `<user-or-org>/.github` repo**, create `.github/workflows/release-changeset.yml`:

```yaml
name: release-changeset
on:
  workflow_call:
    inputs:
      node-version:
        type: string
        default: '22'
    outputs:
      published:
        description: 'Whether packages were published'
        value: ${{ jobs.release.outputs.published }}

concurrency: ${{ github.workflow }}-${{ github.ref }}

permissions:
  contents: write
  pull-requests: write
  id-token: write

jobs:
  release:
    runs-on: ubuntu-latest
    outputs:
      published: ${{ steps.changesets.outputs.published }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      # Add your standard setup steps here (package manager, node, install, build)
      - name: Create Release PR or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          version: <pm> run version
          publish: <pm> run release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**In each consuming repo**, create `.github/workflows/release.yml`:

```yaml
name: release
on:
  push:
    branches: [main]

jobs:
  release:
    uses: <user-or-org>/.github/.github/workflows/release-changeset.yml@main
    secrets: inherit
```

### GitLab CI (`.gitlab-ci.yml`)

```yaml
release:
  stage: release
  image: node:22
  only:
    - main
  script:
    - <install-command>
    - <build-command>     # remove if no build
    - <pm> run version
    - git config user.email "ci@bot" && git config user.name "CI Bot"
    - git add . && git commit -m "chore: version packages" || true
    - git push "https://oauth2:${GITLAB_TOKEN}@${CI_SERVER_HOST}/${CI_PROJECT_PATH}.git" HEAD:main || true
    - <pm> run release
  variables:
    NPM_TOKEN: $NPM_TOKEN
```

Secrets: add `NPM_TOKEN` and `GITLAB_TOKEN` (a project access token with `write_repository` scope) in **Settings → CI/CD → Variables**.

Note: `changesets/action` is GitHub-only. On GitLab you call `changeset version` + `changeset publish` directly and handle the git commit/push yourself. The "Version Packages" PR pattern is not available — version bump and publish happen in one CI run.

### CircleCI (`.circleci/config.yml`)

```yaml
version: 2.1

jobs:
  release:
    docker:
      - image: cimg/node:22.0
    steps:
      - checkout
      - run: <install-command>
      - run: <build-command>     # remove if no build
      - run: <pm> run version
      - run: git config user.email "ci@bot" && git config user.name "CI Bot"
      - run: git add . && git commit -m "chore: version packages" || true
      - run: git push || true
      - run: <pm> run release

workflows:
  release:
    jobs:
      - release:
          filters:
            branches:
              only: main
```

Secrets: add `NPM_TOKEN` in **Project Settings → Environment Variables** in the CircleCI UI.

### Bitbucket Pipelines (`bitbucket-pipelines.yml`)

```yaml
pipelines:
  branches:
    main:
      - step:
          name: Release
          image: node:22
          script:
            - <install-command>
            - <build-command>     # remove if no build
            - <pm> run version
            - git config user.email "ci@bot" && git config user.name "CI Bot"
            - git add . && git commit -m "chore: version packages" || true
            - git push || true
            - <pm> run release
          deployment: production
```

Secrets: add `NPM_TOKEN` in **Repository settings → Repository variables** in the Bitbucket UI.

### Azure Pipelines (`azure-pipelines.yml`)

```yaml
trigger:
  branches:
    include: [main]

pool:
  vmImage: ubuntu-latest

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '22'
  - script: <install-command>
    displayName: Install dependencies
  - script: <build-command>
    displayName: Build           # remove if no build
  - script: |
      <pm> run version
      git config user.email "ci@bot"
      git config user.name "CI Bot"
      git add . && git commit -m "chore: version packages" || true
      git push || true
      <pm> run release
    displayName: Version and publish
    env:
      NPM_TOKEN: $(NPM_TOKEN)
```

Secrets: add `NPM_TOKEN` as a pipeline variable (secret) in **Azure DevOps → Pipelines → Edit → Variables**.

### Jenkins (`Jenkinsfile`)

```groovy
pipeline {
  agent any
  triggers { pollSCM('H/5 * * * *') }
  stages {
    stage('Release') {
      when { branch 'main' }
      steps {
        sh '<install-command>'
        sh '<build-command>'   // remove if no build
        sh '<pm> run version'
        sh 'git config user.email "ci@bot" && git config user.name "CI Bot"'
        sh 'git add . && git commit -m "chore: version packages" || true'
        sh 'git push || true'
        withCredentials([string(credentialsId: 'NPM_TOKEN', variable: 'NPM_TOKEN')]) {
          sh '<pm> run release'
        }
      }
    }
  }
}
```

Secrets: add `NPM_TOKEN` via **Manage Jenkins → Credentials** as a secret text credential.

### Travis CI (`.travis.yml`)

```yaml
language: node_js
node_js: '22'
branches:
  only: [main]
install:
  - <install-command>
script:
  - <build-command>     # remove if no build
deploy:
  provider: script
  script: >-
    <pm> run version &&
    git config user.email "ci@bot" && git config user.name "CI Bot" &&
    (git add . && git commit -m "chore: version packages" || true) &&
    (git push || true) &&
    <pm> run release
  on:
    branch: main
```

Secrets: add `NPM_TOKEN` via **Travis CI → Repository settings → Environment Variables**.

### Drone CI (`.drone.yml`)

```yaml
kind: pipeline
type: docker
name: release

trigger:
  branch: [main]
  event: [push]

steps:
  - name: release
    image: node:22
    environment:
      NPM_TOKEN:
        from_secret: npm_token
    commands:
      - <install-command>
      - <build-command>     # remove if no build
      - <pm> run version
      - git config user.email "ci@bot" && git config user.name "CI Bot"
      - git add . && git commit -m "chore: version packages" || true
      - git push || true
      - <pm> run release
```

Secrets: add `npm_token` via **Drone → Repository settings → Secrets**.

## Step 6 — Add secrets to the repository

Add the following secrets in your platform's secret/variable settings:

- `NPM_TOKEN` — an npm automation token (create at npmjs.com → Access Tokens → Generate New Token → Automation)
- `RELEASE_TOKEN` — optional PAT (GitHub only), needed if branch protection requires CI on the "Version Packages" PR

## Step 7 — Verify

```bash
# Add a test changeset
npx changeset add --empty

# Check it was created
ls .changeset/

# Check the release workflow is valid (GitHub only)
gh workflow list
```

## What the automated flow looks like

Once set up, the full cycle is:

1. Developer adds a changeset file to their PR (see `add-changeset` skill)
2. PR merges to main
3. CI runs `changesets/action` — detects new changesets, opens/updates a **"Version Packages"** PR (GitHub only; on other platforms, version bump and publish happen in one CI run)
4. When ready to release, merge the "Version Packages" PR
5. CI runs again — no pending changesets, so it runs `release` and publishes to npm

The "Version Packages" PR is fully managed by the action. Do not manually edit `CHANGELOG.md` or the version numbers it touches.
