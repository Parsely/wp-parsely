/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ParselyRecommendationsFetcher from './parsely-recommendations-fetcher';
import ParselyRecommendationsList from './parsely-recommendations-list';
import ParselyRecommendationsTitle from './parsely-recommendations-title';
import { useRecommendationsStore } from '../recommendations-store';
import { maybeDecodeJSON } from '../utils';

export default function ParselyRecommendations( {
	boost,
	layoutstyle,
	limit,
	imagestyle,
	personalized,
	savedresults,
	showimages,
	sort,
	title,
} ) {
	const {
		state: { error, isLoaded, recommendations },
		dispatch,
	} = useRecommendationsStore();

	const decodedSavedResults = maybeDecodeJSON( savedresults ) || [];

	useEffect( () => {
		if ( ! decodedSavedResults.length ) {
			return;
		}
		dispatch( { type: 'RECOMMENDATIONS', recommendations: decodedSavedResults } );
	}, [ savedresults ] );

	if ( error ) {
		return false;
	}

	return (
		<>
			{ ! decodedSavedResults.length && (
				<ParselyRecommendationsFetcher
					boost={ boost }
					limit={ limit }
					personalized={ personalized }
					sort={ sort }
				/>
			) }
			{ ! isLoaded && (
				<span className="parsely-recommendations__loading">{ __( 'Loading…', 'wp-parsely' ) }</span>
			) }
			{ isLoaded && recommendations.length && (
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
