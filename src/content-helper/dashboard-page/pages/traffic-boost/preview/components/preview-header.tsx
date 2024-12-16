/**
 * WordPress imports
 */
import { Button, Icon, Popover, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { desktop, edit, cog, link } from '@wordpress/icons';
import { useRef, useState } from '@wordpress/element';

/**
 * Internal imports
 */
import { LeafIcon } from '../../../../../common/icons/leaf-icon';
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { TrafficBoostLink } from '../../provider';
import { TextSelection } from '../preview';

/**
 * Props structure for PreviewHeader.
 *
 * @since 3.18.0
 */
interface PreviewHeaderProps {
	post: HydratedPost;
	activeLink: TrafficBoostLink | null;
	selectedText: TextSelection | null;
	onOpenPostInNewTab: () => void;
	onOpenPostEditor: () => void;
	onOpenParselyDashboard: () => void;
	isFrontendPreview: boolean;
	setIsFrontendPreview: ( value: boolean ) => void;
	onRestoreOriginal: () => void;
}

/**
 * Preview header component for the Traffic Boost feature.
 * Displays preview header for a selected post.
 *
 * @since 3.18.0
 *
 * @param {PreviewHeaderProps} props Component props.
 */
export const PreviewHeader = ( {
	activeLink,
	selectedText,
	onOpenPostInNewTab,
	onOpenPostEditor,
	onOpenParselyDashboard,
	isFrontendPreview,
	setIsFrontendPreview,
	onRestoreOriginal,
}: PreviewHeaderProps ): React.JSX.Element => {
	const [ isSettingsOpen, setIsSettingsOpen ] = useState<boolean>( false );
	const settingsButtonRef = useRef<HTMLButtonElement>( null );

	const toggleSettings = () => {
		setIsSettingsOpen( ( state ) => ! state );
	};

	return (
		<div className="traffic-boost-preview-header">
			<div className="traffic-boost-preview-stats">
				<div>
					<span>{ __( 'Post Stats:', 'wp-parsely' ) }</span>
					<span>12 Links</span>
					<Icon icon={ link } />
				</div>
			</div>
			<div className="traffic-boost-preview-actions">
				{ activeLink?.isSuggestion && selectedText && (
					<Button
						variant="secondary"
						onClick={ onRestoreOriginal }
						label={ __( 'Restore original suggestion', 'wp-parsely' ) }
					>
						{ __( 'Restore original', 'wp-parsely' ) }
					</Button>
				) }
				<Button
					icon={ desktop }
					onClick={ onOpenPostInNewTab }
					label={ __( 'View post on site', 'wp-parsely' ) }
				/>
				<Button
					icon={ edit }
					onClick={ onOpenPostEditor }
					label={ __( 'Edit post', 'wp-parsely' ) }
				/>
				<Button
					iconSize={ 20 }
					icon={ <LeafIcon /> }
					onClick={ onOpenParselyDashboard }
					label={ __( 'View in Parse.ly', 'wp-parsely' ) }
				/>
				<Button
					ref={ settingsButtonRef }
					icon={ cog }
					onClick={ toggleSettings }
					label={ __( 'Preview Settings', 'wp-parsely' ) }
					className="traffic-boost-preview-settings-button"
				/>
				{ isSettingsOpen && (
					<Popover
						className="wp-parsely-traffic-boost-preview-settings-popover"
						anchor={ settingsButtonRef.current }
						position="bottom left"
						onFocusOutside={ ( event: React.SyntheticEvent<Element, Event> ) => {
							// Don't close if clicking the settings button.
							const target = ( event.nativeEvent as FocusEvent ).relatedTarget as Element | null;
							if ( target === settingsButtonRef.current ) {
								return;
							}
							setIsSettingsOpen( false );
						} }
						noArrow={ false }
					>
						<div className="wp-parsely-traffic-boost-preview-settings-popover-content">
							<ToggleControl
								__nextHasNoMarginBottom
								label="Frontend Preview"
								checked={ isFrontendPreview }
								onChange={ setIsFrontendPreview }
								help="Preview post as it appears on your site's frontend"
							/>
						</div>
					</Popover>
				) }
			</div>
		</div>
	);
};
