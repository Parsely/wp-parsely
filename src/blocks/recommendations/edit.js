/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import ParselyRecommendations from './components/parsely-recommendations';
import ParselyRecommendationsBlockControls from './components/parsely-recommendations-block-controls';
import ParselyRecommendationsInspectorControls from './components/parsely-recommendations-inspector-controls';
import RecommendationsStore from './recommendations-store';
import { ReactComponent as LeafIcon } from './Parsely-Logo-sRGB-Leaf-Green.svg';

import './style.scss';

export const ParselyRecommendationsEdit = ( editProps ) => (
	<div { ...useBlockProps() }>
		<RecommendationsStore clientId={ editProps.clientId }>
			<ParselyRecommendationsBlockControls { ...editProps } />
			<ParselyRecommendationsInspectorControls { ...editProps } />
			<ParselyRecommendations { ...editProps.attributes } />
		</RecommendationsStore>
	</div>
);

registerBlockType( 'wp-parsely/recommendations', {
	apiVersion: 2,
	title: __( 'Parse.ly Related', 'wp-parsely' ),
	icon: LeafIcon,
	category: 'widgets',
	edit: ParselyRecommendationsEdit,
} );
