/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ContentHelperProvider from '../content-helper-provider';
import RelatedTopPostListItem from './related-top-post-list-item';
import { RelatedTopPostData } from '../models/related-top-post-data';
import { getDateInUserLang, SHORT_DATE_FORMAT } from '../../shared/utils/date';

const FETCH_RETRIES = 3;

/**
 * List of the related top posts.
 */
function RelatedTopPostList() {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState( null );
	const [ message, setMessage ] = useState<string>( null );
	const [ posts, setPosts ] = useState<RelatedTopPostData[]>( [] );

	useEffect( () => {
		const fetchPosts = async ( retries: number ) => {
			ContentHelperProvider.getRelatedTopPosts()
				.then( ( result ): void => {
					const mappedPosts: RelatedTopPostData[] = result.posts.map(
						( post: RelatedTopPostData ): RelatedTopPostData => (
							{
								...post,
								date: getDateInUserLang( new Date( post.date ), SHORT_DATE_FORMAT ),
							}
						)
					);

					setPosts( mappedPosts );
					setMessage( result.message );
					setLoading( false );
				} )
				.catch( async ( err ) => {
					if ( retries > 0 ) {
						await new Promise( ( r ) => setTimeout( r, 500 ) );
						await fetchPosts( retries - 1 );
					} else {
						setLoading( false );
						setError( err );
					}
				} );
		};

		setLoading( true );
		fetchPosts( FETCH_RETRIES );

		return (): void => {
			setLoading( false );
			setPosts( [] );
			setMessage( '' );
			setError( null );
		};
	}, [] );

	// Show error message or contact message.
	if ( error ) {
		// Errors that should be converted to a contact message.
		if ( error?.errors?.parsely_site_id_not_set ||
				error?.errors?.parsely_api_secret_not_set ) {
			return ContactUsMessage();
		}

		// Error coming from apiFetch.
		if ( error?.message ) {
			return <p className="parsely-top-posts-desc" data-testid="api-error">{ __( 'Error:', 'wp-parsely' ) } { error.message }</p>;
		}

		// Error coming from the WordPress REST API.
		const errorMessage = JSON.stringify( error ).match( /\[\"(.*?)\"\]/ )[ 1 ];
		return <p className="parsely-top-posts-desc" data-testid="wp-api-error">{ __( 'Error:', 'wp-parsely' ) } { errorMessage }</p>;
	}

	// Show related top posts list.
	const postList: JSX.Element = (
		<ol className="parsely-top-posts">
			{ posts.map( ( post: RelatedTopPostData ): JSX.Element => <RelatedTopPostListItem key={ post.id } post={ post } /> ) }
		</ol>
	);

	return (
		loading
			?	(
				<div className="parsely-spinner-wrapper" data-testid="parsely-spinner-wrapper">
					<Spinner />
				</div>
			)
			: (
				<div className="parsely-top-posts-wrapper">
					<p className="parsely-top-posts-desc" data-testid="parsely-top-posts-desc">{ message }</p>
					{ postList }
				</div>
			)
	);
}

/**
 * "Contact Us" component that we display in place of certain errors.
 */
function ContactUsMessage(): JSX.Element {
	return (
		<div className="parsely-contact-us parsely-top-posts-desc" data-testid="parsely-contact-us">
			<p>
				{ /* eslint-disable-next-line react/jsx-no-target-blank */ }
				<a href="https://www.parse.ly/contact" target="_blank" rel="noopener">
					{ __( 'Contact us', 'wp-parsely' ) + ' ' }
				</a>
				{ __( 'about advanced plugin features and the Parse.ly dashboard.', 'wp-parsely' ) }
			</p>
			<p>
				{ __(
					'Existing Parse.ly customers can enable this feature by setting their Site ID and API Secret in',
					'wp-parsely'
				) + ' ' }
				{ /* eslint-disable-next-line react/jsx-no-target-blank */ }
				<a href="/wp-admin/options-general.php?page=parsely" target="_blank" rel="noopener">
					{ __( 'wp-parsely options.', 'wp-parsely' ) }
				</a>
			</p>
		</div>
	);
}

export default RelatedTopPostList;
