// eslint-disable-next-line import/named
import { BlockInstance, getBlockContent } from '@wordpress/blocks';
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
			console.log( 'skip' );
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
