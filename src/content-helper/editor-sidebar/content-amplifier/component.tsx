/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { select, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { GutenbergFunction } from '../../../@types/gutenberg/types';

/**
 * Internal dependencies
 */
import { ContentAmplifierProvider } from './provider';

export const ContentAmplifierPanel = (): JSX.Element => {
	const editor = select( 'core/editor' );

	// We cannot show data for non-published posts.
	if ( false === editor.isCurrentPostPublished() ) {
		return (
			<div className="wp-parsely-content-amplifier">
				<p>
					{ __(
						'You must publish the post before you can use the Content Amplifier.',
						'wp-parsely',
					) }
				</p>
			</div>
		);
	}

	const onClickUpdatePost = async () => {
		ContentAmplifierProvider.updateExternalPost( 97441, postPermalink );
	};

	/**
	 * Loads the selected block and post content.
	 *
	 * @since 3.14.0
	 */
	const { postPermalink } = useSelect( ( selectFn ) => {
		const { getCurrentPostAttribute } = selectFn( 'core/editor' ) as GutenbergFunction;

		return {
			postPermalink: getCurrentPostAttribute( 'link' ),
		};
	}, [] );

	return (
		<div className="wp-parsely-content-amplifier">
			<p>
				{ __(
					'Clicking this button will update another post using a custom WP endpoint.',
					'wp-parsely',
				) }
			</p>
			<Button variant="primary" onClick={ onClickUpdatePost }>
				{ ' ' }
				{ __( 'Update the External Post', 'wp-parsely' ) }{ ' ' }
			</Button>
		</div>
	);
};
