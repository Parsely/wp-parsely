/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ContentHelperError } from '../../common/content-helper-error';
import { PostData } from '../../common/utils/post';
import { RelatedTopPostListItem } from './component-list-item';
import { RelatedTopPostsProvider } from './provider';

const FETCH_RETRIES = 1;

/**
 * Defines the props structure for RelatedTopPostList.
 *
 * @since 3.11.0
 */
interface RelatedTopPostListProps {
	period: string;
	metric: string;
}

/**
 * List of the related top posts.
 *
 * @param {RelatedTopPostListProps} props The component's props.
 */
export function RelatedTopPostList( { period, metric } : RelatedTopPostListProps ) {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState<ContentHelperError>();
	const [ message, setMessage ] = useState<string>();
	const [ posts, setPosts ] = useState<PostData[]>( [] );

	useEffect( () => {
		const fetchPosts = async ( retries: number ) => {
			RelatedTopPostsProvider.getRelatedTopPosts( period, metric )
				.then( ( result ): void => {
					setPosts( result.posts );
					setMessage( result.message );
					setLoading( false );
				} )
				.catch( async ( err ) => {
					if ( retries > 0 && err.retryFetch ) {
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
			setError( undefined );
		};
	}, [ period, metric ] );

	// Show error message.
	if ( error ) {
		return error.Message( { className: 'parsely-top-posts-descr' } );
	}

	// Show related top posts list.
	const postList: JSX.Element = (
		<ol className="parsely-top-posts">
			{ posts.map( ( post: PostData ): JSX.Element =>
				<RelatedTopPostListItem key={ post.id } metric={ metric } post={ post } />
			) }
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
					<p className="parsely-top-posts-descr" data-testid="parsely-top-posts-descr">{ message }</p>
					{ postList }
				</div>
			)
	);
}
