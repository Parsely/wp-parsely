// eslint-disable-next-line import/named
import { BlockInstance, getBlockContent } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';
import { SmartLink, SmartLinkingProvider } from './provider';
import { escapeRegExp } from '../../common/utils/functions';
import { SmartLinkingStore } from './store';

export { escapeRegExp } from '../../common/utils/functions';

/**
 * Finds all text nodes in an element that contain a given search text and are not within an anchor tag.
 * This is useful for finding text nodes that should be linked.
 *
 * @since 3.14.1
 *
 * @param {HTMLElement} element    - The element to search within.
 * @param {string}      searchText - The text to search for.
 *
 * @return {Node[]} The text nodes that match the search text and are not within an anchor tag.
 */
export function findTextNodesNotInAnchor( element: HTMLElement, searchText: string ): Node[] {
	const walker = document.createTreeWalker( element, NodeFilter.SHOW_TEXT, {
		acceptNode: ( node ) => {
			if ( ! node.textContent || ! node.textContent.includes( searchText ) ) {
				return NodeFilter.FILTER_REJECT;
			}
			let parent = node.parentNode;
			while ( parent && parent !== element ) {
				if ( parent.nodeName === 'A' && ! parent.textContent?.includes( searchText ) ) {
					return NodeFilter.FILTER_REJECT;
				}
				parent = parent.parentNode;
			}
			return NodeFilter.FILTER_ACCEPT;
		},
	} );

	const textNodes = [];
	let node;
	while ( ( node = walker.nextNode() ) ) {
		textNodes.push( node );
	}
	return textNodes;
}

/**
 * Checks if a smart link is present in a text node.
 *
 * @since 3.16.0
 *
 * @param {Text}   textNode     The text node to check.
 * @param {string} smartLinkUID The smart link uid to check for.
 *
 * @return {boolean} Whether the smart link is present in the text node.
 */
function isLinkAtNode( textNode: Text, smartLinkUID: string ): boolean {
	let parentNode: Node | null = textNode;
	while ( parentNode && ! ( parentNode instanceof HTMLAnchorElement ) ) {
		parentNode = parentNode.parentNode;
	}
	return parentNode instanceof HTMLAnchorElement && parentNode.dataset.smartlink === smartLinkUID;
}

/**
 * Checks if a node is inside a similar node to a reference node.
 *
 * @since 3.15.0
 *
 * @param {Node}        node          The node to check.
 * @param {HTMLElement} referenceNode The reference node to compare against.
 *
 * @return {boolean} Whether the node is inside a similar node to the reference node.
 */
function isInsideSimilarNode( node: Node, referenceNode: HTMLElement ): boolean {
	let currentNode = node.parentNode;
	while ( currentNode ) {
		// Check by nodeName or any specific attribute
		if ( currentNode.nodeName === referenceNode.nodeName ) {
			return true;
		}
		currentNode = currentNode.parentNode;
	}
	return false;
}

/**
 * Finds all text nodes in an element that contain a given search text.
 *
 * @since 3.15.0
 *
 * @param {Node}   element    The element to search within.
 * @param {string} searchText The text to search for.
 *
 * @return {Node[]} The text nodes that match the search text and are not within a similar node.
 */
function findTextNodes( element: Node, searchText: string ): Node[] {
	const textNodes: Node[] = [];
	const walker = document.createTreeWalker( element, NodeFilter.SHOW_TEXT, null );

	while ( walker.nextNode() ) {
		const node = walker.currentNode;
		if ( node.textContent && node.textContent.includes( searchText ) ) {
			textNodes.push( node );
		}
	}

	return textNodes;
}

/**
 * Applies an HTML node to a block's content, replacing the text of the link with the HTML node.
 * This is useful for applying a link to a block's content.
 *
 * @since 3.15.0
 *
 * @param {BlockInstance} block    The block instance to apply the link to.
 * @param {SmartLink}     link     The link suggestion to apply.
 * @param {HTMLElement}   htmlNode The HTML node to apply to the block.
 */
