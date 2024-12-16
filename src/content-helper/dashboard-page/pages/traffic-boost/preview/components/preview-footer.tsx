/**
 * WordPress imports
 */
import { Button, Card, CardBody, CardHeader } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { page } from '@wordpress/icons';

/**
 * Internal imports
 */
import { LinkOptionsPanel } from './link-options-panel';
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { Thumbnail } from '../../../../../common/components/thumbnail';
import { TrafficBoostLink } from '../../provider';
import { TextSelection } from '../preview';

/**
 * Props structure for PreviewFooter.
 *
 * @since 3.18.0
 */
interface PreviewFooterProps {
	post: HydratedPost;
	activeLink: TrafficBoostLink | null;
	onApprove: () => void;
	onDiscard: () => void;
	onTextChange: ( value: string ) => void;
	onNewTabChange: ( value: boolean ) => void;
	onNofollowChange: ( value: boolean ) => void;
	selectedText: TextSelection | null;
}

/**
 * Preview footer component for the Traffic Boost feature.
 * Displays link options for a selected post.
 *
 * @since 3.18.0
 *
 * @param {PreviewFooterProps} props Component props.
 */
export const PreviewFooter = ( {
	post,
	activeLink,
	onApprove,
	onDiscard,
	onTextChange,
	onNewTabChange,
	onNofollowChange,
	selectedText,
}: PreviewFooterProps ): React.JSX.Element => {
	if ( ! post ) {
		return <></>;
	}

	return (
		<div className="traffic-boost-preview-footer">
			<Card>
				<CardHeader className="traffic-boost-preview-footer-header">
					<div className="traffic-boost-preview-footer-details">
						<Thumbnail
							post={ post }
							size={ 64 }
							icon={ page }
						/>
						<div className="details-wrapper">
							<div className="details-title">{ post?.title.rendered }</div>
							<div className="details-url">{ post?.guid?.rendered }</div>
						</div>
					</div>
					<div className="traffic-boost-preview-footer-actions">
						<Button
							variant="primary"
							onClick={ onApprove }
						>{ __( 'Insert', 'wp-parsely' ) }</Button>
						<Button
							variant="secondary"
							onClick={ onDiscard }
						>{ __( 'Discard', 'wp-parsely' ) }</Button>
					</div>
				</CardHeader>
				<CardBody className="traffic-boost-preview-footer-body">
					<LinkOptionsPanel
						post={ post }
						activeLink={ activeLink }
						onTextChange={ onTextChange }
						onNewTabChange={ onNewTabChange }
						onNofollowChange={ onNofollowChange }
						linkText={ selectedText?.text ?? '' }
					/>
				</CardBody>
			</Card>
		</div>
	);
};
