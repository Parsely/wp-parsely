/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Dashicon, ToolbarGroup } from '@wordpress/components';

const ParselyRecommendationsBlockControls = ( { attributes: { layoutstyle }, setAttributes } ) => {
	return (
		<BlockControls group="block">
			<ToolbarGroup
				icon={ <Dashicon icon="grid-view" /> }
				label={ __( 'Layout', 'wp-parsely' ) }
				controls={ [
					{
						title: __( 'Grid', 'wp-parsely' ),
						icon: <Dashicon icon="grid-view" />,
						onClick: () => setAttributes( { layoutstyle: 'grid' } ),
						disabled: layoutstyle === 'grid',
					},
					{
						title: __( 'List', 'wp-parsely' ),
						icon: <Dashicon icon="list-view" />,
						onClick: () => setAttributes( { layoutstyle: 'list' } ),
						disabled: layoutstyle === 'list',
					},
				] }
			/>
		</BlockControls>
	);
};
export default ParselyRecommendationsBlockControls;
