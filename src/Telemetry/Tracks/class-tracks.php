<?php
/**
 * Telemetry: Tracks class
 *
 * @package Parsely\Telemetry
 * @since   3.12.0
 */

declare(strict_types=1);

namespace Parsely\Telemetry;

use WP_Error;
use function Parsely\Utils\get_asset_info;
use const Parsely\PARSELY_FILE;
use const Parsely\PARSELY_VERSION;

/**
 * This class comprises the mechanics of sending events to the Automattic Tracks
 * system.
 *
 * @since 3.12.0
 */
class Tracks extends Telemetry_System {
	/**
	 * Registers the events into WordPress hooks to activate tracking.
	 *
	 * @since 3.12.0
	 */
	public function run(): void {
		$this->activate_tracking();
		$this->init_js_tracking();
	}

	/**
	 * Records an event to Tracks by using the Tracks pixel.
	 *
	 * Depending on the current context, the pixel will be recorded
	 * synchronously (as a GET request) or as asynchronously (as an injected
	 * pixel into the page's footer).
	 *
	 * If the event doesn't pass validation, it gets silently discarded.
	 *
	 * @since 3.12.0
	 *
	 * @param string                            $event_name The event name. Must be snake_case.
	 * @param array<string, mixed>|array<empty> $event_properties Any additional properties to include with the event.
	 *                                                            Key names must be lowercase and snake_case.
	 * @return bool|WP_Error True if recording the event succeeded.
	 *                       False if telemetry is disabled.
	 *                       WP_Error if recording the event failed.
	 */
	public function record_event(
		string $event_name,
		array $event_properties = array()
	) {
		$event = new Tracks_Event( $event_name, $event_properties );
		$pixel = Tracks_Pixel::instance();

		// Process AJAX/REST request events immediately.
		if ( wp_doing_ajax() || defined( 'REST_REQUEST' ) ) {
			$pixel->record_event_synchronously( $event );
		}

		return $pixel->record_event_asynchronously( $event );
	}

	/**
	 * Registers the events into their respective WordPress hooks, so they
	 * can be recorded when the hook fires.
	 *
	 * @since 3.12.0
	 */
	protected function activate_tracking(): void {
		foreach ( $this->events as $event ) {
			if ( is_string( $event['action_hook'] ) && is_callable( $event['callable'] ) ) {
				$accepted_args = $event['accepted_args'] ?? 1;
				$func          = function () use ( $accepted_args, $event ) {
					if ( $accepted_args > 1 ) {
						$args   = func_get_args();
						$args[] = $this;
					} else {
						$args = array( $this );
					}
					return call_user_func_array( $event['callable'], $args );
				};

				add_filter( $event['action_hook'], $func, 10, (int) $accepted_args );
			}
		}
	}

	/**
	 * Initializes JavaScript tracking.
	 *
	 * This method is responsible for setting up the JavaScript tracking for the application.
	 * It enqueues the necessary scripts and sets up the parameters for the tracking script.
	 *
	 * If the user has disabled wp-admin telemetry, the script will be enqueued, however the
	 * global object `wpParselyTracksTelemetry` will not be available.
	 *
	 * @since 3.12.0
	 */
	public function init_js_tracking(): void {
		// Enqueue the JS file.
		add_action(
			'admin_enqueue_scripts',
			function (): void {
				$asset_php        = get_asset_info( 'build/telemetry.asset.php' );
				$built_assets_url = plugin_dir_url( PARSELY_FILE ) . 'build/';

				// The Telemetry script is always enqueued in the admin.
				// If the user has disabled wp-admin telemetry, the global object will not be available.
				wp_enqueue_script(
					'wp-parsely-tracks-telemetry',
					$built_assets_url . 'telemetry.js',
					$asset_php['dependencies'],
					$asset_php['version'],
					true
				);

				// If the user has disabled wp-admin telemetry, return early.
				if ( ! Telemetry_System::is_wpadmin_telemetry_allowed() ) {
					return;
				}

				// Set the script params.
				$script_params = array(
					'version' => PARSELY_VERSION,
					'user'    => array(),
				);

				// If it's a VIP environment, add the VIP environment to the script params.
				if ( defined( 'VIP_GO_APP_ENVIRONMENT' ) ) {
					$app_environment = constant( 'VIP_GO_APP_ENVIRONMENT' );
					if ( is_string( $app_environment ) && '' !== $app_environment ) {
						$script_params['vipgo_env'] = $app_environment;
					}
				}

				// Define user-specific params.
				$wp_user_id = get_current_user_id();
				if ( 0 !== $wp_user_id ) {
					// If it's VIP environment, add the VIP user ID to the script params.
					if ( defined( 'VIP_GO_APP_ID' ) ) {
						$app_id = constant( 'VIP_GO_APP_ID' );
						if ( is_integer( $app_id ) && 0 < $app_id ) {
							$script_params['user'] = array(
								'type' => 'vip_go_app_wp_user',
								'id'   => $app_id . '_' . $wp_user_id,
							);
						}
					}

					// If not VIP, fallback to the generated parse.ly user ID.
					if ( 0 === count( $script_params['user'] ) ) {
						$wp_base_url = get_option( 'home' );
						if ( ! is_string( $wp_base_url ) || '' === $wp_base_url ) {
							$wp_base_url = get_option( 'siteurl' );
						}

						/**
						 * The base URL of the site.
						 *
						 * @var string $wp_base_url
						 */
						$script_params['user'] = array(
							'type' => 'wpparsely:user_id',
							'id'   => wp_hash( sprintf( '%s|%s', $wp_base_url, $wp_user_id ) ),
						);
					}
				}

				wp_add_inline_script(
					'wp-parsely-tracks-telemetry',
					'const wpParselyTracksTelemetry = ' . wp_json_encode( $script_params ) . ';',
					'before'
				);
			}
		);
	}
}
