const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'admin-settings': [
			path.resolve( __dirname, 'src', 'js', 'admin-settings' ),
			path.resolve( __dirname, 'src', 'css', 'admin-settings.css' ),
		],
		'content-helper': [
			path.resolve( __dirname, 'src', 'blocks', 'content-helper', 'content-helper' ),
			path.resolve( __dirname, 'src', 'blocks', 'content-helper', 'content-helper.scss' ),
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
	module: {
		rules: defaultConfig.module.rules.concat(
			[
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
				},
			]
		),
	},
};
