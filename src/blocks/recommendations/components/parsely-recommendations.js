/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ParselyRecommendationsFetcher from './parsely-recommendations-fetcher';
import ParselyRecommendationsList from './parsely-recommendations-list';
import ParselyRecommendationsTitle from './parsely-recommendations-title';
import { useRecommendationsStore } from '../recommendations-store';

export default function ParselyRecommendations( {
	boost,
	limit,
	imagestyle,
	isEditMode,
	personalized,
	showimages,
	sort,
	title,
} ) {
	const {
		state: { error, isLoaded, recommendations },
	} = useRecommendationsStore();

	function getErrorMessage() {
		let errorMessage = `${ __( 'Error:', 'wp-parsely' ) } ${ JSON.stringify( error ) }`;

		if ( errorMessage.includes( '{"errors":{"403":["Forbidden"]},"error_data":[]}' ) ) {
			errorMessage = __( 'Access denied. Please verify that your Site ID is valid.', 'wp-parsely' );
		} else if ( typeof error === 'object' && error?.code === 'rest_no_route' ) {
			errorMessage = __( 'The REST route is unavailable. To use it, wp_parsely_enable_related_api_proxy should be true.', 'wp-parsely' );
		} else if ( errorMessage.includes( '{"errors":{"http_request_failed":["A valid URL was not provided."]},"error_data":[]}' ) ) {
			errorMessage = __( 'The Parse.ly Recommendations API is not accessible. You may be offline.', 'wp-parsely' );
		}

		return errorMessage;
	}

	// Show error messages within the WordPress Block Editor when needed.
	let errorMessage;
	if ( isLoaded && isEditMode ) {
		if ( error ) {
			errorMessage = getErrorMessage();
		} else if ( Array.isArray( recommendations ) && ! recommendations?.length ) {
			errorMessage = __( 'No recommendations found.', 'wp-parsely' );
		}
	}

	return (
		<>
			<ParselyRecommendationsFetcher
				boost={ boost }
				limit={ limit }
				personalized={ personalized }
				sort={ sort }
				isEditMode={ isEditMode }
			/>
			{ ! isLoaded && (
				<span className="parsely-recommendations-loading">{ __( 'Loading…', 'wp-parsely' ) }</span>
			) }
			{ errorMessage && (
				<span className="parsely-recommendations-error">{ errorMessage }</span>
			) }
			{ isLoaded && !! recommendations?.length && (
				<>
					<ParselyRecommendationsTitle title={ title } />
					<ParselyRecommendationsList
						imagestyle={ imagestyle }
						recommendations={ recommendations }
						showimages={ showimages }
					/>
				</>
			) }
		</>
	);
}
