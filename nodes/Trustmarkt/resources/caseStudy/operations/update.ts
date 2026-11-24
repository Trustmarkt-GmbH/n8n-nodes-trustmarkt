/**
 * Update Case Study Operation
 *
 * Changes a case study of the authenticated user's company. Only the fields
 * added under "Update Fields" are sent; all others stay as they are.
 * A published case study changes on its public page right away.
 *
 * API Endpoint: PUT /case-studies/{case_study}
 *
 * Parameters:
 * - case_study: The case study ID (required)
 * - Body: title, display_title, summary, customer_name, customer_website,
 *   customer_industry_id, start_date, end_date, is_ongoing, metrics_title,
 *   metrics_summary, problems_title, problems_content, goals_title,
 *   goals_content, results_title, results_content, cta_title, cta_text,
 *   video_link, show_video_section, video_section_title, show_about_section,
 *   about_section_text, tags (all optional)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { getListResourceLocator } from '../../../shared/listSearch';
import { handleTrustmarktApiError } from '../../../shared/transport';

/**
 * Condition to show fields only for update operation
 */
const showForUpdate = {
    resource: ['caseStudy'],
    operation: ['update'],
};

/**
 * Sends a date picker value as YYYY-MM-DD and an empty value as null
 */
const DATE_VALUE = '={{ $value ? String($value).slice(0, 10) : null }}';

/**
 * Note on the Markdown sections
 */
const MARKDOWN_NOTE =
    'Markdown (headings H2–H4, bold, italic, links, lists, dividers), max 50,000 characters. Replaces the whole section; HTML tags are removed.';

/**
 * Operation definition for the dropdown
 */
export const updateCaseStudyOperation: INodePropertyOptions = {
    name: 'Update',
    value: 'update',
    action: 'Update a case study',
    description: 'Change the texts, details and settings of a case study',
    routing: {
        request: {
            method: 'PUT',
            url: '=/case-studies/{{ $parameter.caseStudyId }}',
            ignoreHttpStatusErrors: true,
        },
        output: {
            postReceive: [handleTrustmarktApiError],
        },
    },
};

/**
 * Fields specific to the Update operation
 */
