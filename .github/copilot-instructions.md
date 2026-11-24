# n8n-nodes-trustmarkt – Copilot Instructions

## Project Overview

This is an **n8n Community Node** package (`n8n-nodes-trustmarkt`) that integrates with the **Trustmarkt API** (`https://api.trustmarkt.de/v1`). It provides a declarative-style action node and a webhook-based trigger node.

- **Package name:** `n8n-nodes-trustmarkt`
- **npm:** https://www.npmjs.com/package/n8n-nodes-trustmarkt
- **Repository:** https://github.com/Trustmarkt-GmbH/n8n-nodes-trustmarkt
- **License:** MIT (required for n8n verification)
- **Author:** Julius Maskow / Trustmarkt GmbH

---

## Release & Publish Process

### IMPORTANT: Provenance Requirement

Since **May 1st 2026**, n8n **requires** all community nodes to be published via a **GitHub Action** with an npm **provenance statement**. This means:

- You **MUST NOT** publish from your local machine via `npm publish` anymore.
- You **MUST** publish through the GitHub Actions workflow (`.github/workflows/publish.yml`).
- The provenance links the npm package back to the exact GitHub commit and build, proving the package wasn't tampered with.

### Step-by-Step Release Process

The release is a pushed version tag (`vX.Y.Z`); `.github/workflows/publish.yml` publishes it. There is no GitHub Release step anymore.

#### 1. Prepare the code and the changelog

```bash
npm run build
npm run lint
```

Both must pass with zero errors. Move the `[Unreleased]` entry in CHANGELOG.md to the new version and date, then commit everything. The working tree must be clean for the next step.

#### 2. Tag and push

```bash
# Choose one:
npm run release:patch   # 0.2.1 → 0.2.2 (bug fixes)
npm run release:minor   # 0.2.1 → 0.3.0 (new features)
npm run release:major   # 0.2.1 → 1.0.0 (breaking changes)
```

Each runs lint and build, then `npm version` (bumps package.json, commits `chore: release vX.Y.Z`, creates the tag `vX.Y.Z`) and `git push --follow-tags`.

Do not use `npm run release` (`n8n-node release`): with the installed @n8n/node-cli it regenerates CHANGELOG.md from commits and creates tags without the `v` prefix, which do not trigger the workflow.

#### 3. The workflow publishes

The tag push triggers `.github/workflows/publish.yml`, which:
- Checks that the tag matches the version in package.json
- Installs dependencies (`npm ci`)
- Runs `npm run lint` and `npm run build`
- Publishes with `npm publish --provenance --access public` (npm trusted publishing, or `NPM_TOKEN` as a fallback)

#### 4. Verify the publish

- Check the GitHub Actions tab for a green checkmark
- Check https://www.npmjs.com/package/n8n-nodes-trustmarkt for the new version
- The npm page should show a **"Provenance"** badge
- Run `npx @n8n/scan-community-package n8n-nodes-trustmarkt` against the published version

---

## GitHub Actions Workflows

### `.github/workflows/publish.yml` — Publish to npm

- **Trigger:** A pushed tag matching `v*.*.*`
- **Purpose:** Builds, lints, and publishes to npm with provenance
- **Authentication:** npm trusted publishing (OIDC, recommended by n8n) or the `NPM_TOKEN` secret as a fallback
- **Required permissions:** `id-token: write` (OIDC token for trusted publishing and provenance), `contents: read`
- **The file name must stay `publish.yml`**: the npm trusted publisher is bound to it
- **DO NOT DELETE this file** — it is required for n8n community node verification

### `.github/workflows/ci.yml` — Continuous Integration

- **Trigger:** On push to `main` and on pull requests
- **Purpose:** Runs lint and build to catch errors early

---

## n8n Verification Guidelines Checklist

When preparing for verification or making changes, ensure ALL of these are met:

### Package Requirements
- [ ] Package name starts with `n8n-nodes-`
- [ ] `n8n-community-node-package` is in `keywords` in package.json
- [ ] `n8n` attribute in package.json lists all credentials and nodes
- [ ] License is MIT
- [ ] No runtime `dependencies` in package.json (only `devDependencies` and `peerDependencies`)
- [ ] `repository.url` in package.json points to the correct **public** GitHub repo
- [ ] Author/maintainer matches between npm account and GitHub

