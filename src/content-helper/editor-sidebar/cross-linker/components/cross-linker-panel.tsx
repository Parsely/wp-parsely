import { Button, CheckboxControl, Disabled, PanelRow } from '@wordpress/components';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import { GutenbergFunction } from '../../../../@types/gutenberg/types';
import { CrossLinkerSettings } from './cross-linker-settings';
import { __ } from '@wordpress/i18n';
import { BlockOverlay } from './block-overlay';
import { CrossLinkerStore } from '../store';

type CrossLinkerPanelProps = {
	className?: string;
	selectedBlockClientId?: string;
}

export const CrossLinkerPanel = ( { className, selectedBlockClientId }: CrossLinkerPanelProps ) => {
	const {
		loading,
		settingsOpen,
		fullContent,
		overlayBlocks,
		generatingBlocks,
	} = useSelect( ( select ) => {
		const {
			isLoading,
			areSettingsOpen,
			getOverlayBlocks,
			getGeneratingBlock,
			isFullContent,
		} = select( CrossLinkerStore );
		return {
			loading: isLoading(),
			settingsOpen: areSettingsOpen(),
			fullContent: isFullContent(),
			overlayBlocks: getOverlayBlocks(),
			generatingBlocks: getGeneratingBlock(),
		};
	}, [] );

	const {
		setLoading,
		setFullContent,
		setSettingsOpen,
		setOverlayBlocks,
		setGeneratingBlock,
		addOverlayBlock,
		removeOverlayBlock,
	} = useDispatch( CrossLinkerStore );

	const { selectedBlock, allBlocks } = useSelect( ( select ) => {
		const { getSelectedBlock, getBlock, getBlocks } = select( 'core/block-editor' ) as GutenbergFunction;

		return {
			selectedBlock: selectedBlockClientId ? getBlock( selectedBlockClientId ) : getSelectedBlock(),
			allBlocks: getBlocks(),
		};
	}, [ selectedBlockClientId ] );

	const generateCrossLinks = () => async () => {
		await setLoading( true );

		// If selected block is not set, the overlay will be applied to the entire content.
		applyOverlay( fullContent ? 'all' : selectedBlock?.clientId );

		// After 15 seconds without a response, timeout and remove any overlay.
		setTimeout( () => {
			setLoading( false );
			// If selected block is not set, the overlay will be removed from the entire content.
			removeOverlay( fullContent ? 'all' : selectedBlock?.clientId );
		}, 15000 );
	};

	const applyOverlay = ( clientId: string = 'all' ) => {
		console.log( 'applyOverlay', clientId );
		addOverlayBlock( clientId );
		disableSave();
	};

	const removeOverlay = ( clientId: string = 'all' ) => {
		removeOverlayBlock( clientId );
		// If there are no more overlay blocks, enable save.
		if ( overlayBlocks.length === 0 ) {
			enableSave();
		}
	};

	const disableSave = () => {
		console.log( 'disableSave' );
		dispatch( 'core/editor' ).lockPostSaving( 'wp-parsely-block-overlay' );
		const saveButtons = document.querySelectorAll( '.edit-post-header__settings>[type="button"]' );
		saveButtons.forEach( ( button ) => {
			button.setAttribute( 'disabled', 'disabled' );
		} );
	};

	const enableSave = () => {
		console.log( 'enableSave' );
		const saveButtons = document.querySelectorAll( '.edit-post-header__settings>[type="button"]' );
		saveButtons.forEach( ( button ) => {
			button.removeAttribute( 'disabled' );
		} );
		// Unlock post saving.
		dispatch( 'core/editor' ).unlockPostSaving( 'wp-parsely-block-overlay' );
	};

	return (
		<div className="wp-parsely-cross-linker">
			<PanelRow className={ className }>
				<div className="wp-parsely-cross-linker-text">
					{ selectedBlock
						? 'Generate cross links automatically for this block using Parse.ly AI.'
						: 'Generate cross links for the content of this post using Parse.ly AI, or select an individual block to generate cross links for that block.' }
				</div>
				<CrossLinkerSettings disabled={ loading } />
				<div className="wp-parsely-cross-linker-generate">
					<Button
						onClick={ generateCrossLinks() }
						variant="primary"
						isBusy={ loading }
						disabled={ loading }
					>
						{ loading ? __( 'Generating…', 'wp-parsely' ) : __( 'Generate Cross Links', 'wp-parsely' ) }
					</Button>
					<Disabled isDisabled={ loading }>
						<CheckboxControl
							checked={ selectedBlock ? fullContent : true }
							disabled={ loading }
							onChange={ selectedBlock ? setFullContent : () => { /* empty */ } }
							label={ __( 'Generate cross links for the entire content', 'wp-parsely' ) }
						/>
					</Disabled>
				</div>
			</PanelRow>
		</div>
	);
};
