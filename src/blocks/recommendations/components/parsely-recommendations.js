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
import { setLoaded } from '../actions';
import { useRecommendationsStore } from '../recommendations-store';
import { maybeDecodeJSON } from '../utils';

export default function ParselyRecommendations( {
	boost,
	layoutstyle,
	limit,
	imagestyle,
	isEditMode,
	personalized,
	saveresults,
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
		if ( saveresults && savedresults?.length ) {
			dispatch( setLoaded() );
		}
	}, [ saveresults, savedresults ] );

	if ( error ) {
		return false;
	}

	const _recommendations = saveresults ? decodedSavedResults : recommendations;

	if ( isLoaded && ! _recommendations.length ) {
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
				saveresults={ saveresults }
				sort={ sort }
			/>
			{ ! isLoaded && (
				<span className="parsely-recommendations__loading">{ __( 'Loading…', 'wp-parsely' ) }</span>
			) }
			{ isLoaded && !! _recommendations?.length && (
				<>
					<ParselyRecommendationsTitle title={ title } />
					<ParselyRecommendationsList
						imagestyle={ imagestyle }
						layoutstyle={ layoutstyle }
						recommendations={ saveresults ? decodedSavedResults : recommendations }
						showimages={ showimages }
					/>
				</>
			) }
		</>
	);
}
