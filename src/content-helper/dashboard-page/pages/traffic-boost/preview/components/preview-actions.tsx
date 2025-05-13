/**
 * WordPress imports
 */
import { Button, CheckboxControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useEffect, useState, useRef } from '@wordpress/element';

/**
 * Internal imports
 */
import { VerticalDivider } from '../../../../../common/components/vertical-divider';
import { TrafficBoostLink } from '../../provider';
import { TrafficBoostStore } from '../../store';
import { TextSelection } from '../preview';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

/**
 * Props structure for PreviewActions.
 *
 * @since 3.19.0
 */
interface PreviewActionsProps {
	activeLink: TrafficBoostLink | null;
	onAccept: ( link: TrafficBoostLink ) => void;
	onRemove: ( link: TrafficBoostLink, restoreOriginal: boolean ) => void;
	onUpdateLink: ( link: TrafficBoostLink, restoreOriginal: boolean ) => void;
	onDiscard: ( link: TrafficBoostLink ) => void;
	onRestoreOriginal: () => void;
	selectedText: TextSelection | null;
	highlightedRect: { top: number; left: number; width: number; height: number } | null;
}

/**
 * Preview footer component for the Traffic Boost feature.
 * Displays link options for a selected post.
 *
 * @since 3.19.0
 *
 * @param {PreviewActionsProps} props The component's props.
 */
export const PreviewActions = ( {
	activeLink,
	onAccept,
	onUpdateLink,
	onDiscard,
	onRemove,
	onRestoreOriginal,
	selectedText,
	highlightedRect,
}: PreviewActionsProps ): React.JSX.Element => {
	const isInboundLink = ! activeLink?.isSuggestion;
	const [ restoreOriginal, setRestoreOriginal ] = useState<boolean>( true );
	const [ actionsPosition, setActionsPosition ] = useState<{ x: number; y: number }>( { x: 0, y: 0 } );
	const actionsBarRef = useRef<HTMLDivElement>( null );

	const {
		isAccepting,
		isRemoving,
		isGenerating,
	} = useSelect( ( select ) => ( {
		isAccepting: activeLink ? select( TrafficBoostStore ).isAccepting( activeLink ) : false,
		isRemoving: activeLink ? select( TrafficBoostStore ).isRemoving( activeLink ) : false,
		isGenerating: activeLink ? select( TrafficBoostStore ).isGenerating( activeLink ) : false,
	} ), [ activeLink ] );

	useEffect( () => {
		if ( highlightedRect && actionsBarRef.current ) {
			console.log( 'Updating actions position with highlightedRect:', highlightedRect );

			// Get actual dimensions of the actions bar
			const actionsBarWidth = actionsBarRef.current.offsetWidth;
			const actionsBarHeight = actionsBarRef.current.offsetHeight;

			// Center the actions bar above the highlighted element
			// Position the bar above the highlight with some space
			setActionsPosition( {
				x: highlightedRect.left + ( highlightedRect.width / 2 ) - ( actionsBarWidth / 2 ),
				y: highlightedRect.top - actionsBarHeight - 15, // 10px space between highlight and bar
			} );
		}
	}, [ highlightedRect ] );

	const onControlledDrag = ( event: DraggableEvent, draggableData: DraggableData ) => {
		const { x, y } = draggableData;
		setActionsPosition( { x, y } );
	};

	if ( ! activeLink ) {
		return <></>;
	}

	return (
		<Draggable bounds="parent" handle=".traffic-boost-preview-actions-drag-handle" position={ actionsPosition } onDrag={ onControlledDrag }>
			<div className="traffic-boost-preview-actions" ref={ actionsBarRef }>
				{ ! isGenerating && (
					<>
						<div className="traffic-boost-preview-actions-drag-handle">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8 7H10V5H8V7ZM8 13H10V11H8V13ZM8 19H10V17H8V19ZM14 5V7H16V5H14ZM14 13H16V11H14V13ZM14 19H16V17H14V19Z" fill="#1E1E1E" />
							</svg>
						</div>
						<div className="traffic-boost-preview-actions-buttons">
							{ ! isInboundLink && (
								<>
									<Button
										variant="primary"
										onClick={ () => onAccept( activeLink ) }
										isBusy={ isAccepting }
										disabled={ isAccepting }
									>{ isAccepting ? __( 'Accepting…', 'wp-parsely' ) : __( 'Accept', 'wp-parsely' ) }</Button>
									<Button
										variant="tertiary"
										onClick={ () => onDiscard( activeLink ) }
									>{ __( 'Discard', 'wp-parsely' ) }</Button>
									{ selectedText && (
										<>
											<VerticalDivider size={ 36 } />
											<Button
												variant="tertiary"
												onClick={ onRestoreOriginal }
											>
												{ __( 'Clear changes', 'wp-parsely' ) }
											</Button>
										</>
									) }
								</>
							) }

							{ isInboundLink && (
								<>
									{ selectedText ? (
										<>
											<Button
												variant="primary"
												onClick={ () => onUpdateLink( activeLink, restoreOriginal ) }
												isBusy={ isAccepting }
												disabled={ isAccepting }
											>{ __( 'Update Link', 'wp-parsely' ) }</Button>
											{ activeLink.smartLink?.is_link_replacement && (
												<CheckboxControl
													__nextHasNoMarginBottom
													label={ __( 'Restore original link?', 'wp-parsely' ) }
													checked={ restoreOriginal }
													onChange={ ( value ) => {
														setRestoreOriginal( value );
													} }
												/>
											) }
											<VerticalDivider size={ 36 } />
											<Button
												variant="tertiary"
												onClick={ onRestoreOriginal }
											>
												{ __( 'Clear changes', 'wp-parsely' ) }
											</Button>
										</>
									) : (
										<>
											<Button
												variant="tertiary"
												onClick={ () => onRemove( activeLink, restoreOriginal ) }
												isBusy={ isRemoving }
												disabled={ isRemoving }
												isDestructive
											>{ isRemoving ? __( 'Removing…', 'wp-parsely' ) : __( 'Remove', 'wp-parsely' ) }</Button>
											{ activeLink.smartLink?.is_link_replacement && (
												<CheckboxControl
													__nextHasNoMarginBottom
													label={ __( 'Restore original link?', 'wp-parsely' ) }
													checked={ restoreOriginal }
													onChange={ ( value ) => {
														setRestoreOriginal( value );
													} }
												/>
											) }
										</>
									) }
								</>
							) }
						</div>
					</>
				) }
			</div>
		</Draggable>
	);
};
