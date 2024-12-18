/**
 * WordPress imports
 */
import { Button, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { desktop, edit, external, moreVertical } from '@wordpress/icons';

/**
 * Internal imports
 */
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { LeafIcon } from '../../../../../common/icons/leaf-icon';
import { TrafficBoostLink } from '../../provider';
import { TextSelection } from '../preview';
import { LinkCounter } from './link-counter';

const VerticalMoreMenu = (): React.JSX.Element => {
	return (
		<DropdownMenu icon={ moreVertical } iconSize={ 24 } label={ __( 'Actions', 'wp-parsely' ) }>
			{ ( { onClose } ) => (
				<>
					<MenuGroup>
						<MenuItem icon={ edit } onClick={ onClose }>
							{ __( 'Edit Post', 'wp-parsely' ) }
						</MenuItem>
						<MenuItem icon={ external } onClick={ onClose }>
							{ __( 'View post in a new tab', 'wp-parsely' ) }
						</MenuItem>
						<MenuItem icon={ <LeafIcon /> } onClick={ onClose }>
							{ __( 'View in Parse.ly', 'wp-parsely' ) }
						</MenuItem>
					</MenuGroup>
				</>
			) }
		</DropdownMenu>
	);
};

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
	isFrontendPreview,
	setIsFrontendPreview,
	onRestoreOriginal,
}: PreviewHeaderProps ): React.JSX.Element => {
	const onToggleFrontendPreview = () => {
		setIsFrontendPreview( ! isFrontendPreview );
	};

	if ( ! activeLink ) {
		return <></>;
	}

	return (
		<div className="traffic-boost-preview-header">
			<div className="traffic-boost-preview-info">
				<div className="traffic-boost-preview-info-title">
					{ activeLink?.targetPost?.title.rendered }
				</div>
				<LinkCounter
					postLinks={ activeLink.postLinks }
					selectedLinkType={ null }
				/>
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
					isPressed={ isFrontendPreview }
					iconSize={ 24 }
					onClick={ onToggleFrontendPreview }
					label={ __( 'Toggle Frontend Preview', 'wp-parsely' ) }
				/>
				<VerticalMoreMenu />
			</div>
		</div>
	);
};
