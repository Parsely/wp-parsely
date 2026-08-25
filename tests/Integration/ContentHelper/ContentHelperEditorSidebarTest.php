<?php
/**
 * Integration Tests: PCH Editor Sidebar
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\ContentHelper;

use Parsely\Content_Helper\Editor_Sidebar;
use Parsely\Parsely;

/**
 * Integration Tests for the PCH Editor Sidebar.
 */
final class ContentHelperEditorSidebarTest extends ContentHelperFeatureTest {
	/**
	 * Teardown method called after each test.
	 *
	 * @since 3.24.0
	 */
	public function tear_down(): void {
		// The injection test configures the site's defaults, which would
		// otherwise leak into the tests that follow.
		self::set_options();

		parent::tear_down();
	}

	/**
	 * Asserts the enqueueing status of the feature's assets according to the
	 * passed filter values.
	 *
	 * @since 3.9.0
	 *
	 * @param mixed                $global_filter_value The value of the global filter.
	 * @param mixed                $feature_filter_value The value of the feature filter.
	 * @param bool                 $expected Whether the assets should be enqueued.
	 * @param string               $user_login The current user's login.
	 * @param string               $user_role The current user's role.
	 * @param array<string, mixed> $additional_args Any required additional arguments.
	 */
	protected function assert_enqueued_status(
		$global_filter_value,
		$feature_filter_value,
		bool $expected,
		string $user_login,
		string $user_role,
		array $additional_args = array()
	): void {
		parent::assert_enqueued_status_default(
			new Editor_Sidebar( new Parsely() ),
			$global_filter_value,
			$feature_filter_value,
			$expected,
			$user_login,
			$user_role
		);
	}

	/**
	 * Verifies that the site-wide tone and persona are injected for each
	 * suggestion feature, each falling back independently.
	 *
	 * The desired length is deliberately absent, as it has no sentinel and
	 * reaches the editor through the settings endpoint.
	 *
	 * @since 3.24.0
	 *
	 * @covers \Parsely\Content_Helper\Editor_Sidebar::run
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::can_enable_feature
	 * @uses \Parsely\Content_Helper\Content_Helper_Feature::inject_inline_scripts
	 * @uses \Parsely\Content_Helper\Editor_Sidebar::__construct
	 * @uses \Parsely\Content_Helper\Editor_Sidebar::get_script_id
	 * @uses \Parsely\Content_Helper\Editor_Sidebar::get_style_id
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_persona
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_default_tone
	 * @uses \Parsely\Content_Helper\Suggestion_Defaults::get_feature_options
	 * @uses \Parsely\Parsely::get_options
	 */
	public function test_run_injects_the_site_wide_tone_and_persona(): void {
		$parsely                   = new Parsely();
		$options                   = self::DEFAULT_OPTIONS;
		$options['content_helper'] = $parsely->get_options()['content_helper'];

		$options['content_helper']['excerpt_suggestions']['default_tone']    = 'analytical';
		$options['content_helper']['excerpt_suggestions']['default_persona'] = 'techAnalyst';

		// The tone is configured, the persona is not, so each has to resolve
		// on its own.
		$options['content_helper']['title_suggestions']['default_tone'] = 'provocative';
		unset( $options['content_helper']['title_suggestions']['default_persona'] );

		update_option( Parsely::OPTIONS_KEY, $options );

		self::set_current_user_to( 'test_admin', 'administrator' );
		self::deregister_feature_assets_and_run( new Editor_Sidebar( new Parsely() ) );

		$injected = '';
		foreach ( (array) wp_scripts()->get_data( Editor_Sidebar::get_script_id(), 'before' ) as $chunk ) {
			if ( is_string( $chunk ) && false !== strpos( $chunk, 'wpParselyContentHelperDefaults' ) ) {
				$injected = $chunk;
			}
		}

		self::assertNotSame( '', $injected, 'The defaults were not injected.' );

		$decoded = json_decode(
			(string) preg_replace(
				'/^window\.wpParselyContentHelperDefaults = (.*);$/',
				'$1',
				trim( $injected )
			),
			true
		);

		self::assertSame(
			array(
				'excerptSuggestions' => array(
					'persona' => 'techAnalyst',
					'tone'    => 'analytical',
				),
				'titleSuggestions'   => array(
					'persona' => 'journalist',
					'tone'    => 'provocative',
				),
			),
			$decoded
		);
	}
}
