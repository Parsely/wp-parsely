/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
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
	activeLink: TrafficBoostLink | null;
}

/**
 * TrafficBoostPreview component.
 *
 * @since 3.18.0
 *
 * @param {TrafficBoostPreviewProps} props - The props for the TrafficBoostPreview component.
 */
export const TrafficBoostPreview = ( {
	activeLink,
}: TrafficBoostPreviewProps ): React.JSX.Element => {
	const [ isFrontendPreview, setIsFrontendPreview ] = useState<boolean>( false );
	const [ previewUrl, setPreviewUrl ] = useState<string>( '' );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	const activePost = activeLink?.targetPost;
	const [ selectedText, setSelectedText ] = useState<TextSelection | null>( null );

	const { post } = useSelect( ( select ) => {
		return {
			post: select( TrafficBoostStore ).getCurrentPost(),
		};
	}, [] );

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
	 * Unsets the text selection when the active link changes.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		setSelectedText( null );
	}, [ activeLink ] );

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

	if ( ! activePost || ! post ) {
		return <></>;
	}

	return (
		<div className="traffic-boost-preview">
			<PreviewHeader
				post={ post }
				selectedText={ selectedText }
				activeLink={ activeLink }
				onRestoreOriginal={ () => {
					setSelectedText( null );
				} }
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
			<PreviewFooter
				post={ post }
				activeLink={ activeLink }
				selectedText={ selectedText }
				onApprove={ () => {
					// TODO: Implement approve logic
				} }
				onDiscard={ () => {
					// TODO: Implement discard logic
				} }
				onTextChange={ () => {
					// TODO: Implement text update logic
				} }
				onNewTabChange={ () => {
					// TODO: Implement new tab setting update
				} }
				onNofollowChange={ () => {
					// TODO: Implement nofollow setting update
				} }
			/>
		</div>
	);
};
