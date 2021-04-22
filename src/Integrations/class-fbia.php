<?php
/**
 * Facebook Instant Articles integration class
 *
 * @package Parsely\Integrations
 * @since 2.6.0
 */

namespace Parsely\Integrations;

/**
 * Integrates Parse.ly tracking with the Facebook Instant Articles plugin.
 *
 * @since 2.6.0 Moved from Parsely class to this file.
 */
class Fbia implements Integration {
	/**
	 * Apply the hooks that integrate the plugin or theme with the Parse.ly plugin.
	 *
	 * @since 2.6.0
	 */
	public function integrate() {
		if ( defined( 'IA_PLUGIN_VERSION' ) ) {
			add_action( 'instant_articles_compat_registry_analytics', array( $this, 'insert_parsely_tracking' ) );
		}
	}

	/**
	 * Add Parse.ly tracking to Facebook instant articles.
	 *
	 * @since 2.6.0
	 *
	 * @param array $registry The registry info for fbia.
	 * @return string
	 */
	public function insert_parsely_tracking( &$registry ) {
		$options      = get_option( \Parsely::OPTIONS_KEY );
		$display_name = 'Parsely Analytics'; // Do not translate at this time.
		$identifier   = 'parsely-analytics-for-wordpress';

		$embed_code = '<script>
			PARSELY = {
				autotrack: false,
				onload: function() {
					PARSELY.beacon.trackPageView({
						urlref: \'http://facebook.com/instantarticles\'
					});
					return true;
				}
			}
		</script>
		<script data-cfasync="false" id="parsely-cfg" data-parsely-site="' . esc_attr( $options['apikey'] ) . '" src="//cdn.parsely.com/keys/' . esc_attr( $options['apikey'] ) . '/p.js"></script>
		<!-- END Parse.ly Include: Standard -->';

		$registry[ $identifier ] = array(
			'name'    => $display_name,
			'payload' => $embed_code,
		);

		return $embed_code;
	}
}
