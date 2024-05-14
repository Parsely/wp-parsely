import { BlockInstance, cloneBlock, getBlockContent, getBlockType } from '@wordpress/blocks';
import { Button, __experimentalDivider as Divider, Disabled, ExternalLink, MenuItem } from '@wordpress/components';
import { select as selectFn, useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { arrowLeft, arrowRight, check, closeSmall, Icon, page } from '@wordpress/icons';
import { filterURLForDisplay } from '@wordpress/url';
import { GutenbergFunction } from '../../../../@types/gutenberg/types';
import { SmartLink, SmartLinkingProvider } from '../provider';
import { BlockEditorProvider, BlockList, ObserveTyping, WritingFlow } from '@wordpress/block-editor';
import { SmartLinkingStore } from '../store';
import { applyNodeToBlock } from '../utils';

type SuggestionBreadcrumbProps = {
	link: SmartLink,
};
const SuggestionBreadcrumb = ( { link }: SuggestionBreadcrumbProps ): JSX.Element => {
	const blockId = link.match?.blockId;

	// Fetch block details and parent IDs using the blockId
	const { block, parents } = useSelect(
		( select ) => {
			const { getBlock, getBlockParents } = select( 'core/block-editor' ) as GutenbergFunction;

			if ( ! blockId ) {
				return { block: undefined, parents: [] };
			}

			return {
				block: getBlock( blockId ),
				parents: getBlockParents( blockId )
					.map( ( id ) => getBlock( id ) )
					.filter( ( currBlock ): currBlock is BlockInstance => currBlock !== undefined ),
			};
		},
		[ blockId ],
	);

	if ( ! block ) {
		return <></>;
	}

	return (
		<div className="review-suggestions-breadcrumbs">
			{ parents.map( ( parent: BlockInstance, index: number ) => (
				<span key={ index }>
					<span className="breadcrumbs-parent-block" >
						{ getBlockType( parent.name )?.title }
					</span>
					<span className="breadcrumbs-parent-separator">&nbsp;/&nbsp;</span>
				</span>
			) ) }
			<span className="breadcrumbs-current-block">
				<span className="breadcrumbs-current-block-type">{ getBlockType( block.name )?.title }</span>
				{ block.attributes?.metadata?.name && (
					<span className="breadcrumbs-current-block-name">{ block.attributes.metadata.name }</span>
				) }
			</span>
		</div>
	);
};

type StylesProps = {
	styles: {
		css?: string,
		assets?: string,
		__unstableType?: string,
	}[],
};
const Styles = ( { styles }: StylesProps ): JSX.Element => {
	// Get onlt the theme and user styles.
	const filteredStyles = styles
		.filter( ( style ) => {
			return (
				style.__unstableType === 'theme' ||
				style.__unstableType === 'user'
			) && style.css;
		} );

	// Returns the styles, but replaces the body selector with the block editor selector.
	return (
		<>
			{ filteredStyles.map( ( style, index ) => (
				<style key={ index }>{ style.css?.replace( /body/g, '.wp-parsely-preview-editor' ) }</style>
			) ) }
		</>
	);
};

type BlockPreviewProps = {
	block: BlockInstance,
	link: SmartLink,
}
const BlockPreview = ( { block, link }: BlockPreviewProps ) => {
	const [ clonedBlock, setClonedBlock ] = useState<BlockInstance>( cloneBlock( block ) );

	/**
	 * Runs when the block is updated.
	 * It will update the cloned block with the new block.
	 *
	 * @since 3.15.0
	 */
	useEffect( () => {
		setClonedBlock( cloneBlock( block ) );
	}, [ block, link ] );

	/**
	 * Highlights the link in the block.
	 *
	 * @since 3.15.0
	 *
	 * @param {BlockInstance} blockInstance  The block instance to highlight the link in.
	 * @param {SmartLink}     linkSuggestion The link suggestion to highlight.
	 */
	const highlightLinkInBlock = ( blockInstance: BlockInstance, linkSuggestion: SmartLink ) => {
		// If the link is not applied, add a highlight with a new mark element.
		if ( ! link.applied ) {
			const mark = document.createElement( 'mark' );
			mark.className = 'smart-linking-highlight';
			applyNodeToBlock( blockInstance, linkSuggestion, mark );
			return;
		}

		// Otherwise, if the link is applied, add a highlight class to the link element with the link uid
		const blockContent: string = getBlockContent( blockInstance );

		const doc = new DOMParser().parseFromString( blockContent, 'text/html' );
		const contentElement = doc.body.firstChild as HTMLElement;
		if ( ! contentElement ) {
			return;
		}

		const anchor = contentElement.querySelector<HTMLAnchorElement>( `a[data-smartlink="${ linkSuggestion.uid }"]` );
		if ( anchor ) {
			anchor.classList.add( 'smart-linking-highlight' );
		}

		blockInstance.attributes.content = contentElement.innerHTML;
	};

	/**
	 * Runs when the block is rendered in the DOM.
	 * It will set the block element to be non-editable.
	 *
	 * @since 3.15.0
	 */
	useEffect( () => {
		const blockPreviewElement = document.querySelector( '.wp-parsely-preview-editor' );

		if ( ! blockPreviewElement ) {
			return;
		}

		highlightLinkInBlock( clonedBlock, link );

		const observer = new MutationObserver( ( mutations: MutationRecord[] ) => {
			mutations.forEach( ( mutation: MutationRecord ) => {
				if ( mutation.type === 'childList' ) {
					// Temporarily disconnect observer to prevent observing our own changes.
					observer.disconnect();

					mutation.addedNodes.forEach( ( node ) => {
						if ( node instanceof HTMLElement ) {
							const blockElement = document.querySelector<HTMLElement>( `.wp-parsely-preview-editor [data-block="${ clonedBlock.clientId }"]` );

							if ( blockElement ) {
								// Disable editing on the block element.
								blockElement.setAttribute( 'contenteditable', 'false' );
							}
						}
					} );

					// Reconnect observer after changes.
					observer.observe( document.body, { childList: true, subtree: true } );
				}
			} );
		} );

		observer.observe( blockPreviewElement, {
			childList: true,
			subtree: true,
		} );

		return () => observer.disconnect();
	}, [ clonedBlock, link ] );

	if ( ! block ) {
		return <></>;
	}

	const settings = selectFn( 'core/block-editor' ).getSettings();

	return (
		<Disabled className="wp-block-post-content editor-styles-wrapper wp-parsely-preview-editor" >
			<BlockEditorProvider
				value={ [ clonedBlock ] }
				settings={ {
					...settings,
					// @ts-ignore __unstableIsPreviewMode is not in the types.
					__unstableIsPreviewMode: true,
					templateLock: 'all',
				} }
			>
				<Styles styles={ settings.styles } />
				<BlockList />
			</BlockEditorProvider>
		</Disabled>
	);
};

const LinkDetails = ( { link }: { link: SmartLink } ): JSX.Element => {
	// Get the post type by the permalink
	const displayUrl = filterURLForDisplay( link.href, 30 );

	const [ postType, setPostType ] = useState<string|undefined>( link.post_type );

	const {
		updateSmartLink,
	} = useDispatch( SmartLinkingStore );

	useEffect( () => {
		if ( ! link.post_type ) {
			SmartLinkingProvider.getInstance().getPostTypeByURL( link.href ).then( ( type ) => {
				if ( ! type ) {
					type = __( 'External', 'wp-parsely' );
				}

				setPostType( type );
				link.post_type = type ?? 'external';
				updateSmartLink( link );
			} );
		}
	}, [ link ] );

	return (
		<MenuItem
			info={ displayUrl }
			iconPosition="left"
			icon={ page }
			shortcut={ postType }
			className="block-editor-link-control__search-item wp-parsely-link-suggestion-link-details"
		>
			{ link.title }
		</MenuItem>
	);
};

type ReviewSuggestionProps = {
	link: SmartLink,
	onNext: () => void,
	onPrevious: () => void,
	onAccept: () => void,
	onReject: () => void,
	onRemove: () => void,
	onSelectInEditor: () => void,
	hasPrevious: boolean,
	hasNext: boolean,
};

export const ReviewSuggestion = ( {
	link,
	onNext,
	onPrevious,
	onAccept,
	onReject,
	onRemove,
	onSelectInEditor,
	hasPrevious,
	hasNext,
}: ReviewSuggestionProps ): JSX.Element => {
	if ( ! link?.match ) {
		return <>No match!</>;
	}

	const blockId = link.match.blockId;
	// Get the block
	const block = selectFn( 'core/block-editor' ).getBlock( blockId );
	const isApplied = link.applied;

	if ( ! block ) {
		return <>No block!</>;
	}

	return (
		<div className="smart-linking-review-suggestion">
			<SuggestionBreadcrumb link={ link } />
			<div className="review-suggestion-preview">
				<BlockPreview block={ block } link={ link } />
			</div>
			<Divider />
			<LinkDetails link={ link } />
			<div className="review-controls">
				<Button
					disabled={ ! hasPrevious }
					className="wp-parsely-review-suggestion-previous"
					onClick={ onPrevious }
					icon={ arrowLeft }>Previous</Button>
				<div className="reviews-controls-middle">
					{ ! isApplied && (
						<>
							<Button
								className="wp-parsely-review-suggestion-reject"
								icon={ closeSmall }
								onClick={ onReject }
								variant={ 'secondary' }>
								Reject
							</Button>
							<Button
								className="wp-parsely-review-suggestion-accept"
								icon={ check }
								onClick={ onAccept }
								variant="secondary"
							>
								Accept
							</Button>
						</>
					) }
					{ isApplied && (
						<>
							<Button
								className="wp-parsely-review-suggestion-reject"
								icon={ closeSmall }
								onClick={ onRemove }
								variant={ 'secondary' }>
								Remove
							</Button>
							<Button
								className="wp-parsely-review-suggestion-accept"
								onClick={ onSelectInEditor }
								variant="secondary"
							>
								Select in Editor
							</Button>
						</>
					) }
				</div>
				<Button
					disabled={ ! hasNext }
					onClick={ onNext }
					className="wp-parsely-review-suggestion-next"
				>
					Next
					<Icon icon={ arrowRight } />
				</Button>
			</div>
		</div>
	);
};
