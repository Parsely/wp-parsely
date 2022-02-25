const path = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
// Removing the CopyWebpackPlugin, since we don't want the *.php files copied into our build folder.
defaultConfig.plugins[ 1 ] = new CopyWebpackPlugin( {
	patterns: [
		{
			from: '**/block.json',
			context: 'src',
			noErrorOnMissing: true,
		},
	],
} );

module.exports = {
	...defaultConfig,
	entry: {
		'admin-settings': [
			path.resolve( __dirname, 'src', 'js', 'admin-settings' ),
			path.resolve( __dirname, 'src', 'css', 'admin-settings.css' ),
		],
		loader: [
			path.resolve( __dirname, 'src', 'js', 'lib', 'loader' ),
			path.resolve( __dirname, 'src', 'js', 'lib', 'uuid-profile-call' ),
		],
		'recommended-widget': [
			path.resolve( __dirname, 'src', 'js', 'widgets', 'recommended.js' ),
			path.resolve( __dirname, 'src', 'css', 'recommended-widget.css' ),
		],
	},
};
