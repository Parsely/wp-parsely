/**
 * WordPress imports
 */
import { Button, CheckboxControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal imports
 */
import { VerticalDivider } from '../../../../../common/components/vertical-divider';
import { TrafficBoostLink } from '../../provider';
import { TrafficBoostStore } from '../../store';
import { TextSelection } from '../preview';
import { useState } from '@wordpress/element';

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
}: PreviewActionsProps ): React.JSX.Element => {
	const isInboundLink = ! activeLink?.isSuggestion;
	const [ restoreOriginal, setRestoreOriginal ] = useState<boolean>( true );

	const {
		isAccepting,
		isRemoving,
		isGenerating,
	} = useSelect( ( select ) => ( {
		isAccepting: activeLink ? select( TrafficBoostStore ).isAccepting( activeLink ) : false,
		isRemoving: activeLink ? select( TrafficBoostStore ).isRemoving( activeLink ) : false,
		isGenerating: activeLink ? select( TrafficBoostStore ).isGenerating( activeLink ) : false,
	} ), [ activeLink ] );

	if ( ! activeLink ) {
		return <></>;
	}

	return (
		<>
			<div className="traffic-boost-preview-actions">
				{ ! isGenerating && (
					<>
						<svg className="traffic-boost-preview-actions-drag-handle" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 7H10V5H8V7ZM8 13H10V11H8V13ZM8 19H10V17H8V19ZM14 5V7H16V5H14ZM14 13H16V11H14V13ZM14 19H16V17H14V19Z" fill="#1E1E1E" />
						</svg>
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
		</>
	);
};
