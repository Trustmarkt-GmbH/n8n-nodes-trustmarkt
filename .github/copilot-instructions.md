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

#### 1. Prepare the code

```bash
# Make sure everything is clean
npm run build
npm run lint
npx @n8n/scan-community-package n8n-nodes-trustmarkt
```

All three commands must pass with zero errors.

#### 2. Bump the version

```bash
# Choose one:
npm version patch   # 0.1.2 → 0.1.3 (bug fixes)
npm version minor   # 0.1.2 → 0.2.0 (new features)
npm version major   # 0.1.2 → 1.0.0 (breaking changes)
```

This updates `package.json` and creates a git tag.

#### 3. Update CHANGELOG.md

Add a new entry at the top of CHANGELOG.md with the new version number, date, and list of changes. Follow the existing format.

#### 4. Commit and push

```bash
git add -A
git commit -m "chore: release vX.Y.Z"
git push origin main --tags
```

#### 5. Create a GitHub Release

1. Go to https://github.com/Trustmarkt-GmbH/n8n-nodes-trustmarkt/releases
2. Click **"Draft a new release"**
3. Select the tag you just pushed (e.g., `v0.1.3`)
4. Set the title to the version (e.g., `v0.1.3`)
5. Add release notes (copy from CHANGELOG.md)
6. Click **"Publish release"**

This triggers the `.github/workflows/publish.yml` workflow which:
- Checks out the code
- Installs dependencies (`npm ci`)
- Runs `npm run build`
- Runs `npm run lint`
- Publishes to npm with `--provenance --access public`

#### 6. Verify the publish

- Check the GitHub Actions tab for a green checkmark
- Check https://www.npmjs.com/package/n8n-nodes-trustmarkt for the new version
- The npm page should show a **"Provenance"** badge

---

## GitHub Actions Workflows

### `.github/workflows/publish.yml` — Publish to npm

- **Trigger:** When a GitHub Release is published
- **Purpose:** Builds, lints, and publishes to npm with provenance
- **Required secret:** `NPM_TOKEN` (npm access token with publish permission)
- **Required permissions:** `id-token: write` (for provenance signing)
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
- [ ] `usableAsTool: true` is set on all nodes (required by linter)

### Documentation Requirements
- [ ] README.md exists with usage instructions, authentication details, and examples
- [ ] CHANGELOG.md is maintained
- [ ] All node interface text and documentation is in **English only**

### Publishing Requirements
- [ ] Published via GitHub Actions with `--provenance` flag
- [ ] `NPM_TOKEN` secret is configured in GitHub repository settings
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
| `npx @n8n/scan-community-package n8n-nodes-trustmarkt` | Run security scanner |

---

## API Details

- **Base URL:** `https://api.trustmarkt.de/v1`
- **Auth:** Bearer token (API key in header `Authorization: Bearer <token>`)
- **Credential test:** `GET /me` endpoint
- **Resources:** Article, Case Study, Inquiry, Lead, Me, Resource (lead magnet), Review, Review Collector, User
- **Trigger:** Webhooks registered via API (`POST /webhooks`, `DELETE /webhooks/{id}`)

---

## Things That Cannot Be Done by AI (Manual Steps)

These steps require human action in external systems:

1. **npm Account:** You need an npm account at https://www.npmjs.com. The account/org name should match the package author.

2. **npm Access Token:** Generate at https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Type: "Automation" (for CI/CD)
   - Must have **publish** permission

3. **GitHub Secret:** Add the npm token as a repository secret:
   - Go to: Repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: your npm automation token

4. **Public Repository:** The GitHub repo MUST be public for verification.

5. **Creator Portal Submission:** Submit at https://creators.n8n.io/nodes after publishing.

6. **npm `publish` scripts:** The `publish:patch/minor/major` scripts in package.json publish directly from local — these are for convenience during early development but should **NOT** be used once you need provenance. Always use the GitHub Release workflow instead.
