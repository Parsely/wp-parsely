/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useDebounce } from '@wordpress/compose';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { fetchRelated } from '../../../js/lib/parsely-api';
import ParselyRecommendationsListItem from './parsely-recommendations-list-item';

export default function ParselyRecommendations( {
	boost,
	layoutstyle,
	limit,
	imagestyle,
	personalized,
	showimages,
	sort,
	title,
} ) {
	const [ error, setError ] = useState( null );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ recommendations, setRecommendations ] = useState( [] );

	const uuid = window.PARSELY?.config?.uuid;
	const apiQueryArgs = {
		boost,
		limit,
		sort,
	};

	if ( personalized && uuid ) {
		apiQueryArgs.uuid = uuid;
	} else {
		apiQueryArgs.url = window.location.href;
	}

	const apiMemoProps = [ ...Object.values( apiQueryArgs ), error ];

	async function fetchRecosFromWpApi() {
		return apiFetch( {
			path: addQueryArgs( '/wp-parsely/v1/recommendations', apiQueryArgs ),
		} );
	}

	async function fetchRecos() {
		// TODO before landing: Attempt to cache in localStorage keyed on attributes
		let response;
		try {
			response = await fetchRelated( apiQueryArgs );
		} catch ( parselyError ) {
			try {
				response = await fetchRecosFromWpApi();
			} catch ( wpError ) {
				setError( wpError );
			}
		}

		const data = response?.data || [];
		setIsLoaded( true );
		setRecommendations( data );
	}

	// Fetch recommendations on mount (useEffect w/ an empty dependency array ~ `componentDidMount`).
	useEffect( () => {
		fetchRecos();
	}, [] );

	const updateRecosWhenPropsChange = useCallback( fetchRecos, apiMemoProps );

	const debouncedUpdate = useDebounce( updateRecosWhenPropsChange, 300 );

	/**
	 * Fetch recommendations when an attribute changes that affects the API call.
	 * This happens in the Editor context when someone changes a setting.
	 */
	useEffect( () => {
		if ( ! isLoaded ) {
			return;
		}
		debouncedUpdate();
	}, apiMemoProps );

	if ( ! isLoaded ) {
		// TODO improve
		return <span className="parsely-recommendations__loading">{ __( 'Loading…', 'wp-parsely' ) }</span>;
	}

	if ( error ) {
		return false;
	}

	if ( ! recommendations.length ) {
		return false;
	}

	const classNames = `parsely-recommendations__ul parsely-recommendations__ul-${ layoutstyle }`;

	return (
		<>
			{ title && <p className="parsely-recommendations__list-title">{ title }</p> }
			<ul className={ classNames }>
				{ recommendations.map(
					(
						{
							title: linkTitle,
							url: linkUrl,
							image_url: imageUrl,
							thumb_url_medium: thumbUrlMedium,
						},
						index
					) => (
						<ParselyRecommendationsListItem
							imagestyle={ imagestyle }
							imageUrl={ imageUrl }
							thumbUrlMedium={ thumbUrlMedium }
							imageAlt={ __( 'Image for link', 'wp-parsely' ) }
							key={ index }
							linkTitle={ linkTitle }
							linkUrl={ linkUrl }
							showimages={ showimages }
						/>
					)
				) }
			</ul>
		</>
	);
}
