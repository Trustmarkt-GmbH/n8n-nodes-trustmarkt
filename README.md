# n8n-nodes-trustmarkt

This is an n8n community node. It lets you use the [Trustmarkt](https://trustmarkt.de) API in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Trustmarkt Node

- **Article**
    - Create an article draft (title, optional Markdown content, author, category from a list, thumbnail alt text)
    - Get an article
    - Get many articles
    - Start AI generation for an article (from a YouTube video or a text)
    - Update an article (draft or rejected articles only)
- **Case Study**
    - Create a case study draft (title, optional customer name)
    - Get a case study
    - Get many case studies
    - Start AI generation for a case study (from a YouTube video or a text)
    - Update a case study (texts as Markdown, customer details, customer industry from a list, dates, 'Is Ongoing', sections, tags)
- **Inquiry**
    - Get an inquiry
    - Get many inquiries
- **Lead**
    - Get a lead
    - Get many leads (optionally filtered by resource)
- **Me**
    - Get authenticated user info
- **Resource** (lead magnet)
    - Get a resource
    - Get many resources
- **Review**
    - Get a review
    - Get many reviews
- **Review Collector**
    - Get many review collectors (leaderboard of team members and the reviews they collected via their personal review link within a date range)
- **User**
    - Get a user
    - Get many users

Article and case study outputs include `ai_generation` (`status`: `none`, `running`, `completed` or `failed`, plus `source`, `started_at`, `completed_at`, `failed_at` and `error`). Case studies also include `is_ongoing` (the collaboration still runs, so there is no end date).

### Trustmarkt Trigger Node

Starts the workflow when Trustmarkt events occur via webhooks. Events are loaded dynamically from the API, so newly added events (e.g. `lead.created`, `lead.verified`, `resource.published`) are available without updating this package.

## Credentials

You need a Trustmarkt API key to authenticate.

1. Log in to your [Trustmarkt](https://trustmarkt.de) account.
2. Navigate to your API settings and generate an API key.
3. In n8n, create new **Trustmarkt API** credentials and paste your API key.

The credential is tested against `GET /me` when you save it.

## Usage

### Let the Trustmarkt AI write an article or case study

The AI generation runs in the background and usually takes two to three minutes, so the workflow starts it, waits, and then checks the result:

1. **Trustmarkt** → *Case Study* → *Create*: enter a **Title** (for an article: *Article* → *Create*). Rename this node to `Create Case Study`.
2. **Trustmarkt** → *Case Study* → *Start AI Generation*: set **Case Study ID** to `{{ $json.id }}`, pick the **Source**:
    - *YouTube Video*: the **YouTube URL** of the video, or
    - *Text*: an interview, notes or a transcript with **at least 100 words** (max 50,000 characters).
3. **Wait** node: about 3 minutes.
4. **Trustmarkt** → *Case Study* → *Get*: set **Case Study ID** to `{{ $('Create Case Study').item.json.id }}`.
5. **If** node on `{{ $json.ai_generation.status }}`:
    - `completed`: the draft is written; review and publish it in Trustmarkt.
    - `running`: loop back to the Wait node.
    - `failed`: `ai_generation.error` says why. Start the generation again (step 2). A generation that runs longer than 5 minutes counts as `failed`.

Only drafts can be written by the AI (for articles also rejected ones). The AI replaces the title and content of an article, and the texts, metrics and customer name of a case study.

### Limits and error messages

- A company can run at most **5 AI generations at the same time** (articles and case studies together) and has a **daily limit** shared with the Trustmarkt web app.
- A company can have at most **50 case study drafts** and **50 articles** in draft, submitted or rejected status.
- When Trustmarkt refuses a request, the node shows what happened and how to continue, the fields it rejected, and the API's own `message` and `reason` (`not_editable`, `already_running`, `too_many_running`, `daily_limit`, `start_failed`). Use the node setting *On Error → Continue* to handle these cases in the workflow.
- **Customer Industry** (case study) and **Category** (article) can be picked *From List* (loaded from `GET /industries` and `GET /article-categories`, the same choices as in the Trustmarkt web app) or entered *By ID*.
- Images (thumbnails, logos, images in the text), case study metrics and the linked review can only be changed in the Trustmarkt web app.

## Releasing (maintainers)

Releases are published to npm by the GitHub Actions workflow `.github/workflows/publish.yml` with an npm provenance statement, as n8n requires for community nodes. Never run `npm publish` locally.

1. Move the `[Unreleased]` entry in `CHANGELOG.md` to the new version and commit.
2. Run `npm run release:patch`, `npm run release:minor` or `npm run release:major`. This lints, builds, bumps the version, creates the tag `vX.Y.Z` and pushes it.
3. The tag push starts the workflow, which lints, builds and runs `npm publish --provenance --access public`.

## Compatibility

Compatible with n8n version 1.60.0 or later.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Trustmarkt API documentation](https://www.trustmarkt.de/r/api)
