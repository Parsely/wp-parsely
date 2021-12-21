const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		'block-editor': path.resolve( __dirname, 'src', 'js', 'block-editor' ),
		'init-api': path.resolve( __dirname, 'src', 'js', 'lib', 'init-api' ),
		'recommended-widget': path.resolve( __dirname, 'src', 'js', 'widgets', 'recommended' ),
	},
};
