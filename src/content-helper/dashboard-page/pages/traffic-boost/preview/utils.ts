/**
 * Internal dependencies
 */
import { TrafficBoostLink } from '../provider';

/**
 * Checks if a URL is external.
 *
 * @since 3.18.0
 *
 * @param {TrafficBoostLink} link The link to check.
 *
 * @return {boolean} True if the URL is external, false otherwise.
 */
export const isExternalURL = ( link: TrafficBoostLink ): boolean => {
	try {
		const urlToCheck = new URL( link.targetPost.guid.raw );
		const currentURL = new URL( window.location.href );

		return urlToCheck.hostname !== currentURL.hostname;
	} catch ( e ) {
		// If URL parsing fails, consider it external for safety.
		return true;
	}
};