export function applyNodeToBlock( block: BlockInstance, link: SmartLink, htmlNode: HTMLElement ) {
	const blockContent: string = getBlockContent( block );

	const doc = new DOMParser().parseFromString( blockContent, 'text/html' );
	const contentElement = doc.body.firstChild as HTMLElement;

	if ( ! contentElement ) {
		return;
	}

	const textNodes = findTextNodes( contentElement, link.text );

	let occurrenceCount = 0;
	let hasAddedNode = false;

	textNodes.forEach( ( node ) => {
		if ( ! node.textContent || hasAddedNode ) {
			return;
		}

		if ( isInsideSimilarNode( node, htmlNode ) ) {
			// Check if the node content contains the link text, and if so increase the occurrence count.
			if ( node.textContent?.includes( link.text ) ) {
				occurrenceCount++;
			}
			return;
		}

		const regex = new RegExp( escapeRegExp( link.text ), 'g' );
		let match;
		while ( ( match = regex.exec( node.textContent ) ) !== null ) {
			if ( occurrenceCount === link.match?.blockOffset ) {
				const anchor: HTMLElement = htmlNode.cloneNode( true ) as HTMLElement;
				anchor.textContent = match[ 0 ];

				const range = document.createRange();
				range.setStart( node, match.index );
				range.setEnd( node, match.index + match[ 0 ].length );
				range.deleteContents();
				range.insertNode( anchor );

				if ( node.textContent && match.index + match[ 0 ].length < node.textContent.length ) {
					const remainingText = document.createTextNode(
						node.textContent.slice( match.index + match[ 0 ].length )
					);
					node.parentNode?.insertBefore( remainingText, anchor.nextSibling );
				}

				hasAddedNode = true;

				return;
			}
			occurrenceCount++;
		}
	} );

	// Update the block content with the new content
	dispatch( 'core/block-editor' ).updateBlockAttributes( block.clientId, { content: contentElement.innerHTML } );
	return contentElement.innerHTML;
}

export function sortSmartLinks( smartLinks: SmartLink[] ): SmartLink[] {
	// Break-down in two buckets: applied and not applied
	const appliedLinks = smartLinks.filter( ( link ) => link.applied );
	const notAppliedLinks = smartLinks.filter( ( link ) => ! link.applied );

	const sortByBlockPosition = ( a: SmartLink, b: SmartLink ) => {
		if ( a.match!.blockPosition === b.match!.blockPosition ) {
			return a.match!.blockLinkPosition - b.match!.blockLinkPosition;
		}
		return a.match!.blockPosition - b.match!.blockPosition;
	};

	appliedLinks.sort( sortByBlockPosition );
	notAppliedLinks.sort( sortByBlockPosition );

	return [ ...notAppliedLinks, ...appliedLinks ];
}

/**
 * Recursively collect all blocks into a flat array.
 *
 * @since 3.16.0
 *
 * @param {BlockInstance[]} blocks   The blocks to flatten.
 * @param {BlockInstance[]} flatList The flat list of blocks.
 *
 * @return {BlockInstance[]} The flat list of blocks.
 */
function flattenBlocks( blocks: BlockInstance[], flatList: BlockInstance[] = [] ): BlockInstance[] {
	blocks.forEach( ( block ) => {
		if ( block.innerBlocks.length ) {
			return flattenBlocks( block.innerBlocks, flatList );
		}
		flatList.push( block );
	} );
	return flatList;
}

/**
 * Represents the counts of occurrences and applications of links within text content.
 *
 * - `encountered`: The number of times a specific link text is encountered in the content.
 * - `linked`: The number of times a link has been successfully applied for a specific link text.
 *
 * @since 3.14.1
 */
type LinkOccurrenceCounts = {
	[key: string]: {
		encountered: number;
		linked: number;
	};
};

/**
 * Iterates through blocks of content to apply smart link suggestions based on their text content and specific offset.
 *
 * This function processes each block's content to identify and handle text nodes that match provided link suggestions.
 * It filters out self-referencing links based on the given post permalink, avoids inserting links within existing anchor
 * elements, and respects the specified offset for each link to determine the correct block.
 *
 * Note: The function is recursive for blocks containing inner blocks, ensuring all nested content is processed.
 *
 * @since 3.15.0
 *
 * @param {Readonly<BlockInstance>[]} blocks           The blocks of content where links should be applied.
 * @param {SmartLink[]}               links            An array of link suggestions to apply to the content.
 * @param {LinkOccurrenceCounts}      occurrenceCounts An object to keep track of the number of times each link text has
 *                                                     been encountered and applied across all blocks.
 * @param {number}                    currentIndex     The current index of the block being processed.
 *
 * @return {SmartLink[]} The filtered array of link suggestions that have been successfully applied to the content.
 */
