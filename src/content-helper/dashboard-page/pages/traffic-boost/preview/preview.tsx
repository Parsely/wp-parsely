/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff } from '@wordpress/icons';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { HydratedPost } from '../../../../common/base-wordpress-provider';
import { SnackbarNotices } from '../../../../common/components/snackbar-notices';
import { TrafficBoostLink } from '../provider';
import { TrafficBoostSidebarTabs, TrafficBoostStore } from '../store';
import { PreviewFooter } from './components/preview-footer';
import { PreviewHeader } from './components/preview-header';
import { PreviewIframe } from './components/preview-iframe';
import './preview.scss';

/**
 * Structure of a text selection.
 *
 * @since 3.18.0
 */
export interface TextSelection {
	text: string;
	offset: number;
}

/**
 * Props for the TrafficBoostPreview component.
 *
 * @since 3.18.0
 */
interface TrafficBoostPreviewProps {
	activeLink: TrafficBoostLink;
	onAccept: ( link: TrafficBoostLink ) => Promise<TrafficBoostLink>;
	onRemoveInboundLink: ( link: TrafficBoostLink ) => Promise<void>;
}

/**
 * Component that renders the Traffic Boost preview.
 *
 * @since 3.18.0
 *
 * @param {TrafficBoostPreviewProps} props The component's props.
 */
