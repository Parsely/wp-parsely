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

function ParselyRecommendationsEdit( props ) {
	return (
		<div { ...useBlockProps() }>
			<ParselyRecommendationsBlockControls { ...props } />
			<ParselyRecommendations { ...props } />
		</div>
	);
}

registerBlockType( 'wp-parsely/recommendations', {
	apiVersion: 2,
	title: __( 'Parse.ly Recommendations', 'wp-parsely' ),
	icon: LeafIcon,
	category: 'widgets',
	attributes: {
		displayDirection: {
			type: 'string',
			default: 'horizontal',
		},
		title: {
			type: 'string',
		},
		personalized: {
			type: 'boolean',
			default: false,
		},
		tag: {
			type: 'string',
		},
		sortRecs: {
			type: 'string',
			default: 'score',
		},
		pubStart: {
			type: 'number',
			default: 7,
		},
		boost: {
			type: 'string',
			default: 'views',
		},
	},
	edit: ParselyRecommendationsEdit,
} );
