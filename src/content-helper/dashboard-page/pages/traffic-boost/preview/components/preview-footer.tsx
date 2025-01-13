/**
 * WordPress imports
 */
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { arrowLeft, arrowRight } from '@wordpress/icons';

/**
 * Internal imports
 */
import { HydratedPost } from '../../../../../common/base-wordpress-provider';
import { VerticalDivider } from '../../../../../common/components/vertical-divider';
import { TrafficBoostLink } from '../../provider';
import { TrafficBoostStore } from '../../store';
import { TextSelection } from '../preview';

/**
 * Props structure for PreviewFooter.
 *
 * @since 3.18.0
 */
interface PreviewFooterProps {
	post: HydratedPost;
	activeLink: TrafficBoostLink | null;
	onAccept: ( link: TrafficBoostLink ) => void;
	onRemove: ( link: TrafficBoostLink ) => void;
	onUpdateLink: ( link: TrafficBoostLink ) => void;
	onDiscard: ( link: TrafficBoostLink ) => void;
	onNext: () => void;
	onPrevious: () => void;
	onSelectIndex: ( index: number ) => void;
	totalItems: number;
	itemIndex: number;
	onRestoreOriginal: () => void;
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
	onAccept,
	onUpdateLink,
	onDiscard,
	onNext,
	onPrevious,
	onRemove,
	onSelectIndex,
	totalItems,
	itemIndex,
	onRestoreOriginal,
	selectedText,
}: PreviewFooterProps ): React.JSX.Element => {
	const isInboundLink = ! activeLink?.isSuggestion;
	const hasNext = itemIndex < totalItems;
	const hasPrevious = itemIndex > 1;

	const {
		isAccepting,
		isRemoving,
	} = useSelect( ( select ) => ( {
		isAccepting: activeLink ? select( TrafficBoostStore ).isAccepting( activeLink ) : false,
		isRemoving: activeLink ? select( TrafficBoostStore ).isRemoving( activeLink ) : false,
	} ), [ activeLink ] );

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

			{ ! activeLink?.isGeneratingPlacement && (
				<div className="traffic-boost-preview-footer-actions">
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
										onClick={ () => activeLink && onUpdateLink( activeLink ) }
									>{ __( 'Update Link', 'wp-parsely' ) }</Button>
									<VerticalDivider size={ 36 } />
									<Button
										variant="tertiary"
										onClick={ onRestoreOriginal }
									>
										{ __( 'Clear changes', 'wp-parsely' ) }
									</Button>
								</>
							) : (
								<Button
									variant="tertiary"
									onClick={ () => activeLink && onRemove( activeLink ) }
									isBusy={ isRemoving }
									disabled={ isRemoving }
									isDestructive
								>{ isRemoving ? __( 'Removing…', 'wp-parsely' ) : __( 'Remove', 'wp-parsely' ) }</Button>
							) }
						</>
					) }

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
			) }

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

