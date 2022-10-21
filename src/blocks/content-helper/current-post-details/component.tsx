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

// Number of attempts to fetch the data before displaying an error.
const FETCH_RETRIES = 3;

/**
 * Specifies the form of component props.
 */
interface PostDetailsTableProps {
	data: PostPerformanceData;
}

/**
 * Outputs the current post's details or shows an error message on failure.
 */
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
						setError( err );
						setLoading( false );
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
			{ loading ? <Spinner /> : <CurrentPostDetailsTables data={ postDetailsData } /> }
		</>
	);
}

/**
 * Outputs all tables containing current post details.
 *
 * @param {PostDetailsTableProps} props Props needed to populate the tables.
 */
function CurrentPostDetailsTables( props: PostDetailsTableProps ) {
	const data = props.data;

	return (
		<div className="current-post-details">
			{ GeneralPerformanceTable( data ) }
			{ ReferrerTypesTable( data ) }
			{ TopReferrersTable( data ) }
			{ ActionsList( data ) }
		</div>
	);
}

/**
 * Outputs the "General Performance" table.
 *
 * @param {PostPerformanceData} data The data needed to populate the table.
 */
function GeneralPerformanceTable( data: PostPerformanceData ) {
	return (
		<div className="section general-performance">
			<h2>{ __( 'General Performance (last 90 days)', 'wp-parsely' ) }</h2>
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
						<th title={
							__( 'Average time visitors engaged with content', 'wp-parsely' )
						}>{ __( 'Avg. Time:', 'wp-parsely' ) }</th>
						<td>{ data.avgEngaged }</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

/**
 * Outputs the "Post Performance" table.
 *
 * @param {PostPerformanceData} data The data needed to populate the table.
 */
function ReferrerTypesTable( data: PostPerformanceData ) {
	return (
		<div className="section referrer-types">
			<h2>{ __( 'Referrer Types (last 7 days)', 'wp-parsely' ) }</h2>
			<table>
				<thead>
					<tr>
						<th>{ __( 'Referrer Type', 'wp-parsely' ) }</th>
						<th colSpan={ 2 }>{ __( 'Views', 'wp-parsely' ) }</th>
					</tr>
				</thead>
				<tbody>
					{
						Object.entries( data.referrers.types ).map( ( [ key, value ] ) => {
							if ( key === 'totals' ) {
								key = __( 'Total', 'wp-parsely' );
								return (
									<tr key={ key }>
										<th>{ key + __( ':', 'wp-parsely' ) }</th>
										<td>{ value.views }</td>
									</tr>
								);
							}

							return (
								<tr key={ key }>
									<th className="capitalized">{ key + __( ':', 'wp-parsely' ) }</th>
									<td>{ value.views }</td>
									<td>{ value.viewsPercentage + __( '%', 'wp-parsely' ) }</td>
								</tr>
							);
						} )
					}
				</tbody>
			</table>
		</div>
	);
}

/**
 * Outputs the "Top Referrers" table.
 *
 * @param {PostPerformanceData} data The data needed to populate the table.
 */
function TopReferrersTable( data: PostPerformanceData ) {
	let totalViewsPercentage;
	return (
		<div className="section top-referrers">
			<h2>{ __( 'Top 5 Referrers (last 7 days)', 'wp-parsely' ) }</h2>
			<table>
				<thead>
					<tr>
						<th>{ __( 'Referrer', 'wp-parsely' ) }</th>
						<th colSpan={ 2 }>{ __( 'Views', 'wp-parsely' ) }</th>
					</tr>
				</thead>
				<tbody>
					{
						Object.entries( data.referrers.top ).map( ( [ key, value ] ) => {
							if ( key === 'totals' ) {
								key = __( 'Total', 'wp-parsely' );
								totalViewsPercentage = value.viewsPercentage;
								return (
									<tr key={ key }>
										<th title={ key }>{ key + __( ':', 'wp-parsely' ) }</th>
										<td>{ value.views }</td>
									</tr>
								);
							}

							return (
								<tr key={ key }>
									<th title={ key }>{ key + __( ':', 'wp-parsely' ) }</th>
									<td>{ value.views }</td>
									<td>{ value.viewsPercentage + __( '%', 'wp-parsely' ) }</td>
								</tr>
							);
						} )
					}
				</tbody>
			</table>
			<p>
				{ totalViewsPercentage + __( '% of all views came from the top 5 referrers.', 'wp-parsely' ) }
			</p>
		</div>
	);
}

/**
 * Outputs the "Actions" list.
 *
 * @param {PostPerformanceData} data The data needed to populate the list.
 */
function ActionsList( data: PostPerformanceData ) {
	return (
		<div className="section actions">
			<h2>{ __( 'Actions', 'wp-parsely' ) }</h2>
			<ul>
				<li><a href={ data.url } target="blank" rel="noopener">{ __( 'Visit Post', 'wp-parsely' ) }</a></li>
				<li><a href={ data.statsUrl } target="blank" rel="noopener">{ __( 'View in the Parse.ly Dash', 'wp-parsely' ) }</a></li>
			</ul>
		</div>
	);
}

export default CurrentPostDetails;
