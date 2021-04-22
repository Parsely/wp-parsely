<?php
/**
 * AMP integration class
 *
 * @package Parsely\Integrations
 * @since 2.6.0
 */

namespace Parsely\Integrations;

/**
 * Integrates Parse.ly tracking with the AMP plugin.
 *
 * @since 2.6.0 Moved from Parsely class to this file.
 */
class Amp implements Integration {
	/**
	 * Apply the hooks that integrate the plugin or theme with the Parse.ly plugin.
	 *
	 * @since 2.6.0
	 */
	public function integrate() {
		if ( defined( 'AMP__VERSION' ) ) {
			add_action( 'template_redirect', array( $this, 'add_actions' ) );
		}
	}

	/**
	 * Verify if request is an AMP request.
	 *
	 * @since 2.6.0
	 *
	 * @return bool True is an AMP request, false otherwise.
	 */
	public function is_amp_request() {
		return function_exists( 'amp_is_request' ) && amp_is_request();
	}

	/**
	 * Add AMP actions.
	 *
	 * @since 2.6.0
	 */
	public function add_actions() {
		if ( ! $this->is_amp_request() ) {
			return '';
		}

		$options = get_option( \Parsely::OPTIONS_KEY );

		if ( $options['disable_amp'] ) {
			return '';
		}

		add_filter( 'amp_post_template_analytics', array( $this, 'register_parsely_for_amp_analytics' ) );
		add_filter( 'amp_analytics_entries', array( $this, 'register_parsely_for_amp_native_analytics' ) );
	}

	/**
	 * Add amp analytics.
	 *
	 * @since 2.6.0
	 *
	 * @param array $analytics The analytics registry.
	 * @return array The analytics registry.
	 */
	public function register_parsely_for_amp_analytics( $analytics ) {
		$options = get_option( \Parsely::OPTIONS_KEY );

		if ( empty( $options['apikey'] ) ) {
			return $analytics;
		}

		$analytics['parsely'] = array(
			'type'        => 'parsely',
			'attributes'  => array(),
			'config_data' => array(
				'vars' => array(
					'apikey' => $options['apikey'],
				),
			),
		);

		return $analytics;
	}

	/**
	 * Add AMP native analytics.
	 *
	 * @since 2.6.0
	 *
	 * @param array $analytics The analytics registry.
	 * @return array The analytics registry.
	 */
	public function register_parsely_for_amp_native_analytics( $analytics ) {
		$options = get_option( \Parsely::OPTIONS_KEY );

		if ( ! empty( $options['disable_amp'] ) && true === $options['disable_amp'] ) {
			return $analytics;
		}

		if ( empty( $options['apikey'] ) ) {
			return $analytics;
		}

		$analytics['parsely'] = array(
			'type'       => 'parsely',
			'attributes' => array(),
			'config'     => wp_json_encode(
				array(
					'vars' => array(
						'apikey' => $options['apikey'],
					),
				)
			),
		);

		return $analytics;
	}
}
