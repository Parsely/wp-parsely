// eslint-disable-next-line import/named
import { BlockInstance, getBlockContent, serialize } from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { SmartLink } from './provider';
import { escapeRegExp } from '../../common/utils/functions';

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
 * Finds all text nodes in an element that contain a given search text and are not within a similar node.
 *
 * @since 3.15.0
 *
 * @param {Node}        element       The element to search within.
 * @param {string}      searchText    The text to search for.
 * @param {HTMLElement} referenceNode The reference node to compare against.
 *
 * @return {Node[]} The text nodes that match the search text and are not within a similar node.
 */
function findTextNodesNotInSimilarNode( element: Node, searchText: string, referenceNode: HTMLElement ): Node[] {
	const textNodes: Node[] = [];
	const walker = document.createTreeWalker( element, NodeFilter.SHOW_TEXT, null );

	while ( walker.nextNode() ) {
		const node = walker.currentNode;
		if ( node.textContent && node.textContent.includes( searchText ) && ! isInsideSimilarNode( node, referenceNode ) ) {
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

	const textNodes = findTextNodesNotInSimilarNode( contentElement, link.text, htmlNode );
	let occurrenceCount = 0;
	let hasAddedNode = false;

	textNodes.forEach( ( node ) => {
		if ( ! node.textContent || isInsideSimilarNode( node, htmlNode ) || hasAddedNode ) {
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

	// Update the block content with the new content.
	block.attributes.content = contentElement.innerHTML;
}

export function sortSmartLinks( smartLinks: SmartLink[] ): SmartLink[] {
	// Break-down in two buckets: applied and not applied
	const appliedLinks = smartLinks.filter( ( link ) => link.applied );
	const notAppliedLinks = smartLinks.filter( ( link ) => ! link.applied );

	const sortByBlockPosition = ( a: SmartLink, b:SmartLink ) => {
		if ( a.match!.blockPosition === b.match!.blockPosition ) {
			return a.match!.blockOffset - b.match!.blockOffset;
		}
		return a.match!.blockPosition - b.match!.blockPosition;
	};

	appliedLinks.sort( sortByBlockPosition );
	notAppliedLinks.sort( sortByBlockPosition );

	return [ ...notAppliedLinks, ...appliedLinks ];
}

/**
 * Recursively collect all blocks into a flat array.
 * @param blocks     The array of blocks to flatten.
 * @param flatList   The array to collect into.
 * @param startIndex The starting index for the blocks at this level.
 * @return A flat array of all blocks with their position.
 */
function flattenBlocks( blocks: BlockInstance[], flatList: BlockInstance[] = [], startIndex: number = 0 ): BlockInstance[] {
	blocks.forEach( ( block ) => {
		if ( block.innerBlocks.length ) {
			return flattenBlocks( block.innerBlocks, flatList );
		}
		flatList.push( block );
	} );
	return flatList;
}

export function getAllSmartLinksInPost(): SmartLink[] {
	const blocks = flattenBlocks( select( 'core/block-editor' ).getBlocks() );
	const smartLinks: SmartLink[] = [];

	blocks.forEach( ( block: BlockInstance, blockIndex: number ) => {
		const blockContent = getBlockContent( block );
		const parser = new DOMParser();
		const doc = parser.parseFromString( blockContent, 'text/html' );
		const links = Array.from( doc.querySelectorAll( 'a[data-smartlink]' ) as NodeListOf<HTMLAnchorElement> );

		links.forEach( ( link ) => {
			const uid = link.getAttribute( 'data-smartlink' ) ?? '';
			const href = link.href;
			const text = link.textContent ?? '';
			const title = link.title;

			const smartLink: SmartLink = {
				uid,
				href,
				text,
				title,
				applied: true,
				offset: -1,
				match: {
					blockId: block.clientId,
					blockPosition: blockIndex,
					blockOffset: -1,
				},
			};

			smartLinks.push( smartLink );
		} );
	} );

	return smartLinks;
}

/**
 * Count the occurrences of a substring in a string.
 * @param {string} string    The string to search within.
 * @param {string} substring The substring to count.
 * @return {number} The number of occurrences.
 */
function countOccurrences( string: string, substring: string ): number {
	return string.split( substring ).length - 1;
}

/**
 * Calculate the offset of a link in a block. The offset represents the number of the occurrence of the link text in the block content.
 * @param link
 * @param block
 * @param content
 */
function calculateOffset( link: SmartLink, content: string ): number {
	const parser = new DOMParser();
	const doc = parser.parseFromString( content, 'text/html' );
	const body = doc.body;

	// Function to recursively collect all text nodes
	function collectTextNodes( element: Node, textNodes: Text[] ): void {
		for ( let node = element.firstChild; node; node = node.nextSibling ) {
			if ( node.nodeType === Node.TEXT_NODE ) {
				textNodes.push( node as Text );
			} else if ( node.nodeType === Node.ELEMENT_NODE ) {
				collectTextNodes( node, textNodes );
			}
		}
	}

	const textNodes: Text[] = [];
	collectTextNodes( body, textNodes );

	let occurrence = 0;
	let foundTargetLink = false;

	// Check each text node for occurrences of the link's text
	textNodes.forEach( ( node ) => {
		const parentElement = node.parentNode as Element;
		const index = node.textContent!.indexOf( link.text );
		if ( index !== -1 ) {
			// Check if this text node is part of an <a> element with the correct UID
			if ( parentElement.tagName === 'A' && parentElement.getAttribute( 'data-smartlink' ) === link.uid ) {
				foundTargetLink = true;
			}

			if ( ! foundTargetLink ) {
				occurrence++;
			}
		}
	} );

	if ( ! foundTargetLink ) {
		console.error( 'Link with the specified UID not found' );
		return -1;
	}

	return occurrence;
}
