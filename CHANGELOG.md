# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Case Study → Create** (`POST /case-studies`): creates a case study draft from a `Title`, with `Customer Name` under *Additional Fields*. A company can have at most 50 drafts.
- **Case Study → Update** (`PUT /case-studies/{case_study}`): every field under *Update Fields*, sorted alphabetically: about section text, call to action text and title, customer industry, customer name and website, display title, start and end date (sent as `YYYY-MM-DD`), `Is Ongoing`, metrics title and summary, the problems/goals/results titles and their Markdown content, show about/video section, summary, tags (comma-separated, max 10; empty removes all), title, video link and video section title.
- **Article → Create** (`POST /articles`) and **Article → Update** (`PUT /articles/{article}`): title, Markdown content, author ID, category and thumbnail alt text.
- **Start AI Generation** for articles (`POST /articles/{article}/ai-generation`) and case studies (`POST /case-studies/{case_study}/ai-generation`): the Trustmarkt AI writes the draft from a YouTube video or a text (at least 100 words, checked before the request is sent). A notice explains the Wait → Get → check `ai_generation.status` flow.
- **Customer Industry** (Case Study → Update) and **Category** (Article → Create / Update) are resource locators: pick *From List* (loaded from the new `GET /industries` and `GET /article-categories` endpoints, searchable by name) or enter *By ID*. The parameter names `customerIndustryId` and `categoryId` stay the same; the node sends the `id`.
- README: usage example for the AI generation flow, limits and error messages, release steps.
- Publish workflow `.github/workflows/publish.yml` now runs on a pushed `v*.*.*` tag, checks the tag against `package.json`, lints, builds and publishes with `npm publish --provenance`, using npm trusted publishing (OIDC) or the `NPM_TOKEN` secret as a fallback, as in n8n-nodes-starter.

### Changed
- Article and case study outputs now carry the `ai_generation` object (`status`, `source`, `started_at`, `completed_at`, `failed_at`, `error`); case studies also carry `is_ongoing`. The declarative node passes them through unchanged.
- The new operations turn API error responses into English messages with a hint how to continue, list rejected fields of a validation response, and show the API's `message` and `reason` (e.g. `already_running`, `daily_limit`). A 429 for the daily limit is no longer reported as a batching issue.
- Replaced the `publish:patch|minor|major` scripts, which published from the local machine without provenance, with `release:patch|minor|major`: lint, build, `npm version` (commit and tag `vX.Y.Z`) and push with tags.
- The publish workflow no longer runs on a published GitHub Release.

### Fixed
- README no longer mentions API environments the credential does not have.

## [0.2.1] - 2026-09-04

### Fixed
- **[HIGH]** Removed `usableAsTool` from the Trustmarkt Trigger node — trigger nodes cannot be used as AI tools and the flag polluted the tool picker (n8n review feedback)
- **[HIGH]** The trigger's webhook `delete()` lifecycle method now logs an error when the Trustmarkt API call fails instead of swallowing it silently, so a webhook that stays active in Trustmarkt can be spotted and cleaned up
- **[LOW]** Codex category changed from the unrecognised `Marketing & Growth` to `Marketing & Content` in both node codex files
- **[LOW]** Icons now provide `light` and `dark` variants (`trustmarkt.svg` / `trustmarkt-dark.svg`) for the node, the trigger and the credentials

## [0.2.0] - 2026-09-04

### Added
- **Resource** resource (lead magnets) with `Get` and `Get Many` operations (`GET /resources`, `GET /resources/{resource}`). Both support the `Version` option (`draft` / `public`) to control which version the content fields are taken from.
- **Lead** resource with `Get` and `Get Many` operations (`GET /leads`, `GET /leads/{lead}`). `Get Many` can be filtered by `Resource ID`; both support expanding the `resource` the lead signed up for.
- **Review Collector** resource with `Get Many` operation (`GET /review-collectors`): a leaderboard of team members and the reviews they collected through their personal review link within a `From` / `To` date window (defaults to the current month). Supports expanding the collector into the full `user` representation. Restricted to company owners whose plan includes personal review links.
- `Collected By` expand option on `Review → Get` and `Review → Get Many` (`expand=collectedBy`).

### Changed
- The Trustmarkt Trigger already loads its events dynamically, so the new webhook events `lead.created`, `lead.verified`, `resource.created`, `resource.published`, `resource.unpublished` and `resource.deleted` are available in the event picker without further changes.

## [0.1.6] - 2026-05-19

### Changed
- User responses now include the new `email_hashed` field returned by the Trustmarkt API. Affects the outputs of `User → Get`, `User → Get Many` and `Me → Get`. The declarative node passes the field through automatically — no workflow changes required, but downstream nodes can now consume `email_hashed` (e.g. for Gravatar lookups or privacy-preserving identity matching).

## [0.1.5] - 2026-04-10

### Fixed
- **[HIGH]** Webhook `create()` method now throws `NodeApiError` instead of silently returning `false` on failure
- **[HIGH]** Webhook `delete()` method now cleans up static data (`webhookId`, `webhookSecret`) in a `finally` block so stale data never prevents re-registration
- **[MEDIUM]** `getWebhookEvents()` load options now throws `NodeApiError` instead of returning an empty array on failure
- **[MEDIUM]** Removed unsupported `subcategories` field from both node codex files

### Removed
- Unused re-export file `resources/review/review.operations.ts`
- Unused shared field descriptions file `shared/descriptions.ts`
- Unused `trustmarktApiRequest()` and `trustmarktApiRequestAllItems()` exports from `shared/transport.ts`

## [0.1.2] - 2025-12-01

### Added
- Article resource with Get and Get Many operations
- Case Study resource with Get and Get Many operations
- Inquiry resource with Get and Get Many operations
- Me resource with Get operation
- User resource with Get and Get Many operations

## [0.1.1] - 2025-11-15

### Fixed
- Minor bug fixes and improvements

## [0.1.0] - 2025-11-01

### Added
- Initial release
- Trustmarkt node with Review resource (Get, Get Many)
- Trustmarkt Trigger node with dynamic webhook event loading
- Trustmarkt API credentials with API key authentication
