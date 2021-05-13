const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		'init-api': path.resolve( __dirname, 'src', 'js', 'lib', 'init-api' ),
		'recommended-widget': path.resolve( __dirname, 'src', 'js', 'widgets', 'recommended' ),
		'recommendations-edit': path.resolve( __dirname, 'src', 'blocks', 'recommendations', 'edit' ),
		recommendations: path.resolve( __dirname, 'src', 'blocks', 'recommendations' ),
	},
};
