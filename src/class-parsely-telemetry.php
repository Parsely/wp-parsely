<?php
/**
 * Parsely_Telemetry class
 *
 * @package Parsely
 * @since 3.0.0
 */

declare(strict_types=1);

/**
 * This class comprises the mechanics of setting up the back end tracking instance(s).
 * Currently, the only supported back end is Automattic Tracks.
 * This is intended to wrap the internals such that adding / changing back ends has minimal impact on the event hooks we're interested in.
 */
class Parsely_Telemetry {
	/**
	 * This is determined by our value passed to the `WP_Widget` constructor.
	 *
	 * @see https://github.com/Parsely/wp-parsely/blob/e9f1b8cd1a94743e068681a8106176d23857992d/src/class-parsely-recommended-widget.php#L28
	 */
	const RECOMMENDED_WIDGET_BASE_ID = 'parsely_recommended_widget';

	/**
	 * Holds an instance of the class comprising the Automattic Tracks mechanics.
	 *
	 * @var Parsely_A8c_Tracks
	 */
	private $tracks;

	/**
	 * Parsely_Telemetry constructor.
	 */
	public function __construct() {
		if ( ! $this->should_enable_tracking() ) {
			return;
		}

		$this->tracks = new Parsely_A8c_Tracks();
		$this->tracks->setup();

		$this->add_event_tracking();
	}

	/**
	 * Determine from the environment if tracking should be enabled for this request.
	 *
	 * @todo Implement this! It's only returning true right now :P .
	 *
	 * @return boolean
	 */
	protected function should_enable_tracking() {
		return true;
	}

	/**
	 * Hook functions into WordPress actions and / filters for which we want to record events.
	 *
	 * @todo Move this to a dedicated file or some other organization scheme.
	 * @todo Use named functions so they can be (conceivably) unhooked if desired.
	 *
	 * @return void
	 */
	protected function add_event_tracking() {
		add_action(
			'load-settings_page_parsely',
			function () {
				if (
					! ( isset( $_SERVER['REQUEST_METHOD'] ) && 'GET' === $_SERVER['REQUEST_METHOD'] ) ||
					// phpcs:disable WordPress.Security.NonceVerification.Recommended
					( isset( $_GET['settings-updated'] ) && 'true' === $_GET['settings-updated'] )
					// phpcs:enable
				) {
					return;
				}
				$this->tracks->record_event( 'vip_wpparsely_settings_page_loaded' );
			}
		);

		add_action(
			'update_option_parsely',
			function ( $old_value, $value ) {
				$all_keys     = array_unique( array_merge( array_keys( $old_value ), array_keys( $value ) ) );
				$updated_keys = array_reduce(
					$all_keys,
					function( $carry, $key ) use ( $old_value, $value ) {
						if (
							isset( $old_value[ $key ] ) === isset( $value[ $key ] ) &&
							wp_json_encode( $old_value[ $key ] ) === wp_json_encode( $value[ $key ] )
						) {
							return $carry;
						}

						if ( 'parsely_wipe_metadata_cache' === $key && ! ( isset( $value[ $key ] ) && $value[ $key ] ) ) {
							return $carry;
						}

						if ( 'plugin_version' === $key ) {
							return $carry;
						}

						$carry[] = $key;
						return $carry;
					},
					array()
				);

				if ( ! count( $updated_keys ) ) {
					return;
				}
				$this->tracks->record_event( 'vip_wpparsely_option_updated', compact( 'updated_keys' ) );
			},
			10,
			2
		);

		add_action(
			'delete_widget',
			function ( $widget_id, $sidebar_id, $id_base ) {
				if ( self::RECOMMENDED_WIDGET_BASE_ID !== $id_base ) {
					return;
				}
				$this->tracks->record_event( 'vip_wpparsely_delete_widget', compact( 'id_base' ) );
			},
			10,
			3
		);

		add_filter(
			'widget_update_callback',
			function ( $instance, $new_instance, $old_instance, $widget_obj ) {
				global $wp;
				$id_base = $widget_obj->id_base;
				if ( self::RECOMMENDED_WIDGET_BASE_ID !== $id_base ) {
					return $instance;
				}

				if (
					isset( $wp->query_vars['rest_route'] ) &&
					'/wp/v2/widget-types/parsely_recommended_widget/encode' === $wp->query_vars['rest_route']
				) {
					/**
					 * This is an "encode" call to preview the widget in the admin.
					 * Track this event seperately.
					 */
					$this->tracks->record_event( 'vip_wpparsely_widget_prepublish_change', compact( 'id_base' ) );
					return $instance;
				}

				$all_keys     = array_unique( array_merge( array_keys( $old_instance ), array_keys( $instance ) ) );
				$updated_keys = array_reduce(
					$all_keys,
					function( $carry, $key ) use ( $old_instance, $instance ) {
						if (
						isset( $old_instance[ $key ] ) === isset( $instance[ $key ] ) &&
						wp_json_encode( $old_instance[ $key ] ) === wp_json_encode( $instance[ $key ] )
						) {
							return $carry;
						}
						$carry[] = $key;
						return $carry;
					},
					array()
				);

				if ( count( $updated_keys ) ) {
					$this->tracks->record_event( 'vip_wpparsely_widget_updated', compact( 'id_base', 'updated_keys' ) );
				}

				return $instance;
			},
			10,
			4
		);
	}
}
