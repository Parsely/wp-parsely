/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ContentHelperError } from '../../common/content-helper-error';
import { Select } from '../../common/select';
import { TopPostData } from '../model';
import { DashboardWidgetProvider } from '../provider';
import { TopPostsList } from './top-posts-list';

const FETCH_RETRIES = 1;

/**
 * List of the top posts.
 */
export function TopPosts() {
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState<ContentHelperError>();
	const [ posts, setPosts ] = useState<TopPostData[]>( [] );
	const [ period, setPeriodFilter ] = useState<string>( '7' );
	const [ metric, setMetricFilter ] = useState<string>( 'views' );

	useEffect( () => {
		const provider = new DashboardWidgetProvider();

		const fetchPosts = async ( retries: number ) => {
			provider.getTopPosts( period, metric )
				.then( ( result ): void => {
					setPosts( result );
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
			setError( undefined );
		};
	}, [ period, metric ] );

	// Show error message.
	if ( error ) {
		return error.Message( { className: 'parsely-top-posts-descr' } );
	}

	const spinner = (
		<div className="parsely-spinner-wrapper"><Spinner /></div>
	);

	return (
		<div className="parsely-top-posts-wrapper">
			<div className="parsely-top-posts-filters">
				<Select
					defaultValue={ period }
					items={ [
						[ '1', 'Last 24 hours' ],
						[ '7', 'Last 7 days' ],
						[ '30', 'Last 30 days' ],
					] }
					onChange={ ( event ) => {
						setPeriodFilter( event.target.value );
					} }
				/>
				<Select
					defaultValue={ metric }
					items={ [
						[ 'views', 'Page views' ],
						[ 'avg_engaged', 'Avg. Time' ] ] }
					onChange={ ( event ) => {
						setMetricFilter( event.target.value );
					} }
				/>
			</div>
			{
				loading ? ( spinner ) : (
					<TopPostsList
						posts={ posts }
						metric={ metric }
					/>
				)
			}
		</div>
	);
}
