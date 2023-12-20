<?php
/**
 * Endpoints: Base endpoint class for saving and retrieving WordPress user meta
 * entries
 *
 * @package Parsely
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints\User_Meta;

use Parsely\Endpoints\Base_Endpoint;
use Parsely\Parsely;
use WP_REST_Request;

/**
 * Base class for all user meta endpoints.
 *
 * @since 3.13.0
 */
abstract class Base_Endpoint_User_Meta extends Base_Endpoint {
	/**
	 * Returns the endpoint's route.
	 *
	 * @since 3.13.0
	 *
	 * @return string The endpoint's route.
	 */
	abstract public static function get_route(): string;

	/**
	 * Returns the meta entry's key.
	 *
	 * @since 3.13.0
	 *
	 * @return string The meta entry's key.
	 */
	abstract protected function get_meta_key(): string;

	/**
	 * Returns the meta entry's default value as an array of subvalues.
	 *
	 * @since 3.13.0
	 *
	 * @return array<string, string> The meta entry's default value.
	 */
	abstract protected function get_default_value(): array;

	/**
	 * Returns the key/value pairs that can be accepted as valid subvalues by
	 * the meta entry.
	 *
	 * @since 3.13.0
	 *
	 * @return array<string, array<string>> The allowed key/value pairs.
	 */
	abstract protected function get_valid_subvalues(): array;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely The Parsely object instance.
	 *
	 * @since 3.13.0
	 */
	public function __construct( Parsely $parsely ) {
		parent::__construct( $parsely );
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
		define( 'ENDPOINT', static::get_route() );
	}

	/**
	 * Registers the endpoint's WP REST route.
	 *
	 * @since 3.13.0
	 */
	public function run(): void {
		$this->register_endpoint(
			static::get_route(),
			'process_request',
			array( 'GET', 'PUT' )
		);
	}

	/**
	 * Processes the requests sent to the endpoint.
	 *
	 * @since 3.13.0
	 *
	 * @param WP_REST_Request $request The request sent to the endpoint.
	 * @return string The meta entry's value as JSON.
	 */
	public function process_request( WP_REST_Request $request ): string {
		$request_method = $request->get_method();
		$user_id        = get_current_user_id();

		// Update the meta entry's value if the request method is PUT.
		if ( 'PUT' === $request_method ) {
			$meta_value = $request->get_json_params();
			$this->set_value( $user_id, $meta_value );
		}

		return $this->get_value( $user_id );
	}

	/**
	 * Returns the meta entry's value as JSON.
	 *
	 * @since 3.13.0
	 *
	 * @param int $user_id The user ID to which the meta entry is assigned.
	 * @return string The meta entry's value as JSON.
	 */
	protected function get_value( int $user_id ): string {
		$meta_key   = $this->get_meta_key();
		$meta_value = get_user_meta( $user_id, $meta_key, true );

		if ( ! is_array( $meta_value ) || 0 === count( $meta_value ) ) {
			$meta_value = $this->get_default_value();
		}

		$result = wp_json_encode( $meta_value );

		return false !== $result ? $result : '';
	}

	/**
	 * Sets the meta entry's value.
	 *
	 * @since 3.13.0
	 *
	 * @param int                   $user_id The user ID to which the meta entry is assigned.
	 * @param array<string, string> $meta_value The value to set the meta entry to.
	 * @return bool Whether updating the meta entry's value was successful.
	 */
	protected function set_value( int $user_id, array $meta_value ): bool {
		$sanitized_value = $this->sanitize_value( $meta_value );

		$update_meta = update_user_meta(
			$user_id,
			$this->get_meta_key(),
			$sanitized_value
		);

		if ( false !== $update_meta ) {
			return true;
		}

		return false;
	}

	/**
	 * Sanitizes the passed meta value.
	 *
	 * @since 3.13.0
	 *
	 * @param array<string, string> $meta_value The meta value to sanitize.
	 * @return array<string, string> The sanitized meta as an array of subvalues.
	 */
	protected function sanitize_value( array $meta_value ): array {
		$valid_subvalues = $this->get_valid_subvalues();
		$default_value   = $this->get_default_value();
		$sanitized_value = array();

		foreach ( $meta_value as $key => $value ) {
			// Skip if the key isn't valid.
			if ( ! array_key_exists( $key, $valid_subvalues ) ) {
				continue;
			}

			// Set to default value if the provided value isn't valid.
			if ( ! in_array( $value, $valid_subvalues[ $key ], true ) ) {
				$value = $default_value[ $key ];
			}

			$sanitized_value[ sanitize_key( $key ) ] = sanitize_text_field( $value );
		}

		// If not all subvalues are set, return the default meta value.
		if ( 0 !== count( array_diff_key( $valid_subvalues, $sanitized_value ) ) ) {
			return $this->get_default_value();
		}

		return $sanitized_value;
	}

	/**
	 * Returns the parameter as an array. If the parameter is not an array, an
	 * empty array is returned.
	 *
	 * @since 3.13.0
	 *
	 * @param WP_REST_Request $request The request to process.
	 * @param string          $param The parameter to get from the request.
	 * @return array<string, string> The parameter's value, converted to an array.
	 */
	protected function get_array_param( WP_REST_Request $request, string $param ): array {
		$value = $request->get_param( $param );

		if ( ! is_array( $value ) ) {
			$value = array();
		}

		return $value;
	}
}