export const TrafficBoostPreview = ( {
	activeLink: providedActiveLink,
	onAccept,
	onRemoveInboundLink,
}: TrafficBoostPreviewProps ): React.JSX.Element => {
	const [ isFrontendPreview, setIsFrontendPreview ] = useState<boolean>( false );
	const [ isInboundLink, setIsInboundLink ] = useState<boolean>( false );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );

	const [ activeLink, setActiveLink ] = useState<TrafficBoostLink>( providedActiveLink );
	const [ activePost, setActivePost ] = useState<HydratedPost>( providedActiveLink.targetPost );

	const [ selectedText, setSelectedText ] = useState<TextSelection | null>( null );
	const [ previewUrl, setPreviewUrl ] = useState<string>( '' );
	const [ totalItems, setTotalItems ] = useState<number>( 0 );
	const [ itemIndex, setItemIndex ] = useState<number>( 0 );

	const {
		createSuccessNotice,
	} = useDispatch( 'core/notices' );

	const {
		post,
		suggestions,
		inboundLinks,
	} = useSelect( ( select ) => {
		return {
			post: select( TrafficBoostStore ).getCurrentPost(),
			suggestions: select( TrafficBoostStore ).getSuggestions(),
			inboundLinks: select( TrafficBoostStore ).getInboundLinks(),
		};
	}, [ ] );

	const {
		setSelectedLink,
		removeSuggestion,
		removeInboundLink,
		addInboundLink,
		setSelectedTab,
		setIsAccepting,
		setIsRemoving,
	} = useDispatch( TrafficBoostStore );

	/**
	 * Sets the active link to the provided active link.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		setActiveLink( providedActiveLink );
	}, [ providedActiveLink ] );

	/**
	 * Sets the active post to the target post of the active link,
	 * and unsets the text selection when the active link changes.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		setActivePost( activeLink.targetPost );
		setIsInboundLink( ! activeLink.isSuggestion );
		setSelectedText( null );
	}, [ activeLink ] );

	/**
	 * Sets the total items and item index based on the active link.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( activeLink.isSuggestion ) {
			setTotalItems( suggestions?.length ?? 0 );
			setItemIndex( suggestions?.indexOf( activeLink ) + 1 );
		} else {
			setTotalItems( inboundLinks?.length ?? 0 );
			setItemIndex( inboundLinks?.indexOf( activeLink ) + 1 );
		}
	}, [ activeLink, inboundLinks, suggestions ] );

	/**
	 * Sets the preview URL based on the active post and frontend preview setting.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		if ( ! activePost ) {
			return;
		}

		const newUrl = ! isFrontendPreview
			? addQueryArgs( `${ window.location.origin }/wp-admin/admin-ajax.php`, {
				action: 'parsely_post_preview',
				post_id: activePost.id,
				_wpnonce: window._parsely_traffic_boost_preview_nonce ?? '',
			} )
			: addQueryArgs( activePost.guid.raw, {
				parsely_preview: 'true',
				_wpnonce: window._parsely_traffic_boost_preview_nonce ?? '',
			} );

		// Only set loading state if URL actually changes.
		if ( newUrl !== previewUrl ) {
			setIsLoading( true );
			setPreviewUrl( newUrl );
		}
	}, [ activePost, isFrontendPreview, previewUrl ] );

	/**
	 * Opens the post in a new tab.
	 *
	 * @since 3.18.0
	 */
	const openPostInNewTab = () => {
		if ( ! activePost?.guid?.raw ) {
			return;
		}

		window.open( activePost.guid.raw, '_blank', 'noopener' );
	};

	/**
	 * Opens the post editor in a new tab.
	 *
	 * @since 3.18.0
	 */
	const openPostEditor = () => {
		if ( ! activePost?.id ) {
			return;
		}

		window.open( `${ window.location.origin }/wp-admin/post.php?post=${ activePost.id }&action=edit`, '_blank', 'noopener' );
	};

	/**
	 * Opens the Parse.ly dashboard for this post in a new tab.
	 *
	 * @since 3.18.0
	 */
	const openParselyDashboard = () => {
		if ( ! activePost?.guid?.raw ) {
			return;
		}

		const parselyDashboardUrl = `https://dash.parsely.com/${ window.wpParselySiteId }/find?url=${ encodeURIComponent( activePost.guid.raw ) }`;
		window.open( parselyDashboardUrl, '_blank', 'noopener' );
	};

	/**
	 * Handles the next item event.
	 *
	 * @since 3.18.0
	 */
	const handleNext = () => {
		let nextItem: TrafficBoostLink | undefined;

		if ( isInboundLink ) {
			nextItem = inboundLinks?.[ itemIndex ];
		} else {
			nextItem = suggestions?.[ itemIndex ];
		}
		if ( nextItem ) {
			setItemIndex( itemIndex + 1 );
			setSelectedLink( nextItem );
		}
	};

	/**
	 * Handles the previous item event.
	 *
	 * @since 3.18.0
	 */
	const handlePrevious = () => {
		let previousItem: TrafficBoostLink | undefined;

		if ( isInboundLink ) {
			previousItem = inboundLinks?.[ itemIndex - 2 ];
		} else {
			previousItem = suggestions?.[ itemIndex - 2 ];
		}

		if ( previousItem ) {
			setItemIndex( itemIndex - 1 );
			setSelectedLink( previousItem );
		}
	};

	/**
	 * Handles the accept event.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} link The link to accept.
	 */
	const handleAccept = async ( link: TrafficBoostLink ) => {
		setIsAccepting( link, true );

		// Accept the suggestion.
		const acceptedLink = await onAccept( link );

		// Remove suggestion from the list.
		removeSuggestion( link );

		// Add the link to the inbound links list.
		addInboundLink( acceptedLink );

		setIsAccepting( link, false );

		// Show a snackbar success message.
		createSuccessNotice(
			__( 'Link planted on', 'wp-parsely' ) + ' ' + activePost.title.rendered,
			{
				type: 'snackbar',
				icon: <Icon icon={ linkIcon } />,
			}
		);

		// When accepting the only remaining suggestion, switch to inbound links tab.
		if ( itemIndex === totalItems && totalItems === 1 ) {
			setSelectedTab( TrafficBoostSidebarTabs.INBOUND_LINKS );
			setSelectedLink( acceptedLink );
		} else if ( itemIndex === totalItems ) {
			// Navigate to previous suggestion when accepting the last one.
			handlePrevious();
		} else {
			// Move to next suggestion after accepting current one.
			handleNext();
		}
	};

	/**
	 * Discards a suggestion.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} link The link to discard.
	 */
	const handleDiscard = ( link: TrafficBoostLink ) => {
		removeSuggestion( link );

		// When discarding the only remaining suggestion, switch to inbound links tab.
		if ( itemIndex === totalItems && totalItems === 1 ) {
			setSelectedLink( null );
		} else if ( itemIndex === totalItems ) {
			// Navigate to previous suggestion when discarding the last one.
			handlePrevious();
		} else {
			// Move to next suggestion after discarding current one.
			handleNext();
		}
	};

	/**
	 * Removes an inbound link.
	 *
	 * @since 3.18.0
	 *
	 * @param {TrafficBoostLink} link The link to remove.
	 */
	const handleRemove = async ( link: TrafficBoostLink ) => {
		setIsRemoving( link, true );
		await onRemoveInboundLink( link );
		removeInboundLink( link );
		setIsRemoving( link, false );

		// Show a snackbar success message.
		createSuccessNotice(
			__( 'Link removed from', 'wp-parsely' ) + ' ' + activePost.title.rendered,
			{
				type: 'snackbar',
				icon: <Icon icon={ linkOff } />,
			}
		);

		// When removing the only remaining inbound link, switch to inbound links tab.
		if ( itemIndex === totalItems && totalItems === 1 ) {
			setSelectedLink( null );
		} else if ( itemIndex === totalItems ) {
			// Navigate to previous inbound link when removing the last one.
			handlePrevious();
		} else {
			// Move to next inbound link after removing current one.
			handleNext();
		}
	};

	/**
	 * Handles the update link event.
	 *
	 * @since 3.18.0
	 */
	const handleUpdateLink = () => {
		//TODO: Implement this.
	};

	if ( ! activePost || ! post ) {
		return <></>;
	}

	return (
		<div className="traffic-boost-preview">
			<PreviewHeader
				activeLink={ activeLink }
				onOpenPostInNewTab={ openPostInNewTab }
				onOpenPostEditor={ openPostEditor }
				onOpenParselyDashboard={ openParselyDashboard }
				isFrontendPreview={ isFrontendPreview }
				setIsFrontendPreview={ setIsFrontendPreview }
			/>
			<PreviewIframe
				activeLink={ activeLink }
				previewUrl={ previewUrl }
				isLoading={ isLoading }
				selectedText={ selectedText }
				onTextSelected={ ( text, offset ) => {
					setSelectedText( { text, offset } );
				} }
				onRestoreOriginal={ () => {
					setSelectedText( null );
				} }
				isFrontendPreview={ isFrontendPreview }
				onLoadingChange={ setIsLoading }
			/>
			<SnackbarNotices className="traffic-boost-preview-snackbar-notices" />
			<PreviewFooter
				activeLink={ activeLink }
				totalItems={ totalItems }
				itemIndex={ itemIndex }
				onNext={ handleNext }
				onPrevious={ handlePrevious }
				onAccept={ handleAccept }
				onDiscard={ handleDiscard }
				onUpdateLink={ handleUpdateLink }
				onRemove={ handleRemove }
				onRestoreOriginal={ () => {
					setSelectedText( null );
				} }
				selectedText={ selectedText }
				onSelectIndex={ ( index ) => {
					// If the link is inbound, do nothing.
					if ( isInboundLink ) {
						return;
					}

					const suggestion = suggestions?.[ index - 1 ];
					if ( suggestion ) {
						setItemIndex( index );
						setSelectedLink( suggestion );
					}
				} }
			/>
		</div>
	);
};
