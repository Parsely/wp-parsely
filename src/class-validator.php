<?php
/**
 * Validator class
 *
 * @package Parsely
 * @since   3.9.0
 */

declare(strict_types=1);

namespace Parsely;

/**
 * Contains a variety of validation functions.
 *
 * @since 3.9.0
 */
class Validator {
	/**
	 * Validates the passed Site ID.
	 *
	 * Accepts a www prefix and up to 3 periods.
	 *
	 * Valid examples: 'test.com', 'www.test.com', 'subdomain.test.com',
	 * 'www.subdomain.test.com', 'subdomain.subdomain.test.com'.
	 *
	 * Invalid examples: 'test', 'test.com/', 'http://test.com', 'https://test.com',
	 * 'www.subdomain.subdomain.test.com'.
	 *
	 * @since 3.3.0
	 * @since 3.9.0 Moved to Validator class.
	 *
	 * @param string $site_id The Site ID to be validated.
	 * @return bool
	 */
	public static function validate_site_id( string $site_id ): bool {
		$key_format = '/^((\w+)\.)?(([\w-]+)?)(\.[\w-]+){1,2}$/';

		return 1 === preg_match( $key_format, $site_id );
	}
}
