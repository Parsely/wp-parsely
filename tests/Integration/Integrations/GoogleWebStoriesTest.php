<?php
/**
 * Google Web Stories integration tests.
 *
 * @package Parsely\Tests\Integrations
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Integrations;

use Parsely\Integrations\Google_Web_Stories;
use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;

/**
 * Test Google Web Stories integration.
 */
final class GoogleWebStoriesTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var GoogleWebStoriesTest $google Holds the Google_Web_Stories object.
	 */
	private static $google;

	/**
	 * The setUpBeforeClass run before all tests
	 */
	public static function setUpBeforeClass(): void {
		parent::setUpBeforeClass();

		// Mocking the existence of the plugin for the sake of testing.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
		define( 'WEBSTORIES_PLUGIN_FILE', __DIR__ );
	}

	/**
	 * The setUp run before each test
	 */
	public function set_up(): void {
		parent::set_up();

		$parsely      = new Parsely();
		self::$google = new Google_Web_Stories( $parsely );
	}

	/**
	 * Test if the web stories analytics got enqueued.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\Scripts::run()
	 * @group scripts
	 */
	public function test_web_stories_script_is_enqueued(): void {
		self::$google->integrate();
		self::assertSame(
			10,
			has_action( 'web_stories_print_analytics', array( self::$google, 'render_amp_analytics_tracker' ) )
		);
	}

	/**
	 * Test if the AMP tracker render outputs the correct script.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\Scripts::render_amp_analytics_tracker
	 * @group scripts
	 */
	public function test_render_amp_analytics_tracker(): void {
		$this::set_options( array( 'apikey' => 'blog.parsely.com' ) );

		ob_start();
		$this::$google->render_amp_analytics_tracker();
		$output = ob_get_clean();
		$output = str_replace( array( "\r", "\n" ), '', $output );

		$expected = '
		<amp-analytics type="parsely">
			<script type="application/json">
				{
					"vars": {
						"apikey": "blog.parsely.com"
					}
				}
			</script>
		</amp-analytics>
		';
		$expected = str_replace( array( "\r", "\n" ), '', $expected );

		self::assertSame( $expected, $output );
	}
}
