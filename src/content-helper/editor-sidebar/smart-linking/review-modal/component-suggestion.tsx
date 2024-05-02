import { BlockInstance, cloneBlock, getBlockType } from '@wordpress/blocks';
import { Button, __experimentalDivider as Divider, Disabled, ExternalLink, MenuItem } from '@wordpress/components';
import { select as selectFn, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { arrowLeft, arrowRight, check, closeSmall, Icon, page } from '@wordpress/icons';
import { filterURLForDisplay } from '@wordpress/url';
import { GutenbergFunction } from '../../../../@types/gutenberg/types';
import { LinkSuggestion } from '../provider';
import { BlockEditorProvider, BlockList, ObserveTyping, WritingFlow } from '@wordpress/block-editor';
import { applyNodeToBlock } from '../utils';

type SuggestionBreadcrumbProps = {
	link: LinkSuggestion,
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
	// CSS Only styles
	const filteredStyles = styles
		.filter( ( style ) => {
			return (
				style.__unstableType === 'theme' ||
				style.__unstableType === 'user'
			) && style.css;
		} );

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
	link: LinkSuggestion,
}
const BlockPreview = ( { block, link }: BlockPreviewProps ) => {
	const [ clonedBlock, setClonedBlock ] = useState<BlockInstance>( cloneBlock( block ) );

	/**
	 * Runs when the block is updated.
	 * It will update the cloned block with the new block.
	 */
	useEffect( () => {
		console.log( 'Updating cloned block' );
		setClonedBlock( cloneBlock( block ) );
	}, [ block, link ] );

	/**
	 * Applies the link to the block.
	 *
	 * @param {BlockInstance}  blockInstance  The block instance to apply the link to.
	 * @param {LinkSuggestion} linkSuggestion The link suggestion to apply.
	 */
	const applyLinkToBlock = ( blockInstance: BlockInstance, linkSuggestion: LinkSuggestion ) => {
		const anchor = document.createElement( 'a' );
		anchor.href = link.href;
		anchor.title = link.title;
		// Add data-smartlink attribute to the anchor tag
		anchor.setAttribute( 'data-smartlink', 'true' );
		applyNodeToBlock( blockInstance, linkSuggestion, anchor );
	};

	/**
	 * Highlights the link in the block.
	 *
	 * @param {BlockInstance}  blockInstance  The block instance to highlight the link in.
	 * @param {LinkSuggestion} linkSuggestion The link suggestion to highlight.
	 */
	const highlightLinkInBlock = ( blockInstance: BlockInstance, linkSuggestion: LinkSuggestion ) => {
		const mark = document.createElement( 'mark' );
		mark.className = 'smart-linking-highlight';
		applyNodeToBlock( blockInstance, linkSuggestion, mark );
	};

	/**
	 * Runs when the block is rendered in the DOM.
	 * It will set the block element to be non-editable.
	 */
	useEffect( () => {
		const blockPreviewElement = document.querySelector( '.wp-parsely-preview-editor' );

		if ( ! blockPreviewElement ) {
			console.log( 'Block preview element not found' );
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

const LinkDetails = ( { link }: { link: LinkSuggestion } ): JSX.Element => {
	// Get the post type by the permalink
	const displayUrl = filterURLForDisplay( link.href, 30 );

	return (
		<MenuItem
			info={ displayUrl }
			iconPosition="left"
			icon={ page }
			shortcut={ 'Page' }
			className="block-editor-link-control__search-item wp-parsely-link-suggestion-link-details"
		>
			{ link.title }
		</MenuItem>
	);
};

type ReviewSuggestionProps = {
	link: LinkSuggestion,
	onNext: () => void,
	onPrevious: () => void,
	onAccept: () => void,
	onReject: () => void,
	hasPrevious: boolean,
	hasNext: boolean,
};

export const ReviewSuggestion = ( {
	link,
	onNext,
	onPrevious,
	onAccept,
	onReject,
	hasPrevious,
	hasNext,
}: ReviewSuggestionProps ): JSX.Element => {
	if ( ! link?.match ) {
		return <>No match!</>;
	}

	const blockId = link.match.blockId;
	// Get the block
	const block = selectFn( 'core/block-editor' ).getBlock( blockId );

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
