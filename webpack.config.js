const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		'admin-page': path.resolve( __dirname, 'src', 'js', 'lib', 'admin-page' ),
		'init-api': path.resolve( __dirname, 'src', 'js', 'lib', 'init-api' ),
		telemetry: path.resolve( __dirname, 'src', 'js', 'lib', 'telemetry' ),
		'recommended-widget': path.resolve( __dirname, 'src', 'js', 'widgets', 'recommended' ),
	},
};
