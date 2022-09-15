/**
 * External dependencies
 */
import { Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ContentHelperProvider from '../content-helper-provider';
import { CurrentPostDetailsData } from '../models/current-post-details-data';

const FETCH_RETRIES = 3;

type PostDetailsTableProps = {
	data: CurrentPostDetailsData;
};

function CurrentPostDetailsTable( props: PostDetailsTableProps ) {
	return (
		<table>
			<thead>
				<tr>
					<td>Key</td>
					<td>Value</td>
				</tr>
			</thead>
			<tbody>
				{
					Object.entries( props.data ).map( ( row ) => (
						<tr key={ row[ 0 ] }>
							<td>{ row[ 0 ] }</td>
							<td>{ row[ 1 ] }</td>
						</tr>
					) )
				}
			</tbody>
		</table>
	);
}

function CurrentPostDetails() {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState<string>( null );
	const [ postDetailsData, setPostDetails ] = useState<CurrentPostDetailsData>( {} );

	useEffect( () => {
		const fetchPosts = async ( retries: number ) => {
			ContentHelperProvider.getCurrentPostDetails()
				.then( ( result ) => {
					setPostDetails( result );
					setLoading( false );
				} )
				.catch( async ( err: string ) => {
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
		return <p>{ error }</p>;
	}

	return (
		<>
			{ loading ? <Spinner /> : <CurrentPostDetailsTable data={ postDetailsData } /> }
		</>
	);
}

export default CurrentPostDetails;
