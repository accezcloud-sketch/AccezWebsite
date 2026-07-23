/**
 * External Accez platform URLs.
 *
 * Centralised so the marketing site can be pointed at staging without hunting
 * through components. Staging equivalent:
 *   PORTAL_SIGN_UP -> https://stage.accez.cloud/sign-up
 *
 * NOTE: the customer-facing booking site (sp.accez.cloud/business) is
 * deliberately NOT linked from this website — it is for customers booking
 * services, not for people signing up. Every CTA here goes to the sign-up
 * page instead.
 */

/**
 * Sign-up entry point for the platform. The page shows two account cards —
 * "Property Manager" and "Service Provider" — and picking Service Provider
 * creates a service provider account.
 */
export const PORTAL_SIGN_UP = 'https://portal.accez.cloud/sign-up'

/** Property manager portal (existing product). */
export const PORTAL = 'https://portal.accez.cloud'
