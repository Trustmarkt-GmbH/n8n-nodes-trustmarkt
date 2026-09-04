# Changelog

All notable changes to this project will be documented in this file.

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
