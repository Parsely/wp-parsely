<?php
/**
 * Integration Tests: Recommended Widget
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Recommended_Widget;

/**
 * Integration Tests for the Recommended Widget.
 *
 * @since 3.24.2
 */
final class RecommendedWidgetTest extends TestCase {
	/**
	 * Verifies that the widget's API URL includes only the arguments that
	 * /related uses.
	 *
	 * @since 3.24.2
	 *
	 * @covers \Parsely\UI\Recommended_Widget::get_api_url
	 * @covers \Parsely\UI\Recommended_Widget::widget
	 * @uses \Parsely\Parsely::get_content_api
	 * @uses \Parsely\Services\Base_API_Service::get_api_url
	 * @uses \Parsely\Services\Base_API_Service::get_endpoint
	 * @uses \Parsely\UI\Recommended_Widget::__construct
	 * @uses \Parsely\UI\Recommended_Widget::get_widget_settings
	 * @uses \Parsely\UI\Recommended_Widget::site_id_and_secret_are_populated
	 */
	public function test_api_url_includes_only_the_related_arguments(): void {
		TestCase::set_options(
			array(
				'apikey'     => 'example.com',
				'api_secret' => 'TEST-APISECRET-fixture',
			)
		);

		ob_start();
		( new Recommended_Widget( new Parsely() ) )->widget(
			array(
				'before_widget' => '',
				'after_widget'  => '',
				'before_title'  => '',
				'after_title'   => '',
			),
			array( 'published_within' => 7 )
		);
		$output = (string) ob_get_clean();

		self::assertStringNotContainsString( 'TEST-APISECRET-fixture', $output );

		preg_match( '/data-parsely-widget-api-url="([^"]*)"/', $output, $matches );
		self::assertSame(
			'https://api.parsely.com/v2/related?apikey=example.com&sort=score&limit=5&pub_date_start=7d',
			html_entity_decode( $matches[1] ?? '' )
		);
	}
}
