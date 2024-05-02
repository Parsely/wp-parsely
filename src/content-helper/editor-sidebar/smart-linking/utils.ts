// eslint-disable-next-line import/named
import { BlockInstance, getBlockContent } from '@wordpress/blocks';
import { LinkSuggestion } from './provider';
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

interface NodePosition {
	node: Node;
	offset: number;
}
export function findNodeAtPosition( root: Node, position: number ): NodePosition | null {
	const nodeIterator = document.createNodeIterator( root, NodeFilter.SHOW_TEXT );
	let currentPos = 0;
	let currentNode: Node | null;

	while ( ( currentNode = nodeIterator.nextNode() ) ) {
		const textNode = currentNode as Text; // Cast to Text for better type safety
		const length = textNode.length; // Use .length directly on Text node

		if ( currentPos + length > position ) {
			return { node: textNode, offset: position - currentPos };
		}
		currentPos += length;
	}
	return null;
}

export function flattenHTML( root: HTMLElement ): { flattened: string, positions: Array<{ node: Node, start: number, end: number }> } {
	let result = '';
	const positions: Array<{ node: Node, start: number, end: number }> = [];
	let currentPos = 0;

	const nodeIterator = document.createNodeIterator( root, NodeFilter.SHOW_ALL, {
		acceptNode: ( node ) => {
			if ( node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE ) {
				return NodeFilter.FILTER_ACCEPT;
			}
			return NodeFilter.FILTER_REJECT;
		},
	} );

	let currentNode: Node | null;
	while ( ( currentNode = nodeIterator.nextNode() ) ) {
		if ( currentNode.nodeType === Node.TEXT_NODE ) {
			const length = ( currentNode as Text ).length;
			positions.push( { node: currentNode, start: currentPos, end: currentPos + length } );
			result += currentNode.textContent;
			currentPos += length;
		} else if ( currentNode.nodeType === Node.ELEMENT_NODE ) {
			const element = currentNode as HTMLElement;
			const openTag = `<${ element.tagName.toLowerCase() }>`;
			const closeTag = `</${ element.tagName.toLowerCase() }>`;
			result += openTag;
			currentPos += openTag.length;
			positions.push( { node: element, start: currentPos, end: currentPos } ); // Placeholder for elements
			result += closeTag;
			currentPos += closeTag.length;
		}
	}
	return { flattened: result, positions };
}

/**
 * Applies a HTML node to a block's content, replacing the text of the link with the HTML node.
 * This is useful for applying a link to a block's content.
 *
 * @since 3.15.0
 *
 * @param block
 * @param link
 * @param htmlNode
 */
export function applyNodeToBlock( block: BlockInstance, link: LinkSuggestion, htmlNode: HTMLElement ) {
	const blockContent: string = getBlockContent( block );

	const doc = new DOMParser().parseFromString( blockContent, 'text/html' );
	const contentElement = doc.body.firstChild;

	if ( ! contentElement || ! ( contentElement instanceof HTMLElement ) ) {
		return;
	}

	const textNodes = findTextNodesNotInAnchor( contentElement, link.text );

	textNodes.forEach( ( node ) => {
		if ( ! node.textContent ) {
			return;
		}

		const regex = new RegExp( escapeRegExp( link.text ), 'g' );
		let match;
		while ( ( match = regex.exec( node.textContent ) ) !== null ) {
			const anchor: HTMLElement = htmlNode;
			anchor.textContent = match[ 0 ];

			const range = document.createRange();
			range.setStart( node, match.index );
			range.setEnd( node, match.index + match[ 0 ].length );
			range.deleteContents();
			range.insertNode( anchor );

			if (
				node.textContent &&
				match.index + match[ 0 ].length < node.textContent.length
			) {
				const remainingText = document.createTextNode(
					node.textContent.slice( match.index + match[ 0 ].length )
				);
				node.parentNode?.insertBefore( remainingText, anchor.nextSibling );
			}
		}
	} );

	// Update the block content with the new content
	block.attributes.content = contentElement.innerHTML;
}
