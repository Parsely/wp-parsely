/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Card, CardBody, CardMedia } from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { fetchRelated } from '../../../js/lib/parsely-api';

const getImageForLink = ( { imagestyle, imageUrl, thumbUrlMedium } ) => {
	if ( imagestyle === 'original' ) {
		return imageUrl;
	}
	return thumbUrlMedium;
};

export default function ParselyRecommendations( {
	boost,
	layoutstyle,
	limit,
	imagestyle,
	personalized,
	showimages,
	sortrecs,
	title,
} ) {
	const [ error, setError ] = useState( null );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ recommendations, setRecommendations ] = useState( [] );

	const uuid = window.PARSELY?.config?.uuid;
	const apiQueryArgs = {
		boost,
		limit,
		sort: sortrecs,
	};

	if ( personalized && uuid ) {
		apiQueryArgs.uuid = uuid;
	} else {
		apiQueryArgs.url = window.location.href;
	}

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

	const debouncedUpdate = useDebounce( async () => {
		await setIsLoaded( false );
		await fetchRecos();
	}, 250 );

	/**
	 * Fetch recommendations when an attribute changes that affects the API call.
	 * This happens in the Editor context when someone changes a setting.
	 */
	useEffect( () => {
		if ( ! isLoaded ) {
			return;
		}
		debouncedUpdate();
	}, [ boost, limit, personalized, sortrecs ] );

	if ( ! isLoaded ) {
		return <>Loading...</>; // TODO improve
	}

	if ( error ) {
		return <>{ error }</>; // TODO improve
	}

	if ( ! recommendations.length ) {
		return <>No recommendations :(</>; // TODO improve
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
					) => {
						const imageForLink =
							showimages && getImageForLink( { imagestyle, imageUrl, thumbUrlMedium } );

						return (
							<li key={ index }>
								<a href={ linkUrl } className="parsely-recommendations__link">
									<Card className="parsely-recommendations__card" size="custom">
										{ imageForLink && (
											<CardMedia className="parsely-recommendations__cardmedia">
												<img
													className="parsely-recommendations__list-img"
													src={ imageForLink }
													alt={ __( 'Image for link', 'wp-parsely' ) }
												/>
											</CardMedia>
										) }
										<CardBody className="parsely-recommendations__cardbody">{ linkTitle }</CardBody>
									</Card>
								</a>
							</li>
						);
					}
				) }
			</ul>
		</>
	);
}
