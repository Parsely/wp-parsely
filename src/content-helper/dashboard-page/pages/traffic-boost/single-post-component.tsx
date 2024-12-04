/**
 * External dependencies
 */
import { useNavigate, useParams } from 'react-router-dom';

/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { HydratedPost } from '../../../common/base-wordpress-provider';
import { PageContainer } from '../../components';
import { DashboardProvider } from '../../provider';
import { TrafficBoostSidebar } from './components/sidebar/sidebar';
import { TrafficBoostSuggestion } from './provider';
import './traffic-boost.scss';

/**
 * Traffic Boost Post page component.
 *
 * @since 3.18.0
 */
export const TrafficBoostPostPage = (): React.JSX.Element => {
	const { postId } = useParams();
	const navigate = useNavigate();
	const [ post, setPost ] = useState<HydratedPost | null>( null );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	const [ backgroundColor, setBackgroundColor ] = useState<string | undefined>();
	const [ activeSuggestion, setActiveSuggestion ] = useState<TrafficBoostSuggestion | null>( null );

	const [ activePost, setActivePost ] = useState<HydratedPost | null>( null );

	/**
	 * Sets the background color of the page container to the background color of the admin menu.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const adminMenuBack = document.getElementById( 'adminmenuback' );
		if ( adminMenuBack ) {
			const computedStyle = window.getComputedStyle( adminMenuBack );
			setBackgroundColor( computedStyle.backgroundColor );
		}
	}, [] );

	/**
	 * Fetches the post data from the dashboard provider.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const fetchPost = async () => {
			try {
				const fetchedPost = await DashboardProvider.getInstance().getPosts( {
					include: [ Number( postId ) ],
				} );

				if ( fetchedPost.data.length > 0 ) {
					setPost( fetchedPost.data[ 0 ] );
				} else {
					setPost( null );
				}
			} catch ( error ) {
				console.error( error ); // eslint-disable-line no-console
			} finally {
				setIsLoading( false );
			}
		};

		setIsLoading( true );
		fetchPost();
	}, [ postId ] );

	/**
	 * Redirects to the traffic boost page if no post is found.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( ! isLoading && ! post ) {
			navigate( '/traffic-boost' );
		}
	}, [ isLoading, post, navigate ] );

	/**
	 * Handles the click event on a suggestion.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostSuggestion} suggestion - The suggestion that was clicked.
	 */
	const handleSuggestionClick = ( suggestion: TrafficBoostSuggestion ) => {
		setActiveSuggestion( suggestion );
		setActivePost( suggestion.source_post );
	};

	return (
		<PageContainer name="traffic-boost-single-post" backgroundColor={ backgroundColor }>
			<style>
				{ `
					#wpfooter {
						display: none;
					}
					#wpbody-content {
						padding-bottom: 0 !important;
					}
				` }
			</style>
			<TrafficBoostSidebar
				isLoading={ isLoading }
				post={ post }
				onSuggestionClick={ handleSuggestionClick }
			/>
			<div className="traffic-boost-preview">
				{ activeSuggestion && (
					<div>
						{ activePost?.title.rendered }
					</div>
				) }
			</div>
		</PageContainer>
	);
};
