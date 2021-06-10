/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { ReactComponent as LeafIcon } from './Parsely-Logo-sRGB-Leaf-Green.svg';
import ParselyRecommendations from './components/parsely-recommendations';
import ParselyRecommendationsBlockControls from './components/parsely-recommendations-block-controls';

function ParselyRecommendationsEdit( editProps ) {
	return (
		<div { ...useBlockProps() }>
			<ParselyRecommendationsBlockControls { ...editProps } />
			<ParselyRecommendations { ...editProps.attributes } />
		</div>
	);
}

registerBlockType( 'wp-parsely/recommendations', {
	apiVersion: 2,
	title: __( 'Parse.ly Recommendations', 'wp-parsely' ),
	icon: LeafIcon,
	category: 'widgets',
	edit: ParselyRecommendationsEdit,
} );