export function calculateSmartLinkingMatches(
	blocks: Readonly<BlockInstance>[],
	links: SmartLink[],
	occurrenceCounts: LinkOccurrenceCounts = {},
	currentIndex: number = 0
): SmartLink[] {
	blocks.forEach( ( block, index ) => {
		const currentBlockIndex = currentIndex + index;

		if ( block.innerBlocks?.length ) {
			calculateSmartLinkingMatches( block.innerBlocks, links, occurrenceCounts, currentBlockIndex );
			return;
		}

		if ( ! block.originalContent ) {
			return;
		}

		const blockContent: string = getBlockContent( block );
		const doc = new DOMParser().parseFromString( blockContent, 'text/html' );
		const contentElement = doc.body.firstChild;

		if ( ! ( contentElement instanceof HTMLElement ) ) {
			return;
		}

		const fullContent = contentElement.innerHTML;

		links.forEach( ( link ) => {
			const textNodes = findTextNodesNotInAnchor( contentElement, link.text );
			const occurrenceKey = `${ link.text }#${ link.offset }`;
			occurrenceCounts[ occurrenceKey ] = occurrenceCounts[ occurrenceKey ] || { encountered: 0, linked: 0 };

			let cumulativeTextLength = 0;
			let blockOffsetCounter = 0;

			textNodes.forEach( ( node ) => {
				const regex = new RegExp( escapeRegExp( link.text ), 'g' );
				let match;
				const nodeText = node.textContent ?? '';
				const startPosition = fullContent.indexOf( nodeText, cumulativeTextLength );

				while ( ( match = regex.exec( nodeText ) ) !== null ) {
					const occurrenceCount = occurrenceCounts[ occurrenceKey ];
					occurrenceCount.encountered++;
					blockOffsetCounter++;

					if ( occurrenceCount.encountered - 1 === link.offset && occurrenceCount.linked < 1 ) {
						occurrenceCount.linked++;
						link.match = {
							blockId: block.clientId,
							blockOffset: blockOffsetCounter - 1,
							blockPosition: currentBlockIndex,
							blockLinkPosition: startPosition + match.index,
						};
					}
				}

				cumulativeTextLength += nodeText.length;
			} );
		} );
	} );

	return links;
}

export function getAllSmartLinksInPost(): SmartLink[] {
	const blocks = flattenBlocks( select( 'core/block-editor' ).getBlocks() );
	const postContent = select( 'core/editor' ).getEditedPostContent();
	const parser = new DOMParser();
	const doc = parser.parseFromString( postContent, 'text/html' );
	const allLinks = Array.from( doc.querySelectorAll( 'a[data-smartlink]' ) as NodeListOf<HTMLAnchorElement> );
	const smartLinks: SmartLink[] = [];

	allLinks.forEach( ( link ) => {
		const uid = link.getAttribute( 'data-smartlink' ) ?? '';
		const href = link.href;
		const text = link.textContent ?? '';
		const title = link.title;

		// Find the block this link belongs to.
		const block = blocks.find(
			( blockInstance ) => getBlockContent( blockInstance ).includes( uid )
		);

		if ( ! block ) {
			return;
		}

		const blockIndex = blocks.indexOf( block );

		const smartLink: SmartLink = {
			uid,
			href,
			text,
			title,
			applied: true,
			offset: getLinkOffset( link, doc ),
			match: {
				blockId: block?.clientId ?? '',
				blockPosition: blockIndex,
				blockOffset: -1,
				blockLinkPosition: -1,
			},
		};

		smartLinks.push( smartLink );
	} );

	return calculateSmartLinkingMatches( blocks, smartLinks );
}

function getLinkOffset( link: HTMLAnchorElement, document: Document ): number {
	const smartLinkUID = link.dataset.smartlink;
	const linkText = link.textContent?.trim();

	if ( ! smartLinkUID ) {
		return -1;
	}
	if ( ! linkText ) {
		return -1;
	}

	let occurrence = 0;

	const treeWalker = document.createTreeWalker( document.body, NodeFilter.SHOW_TEXT );
	while ( treeWalker.nextNode() ) {
		const textNode = treeWalker.currentNode as Text;
		const nodeValue = textNode.nodeValue ?? '';
		let pos = nodeValue.indexOf( linkText );

		while ( pos !== -1 ) {
			if ( isLinkAtNode( textNode, smartLinkUID ) ) {
				return occurrence;
			}

			// Move to next occurrence of linkText in the current text node
			pos = nodeValue.indexOf( linkText, pos + linkText.length );
			occurrence++;
		}
	}

	return -1;
}

