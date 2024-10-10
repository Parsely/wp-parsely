<?php
declare(strict_types=1);

namespace Parsely\Services;

use Parsely\Parsely;
use Parsely\Services\Cached_Service_Endpoint;
use WP_Error;

abstract class Base_Service_Endpoint {
	/**
	 * The API service that this endpoint belongs to.
	 *
	 * @var Base_API_Service
	 */
	protected $api_service;

	/**
	 * Flag to truncate the content of the request body.
	 * If set to true, the content of the request body will be truncated to a maximum length.
	 *
	 * @since 3.14.1
	 *
	 * @var bool
	 */
	protected const TRUNCATE_CONTENT = false;

	/**
	 * The maximum length of the content of the request body.
	 *
	 * @since 3.14.1
	 *
	 * @var int
	 */
	protected const TRUNCATE_CONTENT_LENGTH = 25000;

	public function __construct( Base_API_Service $api_service ) {
		$this->api_service = $api_service;
	}

	protected function get_headers() {
		return array(
			'Content-Type' => 'application/json',
		);
	}

	protected function get_request_options( string $method ): array {
		$options = array(
			'headers'     => $this->get_headers(),
			'method'      => $method,
		);

		return $options;
	}

	/**
	 * Returns the common query arguments to send to the remote API.
	 *
	 * This can be used for setting common query arguments that are shared
	 * across multiple endpoints, such as the API key.
	 *
	 * @since 3.17.0
	 *
	 * @param array<mixed> $args Additional query arguments to send to the remote API.
	 * @return array<mixed> The query arguments to send to the remote API.
	 */
	protected function get_query_args( array $args = array() ): array {
		return $args;
	}

	/**
	 * Executes the API request.
	 *
	 * @since 3.17.0
	 *
	 * @param array<mixed> $args The arguments to pass to the API request.
	 * @return WP_Error|array<mixed> The response from the API.
	 */
	public abstract function call( array $args = array() );

	/**
	 * Returns the endpoint for the API request.
	 *
	 * This should be the path to the endpoint, not the full URL.
	 * Override this method in the child class to return the endpoint.
	 *
	 * @since 3.17.0
	 *
	 * @return string The endpoint for the API request.
	 */
	public abstract function get_endpoint(): string;

	/**
	 * Sends a request to the remote API.
	 *
	 * @since 3.17.0
	 *
	 * @param string $method The HTTP method to use for the request.
	 * @param array<mixed> $query_args The query arguments to send to the remote API.
	 * @param array<mixed> $data The data to send in the request body.
	 * @return WP_Error|array<mixed> The response from the remote API.
	 */
	protected function request( string $method, array $query_args = array(), array $data = array() ) {
		// Get the URL to send the request to.
		$request_url = $this->get_endpoint_url( $query_args );

		// Build the request options.
		$request_options = $this->get_request_options( $method );

		if ( count( $data ) > 0 ) {
			$data = $this->truncate_array_content( $data );

			$request_options['body'] = wp_json_encode( $data );
			if ( false === $request_options['body'] ) {
				return new WP_Error( 400, __( 'Unable to encode request body', 'wp-parsely' ) );
			}
		}

		$response = wp_safe_remote_request( $request_url, $request_options );

		return $this->process_response( $response );
	}

	/**
	 * Returns the full URL for the API request, including the endpoint and query arguments.
	 *
	 * @since 3.17.0
	 *
	 * @param array<mixed> $query_args The query arguments to send to the remote API.
	 * @return string The full URL for the API request.
	 */
	protected function get_endpoint_url( array $query_args = array() ): string {
		// Get the base URL from the API service.
		$base_url = $this->api_service->get_api_url();

		// Append the endpoint to the base URL.
		$base_url .= $this->get_endpoint();

		// Append any necessary query arguments.
		$endpoint = add_query_arg( $this->get_query_args( $query_args ), $base_url );

		return $endpoint;
	}

	/**
	 * Processes the response from the remote API.
	 *
	 * @param array<mixed>|WP_Error $response The response from the remote API.
	 * @return array<mixed>|WP_Error The processed response.
	 */
	protected function process_response( $response ) {
		if ( is_wp_error( $response ) ) {
			/** @var WP_Error $response */
			return $response;
		}

		$body = wp_remote_retrieve_body( $response );
		$decoded = json_decode( $body, true );

		if ( ! is_array( $decoded ) ) {
			return new WP_Error( 400, __( 'Unable to decode upstream API response', 'wp-parsely' ) );
		}

		return $decoded;
	}

	public function get_parsely(): Parsely {
		return $this->api_service->get_parsely();
	}

	/**
	 * Truncates the content of an array to a maximum length.
	 *
	 * @since 3.14.1
	 *
	 * @param string|array|mixed $content The content to truncate.
	 * @return string|array|mixed The truncated content.
	 */
	private function truncate_array_content( $content ) {
		if ( is_array( $content ) ) {
			// If the content is an array, iterate over its elements.
			foreach ( $content as $key => $value ) {
				// Recursively process/truncate each element of the array.
				$content[ $key ] = $this->truncate_array_content( $value );
			}
			return $content;
		} elseif ( is_string( $content ) ) {
			// If the content is a string, truncate it.
			if ( static::TRUNCATE_CONTENT ) {
				// Check if the string length exceeds the maximum and truncate if necessary.
				if ( mb_strlen( $content ) > self::TRUNCATE_CONTENT_LENGTH ) {
					return mb_substr( $content, 0, self::TRUNCATE_CONTENT_LENGTH );
				}
			}
			return $content;
		}
		return $content;
	}

}
