/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ContentAmplifierProvider } from './provider';

export const ContentAmplifierPanel = (): JSX.Element => {
	const onClickUpdatePost = async () => {
		ContentAmplifierProvider.updateExternalPost( 97441 );
	};

	return (
		<div className="wp-parsely-content-amplifier">
			<p>
				{ __(
					'Clicking this button will update another post using a custom WP endpoint.',
					'wp-parsely'
				) }</p>
			<Button
				variant="primary"
				onClick={ onClickUpdatePost }
			> { __( 'Update the External Post', 'wp-parsely' ) } </Button>
		</div>
	);
};
