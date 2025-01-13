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
