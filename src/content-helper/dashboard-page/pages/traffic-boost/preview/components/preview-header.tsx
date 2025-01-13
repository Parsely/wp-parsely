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
import { LinkCounter } from './link-counter';

/**
 * Props structure for VerticalMoreMenu.
 *
 * @since 3.18.0
 */
interface VerticalMoreMenuProps {
	post: HydratedPost;
	onEditClick: ( post: HydratedPost ) => void;
	onViewInNewTabClick: ( post: HydratedPost ) => void;
	onViewInParseLyClick: ( post: HydratedPost ) => void;
}

const VerticalMoreMenu = ( {
	post,
	onEditClick,
	onViewInNewTabClick,
	onViewInParseLyClick,
}: VerticalMoreMenuProps ): React.JSX.Element => {
	const onClickHandler = ( type: string, onClose: () => void ) => {
		switch ( type ) {
			case 'edit':
				onEditClick( post );
				break;
			case 'view-in-new-tab':
				onViewInNewTabClick( post );
				break;
			case 'view-in-parse-ly':
				onViewInParseLyClick( post );
				break;
		}
		onClose();
	};

	return (
		<DropdownMenu icon={ moreVertical } iconSize={ 24 } label={ __( 'Actions', 'wp-parsely' ) }>
			{ ( { onClose } ) => (
				<>
					<MenuGroup>
						<MenuItem icon={ edit } onClick={ () => onClickHandler( 'edit', onClose ) }>
							{ __( 'Edit Post', 'wp-parsely' ) }
						</MenuItem>
						<MenuItem icon={ external } onClick={ () => onClickHandler( 'view-in-new-tab', onClose ) }>
							{ __( 'View post in a new tab', 'wp-parsely' ) }
						</MenuItem>
						<MenuItem icon={ <LeafIcon /> } onClick={ () => onClickHandler( 'view-in-parse-ly', onClose ) }>
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
	onOpenPostInNewTab: () => void;
	onOpenPostEditor: () => void;
	onOpenParselyDashboard: () => void;
	isFrontendPreview: boolean;
	setIsFrontendPreview: ( value: boolean ) => void;
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
	isFrontendPreview,
	setIsFrontendPreview,
	onOpenPostEditor,
	onOpenPostInNewTab,
	onOpenParselyDashboard,
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
				<Button
					icon={ desktop }
					isPressed={ isFrontendPreview }
					iconSize={ 24 }
					onClick={ onToggleFrontendPreview }
					label={ __( 'Toggle Frontend Preview', 'wp-parsely' ) }
				/>
				<VerticalMoreMenu
					post={ activeLink.targetPost }
					onEditClick={ onOpenPostEditor }
					onViewInNewTabClick={ onOpenPostInNewTab }
					onViewInParseLyClick={ onOpenParselyDashboard }
				/>
			</div>
		</div>
	);
};
