/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PageContainer } from '../../components';
import { TrafficBoostSidebar } from './sidebar/sidebar';
import { TrafficBoostLink, TrafficBoostProvider } from './provider';
import { TrafficBoostStore } from './store';
import './traffic-boost.scss';
import { ContentHelperError } from '../../../common/content-helper-error';
import { TrafficBoostPreview } from './preview/preview';

/**
 * Traffic Boost Post page component.
 *
 * @since 3.18.0
 */
export const TrafficBoostPostPage = (): React.JSX.Element => {
	const { postId } = useParams();
	const navigate = useNavigate();
	const [ backgroundColor, setBackgroundColor ] = useState<string | undefined>();
	const [ hasFetchedPost, setHasFetchedPost ] = useState<boolean>( false );
	const {
		isLoading,
		error,
		currentPost: post,
		selectedLink,
	} = useSelect( ( select ) => ( {
		isLoading: select( TrafficBoostStore ).isLoading(),
		error: select( TrafficBoostStore ).getError(),
		currentPost: select( TrafficBoostStore ).getCurrentPost(),
		selectedLink: select( TrafficBoostStore ).getSelectedLink(),
	} ), [] );

	const {
		setError,
		setLoading,
		setCurrentPost,
		setSelectedLink,
		setInboundLinks,
		setSuggestions,
	} = useDispatch( TrafficBoostStore );

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
	 * Fetches the current post data from the dashboard provider.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const fetchPost = async () => {
			try {
				const fetchedPost = await TrafficBoostProvider.getInstance().getPosts( {
					include: [ parseInt( postId ?? '0' ) ],
				} );

				if ( fetchedPost.data.length > 0 ) {
					setCurrentPost( fetchedPost.data[ 0 ] );
				} else {
					setCurrentPost( null );
				}
			} catch ( err ) {
				setError( err as ContentHelperError );
				console.error( error ); // eslint-disable-line no-console
			} finally {
				setLoading( false );
				setHasFetchedPost( true );
			}
		};

		setLoading( true );
		fetchPost();
	}, [ postId, setLoading, setCurrentPost, setError, error ] );

	/**
	 * Clears the post and selected link when the component unmounts.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		return () => {
			setCurrentPost( null );
			setSelectedLink( null );
		};
	}, [ setCurrentPost, setSelectedLink ] );

	/**
	 * Redirects to the traffic boost page if no post is found after fetching.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( hasFetchedPost && ! isLoading && ! post ) {
			navigate( '/traffic-boost' );
		}
	}, [ hasFetchedPost, isLoading, post, navigate ] );

	/**
	 * Handles the click event on a suggestion.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} link The link that was clicked.
	 */
	const handleLinkClick = ( link: TrafficBoostLink ) => {
		setSelectedLink( link );
	};

	/**
	 * Fetches the Boost Links for the post.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( ! post ) {
			return;
		}

		const fetchInboundLinks = async () => {
			try {
				setLoading( true, 'inbound_links' );
				let inboundLinks = await TrafficBoostProvider.getInstance().getInboundLinks( post.id );

				// Filter out the current post from the inbound links.
				inboundLinks = inboundLinks.filter( ( link ) => link.targetPost?.id !== post.id );

				// Filter out the inbound links that are not posts.
				inboundLinks = inboundLinks.filter( ( link ) => link.smartLink?.source?.post_type === 'post' );

				setInboundLinks( inboundLinks );
			} catch ( err ) {
				setError( err as ContentHelperError );
				console.error( error ); // eslint-disable-line no-console
			} finally {
				setLoading( false, 'inbound_links' );
			}
		};

		fetchInboundLinks();
	}, [ error, post, setInboundLinks, setError, setLoading ] );

	/**
	 * Fetches suggestions for Boost Links to the current post.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( ! post ) {
			return;
		}

		const fetchSuggestions = async () => {
			try {
				setLoading( true, 'suggestions' );
				const fetchedSuggestions = await TrafficBoostProvider.getInstance().generateBoostLinks( post.id );
				setSuggestions( fetchedSuggestions );
			} catch ( err ) {
				setError( err as ContentHelperError );
				console.error( error ); // eslint-disable-line no-console
			} finally {
				setLoading( false, 'suggestions' );
			}
		};

		fetchSuggestions();
	}, [ error, post, setError, setLoading, setSuggestions ] );

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
				onLinkClick={ handleLinkClick }
			/>
			{ selectedLink && (
				<TrafficBoostPreview
					activeLink={ selectedLink }
				/>
			) }
		</PageContainer>
	);
};
