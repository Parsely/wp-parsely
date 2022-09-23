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

const FETCH_RETRIES = 3;

function RelatedTopPostList() {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState( null );
	const [ message, setMessage ] = useState<string>( null );
	const [ posts, setPosts ] = useState<RelatedTopPostData[]>( [] );

	useEffect( () => {
		const fetchPosts = async ( retries: number ) => {
			ContentHelperProvider.getRelatedTopPosts()
				.then( ( result ) => {
					setPosts( result.posts );
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
	}, [] );

	if ( error ) {
		if ( error?.message ) {
			return <p>{ __( 'Error:', 'wp-parsely' ) } { error.message }</p>;
		}

		const errorMessage = JSON.stringify( error ).match( /\[\"(.*?)\"\]/ )[ 1 ];
		return <p>{ __( 'Error:', 'wp-parsely' ) } { errorMessage }</p>;
	}

	const postList = posts.map( ( post ) => <RelatedTopPostListItem key={ post.id } post={ post } /> );
	return (
		<>
			<p>{ message }</p>
			{ loading ? <Spinner /> : postList }
		</>
	);
}

export default RelatedTopPostList;
