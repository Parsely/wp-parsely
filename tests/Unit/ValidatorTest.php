<?php
/**
 * Unit Tests: Validator functionality
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Unit;

use Parsely\Validator;
use Yoast\WPTestUtils\BrainMonkey\TestCase;

/**
 * Unit tests for the functions of the Validator class.
 *
 * @since 3.3.0
 * @since 3.9.0 Renamed/moved to ValidatorTest.php.
 */
final class ValidatorTest extends TestCase {
	/**
	 * Verifies that valid Site IDs pass validation.
	 *
	 * @since 3.3.0
	 * @since 3.9.0 Renamed to test_validate_valid_site_ids().
	 *
	 * @covers \Parsely\Validator::validate_site_id
	 */
	public function test_validate_valid_site_ids(): void {
		$valid_site_ids = array(
			'test.com',
			'www.test.com',
			'subdomain.test.com',
			'www.subdomain.test.com',
			'subdomain.subdomain.test.com',
		);

		foreach ( $valid_site_ids as $valid_site_id ) {
			self::assertTrue( Validator::validate_site_id( $valid_site_id ) );
		}
	}

	/**
	 * Verifies that invalid Site IDs fail validation.
	 *
	 * @since 3.3.0
	 * @since 3.9.0 Extracted from test_validate_site_ids() as a separate test.
	 *
	 * @covers \Parsely\Validator::validate_site_id
	 */
	public function test_validate_invalid_site_ids(): void {
		$invalid_values = array(
			'test',
			'test.',
			'test.com/',
			't%st.com',
			't@st.com',
			'http://test.com',
			'https://test.com',
			'www.subdomain.subdomain.test.com', // Value cannot have more than 3 periods.
		);

		foreach ( $invalid_values as $invalid_site_id ) {
			self::assertFalse( Validator::validate_site_id( $invalid_site_id ) );
		}
	}

	/**
	 * Verifies that valid API Secrets pass validation.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Validator::validate_api_secret
	 */
	public function test_validate_valid_api_secrets(): void {
		$valid_api_secrets = array(
			'valid_api_secret_key_based_on_length',
		);

		foreach ( $valid_api_secrets as $valid_api_secret ) {
			self::assertTrue( Validator::validate_api_secret( $valid_api_secret ) );
		}
	}

	/**
	 * Verifies that invalid API Secrets fail validation.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Validator::validate_api_secret
	 */
	public function test_validate_invalid_api_secrets(): void {
		$valid_api_secrets = array(
			'less_than_30_characters',
		);

		foreach ( $valid_api_secrets as $valid_api_secret ) {
			self::assertFalse( Validator::validate_api_secret( $valid_api_secret ) );
		}
	}

	/**
	 * Verifies that valid Metadata Secrets pass validation.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Validator::validate_metadata_secret
	 */
	public function test_validate_valid_metadata_secrets(): void {
		$valid_metadata_secrets = array(
			'goodlength',
		);

		foreach ( $valid_metadata_secrets as $valid_metadata_secret ) {
			self::assertTrue( Validator::validate_metadata_secret( $valid_metadata_secret ) );
		}
	}

	/**
	 * Verifies that invalid Metadata Secrets fail validation.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Validator::validate_metadata_secret
	 */
	public function test_validate_invalid_metadata_secrets(): void {
		$valid_metadata_secrets = array(
			'too_short',
			'too_long_to_be_valid',
		);

		foreach ( $valid_metadata_secrets as $valid_metadata_secret ) {
			self::assertFalse( Validator::validate_metadata_secret( $valid_metadata_secret ) );
		}
	}
}
