/**
 * External dependencies
 */
import { useLocation, useNavigate, useParams } from 'react-router';

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ContentHelperError, ContentHelperErrorCode } from '../../../common/content-helper-error';
import { PageContainer } from '../../components';
import { TrafficBoostPreview } from './preview/preview';
import { TrafficBoostLink, TrafficBoostProvider } from './provider';
import { TrafficBoostSidebar } from './sidebar/sidebar';
import { TrafficBoostStore } from './store';
import './traffic-boost.scss';

/**
 * Traffic Boost Post page component.
 *
 * @since 3.18.0
 */
export const TrafficBoostPostPage = (): React.JSX.Element => {
	const { postId } = useParams();
	// Location state is used to pass the post to the page when navigating from the posts table.
	const { state } = useLocation();
	const navigate = useNavigate();
	const [ backgroundColor, setBackgroundColor ] = useState<string | undefined>();
	const [ hasFetchedPost, setHasFetchedPost ] = useState<boolean>( false );
	const {
		isLoadingPost,
		error,
		currentPost: post,
		selectedLink,
	} = useSelect( ( select ) => ( {
		isLoadingPost: select( TrafficBoostStore ).isLoadingPost(),
		error: select( TrafficBoostStore ).getError(),
		currentPost: state?.post ?? select( TrafficBoostStore ).getCurrentPost(),
		selectedLink: select( TrafficBoostStore ).getSelectedLink(),
	} ), [ state?.post ] );

	const {
		setError,
		setLoading,
		setCurrentPost,
		setSelectedLink,
		setInboundLinks,
		setSuggestions,
		setIsGeneratingSuggestions,
	} = useDispatch( TrafficBoostStore );

	/**
	 * Sets the background color of the page container to the background color of the admin menu.
	 * When the component unmounts, it cancels all the provider requests and cleans up the store state.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		// Set the background color of the page container to the background color of the admin menu.
		const adminMenuBack = document.getElementById( 'adminmenuback' );
		if ( adminMenuBack ) {
			const computedStyle = window.getComputedStyle( adminMenuBack );
			setBackgroundColor( computedStyle.backgroundColor );
		}

		return () => {
			// When the component unmounts, make sure to cancel all the provider requests.
			TrafficBoostProvider.getInstance().cancelAll();
			// Clean up the store state.
			setIsGeneratingSuggestions( false );
			setLoading( false );
			setError( null );
			setInboundLinks( [] );
			setSuggestions( [] );
			setCurrentPost( null );
			setSelectedLink( null );
		};
	}, [] );

	/**
	 * Fetches the current post data from the dashboard provider.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		// If the post is passed in the navigation state, use it.
		if ( state?.post ) {
			setCurrentPost( state.post );
			return;
		}

		const fetchPost = async () => {
			if ( ! postId ) {
				return;
			}

			try {
				const fetchedPost = await TrafficBoostProvider.getInstance().getPost( parseInt( postId ) );

				if ( fetchedPost ) {
					setCurrentPost( fetchedPost );
				} else {
					setCurrentPost( null );
				}
			} catch ( err ) {
				setError( err as ContentHelperError );
				console.error( err ); // eslint-disable-line no-console
			} finally {
				setLoading( false, 'post' );
				setHasFetchedPost( true );
			}
		};

		setLoading( true, 'post' );
		fetchPost();
	}, [ postId, setLoading, setCurrentPost, setError, state ] );

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
	 * Redirects to the Traffic Boost page if no post is found after fetching.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( hasFetchedPost && ! isLoadingPost && ! post ) {
			navigate( '/traffic-boost' );
		}
	}, [ hasFetchedPost, isLoadingPost, post, navigate ] );

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
	 * Handles the accept event on a suggestion.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} link The link that was accepted.
	 *
	 * @return {Promise<boolean>} Whether the suggestion was accepted.
	 */
	const handleAccept = async ( link: TrafficBoostLink ): Promise<boolean> => {
		if ( ! link.smartLink || ! post || 0 === link.smartLink.smart_link_id ) {
			return false;
		}

		return await TrafficBoostProvider.getInstance().acceptSuggestion( post.id, link.smartLink.smart_link_id );
	};

	/**
	 * Handles the discard event on a suggestion.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} link The link that was discarded.
	 */
	const handleDiscard = async ( link: TrafficBoostLink ) => {
		if ( ! link.smartLink || ! post || 0 === link.smartLink.smart_link_id ) {
			return;
		}

		// Discard the suggestion in the backend, if it has been saved.
		// Not using await here because we don't need to wait for the response.
		TrafficBoostProvider.getInstance().discardSuggestion( post.id, link.smartLink.smart_link_id );
	};

	/**
	 * Handles the remove event on an inbound link.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} link The link that was removed.
	 *
	 * @return {Promise<boolean>} Whether the inbound link was removed.
	 */
	const handleRemoveInboundLink = async ( link: TrafficBoostLink ): Promise<boolean> => {
		if ( ! link.smartLink || ! post || 0 === link.smartLink.smart_link_id ) {
			return false;
		}

		return await TrafficBoostProvider.getInstance().removeInboundLink( post.id, link.smartLink.smart_link_id );
	};

	/**
	 * Fetches the inbound links for the post.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const fetchInboundLinks = async () => {
			if ( ! postId ) {
				return;
			}

			try {
				setLoading( true, 'inbound-links' );
				let inboundLinks = await TrafficBoostProvider.getInstance().getInboundLinks( parseInt( postId ) );

				// Filter out the current post from the inbound links.
				inboundLinks = inboundLinks.filter( ( link ) => link.targetPost?.id !== parseInt( postId ) );

				setInboundLinks( inboundLinks );
			} catch ( err ) {
				if ( err instanceof ContentHelperError ) {
					setError( err );
				} else {
					setError( new ContentHelperError( 'Failed to fetch inbound links', ContentHelperErrorCode.FetchError ) );
				}
				console.error( err ); // eslint-disable-line no-console
			} finally {
				setLoading( false, 'inbound-links' );
			}
		};

		fetchInboundLinks();
	}, [ postId, setInboundLinks, setError, setLoading ] );

	/**
	 * Fetches suggestions for Boost Links to the current post.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( ! postId ) {
			return;
		}

		const fetchSuggestions = async () => {
			try {
				setError( null );
				setLoading( true, 'suggestions' );
				const trafficBoostProvider = TrafficBoostProvider.getInstance();
				const fetchedSuggestions = await trafficBoostProvider.getExistingSuggestions( parseInt( postId ) );

				// If there are no suggestions, trigger the generation of suggestions.
				if ( fetchedSuggestions.length === 0 ) {
					setIsGeneratingSuggestions( true );
					const generatedSuggestions = await trafficBoostProvider.generateSuggestions(
						parseInt( postId ),
						{
							max_items: 10, // TODO: use the settings.
							save: true,
						},
					);
					setSuggestions( generatedSuggestions );
				} else {
					// Otherwise, set the fetched suggestions.
					setSuggestions( fetchedSuggestions );
				}

				// If there are suggestions, set the first one as the selected link.
				if ( fetchedSuggestions.length > 0 ) {
					setSelectedLink( fetchedSuggestions[ 0 ] );
				} else {
					setSelectedLink( null );
				}
			} catch ( err ) {
				if ( err instanceof ContentHelperError ) {
					setError( err );
				}
				console.error( err ); // eslint-disable-line no-console
			} finally {
				setIsGeneratingSuggestions( false );
				setLoading( false, 'suggestions' );
			}
		};

		fetchSuggestions();
	}, [ postId, setError, setIsGeneratingSuggestions, setLoading, setSelectedLink, setSuggestions ] );

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
				onLinkClick={ handleLinkClick }
			/>
			{ selectedLink && (
				<TrafficBoostPreview
					activeLink={ selectedLink }
					onAccept={ handleAccept }
					onDiscard={ handleDiscard }
					onRemoveInboundLink={ handleRemoveInboundLink }
				/>
			) }
		</PageContainer>
	);
};
