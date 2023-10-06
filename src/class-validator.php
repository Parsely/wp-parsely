<?php
/**
 * Validator class
 *
 * @package Parsely
 * @since   3.9.0
 */

declare(strict_types=1);

namespace Parsely;

use WP_Error;

/**
 * Contains a variety of validation functions.
 *
 * @since 3.9.0
 */
class Validator {

	public const INVALID_API_CREDENTIALS = 'invalid_api_credentials';

	/**
	 * Validates the passed Metadata Secret.
	 *
	 * Currently, the Metadata Secret is considered valid if it is exactly 10
	 * characters.
	 *
	 * @since 3.9.0
	 *
	 * @param string $metadata_secret The Metadata Secret to be validated.
	 * @return bool True if the Metadata Secret is valid, false otherwise.
	 */
	public static function validate_metadata_secret( string $metadata_secret ): bool {
		return strlen( $metadata_secret ) === 10;
	}

	/**
	 * Validates the passed API Credentials.
	 *
	 * @since 3.11.0
	 *
	 * @param Parsely $parsely The Parsely instance.
	 * @param string  $site_id The Site ID to be validated.
	 * @param string  $api_secret The API Secret to be validated.
	 * @return WP_Error|true True if the API Credentials are valid, false otherwise.
	 */
	public static function validate_api_credentials( Parsely $parsely, string $site_id, string $api_secret ) {
		$wp_error = new WP_Error();

		// If the API secret is empty, the validation endpoint will always fail. Since it's possible to
		// use only the API key without the secret, we'll skip the validation and assume it's valid.
		if ( '' === $api_secret ) {
			return true;
		}

		$query_args = array(
			'apikey' => $site_id,
			'secret' => $api_secret,
		);

		$validate_api = new RemoteAPI\Validate_API( $parsely );
		$request      = $validate_api->get_items( $query_args );

		if ( is_wp_error( $request ) ) {
			$wp_error->add(
				self::INVALID_API_CREDENTIALS,
				__( 'Invalid API Credentials', 'wp-parsely' )
			);
			return $wp_error;
		}

		return true;
	}
}
