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
}
