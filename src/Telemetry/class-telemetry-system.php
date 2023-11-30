<?php
/**
 * Telemetry: Telemetry System abstract class
 *
 * @package Parsely\Telemetry
 * @since   3.12.0
 */

declare(strict_types=1);

namespace Parsely\Telemetry;

use WP_Error;

/**
 * Base class for all telemetry system implementations.
 *
 * @since 3.12.0
 */
abstract class Telemetry_System {
	/**
	 * Holds the list of events to be tracked.
	 *
	 * @var array<array<string, string|int>>
	 */
	protected $events;

	/**
	 * Registers the telemetry system.
	 *
	 * @since 3.12.0
	 */
	abstract public function run(): void;

	/**
	 * Activates event tracking.
	 *
	 * @since 3.12.0
	 */
	abstract protected function activate_tracking(): void;

	/**
	 * Returns whether wp-admin telemetry is allowed to be enabled. This is off
	 * by default.
	 *
	 * @since 3.12.0
	 *
	 * @return bool Whether wp-admin telemetry is allowed to be enabled.
	 */
	public static function is_wpadmin_telemetry_allowed(): bool {
		return apply_filters( 'wp_parsely_enable_wpadmin_telemetry', false );
	}

	/**
	 * Registers the passed events so they can be recorded later.
	 *
	 * Note: All events must be registered before the run() function of this
	 * class gets called.
	 *
	 * @since 3.12.0
	 *
	 * @param array<string, string|int> ...$events The events to register.
	 */
	public function register_events( array ...$events ): void {
		foreach ( $events as $event ) {
			$this->events[] = $event;
		}
	}

	/**
	 * Records the passed event.
	 *
	 * @since 3.12.0
	 *
	 * @param string               $event_name The event's name.
	 * @param array<string, mixed> $event_properties Any additional properties
	 *                                               to include with the event.
	 * @return bool|WP_Error True if recording the event succeeded.
	 *                       False if telemetry is disabled.
	 *                       WP_Error if recording the event failed.
	 */
	abstract public function record_event(
		string $event_name,
		array $event_properties = array()
	);
}