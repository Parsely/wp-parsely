<?php
/**
 * Parsely `/related` Remote API Integration tests.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use Parsely\RemoteAPI\Related_Proxy;
use WP_Error;

/**
 * Parsely `/related` Remote API tests.
 */
final class RelatedRemoteAPITest extends TestCase {
	/**
	 * Internal Parsely variable
	 *
	 * @var Parsely $parsely Holds the Parsely object
	 */
	private static $parsely;

	/**
	 * The setUp run before each test
	 */
	public function set_up(): void {
		parent::set_up();

		self::$parsely = new Parsely();
	}

	/**
	 * Data provider for test_related_api_url().
	 *
	 * @return array[]
	 */
	public function data_related_api_url(): array {
		return array(
			'Basic (Expected data)'                   => array(
				array(
					'apikey'         => 'my-key',
					'pub_date_start' => '7d',
					'sort'           => 'score',
					'boost'          => 'views',
					'limit'          => 5,
				),
				'https://api.parsely.com/v2/related?apikey=my-key&boost=views&limit=5&pub_date_start=7d&sort=score',
			),
			'published_within value of 0'             => array(
				array(
					'apikey' => 'my-key',
					'sort'   => 'score',
					'boost'  => 'views',
					'limit'  => 5,
				),
				'https://api.parsely.com/v2/related?apikey=my-key&boost=views&limit=5&sort=score',
			),
			'Sort on publish date (no boost param)'   => array(
				array(
					'apikey' => 'my-key',
					'sort'   => 'pub_date',
					'limit'  => 5,
				),
				'https://api.parsely.com/v2/related?apikey=my-key&limit=5&sort=pub_date',
			),
			'Rank by relevance only (no boost param)' => array(
				array(
					'apikey' => 'my-key',
					'sort'   => 'score',
					'limit'  => 5,
				),
				'https://api.parsely.com/v2/related?apikey=my-key&limit=5&sort=score',
			),
		);
	}

	/**
	 * Test the basic generation of the API URL.
	 *
	 * @dataProvider data_related_api_url
	 * @covers Parsely\RemoteAPI\Related_Proxy:get_api_url
	 *
	 * @param array  $query Test query arguments.
	 * @param string $url Expected generated URL.
	 */
	public function test_related_api_url( array $query, string $url ): void {
		self::set_options( array( 'apikey' => 'my-key' ) );
		$proxy = new Related_Proxy( self::$parsely, $query );
		self::assertEquals( $url, $proxy->get_api_url( $query ) );
	}
}
