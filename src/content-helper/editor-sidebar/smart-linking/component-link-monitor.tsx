import { BlockInstance } from '@wordpress/blocks';
import { useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { debounce } from '@wordpress/compose';

type BlockChange = {
	block: BlockInstance;
	prevBlock: BlockInstance;
	addedLinks: HTMLAnchorElement[];
	removedLinks: HTMLAnchorElement[];
	changedLinks: HTMLAnchorElement[];
};

// Function to check blocks and detect changes
const checkBlocks = (
	currentBlocks: BlockInstance[],
	previousBlocks: BlockInstance[]
): BlockChange[] => {
	const changesDetected: BlockChange[] = [];

	const traverseBlocks = ( blocks: BlockInstance[], prevBlocks: BlockInstance[] | undefined ) => {
		const domParser = new DOMParser();

		blocks.forEach( ( block, index ) => {
			if ( ! prevBlocks || ! prevBlocks[ index ] ) {
				return;
			}

			// Check inner blocks recursively
			if ( block.innerBlocks.length > 0 ) {
				return traverseBlocks( block.innerBlocks, prevBlocks[ index ].innerBlocks );
			}

			if ( JSON.stringify( block ) !== JSON.stringify( prevBlocks[ index ] ) ) {
				const prevBlock = prevBlocks[ index ];

				const blockDOM = domParser.parseFromString( block.attributes.content || '', 'text/html' );
				const prevBlockDOM = domParser.parseFromString( prevBlock?.attributes.content || '', 'text/html' );

				// Get all smart links in the block and previous block
				const smartLinks = Array.from( blockDOM.querySelectorAll( 'a[data-smartlink]' ) ) as HTMLAnchorElement[];
				const prevSmartLinks = Array.from( prevBlockDOM.querySelectorAll( 'a[data-smartlink]' ) ) as HTMLAnchorElement[];

				// Compare and make a list of added, removed, and changed smart links
				const addedLinks = smartLinks.filter(
					( link ) => ! prevSmartLinks.some(
						( prevLink ) => prevLink.dataset.smartlink === link.dataset.smartlink
					)
				);
				const removedLinks = prevSmartLinks.filter(
					( prevLink ) => ! smartLinks.some(
						( link ) => link.dataset.smartlink === prevLink.dataset.smartlink
					)
				);
				const changedLinks = smartLinks
					.filter( ( link ) => {
						const prevLink = prevSmartLinks
							.find( ( _prevLink ) => _prevLink.dataset.smartlink === link.dataset.smartlink );
						return prevLink && ( prevLink.outerHTML !== link.outerHTML );
					} );

				if ( addedLinks.length > 0 || removedLinks.length > 0 || changedLinks.length > 0 ) {
					changesDetected.push( { block, prevBlock, addedLinks, removedLinks, changedLinks } );
				}
			}
		} );
	};

	traverseBlocks( currentBlocks, previousBlocks );

	return changesDetected;
};

type onChangeCallback = ( change: BlockChange ) => void;

type LinkMonitorProps = {
	isDetectingEnabled: boolean;
	onLinkChange?: onChangeCallback;
	onLinkRemove?: onChangeCallback;
	onLinkAdd?: onChangeCallback;
	debounceValue?: number;
};

export const LinkMonitor = ( {
	isDetectingEnabled,
	onLinkChange,
	onLinkRemove,
	onLinkAdd,
	debounceValue = 500,
}: LinkMonitorProps ) => {
	const { blocks } = useSelect(
		( selectFn ) => {
			const { getBlocks } = selectFn( 'core/block-editor' ) as GutenbergFunction;
			return {
				blocks: getBlocks(),
			};
		},
		[]
	);

	const previousBlocks = useRef<BlockInstance[]>( blocks );
	const previousIsEnabledRef = useRef<boolean>( isDetectingEnabled );

	useEffect( () => {
		const debouncedCheckBlocks = debounce( ( ...args ) => {
			// If the detection is disabled or the previous detection was disabled, cancel the debounced function.
			// We need to check for the previous detection because the debounced function might be called after the
			// detection is disabled.
			if ( ! args[ 0 ] || ! previousIsEnabledRef.current ) {
				debouncedCheckBlocks.cancel();
				previousBlocks.current = blocks; // Update previous blocks reference.
				previousIsEnabledRef.current = args[ 0 ] as boolean;
				return;
			}

			const changesDetected = checkBlocks( blocks, previousBlocks.current );
			if ( changesDetected.length > 0 ) {
				changesDetected.forEach( ( changes ) => {
					if ( changes.changedLinks.length > 0 && onLinkChange ) {
						onLinkChange( changes );
					}
					if ( changes.addedLinks.length > 0 && onLinkAdd ) {
						onLinkAdd( changes );
					}
					if ( changes.removedLinks.length > 0 && onLinkRemove ) {
						onLinkRemove( changes );
					}
				} );
				previousBlocks.current = blocks; // Update previous blocks reference.
			}
		}, debounceValue );

		//console.log( 'Debounced check blocks', isDetectingEnabled );
		debouncedCheckBlocks( isDetectingEnabled );

		// Clean up the debounced function on component unmount.
		return () => {
			debouncedCheckBlocks.cancel();
		};
	}, [ blocks, isDetectingEnabled, onLinkAdd, onLinkChange, onLinkRemove ] );

	return null;
};