export const updateCaseStudyFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Case Study ID',
        name: 'caseStudyId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the case study to update',
        displayOptions: {
            show: showForUpdate,
        },
    },
    {
        displayName:
            'Images, metrics and the linked review can only be changed in the Trustmarkt web app. A published case study needs a summary, customer website, customer industry, start date and an end date (or \'Is Ongoing\').',
        name: 'updateNotice',
        type: 'notice',
        default: '',
        displayOptions: {
            show: showForUpdate,
        },
    },

    // ─────────────────────────────────────────────────────────────
    // Update Fields (only the added fields are sent)
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: showForUpdate,
        },
        // Fields are sorted alphabetically as per n8n guidelines
        options: [
            {
                displayName: 'About Section Text',
                name: 'aboutSectionText',
                type: 'string',
                default: '',
                typeOptions: {
                    rows: 4,
                },
                description: 'The text of the section about your company (150–500 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'about_section_text',
                    },
                },
            },
            {
                displayName: 'Call to Action Text',
                name: 'ctaText',
                type: 'string',
                default: '',
                placeholder: 'e.g. Tell us about your project, we answer within a day.',
                description: 'The text of the call to action at the end of the page (max 255 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'cta_text',
                    },
                },
            },
            {
                displayName: 'Call to Action Title',
                name: 'ctaTitle',
                type: 'string',
                default: '',
                placeholder: 'e.g. Want the same for your business?',
                description: 'The heading of the call to action at the end of the page (max 100 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'cta_title',
                    },
                },
            },
            getListResourceLocator({
                displayName: 'Customer Industry',
                name: 'customerIndustryId',
                description: 'The industry of the customer. Choose one from the list or enter its ID; leave empty to remove it.',
                searchListMethod: 'searchIndustries',
                placeholder: 'e.g. jKEvY5y1rbklGqJ9knoa',
                bodyProperty: 'customer_industry_id',
            }),
            {
                displayName: 'Customer Name',
                name: 'customerName',
                type: 'string',
                default: '',
                placeholder: 'e.g. Bäckerei Schmidt',
                description: 'The name of the customer (3–100 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'customer_name',
                    },
                },
            },
            {
                displayName: 'Customer Website',
                name: 'customerWebsite',
                type: 'string',
                default: '',
                placeholder: 'e.g. https://www.baeckerei-schmidt.de',
                description: 'The website of the customer (max 255 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'customer_website',
                    },
                },
            },
            {
                displayName: 'Display Title',
                name: 'displayTitle',
                type: 'string',
                default: '',
                placeholder: 'e.g. How Bäckerei Schmidt doubled its orders',
                description:
                    "The title shown on the public page (3–75 characters). Falls back to 'Title' when empty.",
                routing: {
                    send: {
                        type: 'body',
                        property: 'display_title',
                    },
                },
            },
            {
                displayName: 'End Date',
                name: 'endDate',
                type: 'dateTime',
                default: '',
                description:
                    "When the project ended, not in the future. Leave out when 'Is Ongoing' is on.",
                routing: {
                    send: {
                        type: 'body',
                        property: 'end_date',
                        value: DATE_VALUE,
                    },
                },
            },
            {
                displayName: 'Goals Content',
                name: 'goalsContent',
                type: 'string',
                default: '',
                typeOptions: {
                    rows: 5,
                },
                description: `The section about the goals as ${MARKDOWN_NOTE}`,
                routing: {
                    send: {
                        type: 'body',
                        property: 'goals_content',
                    },
                },
            },
            {
                displayName: 'Goals Title',
                name: 'goalsTitle',
                type: 'string',
                default: '',
                placeholder: 'e.g. What we wanted to reach',
                description: 'The heading of the section about the goals (max 100 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'goals_title',
                    },
                },
            },
            {
                displayName: 'Is Ongoing',
                name: 'isOngoing',
                type: 'boolean',
                default: false,
                description:
                    'Whether the collaboration with the customer still runs. When on, the end date is removed.',
                routing: {
                    send: {
                        type: 'body',
                        property: 'is_ongoing',
                    },
                },
            },
            {
                displayName: 'Metrics Summary',
                name: 'metricsSummary',
                type: 'string',
                default: '',
                placeholder: 'e.g. Six months after the launch.',
                description: 'A short text below the metrics heading (max 255 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'metrics_summary',
                    },
                },
            },
            {
                displayName: 'Metrics Title',
                name: 'metricsTitle',
                type: 'string',
                default: '',
                placeholder: 'e.g. Results in numbers',
                description: 'The heading above the metrics (max 80 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'metrics_title',
                    },
                },
            },
            {
                displayName: 'Problems Content',
                name: 'problemsContent',
                type: 'string',
                default: '',
                typeOptions: {
                    rows: 5,
                },
                description: `The section about the starting situation as ${MARKDOWN_NOTE}`,
                routing: {
                    send: {
                        type: 'body',
                        property: 'problems_content',
                    },
                },
            },
            {
                displayName: 'Problems Title',
                name: 'problemsTitle',
                type: 'string',
                default: '',
                placeholder: 'e.g. Where the bakery stood',
                description: 'The heading of the section about the starting situation (max 100 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'problems_title',
                    },
                },
            },
            {
                displayName: 'Results Content',
                name: 'resultsContent',
                type: 'string',
                default: '',
                typeOptions: {
                    rows: 5,
                },
                description: `The section about the results as ${MARKDOWN_NOTE}`,
                routing: {
                    send: {
                        type: 'body',
                        property: 'results_content',
                    },
                },
            },
            {
                displayName: 'Results Title',
                name: 'resultsTitle',
                type: 'string',
                default: '',
                placeholder: 'e.g. What came out of it',
                description: 'The heading of the section about the results (max 100 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'results_title',
                    },
                },
            },
            {
                displayName: 'Show About Section',
                name: 'showAboutSection',
                type: 'boolean',
                default: false,
                description: 'Whether the page shows the section about your company',
                routing: {
                    send: {
                        type: 'body',
                        property: 'show_about_section',
                    },
                },
            },
            {
                displayName: 'Show Video Section',
                name: 'showVideoSection',
                type: 'boolean',
                default: false,
                description: 'Whether the page shows the video section',
                routing: {
                    send: {
                        type: 'body',
                        property: 'show_video_section',
                    },
                },
            },
            {
                displayName: 'Start Date',
                name: 'startDate',
                type: 'dateTime',
                default: '',
                description: 'When the project started',
                routing: {
                    send: {
                        type: 'body',
                        property: 'start_date',
                        value: DATE_VALUE,
                    },
                },
            },
            {
                displayName: 'Summary',
                name: 'summary',
                type: 'string',
                default: '',
                typeOptions: {
                    rows: 3,
                },
                description: 'A short summary of the project (10–300 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'summary',
                    },
                },
            },
            {
                displayName: 'Tags',
                name: 'tags',
                type: 'string',
                default: '',
                placeholder: 'e.g. Branding, Online Shop',
                description:
                    'Comma-separated tags to group your case studies, e.g. for widgets (max 10 tags, 30 characters each). Replaces the current tags; leave empty to remove them all.',
                routing: {
                    send: {
                        type: 'body',
                        property: 'tags',
                        value: '={{ (Array.isArray($value) ? $value : String($value ?? "").split(",")).map(tag => String(tag).trim()).filter(tag => tag !== "") }}',
                    },
                },
            },
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
                placeholder: 'e.g. Rebranding for Bäckerei Schmidt',
                description: 'The internal title of the case study (3–100 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'title',
                    },
                },
            },
            {
                displayName: 'Video Link',
                name: 'videoLink',
                type: 'string',
                default: '',
                placeholder: 'e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                description: 'A link to a video on YouTube, Vimeo or Wistia (max 255 characters). Leave empty to remove the video.',
                routing: {
                    send: {
                        type: 'body',
                        property: 'video_link',
                    },
                },
            },
            {
                displayName: 'Video Section Title',
                name: 'videoSectionTitle',
                type: 'string',
                default: '',
                placeholder: 'e.g. The project in two minutes',
                description: 'The heading of the video section (max 85 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'video_section_title',
                    },
                },
            },
        ],
    },
];
