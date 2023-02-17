const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'admin-parsely-stats': [
			path.resolve( __dirname, 'src', 'js', 'admin-parsely-stats' ),
			path.resolve( __dirname, 'src', 'css', 'admin-parsely-stats.scss' ),
		],
		'admin-settings': [
			path.resolve( __dirname, 'src', 'js', 'admin-settings' ),
			path.resolve( __dirname, 'src', 'css', 'admin-settings.scss' ),
		],
		'content-helper': [
			path.resolve( __dirname, 'src', 'blocks', 'content-helper', 'content-helper' ),
			path.resolve( __dirname, 'src', 'blocks', 'content-helper', 'content-helper.scss' ),
		],
		'content-helper/dashboard-widget': [
			path.resolve( __dirname, 'src', 'content-helper', 'dashboard-widget', 'dashboard-widget' ),
			path.resolve( __dirname, 'src', 'content-helper', 'dashboard-widget', 'dashboard-widget.scss' ),
		],
		loader: [
			path.resolve( __dirname, 'src', 'js', 'lib', 'loader' ),
			path.resolve( __dirname, 'src', 'js', 'lib', 'uuid-profile-call' ),
		],
		'recommended-widget': [
			path.resolve( __dirname, 'src', 'js', 'widgets', 'recommended' ),
			path.resolve( __dirname, 'src', 'css', 'recommended-widget.scss' ),
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
