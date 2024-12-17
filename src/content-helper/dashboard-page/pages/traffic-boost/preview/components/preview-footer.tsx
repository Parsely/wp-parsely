/**
 * WordPress imports
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { arrowLeft, arrowRight } from '@wordpress/icons';

/**
 * Internal imports
 */
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { TrafficBoostLink } from '../../provider';

/**
 * Props structure for PreviewFooter.
 *
 * @since 3.18.0
 */
interface PreviewFooterProps {
	post: HydratedPost;
	activeLink: TrafficBoostLink | null;
	onAccept: () => void;
	onDiscard: () => void;
	onNext: () => void;
	onPrevious: () => void;
	onSelectIndex: ( index: number ) => void;
	totalItems: number;
	itemIndex: number;
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
	onAccept,
	onDiscard,
	onNext,
	onPrevious,
	onSelectIndex,
	totalItems,
	itemIndex,
}: PreviewFooterProps ): React.JSX.Element => {
	const isInboundLink = ! activeLink?.isSuggestion;
	const hasNext = itemIndex < totalItems;
	const hasPrevious = itemIndex > 1;

	if ( ! post ) {
		return <></>;
	}

	return (
		<div className="traffic-boost-preview-footer">
			<div className="traffic-boost-preview-footer-previous">
				{ hasPrevious && (
					<Button
						variant="tertiary"
						onClick={ onPrevious }
						icon={ arrowLeft }
					/>
				) }
			</div>
			<div className="traffic-boost-preview-footer-actions">
				<Button
					variant="primary"
					onClick={ onAccept }
				>{ __( 'Accept', 'wp-parsely' ) }</Button>
				<Button
					variant="tertiary"
					onClick={ onDiscard }
				>{ __( 'Discard', 'wp-parsely' ) }</Button>
				{ ! isInboundLink && (
					<div className="traffic-boost-preview-footer-navigation">
						{ __( 'Suggestion', 'wp-parsely' ) }
						<select
							className="traffic-boost-preview-footer-navigation-number"
							value={ itemIndex }
							onChange={ ( e ) => {
								const newIndex = parseInt( e.target.value, 10 );
								onSelectIndex( newIndex );
							} }
						>
							{ Array.from( { length: totalItems }, ( _, i ) => (
								<option key={ i + 1 } value={ i + 1 }>{ i + 1 }</option>
							) ) }
						</select>
						{ __( 'of', 'wp-parsely' ) }
						<span className="traffic-boost-preview-footer-navigation-number">
							{ totalItems }
						</span>
					</div>
				) }
			</div>

			<div className="traffic-boost-preview-footer-next">
				{ hasNext && (
					<Button
						variant="tertiary"
						onClick={ onNext }
						icon={ arrowRight }
					/>
				) }
			</div>

		</div>
	);
};
