<?php
/**
 * Integration Tests: wp-admin Settings page
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Settings_Page;

use const Parsely\PARSELY_FILE;

const PARSELY_SETTINGS_URL = 'http://example.org/wp-admin/options-general.php?page=parsely';

/**
 * Integration Tests for the plugin's wp-admin Settings page.
 *
 * @since 3.1.0
 */
final class SettingsPageTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Settings_Page $settings_page Holds the Settings_Page object.
	 */
	private static $settings_page;

	/**
	 * Internal variable.
	 *
	 * @var Parsely $parsely Holds the Parsely object.
	 */
	private static $parsely;

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();
		self::$parsely       = new Parsely();
		self::$settings_page = new Settings_Page( self::$parsely );
	}

	/**
	 * Verifies that valid Site ID values are retained when validated.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_basic_section
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\UI\Settings_Page::__construct
	 * @uses \Parsely\UI\Settings_Page::get_logo_default
	 * @uses \Parsely\UI\Settings_Page::get_obfuscated_value
	 * @uses \Parsely\UI\Settings_Page::get_unobfuscated_value
	 * @uses \Parsely\UI\Settings_Page::sanitize_site_id
	 * @uses \Parsely\UI\Settings_Page::validate_advanced_section
	 * @uses \Parsely\UI\Settings_Page::validate_options
	 * @uses \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\UI\Settings_Page::validate_recrawl_section
	 * @uses \Parsely\Validator::validate_site_id
	 *
	 * @group settings-page
	 * @group settings-page-validation
	 */
	public function test_valid_site_id_values_are_retained_when_validated(): void {
		$options = self::$parsely->get_options();

		$options['apikey'] = 'mydomain.com';
		$expected          = $options;

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that invalid Site ID values are emptied when validated.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_basic_section
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\UI\Settings_Page::__construct
	 * @uses \Parsely\UI\Settings_Page::get_logo_default
	 * @uses \Parsely\UI\Settings_Page::get_obfuscated_value
	 * @uses \Parsely\UI\Settings_Page::get_unobfuscated_value
	 * @uses \Parsely\UI\Settings_Page::sanitize_site_id
	 * @uses \Parsely\UI\Settings_Page::validate_advanced_section
	 * @uses \Parsely\UI\Settings_Page::validate_options
	 * @uses \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\UI\Settings_Page::validate_recrawl_section
	 * @uses \Parsely\Validator::validate_site_id
	 *
	 * @group settings-page
	 * @group settings-page-validation
	 */
	public function test_invalid_site_id_values_are_emptied_when_validated(): void {
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		$options['apikey'] = 'invalid';

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that valid API Secret values are retained when validated.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_basic_section
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\UI\Settings_Page::__construct
	 * @uses \Parsely\UI\Settings_Page::get_logo_default
	 * @uses \Parsely\UI\Settings_Page::get_obfuscated_value
	 * @uses \Parsely\UI\Settings_Page::get_unobfuscated_value
	 * @uses \Parsely\UI\Settings_Page::sanitize_site_id
	 * @uses \Parsely\UI\Settings_Page::validate_advanced_section
	 * @uses \Parsely\UI\Settings_Page::validate_options
	 * @uses \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\UI\Settings_Page::validate_recrawl_section
	 * @uses \Parsely\Validator::validate_api_secret
	 * @uses \Parsely\Validator::validate_site_id
	 *
	 * @group settings-page
	 * @group settings-page-validation
	 */
	public function test_valid_api_secret_values_are_retained_when_validated(): void {
		$options = self::$parsely->get_options();

		// More than 30 characters.
		$options['api_secret'] = 'valid_api_secret_key_based_on_length';
		$expected              = $options;

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that invalid API Secret values are emptied when validated.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_basic_section
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\UI\Settings_Page::__construct
	 * @uses \Parsely\UI\Settings_Page::get_logo_default
	 * @uses \Parsely\UI\Settings_Page::get_obfuscated_value
	 * @uses \Parsely\UI\Settings_Page::get_unobfuscated_value
	 * @uses \Parsely\UI\Settings_Page::sanitize_site_id
	 * @uses \Parsely\UI\Settings_Page::validate_advanced_section
	 * @uses \Parsely\UI\Settings_Page::validate_options
	 * @uses \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\UI\Settings_Page::validate_recrawl_section
	 * @uses \Parsely\Validator::validate_api_secret
	 * @uses \Parsely\Validator::validate_site_id
	 *
	 * @group settings-page
	 * @group settings-page-validation
	 */
	public function test_invalid_api_secret_values_are_emptied_when_validated(): void {
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		$options['api_secret'] = 'a'; // Less than 30 characters.

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that valid Metadata Secret values are retained when validated.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_advanced_section
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\UI\Settings_Page::__construct
	 * @uses \Parsely\UI\Settings_Page::get_logo_default
	 * @uses \Parsely\UI\Settings_Page::get_obfuscated_value
	 * @uses \Parsely\UI\Settings_Page::get_unobfuscated_value
	 * @uses \Parsely\UI\Settings_Page::sanitize_site_id
	 * @uses \Parsely\UI\Settings_Page::validate_basic_section
	 * @uses \Parsely\UI\Settings_Page::validate_options
	 * @uses \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\UI\Settings_Page::validate_recrawl_section
	 * @uses \Parsely\Validator::validate_metadata_secret
	 * @uses \Parsely\Validator::validate_site_id
	 *
	 * @group settings-page
	 * @group settings-page-validation
	 */
	public function test_valid_metadata_secret_values_are_retained_when_validated(): void {
		$options = self::$parsely->get_options();

		$options['metadata_secret'] = 'goodlength'; // 10 characters.
		$expected                   = $options;

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that invalid Metadata Secret values are emptied when validated.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_advanced_section
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\UI\Settings_Page::__construct
	 * @uses \Parsely\UI\Settings_Page::get_logo_default
	 * @uses \Parsely\UI\Settings_Page::get_obfuscated_value
	 * @uses \Parsely\UI\Settings_Page::get_unobfuscated_value
	 * @uses \Parsely\UI\Settings_Page::sanitize_site_id
	 * @uses \Parsely\UI\Settings_Page::validate_basic_section
	 * @uses \Parsely\UI\Settings_Page::validate_options
	 * @uses \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\UI\Settings_Page::validate_recrawl_section
	 * @uses \Parsely\Validator::validate_metadata_secret
	 * @uses \Parsely\Validator::validate_site_id
	 *
	 * @group settings-page
	 * @group settings-page-validation
	 */
	public function test_invalid_metadata_secret_values_are_emptied_when_validated(): void {
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		$options['metadata_secret'] = 'too_short'; // Less than 10 characters.

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );

		$options['metadata_secret'] = 'too_lengthy'; // More than 10 characters.

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that managed credentials values are always emptied when
	 * validated.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\UI\Settings_Page::validate_advanced_section
	 * @covers \Parsely\UI\Settings_Page::validate_basic_section
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::api_secret_is_set
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_api_secret
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\UI\Settings_Page::__construct
	 * @uses \Parsely\UI\Settings_Page::get_logo_default
	 * @uses \Parsely\UI\Settings_Page::get_obfuscated_value
	 * @uses \Parsely\UI\Settings_Page::get_unobfuscated_value
	 * @uses \Parsely\UI\Settings_Page::sanitize_site_id
	 * @uses \Parsely\UI\Settings_Page::validate_options
	 * @uses \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\UI\Settings_Page::validate_recrawl_section
	 * @uses \Parsely\Validator::validate_site_id
	 *
	 * @group settings-page
	 * @group settings-page-validation
	 */
	public function test_managed_credentials_values_are_always_emptied_when_validated(): void {
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		add_filter(
			'wp_parsely_credentials',
			function () {
				return array(
					'site_id'         => 'example.com',
					'api_secret'      => 'test',
					'metadata_secret' => 'test',
				);
			}
		);

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that the "Track Post Types as" setting gets saved.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\UI\Settings_Page::__construct
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @covers \Parsely\UI\Settings_Page::get_logo_default
	 * @covers \Parsely\UI\Settings_Page::sanitize_option_array
	 * @covers \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\Parsely::get_options
	 *
	 * @group ui
	 */
	public function test_save_tracking_settings(): void {
		$options = self::$parsely->get_options();

		$options['track_post_types_as'] = array(
			'post'       => 'post',
			'page'       => 'page',
			'attachment' => 'post',
		);

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( array( 'post', 'attachment' ), $actual['track_post_types'] );
		self::assertSame( array( 'page' ), $actual['track_page_types'] );
	}

	/**
	 * Verifies that non-existent post types cannot be saved into the database
	 * for the "Track Post Types as" setting.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\UI\Settings_Page::__construct
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @covers \Parsely\UI\Settings_Page::get_logo_default
	 * @covers \Parsely\UI\Settings_Page::sanitize_option_array
	 * @covers \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\Parsely::get_options
	 *
	 * @group ui
	 */
	public function test_saving_tracking_settings_for_non_existent_post_type_should_fail(): void {
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		// Inject non-existent post type.
		$options['track_post_types_as'] = array(
			'page'                   => 'page',
			'post'                   => 'post',
			'non_existent_post_type' => 'post',
		);

		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that the "Track Post Types as" setting doesn't get saved when
	 * attempting to save it with an unset value.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\UI\Settings_Page::__construct
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @covers \Parsely\UI\Settings_Page::get_logo_default
	 * @covers \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\Parsely::get_options
	 *
	 * @group ui
	 */
	public function test_trying_to_save_unset_tracking_settings_should_fail(): void {
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		unset( $options['track_post_types_as'] );
		$actual = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that the "Track Post Types as" setting doesn't get saved when
	 * attempting to save it with an empty array.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\UI\Settings_Page::__construct
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @covers \Parsely\UI\Settings_Page::get_logo_default
	 * @covers \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\Parsely::get_options
	 *
	 * @group ui
	 */
	public function test_trying_to_save_empty_array_tracking_settings_should_fail(): void {
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		$options['track_post_types_as'] = array();
		$actual                         = self::$settings_page->validate_options( $options );
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that the "Track Post Types as" setting doesn't get saved when
	 * attempting to save it with a non-array value.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\UI\Settings_Page::__construct
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @covers \Parsely\UI\Settings_Page::get_logo_default
	 * @covers \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\Parsely::get_options
	 *
	 * @group ui
	 */
	public function test_trying_to_save_non_array_tracking_settings_should_fail(): void {
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		$options['track_post_types_as'] = 'string';
		$actual                         = self::$settings_page->validate_options( $options ); // @phpstan-ignore-line
		self::assertSame( $expected, $actual );
	}

	/**
	 * Verifies that the "disable_autotrack" option is taken into account during
	 * option validation, even if it is unset.
	 *
	 * @since 3.2.0
	 *
	 * @covers \Parsely\UI\Settings_Page::__construct
	 * @covers \Parsely\UI\Settings_Page::validate_options
	 * @covers \Parsely\UI\Settings_Page::get_logo_default
	 * @covers \Parsely\UI\Settings_Page::validate_options_post_type_tracking
	 * @uses \Parsely\Parsely::get_options
	 *
	 * @group ui
	 */
	public function test_saving_disable_autotrack_works_default_value(): void {
		$expected = self::$parsely->get_options();
		$options  = self::$parsely->get_options();

		unset( $options['disable_autotrack'] );
		$actual = self::$settings_page->validate_options( $options );
		self::assertEquals( $expected, $actual );
	}

	/**
	 * Verifies that the settings URL is correctly returned for single sites and
	 * multisites with and without a blog_id param.
	 *
	 * @covers \Parsely\Parsely::get_settings_url
	 * @uses \Parsely\UI\Settings_Page::__construct
	 */
	public function test_get_settings_url_with_and_without_blog_id(): void {
		self::assertSame(
			PARSELY_SETTINGS_URL,
			self::$parsely::get_settings_url(),
			'The URL did not match the expected value without a $blog_id param.'
		);

		self::assertSame(
			PARSELY_SETTINGS_URL,
			self::$parsely::get_settings_url( get_current_blog_id() ),
			'The URL did not match the expected value with a $blog_id param.'
		);

		if ( ! is_multisite() ) {
			return;
		}

		/** @var int $subsite_blog_id */
		$subsite_blog_id = self::factory()->blog->create(
			array(
				'domain' => 'parselyrocks.example.org',
				'path'   => '/vipvipvip',
			)
		);

		self::assertSame(
			'http://parselyrocks.example.org/vipvipvip/wp-admin/options-general.php?page=parsely',
			self::$parsely::get_settings_url( $subsite_blog_id ),
			'The URL did not match when passing $subsite_blog_id.'
		);

		// phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.switch_to_blog_switch_to_blog
		switch_to_blog( $subsite_blog_id );
		self::assertSame(
			'http://parselyrocks.example.org/vipvipvip/wp-admin/options-general.php?page=parsely',
			self::$parsely::get_settings_url(),
			'The URL did not match the subsite without passing a $blog_id param.'
		);
		restore_current_blog();

		self::assertSame(
			PARSELY_SETTINGS_URL,
			self::$parsely::get_settings_url(),
			'The URL did not match the expected value for the main site with no $blog_id param after switching back.'
		);
	}

	/**
	 * Verifies that the HTML markup generated for managed option fields is as
	 * expected.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\UI\Settings_Page::set_field_label_contents
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\UI\Settings_Page::__construct
	 * @uses \Parsely\UI\Settings_Page::get_obfuscated_value
	 * @uses \Parsely\UI\Settings_Page::get_section_taxonomies
	 * @uses \Parsely\UI\Settings_Page::get_tracking_values_for_display
	 * @uses \Parsely\UI\Settings_Page::initialize_advanced_section
	 * @uses \Parsely\UI\Settings_Page::initialize_basic_section
	 * @uses \Parsely\UI\Settings_Page::initialize_recrawl_section
	 * @uses \Parsely\UI\Settings_Page::initialize_settings
	 * @uses \Parsely\UI\Settings_Page::print_description_text
	 * @uses \Parsely\UI\Settings_Page::print_filter_text
	 * @uses \Parsely\UI\Settings_Page::print_media_single_image
	 * @uses \Parsely\UI\Settings_Page::print_radio_tags
	 * @uses \Parsely\UI\Settings_Page::print_select_tag
	 * @uses \Parsely\UI\Settings_Page::print_text_tag
	 * @uses \Parsely\UI\Settings_Page::print_track_post_types_table
	 * @uses \Parsely\UI\Settings_Page::show_setting_tabs
	 * @uses \Parsely\UI\Settings_Page::show_setting_tabs_content
	 *
	 * @param string $expected_html string The expected HTML markup.
	 * @param mixed  $managed_options array The managed options to set.
	 * @param mixed  $badge_options array The badge options to set.
	 *
	 * @dataProvider provide_test_managed_option_title_html_is_correct_data
	 */
	public function test_managed_option_title_html_is_correct(
		string $expected_html,
		$managed_options = 'ignore',
		$badge_options = 'ignore'
	): void {
		if ( 'ignore' !== $managed_options ) {
			add_filter(
				'wp_parsely_managed_options',
				function () use ( $managed_options ) {
					return $managed_options;
				}
			);
		}

		if ( 'ignore' !== $badge_options ) {
			add_filter(
				'wp_parsely_managed_options_badge',
				function () use ( $badge_options ) {
					return $badge_options;
				}
			);
		}

		$settings_page                    = new Settings_Page( new Parsely() );
		$GLOBALS['parsely_settings_page'] = $settings_page;

		$settings_page->initialize_settings();
		include plugin_dir_path( PARSELY_FILE ) . 'views/parsely-settings.php';
		self::expectOutputContains( $expected_html );
	}


	/**
	 * Provides data for the test_managed_option_title_html_is_correct test.
	 *
	 * @since 3.9.0
	 *
	 * @return iterable<array<mixed>> The test data.
	 */
	public function provide_test_managed_option_title_html_is_correct_data(): iterable {
		// Only set managed option. Badge with default options should be
		// displayed.
		yield 'managed option'                   => array(
			'<th scope="row"><label for="parsely[meta_type]">Metadata Format&nbsp;&nbsp;<a class="managed-option-badge" href="https://www.parse.ly/getdemo/" target="_blank" rel="noopener">Upgrade</a></label></th><td>		<fieldset disabled>',
			array( 'meta_type' => null ),
		);

		// Managed option with custom badge.
		yield 'managed option with custom badge' => array(
			'<th scope="row"><label for="parsely[meta_type]">Metadata Format&nbsp;&nbsp;<a class="managed-option-badge" href="https://www.parse.ly/getdemo-now/" target="_blank" rel="noopener">Upgrade Now!</a></label></th><td>		<fieldset disabled>',
			array( 'meta_type' => null ),
			array(
				'text' => 'Upgrade Now!',
				'url'  => 'https://www.parse.ly/getdemo-now/',
			),
		);

		// Attempt some invalid values against wp_parsely_managed_options and
		// wp_parsely_managed_options_badge filters.
		$expected_option_html = '<th scope="row"><label for="parsely[meta_type]">Metadata Format</label></th><td>		<fieldset >';
		$expected_badge_html  = '<th scope="row"><label for="parsely[meta_type]">Metadata Format</label></th><td>		<fieldset disabled>';
		$badge_options        = array(
			'text' => 'Test',
			'url'  => 'https://www.parse.ly/getdemo-now/',
		);

		yield 'null passed to wp_parsely_managed_options' => array(
			$expected_option_html,
			null,
			$badge_options,
		);
		yield 'null passed to wp_parsely_managed_options_badge' => array(
			'<th scope="row"><label for="logo">Logo</label></th>',
			array( 'logo' => null ),
			null,
		);

		yield 'array() passed to wp_parsely_managed_options' => array(
			$expected_option_html,
			array(),
			$badge_options,
		);
		yield 'array() passed to wp_parsely_managed_options_badge' => array(
			$expected_badge_html,
			array( 'meta_type' => 'json_ld' ),
			array(),
		);

		yield 'true passed to wp_parsely_managed_options' => array(
			$expected_option_html,
			true,
			$badge_options,
		);
		yield 'true passed to wp_parsely_managed_options_badge' => array(
			'<th scope="row">Use Top-Level Categories for Section</th><td>		<fieldset disabled>',
			array( 'use_top_level_cats' => false ),
			true,
		);

		yield 'false passed to wp_parsely_managed_options' => array(
			$expected_option_html,
			false,
			$badge_options,
		);
		yield 'false passed to wp_parsely_managed_options_badge' => array(
			'<th scope="row"><label for="parsely[custom_taxonomy_section]">Use Custom Taxonomy for Section</label></th><td><fieldset disabled>',
			array( 'custom_taxonomy_section' => 'category' ),
			false,
		);

		yield 'string passed to wp_parsely_managed_options' => array(
			$expected_option_html,
			'string',
			$badge_options,
		);
		yield 'string passed to wp_parsely_managed_options_badge' => array(
			$expected_badge_html,
			array( 'meta_type' => 'json_ld' ),
			'string',
		);

		yield 'integer passed to wp_parsely_managed_options' => array(
			$expected_option_html,
			100,
			$badge_options,
		);
		yield 'integer passed to wp_parsely_managed_options_badge' => array(
			$expected_badge_html,
			array( 'meta_type' => 'json_ld' ),
			100,
		);

		// Verify that the badge is not displayed when its text has an invalid
		// or empty value.
		$expected = '<th scope="row"><label for="parsely[meta_type]">Metadata Format</label></th><td>		<fieldset disabled>';

		yield 'no text passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => 'json_ld' ),
			array(
				'url' => 'https://www.parse.ly/getdemo/',
			),
		);

		yield 'null text passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => 'repeated_metas' ),
			array(
				'text' => null,
				'url'  => 'https://www.parse.ly/getdemo/',
			),
		);

		yield 'empty text passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => '',
				'url'  => 'https://www.parse.ly/getdemo/',
			),
		);

		yield 'array() text passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => array(),
				'url'  => 'https://www.parse.ly/getdemo/',
			),
		);

		yield 'true text passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => true,
				'url'  => 'https://www.parse.ly/getdemo/',
			),
		);

		yield 'false text passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => false,
				'url'  => 'https://www.parse.ly/getdemo/',
			),
		);

		yield 'integer text passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => 1,
				'url'  => 'https://www.parse.ly/getdemo/',
			),
		);

		// Verify that the badge is displayed as a span when its URL has an
		// invalid or empty value.
		$expected = '<th scope="row"><label for="parsely[meta_type]">Metadata Format&nbsp;&nbsp;<span class="managed-option-badge">Empty URL</span></label></th><td>		<fieldset disabled>';

		yield 'no url passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => 'json_ld' ),
			array( 'text' => 'Empty URL' ),
		);

		yield 'null url passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => 'repeated_metas' ),
			array(
				'text' => 'Empty URL',
				'url'  => null,
			),
		);

		yield 'empty url passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => 'Empty URL',
				'url'  => '',
			),
		);

		yield 'array() url passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => 'Empty URL',
				'url'  => array(),
			),
		);

		yield 'true url passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => 'Empty URL',
				'url'  => true,
			),
		);

		yield 'false url passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => 'Empty URL',
				'url'  => false,
			),
		);

		yield 'integer url passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => 'Empty URL',
				'url'  => 1,
			),
		);

		// Verify that unknown keys passed to wp_parsely_managed_options_badge
		// don't cause side-effects.
		yield 'unknown key passed to wp_parsely_managed_options_badge' => array(
			$expected,
			array( 'meta_type' => null ),
			array(
				'text' => 'Empty URL',
				'url2' => 'https://www.parse.ly/getdemo/',
			),
		);
	}
}
