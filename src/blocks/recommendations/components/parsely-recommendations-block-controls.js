/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { layout, grid, formatListBullets } from '@wordpress/icons';

const ParselyRecommendationsBlockControls = ( { attributes: { layoutstyle }, setAttributes } ) => {
	return (
		<BlockControls group="block">
			<ToolbarGroup
				icon={ layout }
				label={ __( 'Layout' ) }
				controls={ [
					{
						title: __( 'Grid' ),
						icon: grid,
						onClick: () => setAttributes( { layoutstyle: 'grid' } ),
						disabled: layoutstyle === 'grid',
					},
					{
						title: __( 'List' ),
						icon: formatListBullets,
						onClick: () => setAttributes( { layoutstyle: 'list' } ),
						disabled: layoutstyle === 'list',
					},
				] }
			/>
		</BlockControls>
	);
};
export default ParselyRecommendationsBlockControls;
