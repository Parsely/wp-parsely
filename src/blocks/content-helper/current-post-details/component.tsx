/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CurrentPostDetailsProvider from './provider';
import { PostPerformanceData } from './post-performance-data';

const FETCH_RETRIES = 3;

 interface PostDetailsTableProps {
	data: PostPerformanceData;
}

function CurrentPostDetails() {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState( null );
	const [ postDetailsData, setPostDetails ] = useState<PostPerformanceData>( null );

	useEffect( () => {
		const fetchPosts = async ( retries: number ) => {
			CurrentPostDetailsProvider.getCurrentPostDetails()
				.then( ( result ) => {
					setPostDetails( result );
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
		// "Soft" error for which we do not want to show an "Error:" prefix.
		if ( 'string' === typeof error ) {
			return <p>{ error }</p>;
		}

		// Error coming from apiFetch.
		if ( error?.message ) {
			return <p>{ __( 'Error:', 'wp-parsely' ) } { error.message }</p>;
		}

		// Error coming from the WordPress REST API.
		const errorMessage = JSON.stringify( error ).match( /\[\"(.*?)\"\]/ )[ 1 ];
		return <p>{ __( 'Error:', 'wp-parsely' ) } { errorMessage }</p>;
	}

	return (
		<>
			{ loading ? <Spinner /> : <CurrentPostDetailsTable data={ postDetailsData } /> }
		</>
	);
}

function CurrentPostDetailsTable( props: PostDetailsTableProps ) {
	const data = props.data;

	return (
		<div className="content-helper current-post-details">
			{ /* Performance */ }
			<h2>{ __( 'Performance (last 90 days)', 'wp-parsely' ) }</h2>
			<table>
				<tbody>
					<tr>
						<th>{ __( 'Views:', 'wp-parsely' ) }</th>
						<td>{ data.views }</td>
					</tr>
					<tr>
						<th>{ __( 'Visitors:', 'wp-parsely' ) }</th>
						<td>{ data.visitors }</td>
					</tr>
					<tr>
						<th>{ __( 'Engaged Average:', 'wp-parsely' ) }</th>
						<td>{ data.avgEngaged }</td>
					</tr>
				</tbody>
			</table>
			{ /* Actions */ }
			<h2>{ __( 'Actions', 'wp-parsely' ) }</h2>
			<ul>
				<li><a href={ data.url } target="blank" rel="noopener">{ __( 'Visit Post', 'wp-parsely' ) }</a></li>
				<li><a href={ data.statsUrl } target="blank" rel="noopener">{ __( 'View in the Parse.ly Dash', 'wp-parsely' ) }</a></li>
			</ul>
		</div>
	);
}

export default CurrentPostDetails;
