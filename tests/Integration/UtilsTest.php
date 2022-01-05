<?php
/**
 * Tests of the Utils class
 *
 * @package Parsely\Tests\Unit
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

// Explicit require as the `Rest` class could not be found in some environments.
require_once __DIR__ . '/../../src/class-utils.php';

use Parsely\Utils;

/**
 * Test the functions on the utilities class.
 */
final class UtilsTest extends TestCase {
	/**
	 * Test if Parse.ly Dash URL can be generated for a post.
	 *
	 * @covers \Parsely\Utils::generate_parsely_post_url
	 */
	public function test_generate_parsely_post_url(): void {
		$post_id = self::factory()->post->create();
		$post    = get_post( $post_id );
		$apikey  = 'demo-api-key';

		$expected = 'https://dash.parsely.com/demo-api-key/find?url=http%3A%2F%2Fexample.org%2F%3Fp%3D' . $post_id . '&utm_campaign=wp-admin-posts-list&utm_medium=wp-parsely&utm_source=wp-admin';
		$actual   = Utils::generate_parsely_post_url( $post, $apikey );

		self::assertSame( $expected, $actual );
	}
}
