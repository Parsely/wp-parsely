const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'admin-settings': [
			path.resolve( __dirname, 'src', 'js', 'admin-settings' ),
			path.resolve( __dirname, 'src', 'css', 'admin-settings.scss' ),
		],
		'content-helper/dashboard-widget': [
			path.resolve( __dirname, 'src', 'content-helper', 'dashboard-widget', 'dashboard-widget' ),
			path.resolve( __dirname, 'src', 'content-helper', 'dashboard-widget', 'dashboard-widget.scss' ),
		],
		'content-helper/editor-sidebar': [
			path.resolve( __dirname, 'src', 'content-helper', 'editor-sidebar', 'editor-sidebar' ),
			path.resolve( __dirname, 'src', 'content-helper', 'editor-sidebar', 'editor-sidebar.scss' ),
		],
		'content-helper/post-list-stats': [
			path.resolve( __dirname, 'src', 'content-helper', 'post-list-stats', 'post-list-stats' ),
			path.resolve( __dirname, 'src', 'content-helper', 'post-list-stats', 'post-list-stats.scss' ),
		],
		'content-helper/excerpt-generator': [
			path.resolve( __dirname, 'src', 'content-helper', 'excerpt-generator', 'excerpt-generator' ),
			path.resolve( __dirname, 'src', 'content-helper', 'excerpt-generator', 'excerpt-generator.scss' ),
		],
		loader: [
			path.resolve( __dirname, 'src', 'js', 'lib', 'loader' ),
			path.resolve( __dirname, 'src', 'js', 'lib', 'uuid-profile-call' ),
		],
		'recommended-widget': [
			path.resolve( __dirname, 'src', 'js', 'widgets', 'recommended' ),
			path.resolve( __dirname, 'src', 'css', 'recommended-widget.scss' ),
		],
		'telemetry': [
			path.resolve( __dirname, 'src', 'js', 'telemetry', 'init' ),
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
