/**
 * External dependencies
 */
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { ReactComponent as LeafIcon } from './Parsely-Logo-sRGB-Leaf-Green.svg';
import ParselyRecommendations from './components/parsely-recommendations';
import ParselyRecommendationsBlockControls from './components/parsely-recommendations-block-controls';
import ParselyRecommendationsInspectorControls from './components/parsely-recommendations-inspector-controls';

import './style.scss';

export const ParselyRecommendationsEdit = ( editProps ) => (
	<div { ...useBlockProps() }>
		<ParselyRecommendationsBlockControls { ...editProps } />
		<ParselyRecommendationsInspectorControls { ...editProps } />
		<ParselyRecommendations { ...editProps.attributes } />
	</div>
);

export const ParselyRecommendationsSave = ( {
	attributes: {
		boost,
		className,
		layoutstyle,
		imagestyle,
		limit,
		personalized,
		showimages,
		sort,
		title,
	},
} ) => (
	<section className={ classNames( 'wp-parsely-related-posts-block', className ) }>
		<div
			className="container"
			data-boost={ boost }
			data-layoutstyle={ layoutstyle }
			data-imagestyle={ imagestyle }
			data-limit={ limit }
			data-personalized={ personalized }
			data-showimages={ showimages }
			data-sort={ sort }
			data-title={ title }
		></div>
	</section>
);

registerBlockType( 'wp-parsely/recommendations', {
	apiVersion: 2,
	title: __( 'Parse.ly Related', 'wp-parsely' ),
	icon: LeafIcon,
	category: 'widgets',
	edit: ParselyRecommendationsEdit,
	save: ParselyRecommendationsSave,
} );
