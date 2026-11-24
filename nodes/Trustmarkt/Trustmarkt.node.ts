/**
 * Trustmarkt Node for n8n
 *
 * This is the main node file that defines the Trustmarkt integration.
 * It uses a declarative approach with routing for API requests.
 *
 * ARCHITECTURE:
 * ─────────────────────────────────────────────────────────────────
 *   Trustmarkt.node.ts (this file)
 *         │
 *         ├── resources/           ← Resource-specific operations
 *         │     ├── article/         ← Articles (create, get, list, start AI generation, update)
 *         │     ├── caseStudy/       ← Case studies (create, get, list, start AI generation, update)
 *         │     ├── inquiry/         ← Inquiries (list, get)
 *         │     ├── lead/            ← Leads of resources / lead magnets (list, get)
 *         │     ├── me/              ← Authenticated user (get)
 *         │     ├── resource/        ← Resources / lead magnets (list, get)
 *         │     ├── review/          ← Reviews (list, get)
 *         │     ├── reviewCollector/ ← Review collector leaderboard (list)
 *         │     └── user/            ← Users (list, get)
 *         │
 *         └── shared/              ← Shared utilities
 *               ├── aiGeneration.ts  ← Fields of "Start AI Generation"
 *               ├── listSearch.ts    ← "From List" choices (industries, article categories)
 *               └── transport.ts     ← API request and error helpers
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW RESOURCE:
 * 1. Create a new folder under resources/ (e.g., resources/user/)
 * 2. Create operation files (e.g., list.ts, get.ts)
 * 3. Create an index.ts that exports the description
 * 4. Import and add to resourceOptions and properties below
 */

import {
    NodeConnectionTypes,
    type INodeType,
    type INodeTypeDescription,
} from 'n8n-workflow';

import { searchArticleCategories, searchIndustries } from './shared/listSearch';

// Import resource descriptions
import { articleOperations, articleFields } from './resources/article';
import { caseStudyOperations, caseStudyFields } from './resources/caseStudy';
import { inquiryOperations, inquiryFields } from './resources/inquiry';
import { leadOperations, leadFields } from './resources/lead';
import { meOperations, meFields } from './resources/me';
import { resourceOperations, resourceFields } from './resources/resource';
import { reviewOperations, reviewFields } from './resources/review';
import { reviewCollectorOperations, reviewCollectorFields } from './resources/reviewCollector';
import { userOperations, userFields } from './resources/user';

/**
 * Available resources in the Trustmarkt API
 * Resources are sorted alphabetically as per n8n UX guidelines
 */
const resourceOptions = [
    {
        name: 'Article',
        value: 'article',
        description: 'Manage articles on your profile',
    },
    {
        name: 'Case Study',
        value: 'caseStudy',
        description: 'Manage case studies on your profile',
    },
    {
        name: 'Inquiry',
        value: 'inquiry',
        description: 'Manage incoming inquiries from potential customers',
    },
    {
        name: 'Lead',
        value: 'lead',
        description: 'Manage leads that signed up for your resources (lead magnets)',
    },
    {
        name: 'Me',
        value: 'me',
        description: 'Get information about the authenticated user',
    },
    {
        name: 'Resource',
        value: 'resource',
        description: 'Manage resources (lead magnets) on your profile',
    },
    {
        name: 'Review',
        value: 'review',
        description: 'Manage reviews on your Trustmarkt profile',
    },
    {
        name: 'Review Collector',
        value: 'reviewCollector',
        description: 'Leaderboard of team members and the reviews they collected via personal review links',
    },
    {
        name: 'User',
        value: 'user',
        description: 'Manage users in your company',
    },
];

export class Trustmarkt implements INodeType {
    description: INodeTypeDescription = {
        // ══════════════════════════════════════════════════════════════
        // NODE METADATA
        // ══════════════════════════════════════════════════════════════
        displayName: 'Trustmarkt',
        name: 'trustmarkt',
        icon: { light: 'file:trustmarkt.svg', dark: 'file:trustmarkt-dark.svg' },
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with the Trustmarkt API to manage reviews, leads, resources, users, articles, case studies, and more',

        defaults: {
            name: 'Trustmarkt',
        },

        // ══════════════════════════════════════════════════════════════
        // CONNECTIONS
        // ══════════════════════════════════════════════════════════════
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        usableAsTool: true,

        // ══════════════════════════════════════════════════════════════
        // CREDENTIALS
        // ══════════════════════════════════════════════════════════════
        credentials: [
            {
                name: 'trustmarktApi',
                required: true,
            },
        ],

        // ══════════════════════════════════════════════════════════════
        // REQUEST DEFAULTS
        // ══════════════════════════════════════════════════════════════
        requestDefaults: {
            baseURL: 'https://api.trustmarkt.de/v1',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },

        // ══════════════════════════════════════════════════════════════
        // PROPERTIES (UI FIELDS)
        // ══════════════════════════════════════════════════════════════
        properties: [
            // ─────────────────────────────────────────────────────────────
            // Resource Selection
            // ─────────────────────────────────────────────────────────────
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: resourceOptions,
                default: 'review',
            },

            // ─────────────────────────────────────────────────────────────
            // Resource-specific operations and fields
            // Resources sorted alphabetically as per n8n UX guidelines
            // ─────────────────────────────────────────────────────────────
            ...articleOperations,
            ...articleFields,

            ...caseStudyOperations,
            ...caseStudyFields,

            ...inquiryOperations,
            ...inquiryFields,

            ...leadOperations,
            ...leadFields,

            ...meOperations,
            ...meFields,

            ...resourceOperations,
            ...resourceFields,

            ...reviewOperations,
            ...reviewFields,

            ...reviewCollectorOperations,
            ...reviewCollectorFields,

            ...userOperations,
            ...userFields,
        ],
    };

    // ══════════════════════════════════════════════════════════════
    // METHODS ("From List" choices of resource locators)
    // ══════════════════════════════════════════════════════════════
    methods = {
        listSearch: {
            searchArticleCategories,
            searchIndustries,
        },
    };
}