/**
 * Validates and fixes smart links in a specific content.
 *
 * This function checks if the smart links in the store are still present in the post content.
 * If a smart link is not found in the post content, it tries to find a link that matches the text,
 * title and href of the smart link.
 * And if the link is found, it restores the missing fields from the link (data-smartlink and title).
 *
 * @since 3.16.0
 *
 * @param {string}       content The post content to validate and fix smart links.
 * @param {string|false} blockId The block ID to filter the smart links by.
 *
 * @return {Promise<SmartLink[]>} The missing smart links that were not found in the post content.
 */
export async function validateAndFixSmartLinks( content: string, blockId: string|false = false ): Promise<SmartLink[]> {
	// Get the post content and all the smart links from the store
	let smartLinks = select( SmartLinkingStore ).getSmartLinks();

	// If a blockId is provided, filter out all the smart links that don't belong to the block
	if ( blockId ) {
		smartLinks = smartLinks.filter( ( smartLink ) => smartLink.match?.blockId === blockId );
	}

	// Create a DOM from the post content
	const parser = new DOMParser();
	const doc = parser.parseFromString( content, 'text/html' );

	const missingSmartLinks: SmartLink[] = [];

	// Check for each smart link UID in the post content
	smartLinks.forEach( ( smartLink ) => {
		// Search for the link with the UID in the post content
		const link = doc.querySelector( `a[data-smartlink="${ smartLink.uid }"]` );

		// If the link is not found, add it to the missing smart links array
		if ( ! link ) {
			missingSmartLinks.push( smartLink );
		}
	} );

	// For each missing smart link, try to find a link that matches the text, title and href
	missingSmartLinks.forEach( ( missingSmartLink ) => {
		if ( ! missingSmartLink.match?.blockId ) {
			return;
		}

		// Get the block that contains the smart link
		const block = select( 'core/block-editor' ).getBlock( missingSmartLink.match?.blockId );

		if ( ! block ) {
			return;
		}

		const blockContent: string = getBlockContent( block );
		const blockDoc = new DOMParser().parseFromString( blockContent, 'text/html' );

		const link = Array.from( blockDoc.querySelectorAll( 'a' ) ).find( ( a ) => {
			return a.textContent === missingSmartLink.text &&
				a.href === missingSmartLink.href &&
				! a.hasAttribute( 'data-smartlink' );
		} );

		if ( ! link ) {
			return;
		}

		// If the link is found, remove it from the missing smart links array
		missingSmartLinks.splice( missingSmartLinks.indexOf( missingSmartLink ), 1 );

		// Restore the missing fields from the link (data-smartlink and title).
		link.setAttribute( 'data-smartlink', missingSmartLink.uid );
		link.title = missingSmartLink.title;

		// Update the block content with the new content
		const paragraph = blockDoc.body.firstChild as HTMLElement;
		dispatch( 'core/block-editor' ).updateBlockAttributes( block.clientId, { content: paragraph.innerHTML } );
	} );

	return missingSmartLinks;
}

/**
 * Validates and fixes smart links in the post content.
 *
 * @since 3.16.0
 */
export async function validateAndFixSmartLinksInPost(): Promise<void> {
	const postContent = select( 'core/editor' ).getEditedPostContent();
	const missingLinks = await validateAndFixSmartLinks( postContent );

	// Remove any missing smart-links that are not in the store
	missingLinks.forEach( ( missingLink ) => {
		dispatch( SmartLinkingStore ).removeSmartLink( missingLink.uid );
	} );
}

/**
 * Validates and fixes smart links in a block content.
 *
 * @since 3.16.0
 *
 * @param {BlockInstance} block The block instance to validate and fix smart links.
 */
export async function validateAndFixSmartLinksInBlock( block: BlockInstance ): Promise<void> {
	const blockContent: string = getBlockContent( block );
	const missingLinks = await validateAndFixSmartLinks( blockContent, block.clientId );

	// Remove any missing smart-links that are not in the store
	missingLinks.forEach( ( missingLink ) => {
		dispatch( SmartLinkingStore ).removeSmartLink( missingLink.uid );
	} );
}

export function trimURLForDisplay( url: string, maxLength: number ): string {
	// Remove protocol (http, https) and www
	const strippedUrl = url.replace( /(^\w+:|^)\/\//, '' ).replace( /^www\./, '' );

	// If no maxLength is specified or the URL length is already less than maxLength, return the stripped URL
	if ( ! maxLength || strippedUrl.length <= maxLength ) {
		return strippedUrl;
	}

	// Calculate part lengths for trimming
	const partLength = Math.floor( ( maxLength - 3 ) / 2 );
	const start = strippedUrl.substring( 0, partLength );
	const end = strippedUrl.substring( strippedUrl.length - partLength );

	return `${ start }...${ end }`;
}