### Code Requirements
- [ ] TypeScript is used
- [ ] Linter passes: `npm run lint` (zero errors)
- [ ] Security scanner passes: `npx @n8n/scan-community-package n8n-nodes-trustmarkt`
- [ ] No access to environment variables (`process.env`)
- [ ] No file system access (`fs` module)
- [ ] All data flows through node parameters
- [ ] `NodeConnectionTypes.Main` is used instead of string `'main'` for inputs/outputs
- [ ] `usableAsTool: true` is set on action nodes only — never on trigger nodes (n8n review rejects it there)
- [ ] Icons provide `light` and `dark` variants (`trustmarkt.svg` / `trustmarkt-dark.svg`)
- [ ] Codex category is `Marketing & Content` (the only recognised marketing category)

### Documentation Requirements
- [ ] README.md exists with usage instructions, authentication details, and examples
- [ ] CHANGELOG.md is maintained
- [ ] All node interface text and documentation is in **English only**

### Publishing Requirements
- [ ] Published via GitHub Actions with `--provenance` flag
- [ ] npm trusted publisher (GitHub Actions, workflow `publish.yml`) is set up, or the `NPM_TOKEN` secret as a fallback
- [ ] GitHub repo is **public**

### Verification Submission
- [ ] All automated checks pass
- [ ] Submit at https://creators.n8n.io/nodes

---

## Project Structure

```
n8n-nodes-trustmarkt/
├── .github/
│   ├── copilot-instructions.md    ← This file (AI instructions)
│   └── workflows/
│       ├── ci.yml                 ← CI on push/PR
│       └── publish.yml            ← Publish to npm with provenance
├── credentials/
│   └── TrustmarktApi.credentials.ts   ← API key (Bearer token) auth
├── nodes/Trustmarkt/
│   ├── Trustmarkt.node.ts         ← Main declarative node (9 resources)
│   ├── Trustmarkt.node.json       ← Codex metadata (categories, aliases)
│   ├── TrustmarktTrigger.node.ts  ← Webhook trigger node
│   ├── TrustmarktTrigger.node.json
│   ├── resources/                 ← Resource operations (article, caseStudy, etc.)
│   └── shared/                    ← Shared transport & description helpers
├── icons/                         ← Node icons (SVG)
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── LICENSE                        ← MIT License (required!)
├── CHANGELOG.md
└── README.md
```

---

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Compile TypeScript to dist/ |
| `npm run lint` | Run n8n linter |
| `npm run lint:fix` | Auto-fix linter issues |
| `npm run dev` | Start local n8n with this node loaded |
| `npm run release:patch` / `release:minor` / `release:major` | Bump, tag `vX.Y.Z` and push; the publish workflow does the rest |
| `npx @n8n/scan-community-package n8n-nodes-trustmarkt` | Run security scanner |

---

## API Details

- **Base URL:** `https://api.trustmarkt.de/v1`
- **Auth:** Bearer token (API key in header `Authorization: Bearer <token>`)
- **Credential test:** `GET /me` endpoint
- **Resources:** Article, Case Study, Inquiry, Lead, Me, Resource (lead magnet), Review, Review Collector, User
- **Dropdown lists:** `GET /industries` (case study customer industry), `GET /article-categories` (article category), loaded by `shared/listSearch.ts`
- **Trigger:** Webhooks registered via API (`POST /webhooks`, `DELETE /webhooks/{id}`)

---

## Things That Cannot Be Done by AI (Manual Steps)

These steps require human action in external systems:

1. **npm Account:** You need an npm account at https://www.npmjs.com. The account/org name should match the package author.

2. **npm trusted publisher (recommended):** On npmjs.com open the package `n8n-nodes-trustmarkt` → Settings → Trusted Publisher → GitHub Actions:
   - Organization or user: `Trustmarkt-GmbH`
   - Repository: `n8n-nodes-trustmarkt`
   - Workflow filename: `publish.yml`
   - Environment: leave empty

3. **npm token (only if not using a trusted publisher):** Create a granular access token on npmjs.com with read and write access to the package and add it as the repository secret `NPM_TOKEN` (Repository → Settings → Secrets and variables → Actions). Remove an old `NPM_TOKEN` secret once the trusted publisher works.

4. **Public Repository:** The GitHub repo MUST be public for verification.

5. **Creator Portal Submission:** Submit at https://creators.n8n.io/nodes after publishing.

6. **Never `npm publish` locally:** packages published from a local machine have no provenance and are not accepted by n8n. Always push a version tag (`npm run release:*`).
