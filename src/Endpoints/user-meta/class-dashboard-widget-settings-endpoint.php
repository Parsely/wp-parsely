<?php
/**
 * Endpoints: Endpoint for saving and retrieving Content Helper Dashboard Widget
 * settings
 *
 * @package Parsely
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints\User_Meta;

/**
 * Endpoint for saving and retrieving Content Helper Dashboard Widget settings.
 *
 * @since 3.13.0
 */
final class Dashboard_Widget_Settings_Endpoint extends Base_Endpoint_User_Meta {
	/**
	 * Returns the endpoint's route.
	 *
	 * @since 3.13.0
	 *
	 * @return string The endpoint's route.
	 */
	public static function get_route(): string {
		return '/user-meta/content-helper/dashboard-widget';
	}

	/**
	 * Returns the meta entry's key.
	 *
	 * @since 3.13.0
	 *
	 * @return string The meta entry's key.
	 */
	protected function get_meta_key(): string {
		return 'parsely_content_helper_settings_dashboard_widget';
	}

	/**
	 * Returns the meta entry's default value as an array of subvalues.
	 *
	 * @since 3.13.0
	 *
	 * @return array<string, string> The meta entry's default value.
	 */
	protected function get_default_value(): array {
		return array(
			'period' => '7d',
			'metric' => 'views',
		);
	}

	/**
	 * Returns the key/value pairs that can be accepted as valid subvalues by
	 * the meta entry.
	 *
	 * @since 3.13.0
	 *
	 * @return array<string, array<string>> The allowed key/value pairs.
	 */
	protected function get_valid_subvalues(): array {
		return array(
			'period' => array( '10m', '1h', '2h', '4h', '24h', '7d', '30d' ),
			'metric' => array( 'views', 'avg_engaged' ),
		);
	}
}
