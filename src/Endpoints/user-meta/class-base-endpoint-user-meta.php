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
 * Base class for all user meta endpoints. Child classes must add a protected
 * `ENDPOINT` constant.
 *
 * @since 3.13.0
 *
 * @phpstan-type Subvalue_Spec array{values: array<mixed>, default: mixed}
 */
abstract class Base_Endpoint_User_Meta extends Base_Endpoint {
	/**
	 * The meta entry's default value. Initialized in the constructor.
	 *
	 * @since 3.13.0
	 *
	 * @var array<string, mixed>
	 */
	protected $default_value = array();

	/**
	 * The valid values that can be used for each subvalue. Initialized in the
	 * constructor.
	 *
	 * @since 3.13.0
	 *
	 * @var array<string, array<int, mixed>>
	 */
	protected $valid_subvalues = array();

	/**
	 * The current user's ID.
	 *
	 * @since 3.14.0
	 *
	 * @var int
	 */
	protected $current_user_id = 0;

	/**
	 * Returns the meta entry's key.
	 *
	 * @since 3.13.0
	 *
	 * @return string The meta entry's key.
	 */
	abstract protected function get_meta_key(): string;

	/**
	 * Returns the endpoint's subvalues specifications.
	 *
	 * @since 3.13.0
	 *
	 * @return array<string, Subvalue_Spec>
	 */
	abstract protected function get_subvalues_specs(): array;

	/**
	 * Constructor.
	 *
	 * @since 3.13.0
	 *
	 * @param Parsely $parsely Parsely instance.
	 */
	public function __construct( Parsely $parsely ) {
		parent::__construct( $parsely );

		$subvalues_specs = $this->get_subvalues_specs();

		foreach ( $subvalues_specs as $key => $value ) {
			$this->default_value[ $key ]   = $value['default'];
			$this->valid_subvalues[ $key ] = $value['values'];
		}
	}

	/**
	 * Registers the endpoint's WP REST route.
	 *
	 * @since 3.13.0
	 */
	public function run(): void {
		// Initialize the current user ID here, as doing it in the constructor
		// is too early.
		$this->current_user_id = get_current_user_id();

		$this->register_endpoint(
			static::get_route(),
			'process_request',
			array( 'GET', 'PUT' )
		);
	}

	/**
	 * Returns the endpoint's route.
	 *
	 * @since 3.13.0
	 *
	 * @return string The endpoint's route.
	 */
	public static function get_route(): string {
		return static::ENDPOINT;
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

		// Update the meta entry's value if the request method is PUT.
		if ( 'PUT' === $request_method ) {
			$meta_value = $request->get_json_params();
			$this->set_value( $meta_value );
		}

		return $this->get_value();
	}

	/**
	 * Returns whether the endpoint is available for access by the current
	 * user.
	 *
	 * @since 3.14.0
	 *
	 * @return bool
	 */
	public function is_available_to_current_user(): bool {
		return current_user_can( 'edit_user', $this->current_user_id );
	}

	/**
	 * Returns the meta entry's value as JSON.
	 *
	 * @since 3.13.0
	 *
	 * @return string The meta entry's value as JSON.
	 */
	protected function get_value(): string {
		$meta_key   = $this->get_meta_key();
		$meta_value = get_user_meta( $this->current_user_id, $meta_key, true );

		if ( ! is_array( $meta_value ) || 0 === count( $meta_value ) ) {
			$meta_value = $this->default_value;
		}

		$result = wp_json_encode( $meta_value );

		return false !== $result ? $result : '';
	}

	/**
	 * Sets the meta entry's value.
	 *
	 * @since 3.13.0
	 *
	 * @param array<string, string> $meta_value The value to set the meta entry to.
	 * @return bool Whether updating the meta entry's value was successful.
	 */
	protected function set_value( array $meta_value ): bool {
		$sanitized_value = $this->sanitize_value( $meta_value );

		$update_meta = update_user_meta(
			$this->current_user_id,
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
	 * @since 3.14.0 Added support for nested arrays.
	 *
	 * @param array<string, mixed> $meta_value The meta value to sanitize.
	 * @return array<string, mixed> The sanitized meta as an array of subvalues.
	 */
	protected function sanitize_value( array $meta_value ): array {
		$sanitized_value = array();

		foreach ( $meta_value as $key => $value ) {
			$key = sanitize_text_field( $key );

			// Skip if the key isn't valid.
			if ( ! array_key_exists( $key, $this->valid_subvalues ) ) {
				continue;
			}

			// Use the enhanced sanitize_subvalue method.
			$sanitized_value[ $key ] = $this->sanitize_subvalue( $key, $value );
		}

		// If not all subvalues are set, return the default meta value.
		if ( count( array_diff_key( $this->valid_subvalues, $sanitized_value ) ) !== 0 ) {
			return $this->default_value;
		}

		return $sanitized_value;
	}

	/**
	 * Sanitizes the passed subvalue.
	 *
	 * @since 3.13.0
	 * @since 3.14.0 Added support for nested arrays.
	 *
	 * @param string $key The subvalue's key.
	 * @param mixed  $value The value to sanitize.
	 * @return mixed The sanitized subvalue.
	 */
	protected function sanitize_subvalue( string $key, $value ) {
		// Handle nested arrays recursively.
		if ( is_array( $value ) ) {
			$sanitized_array = array();
			foreach ( $value as $subkey => $subvalue ) {
				// Sanitize keys of nested arrays.
				$sanitized_subkey = sanitize_text_field( $subkey );
				// Recursively sanitize each value in the nested array.
				$sanitized_array[ $sanitized_subkey ] = $this->sanitize_subvalue( $sanitized_subkey, $subvalue );
			}
			return $sanitized_array;
		}

		// Sanitize simple values.
		if ( is_string( $value ) ) {
			$value = sanitize_text_field( $value );
		}

		// Allow any value when no valid subvalues are given.
		if ( ! isset( $this->valid_subvalues[ $key ] ) || count( $this->valid_subvalues[ $key ] ) === 0 ) {
			return $value;
		}

		// Use default value if the actual value is not valid.
		if ( ! in_array( $value, $this->valid_subvalues[ $key ], true ) ) {
			$value = $this->default_value[ $key ];
		}

		return $value;
	}
}
