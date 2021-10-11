<?php
/**
 * Telemetry class
 *
 * @package Parsely\Telemetry
 * @since 3.0.0
 */

declare(strict_types=1);

namespace Parsely\Telemetry;

/**
 * This class comprises the mechanics of setting up the back end tracking instance(s).
 * Currently, the only supported back end is Automattic Tracks.
 * This is intended to wrap the internals such that adding / changing back ends has minimal impact on the event hooks we're interested in.
 */
class Telemetry {
	/**
	 * This is determined by our value passed to the `WP_Widget` constructor.
	 *
	 * @see https://github.com/Parsely/wp-parsely/blob/e9f1b8cd1a94743e068681a8106176d23857992d/src/class-parsely-recommended-widget.php#L28
	 */
	const RECOMMENDED_WIDGET_BASE_ID = 'parsely_recommended_widget';

	/**
	 * Holds an instance of the class comprising the active telemetry system.
	 *
	 * @var Telemetry_System
	 */
	private $telemetry_system;

	/**
	 * Holds the list of events that are registered to WordPress hooks.
	 *
	 * @var array
	 */
	private $events;

	/**
	 * Parsely_Telemetry constructor.
	 */
	public function __construct( Telemetry_System $telemetry_system ) {
		$this->telemetry_system = $telemetry_system;
	}

	/**
	 *  Initializes the telemetry system and registers the events into WordPress hooks.
	 *
	 * @return void
	 */
	public function run(): void {
		$this->telemetry_system->setup();
		$this->add_event_tracking();
	}

	/**
	 * Adds an event to the list of supported events. In order to have it registered, it must be
	 * added before calling `run`.
	 *
	 * @param array $event
	 * @return void
	 */
	public function register_event( array $event ): void {
		$this->events[] = $event;
	}

	/**
	 * Hook functions into WordPress actions and / filters for which we want to record events.
	 *
	 * @return void
	 */
	private function add_event_tracking(): void {
		foreach ( $this->events as $event ) {
			if ( is_callable( $event['callable'] ) ) {
				add_action(
					'load-settings_page_parsely',
					function() use ( $event ) {
						$event['callable']( $this->telemetry_system );
					} 
				);
			}
		}
	}
}
