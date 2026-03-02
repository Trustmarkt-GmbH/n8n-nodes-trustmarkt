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
    - Get an article
    - Get many articles
- **Case Study**
    - Get a case study
    - Get many case studies
- **Inquiry**
    - Get an inquiry
    - Get many inquiries
- **Me**
    - Get authenticated user info
- **Review**
    - Get a review
    - Get many reviews
- **User**
    - Get a user
    - Get many users

### Trustmarkt Trigger Node

Starts the workflow when Trustmarkt events occur via webhooks. Events are loaded dynamically from the API.

## Credentials

You need a Trustmarkt API key to authenticate.

1. Log in to your [Trustmarkt](https://trustmarkt.de) account.
2. Navigate to your API settings and generate an API key.
3. In n8n, create new **Trustmarkt API** credentials and paste your API key.

The node supports Production, Testing, and Custom API environments.

## Compatibility

Compatible with n8n version 1.60.0 or later.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Trustmarkt API documentation](https://www.trustmarkt.de/r/api)
