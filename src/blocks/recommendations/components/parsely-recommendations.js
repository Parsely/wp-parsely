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
	layoutstyle,
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

	if ( error ) {
		return false;
	}

	if ( isLoaded && ! recommendations.length ) {
		if ( isEditMode ) {
			// This will only show on the back end / editor as a hint the block will not actually render anything.
			return __( 'No recommendations found.', 'wp-parsely' );
		}
		// Don't render anything on the frontend if data is loaded and there is no data.
		return false;
	}

	return (
		<>
			<ParselyRecommendationsFetcher
				boost={ boost }
				limit={ limit }
				personalized={ personalized }
				sort={ sort }
			/>
			{ ! isLoaded && (
				<span className="parsely-recommendations__loading">{ __( 'Loading…', 'wp-parsely' ) }</span>
			) }
			{ isLoaded && !! recommendations?.length && (
				<>
					<ParselyRecommendationsTitle title={ title } />
					<ParselyRecommendationsList
						imagestyle={ imagestyle }
						layoutstyle={ layoutstyle }
						recommendations={ recommendations }
						showimages={ showimages }
					/>
				</>
			) }
		</>
	);
}
