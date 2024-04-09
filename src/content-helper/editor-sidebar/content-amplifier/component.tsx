/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { GutenbergFunction } from '../../../@types/gutenberg/types';

/**
 * Internal dependencies
 */
import { ContentAmplifierProvider } from './provider';

export const ContentAmplifierPanel = (): JSX.Element => {
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
