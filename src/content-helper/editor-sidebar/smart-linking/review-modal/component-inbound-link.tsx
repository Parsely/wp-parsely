import { BlockInstance, parse } from '@wordpress/blocks';
import { __experimentalDivider as Divider, Button, Tooltip } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { arrowLeft, arrowRight, check, closeSmall, Icon } from '@wordpress/icons';
import { InboundSmartLink } from '../provider';
import { BlockPreview } from './component-block-preview';

type InboundLinkDetailsProps = {
	link: InboundSmartLink,
	onPrevious: () => void,
	onNext: () => void,
	hasPrevious: boolean,
	hasNext: boolean,
};

export const InboundLinkDetails = (	{
	link,
	onPrevious,
	onNext,
	hasPrevious,
	hasNext,
}: InboundLinkDetailsProps ): React.JSX.Element => {
	const [ blocks, setBlocks ] = useState<BlockInstance[]>( [] );

	useEffect( () => {
		const paragraph = link.post_data?.paragraph;

		const gutenbergParagraph = `<!-- wp:paragraph -->
${ paragraph ?? '<p></p>' }
<!-- /wp:paragraph -->`;

		if ( ! paragraph ) {
			return;
		}

		setBlocks( parse( gutenbergParagraph ) );
	}, [ link ] );

	return (
		<div className="smart-linking-review-suggestion">
			<div className="review-suggestion-post-title">
				{ link.post_data?.title }
			</div>
			<div className="review-suggestion-preview">
				<BlockPreview block={ blocks[ 0 ] } link={ link } useOriginalBlock />
			</div>
			<Divider />

			<div className="review-controls">
				<Tooltip shortcut="←" text={ __( 'Previous', 'wp-parsely' ) }>
					<Button
						disabled={ ! hasPrevious }
						className="wp-parsely-review-suggestion-previous"
						onClick={ onPrevious }
						icon={ arrowLeft }>
						{ __( 'Previous', 'wp-parsely' ) }
					</Button>
				</Tooltip>
				<div className="reviews-controls-middle">
					Hey
				</div>
				<Tooltip shortcut="→" text={ __( 'Next', 'wp-parsely' ) }>
					<Button
						disabled={ ! hasNext }
						onClick={ onNext }
						className="wp-parsely-review-suggestion-next"
					>
						{ __( 'Next', 'wp-parsely' ) }
						<Icon icon={ arrowRight } />
					</Button>
				</Tooltip>
			</div>
		</div>
	);
};
