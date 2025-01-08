/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { TrafficBoostLink } from '../provider';
import { TrafficBoostStore } from '../store';
import { PreviewFooter } from './components/preview-footer';
import { PreviewHeader } from './components/preview-header';
import { PreviewIframe } from './components/preview-iframe';
import './preview.scss';
import { HydratedPost } from '../../../../common/base-wordpress-provider';
import { SnackbarNotices } from '../../../../common/components/snackbar-notices';

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
}

/**
 * TrafficBoostPreview component.
 *
 * @since 3.18.0
 *
 * @param {TrafficBoostPreviewProps} props - The props for the TrafficBoostPreview component.
 */
export const TrafficBoostPreview = ( {
	activeLink: providedActiveLink,
}: TrafficBoostPreviewProps ): React.JSX.Element => {
	const [ isFrontendPreview, setIsFrontendPreview ] = useState<boolean>( false );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	const [ isInboundLink, setIsInboundLink ] = useState<boolean>( false );

	const [ activeLink, setActiveLink ] = useState<TrafficBoostLink>( providedActiveLink );
	const [ activePost, setActivePost ] = useState<HydratedPost>( providedActiveLink.targetPost );

	const [ selectedText, setSelectedText ] = useState<TextSelection | null>( null );
	const [ previewUrl, setPreviewUrl ] = useState<string>( '' );
	const [ totalItems, setTotalItems ] = useState<number>( 0 );
	const [ itemIndex, setItemIndex ] = useState<number>( 0 );

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
	}, [] );

	const { setSelectedLink } = useDispatch( TrafficBoostStore );

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

		// Only set loading state if URL actually changes
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

		window.open( activePost.guid.raw, '_blank' );
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

		window.open( `${ window.location.origin }/wp-admin/post.php?post=${ activePost.id }&action=edit`, '_blank' );
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
		window.open( parselyDashboardUrl, '_blank' );
	};

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

	const handleAccept = () => {
		//console.log( 'accept' );
	};

	const handleDiscard = () => {
		//console.log( 'discard' );
	};

	const handleRemove = () => {
		//console.log( 'remove' );
	};

	const handleUpdateLink = () => {
		//console.log( 'update link' );
	};

	if ( ! activePost || ! post ) {
		return <></>;
	}

	return (
		<div className="traffic-boost-preview">
			<PreviewHeader
				post={ post }
				activeLink={ activeLink }
				onOpenPostInNewTab={ openPostInNewTab }
				onOpenPostEditor={ openPostEditor }
				onOpenParselyDashboard={ openParselyDashboard }
				isFrontendPreview={ isFrontendPreview }
				setIsFrontendPreview={ setIsFrontendPreview }
			/>
			<PreviewIframe
				post={ post }
				activeLink={ activeLink }
				previewUrl={ previewUrl }
				isLoading={ isLoading }
				selectedText={ selectedText }
				onTextSelected={ ( text, offset ) => {
					setSelectedText( { text, offset } );
				} }
				isFrontendPreview={ isFrontendPreview }
				onLoadingChange={ setIsLoading }
			/>
			<SnackbarNotices className="traffic-boost-preview-snackbar-notices" />
			<PreviewFooter
				post={ post }
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
