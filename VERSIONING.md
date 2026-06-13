# Versioning & Deployment Guide

> This document explains how to manage versions, releases, and npm deployments for `@aalokpatel/create-expresskit`.

---

## Table of Contents

- [Overview](#overview)
- [Semantic Versioning](#semantic-versioning)
- [Setup (One-Time)](#setup-one-time)
- [Development Workflow](#development-workflow)
- [Releasing a New Version](#releasing-a-new-version)
- [Branching Strategy](#branching-strategy)
- [Changelog Management](#changelog-management)
- [Hotfix Workflow](#hotfix-workflow)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project follows **Semantic Versioning (semver)** for npm releases and uses **Git tags** to mark every published version. The release flow is:

```
Code Changes → Git Commit → npm version bump → Build → npm publish → Git Push
```

**Package:** [`@aalokpatel/create-expresskit`](https://www.npmjs.com/package/@aalokpatel/create-expresskit)  
**Repository:** [`patelalok1309/create-expresskit`](https://github.com/patelalok1309/create-expresskit)  
**Usage:** `npx @aalokpatel/create-expresskit`

---

## Semantic Versioning

We follow the `MAJOR.MINOR.PATCH` format defined at [semver.org](https://semver.org).

| Version Part | When to Bump | Example | npm Command |
|---|---|---|---|
| **PATCH** | Bug fixes, typos, small internal changes | `1.0.0 → 1.0.1` | `npm version patch` |
| **MINOR** | New features, new prompts/options (backwards compatible) | `1.0.0 → 1.1.0` | `npm version minor` |
| **MAJOR** | Breaking changes, removed options, changed CLI behavior | `1.0.0 → 2.0.0` | `npm version major` |

### Examples

```
1.0.1  — Fixed typo in generated README template
1.1.0  — Added PostgreSQL support as a database option
1.2.0  — Added Prisma ORM support
2.0.0  — Removed JavaScript (JS-only) project support
```

---

## Setup (One-Time)

### 1. Configure Git identity

```bash
git config user.name "Your Name"
git config user.email "your-email@gmail.com"
```

### 2. Authenticate with npm

```bash
npm login
# Opens browser → log in with your npm account
```

Or use an **Automation Token** (recommended for repeated publishing):

```bash
# Generate token at: https://www.npmjs.com/settings/~/tokens
# Select: Classic → Automation
npm config set //registry.npmjs.org/:_authToken YOUR_NPM_TOKEN
```

### 3. Verify you're logged in

```bash
npm whoami
# Should print: aalokpatel
```

---

## Development Workflow

### Day-to-day development

```bash
# 1. Create a feature branch
git checkout -b feat/add-postgresql-support

# 2. Make your changes to src/ or templates/

# 3. Test locally
npm run dev

# 4. Build to verify no TypeScript errors
npm run build

# 5. Commit your changes
git add .
git commit -m "feat: add PostgreSQL support"

# 6. Push your branch
git push origin feat/add-postgresql-support
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/) for clear history:

| Prefix | Use For | Version Impact |
|--------|---------|---------------|
| `feat:` | New feature or option | MINOR |
| `fix:` | Bug fix | PATCH |
| `chore:` | Maintenance, dependency updates | PATCH |
| `docs:` | Documentation only | PATCH |
| `refactor:` | Code refactor, no behavior change | PATCH |
| `BREAKING CHANGE:` | Breaking change in footer | MAJOR |

```bash
# Examples
git commit -m "feat: add PostgreSQL as database option"
git commit -m "fix: resolve template generation error on Windows"
git commit -m "chore: update dependencies"
git commit -m "docs: update README installation instructions"

# Breaking change
git commit -m "feat!: remove yarn support

BREAKING CHANGE: yarn is no longer supported as a package manager option."
```

---

## Releasing a New Version

### Step 1 — Merge to main

Ensure all changes are merged to the `main` branch.

```bash
git checkout main
git pull origin main
git merge feat/your-feature-branch
```

### Step 2 — Bump the version

`npm version` automatically:
- Updates `version` in `package.json`
- Creates a git commit with the message `vX.Y.Z`
- Creates a git tag `vX.Y.Z`

```bash
# For a bug fix
npm version patch

# For a new feature
npm version minor

# For a breaking change
npm version major
```

### Step 3 — Build

```bash
npm run build
```

Ensure there are **no TypeScript errors** before proceeding.

### Step 4 — Publish to npm

```bash
npm publish --access public
```

### Step 5 — Push code + tags to GitHub

```bash
# --follow-tags pushes the version tag (e.g. v1.1.0) along with commits
git push --follow-tags origin main
```

### Full Release — One Reference Block

```bash
# Make sure you're on main with clean working tree
git checkout main
git pull origin main

# Bump version (choose one)
npm version patch   # or minor / major

# Build
npm run build

# Publish to npm
npm publish --access public

# Push everything to GitHub
git push --follow-tags origin main
```

---

## Branching Strategy

```
main          ← production-ready, published releases only
  └── feat/   ← new features
  └── fix/    ← bug fixes
  └── chore/  ← maintenance tasks
  └── docs/   ← documentation updates
```

### Branch naming convention

```bash
feat/add-postgresql-support
fix/windows-path-resolution
chore/update-dependencies
docs/improve-versioning-guide
hotfix/critical-template-bug
```

> **Rule:** Never commit directly to `main`. Always work on a branch and merge.

---

## Changelog Management

Maintain a `CHANGELOG.md` at the root of the project. Update it **before every release**.

### Format

```markdown
# Changelog

## [1.1.0] - 2026-06-20
### Added
- PostgreSQL support as a database option
- Prisma ORM integration

### Fixed
- Windows path resolution bug in template generator

## [1.0.1] - 2026-06-14
### Fixed
- TypeScript declaration error for validate-npm-package-name

## [1.0.0] - 2026-06-13
### Added
- Initial release
- Express.js scaffolding with TypeScript/JavaScript support
- MongoDB, Redis, Docker options
- Interactive CLI prompts
```

---

## Hotfix Workflow

For critical bugs on a live release:

```bash
# 1. Branch off main (which is at the broken version)
git checkout main
git pull origin main
git checkout -b hotfix/critical-template-bug

# 2. Fix the bug
# ... make changes ...

# 3. Commit the fix
git commit -m "fix: resolve critical template generation crash"

# 4. Merge back to main
git checkout main
git merge hotfix/critical-template-bug

# 5. Release as patch
npm version patch
npm run build
npm publish --access public
git push --follow-tags origin main

# 6. Clean up
git branch -d hotfix/critical-template-bug
```

---

## Troubleshooting

### ❌ `403 Forbidden` on publish

```bash
# Re-authenticate
npm login

# Or re-set your automation token
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN
```

### ❌ `You cannot publish over the previously published versions`

You tried to publish the same version twice. Bump the version first:

```bash
npm version patch
npm run build
npm publish --access public
```

### ❌ TypeScript build errors

```bash
npm run build
# Fix all reported errors before publishing
```

### ❌ `dist/` is missing in the published package

Check `package.json` has `"files": ["dist", "templates"]` and that you ran `npm run build` before publishing.

### ❌ Forgot to push tags

```bash
# Push all tags manually
git push origin --tags
```

---

## Quick Reference Card

```bash
# Bug fix release
git commit -m "fix: ..."
npm version patch
npm run build
npm publish --access public
git push --follow-tags origin main

# Feature release
git commit -m "feat: ..."
npm version minor
npm run build
npm publish --access public
git push --follow-tags origin main

# Check current version
node -e "console.log(require('./package.json').version)"

# List all published versions
npm view @aalokpatel/create-expresskit versions

# Check who's logged into npm
npm whoami
```

---

*Maintained by [Aalok Patel](https://github.com/patelalok1309)*
