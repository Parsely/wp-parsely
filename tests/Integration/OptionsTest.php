<?php
/**
 * Integration Tests: Plugin options
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;

/**
 * Integration Tests for plugin options.
 */
final class OptionsTest extends TestCase {
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

		self::$parsely = new Parsely();
	}

	/**
	 * Teardown method called after each test.
	 *
	 * Resets globals.
	 */
	public function tear_down(): void {
		parent::tear_down();
		self::reset_post_types();
	}

	/**
	 * Verifies that get_options() can handle corrupted or unset values.
	 *
	 * @since 3.0.0
	 *
	 * @covers \Parsely\Parsely::get_default_options
	 * @covers \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_default_options_are_returned_when_options_are_corrupted_or_not_set(): void {
		add_option( Parsely::OPTIONS_KEY, 'someinvalidvalue' );

		$options = self::$parsely->get_options();
		self::assertSame( self::$parsely->get_default_options(), $options );

		delete_option( Parsely::OPTIONS_KEY );
		self::assertSame( self::$parsely->get_default_options(), $options );
	}

	/**
	 * Verifies that get_options() returns the correct "Track As" defaults.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_get_options_returns_correct_track_as_defaults(): void {
		$options = self::$parsely->get_options();
		self::assertSame( array( 'post' ), $options['track_post_types'] );
		self::assertSame( array( 'page' ), $options['track_page_types'] );
	}

	/**
	 * Verifies that set_default_track_as_values() does not get called when
	 * saved plugin options exist.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_set_default_track_as_values_should_not_be_called_when_saved_options_exist(): void {
		$options                     = self::$parsely->get_options();
		$options['track_post_types'] = array( 'new_post_type' );
		$options['track_page_types'] = array( 'new_page_type' );

		add_option( Parsely::OPTIONS_KEY, $options );
		$saved_options = self::$parsely->get_options();

		self::assertSame( array( 'new_post_type' ), $saved_options['track_post_types'] );
		self::assertSame( array( 'new_page_type' ), $saved_options['track_page_types'] );
	}

	/**
	 * Verifies that get_options() returns the correct "Track As" defaults when
	 * Custom Post Types are registered.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @covers \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_get_options_track_as_defaults_when_cpts_are_registered(): void {
		$custom_post_types = array(
			// Post.
			'custom_post_type'     => array(
				'public'       => true,
				'supports'     => array( 'editor' ),
				'hierarchical' => false,
			),
			// Private post.
			'excluded_post_type_1' => array(
				'public'       => false,
				'supports'     => array( 'editor' ),
				'hierarchical' => false,
			),
			// Post without editor support.
			'excluded_post_type_2' => array(
				'public'       => true,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => false,
			),
			// Private post without editor support.
			'excluded_post_type_3' => array(
				'public'       => false,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => false,
			),
			// Page.
			'custom_page_type'     => array(
				'public'       => true,
				'supports'     => array( 'editor' ),
				'hierarchical' => true,
			),
			// Private page.
			'excluded_page_type_1' => array(
				'public'       => false,
				'supports'     => array( 'editor' ),
				'hierarchical' => true,
			),
			// Page without editor support.
			'excluded_page_type_2' => array(
				'public'       => true,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => true,
			),
			// Private page without editor support.
			'excluded_page_type_3' => array(
				'public'       => false,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => true,
			),
		);

		foreach ( $custom_post_types as $key => $value ) {
			// phpcs:ignore WordPress.NamingConventions.ValidPostTypeSlug.NotStringLiteral
			register_post_type( $key, $value );
		}

		$options = self::$parsely->get_options();

		self::assertSame( array( 'post', 'custom_post_type' ), $options['track_post_types'] );
		self::assertSame( array( 'page', 'custom_page_type' ), $options['track_page_types'] );
	}

	/**
	 * Verifies that get_options() returns the correct full_metadata_in_non_posts
	 * option default value.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_get_options_returns_correct_full_metadata_in_non_posts_default_value(): void {
		$options = self::$parsely->get_options();
		self::assertSame( true, $options['full_metadata_in_non_posts'] );
	}

	/**
	 * Verifies that the set_default_full_metadata_in_non_posts() function
	 * doesn't get called when saved plugin options exist.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_set_default_full_metadata_in_non_posts_values_should_not_be_called_when_saved_options_exist(): void {
		$option_key             = 'full_metadata_in_non_posts';
		$options                = self::$parsely->get_options();
		$options[ $option_key ] = false;

		add_option( Parsely::OPTIONS_KEY, $options );
		$saved_options = self::$parsely->get_options();

		self::assertSame( false, $saved_options[ $option_key ] );
	}

	/**
	 * Verifies that the set_default_full_metadata_in_non_posts() function
	 * returns the expected value under different circumstances:
	 *
	 * - Option is saved (get value from database).
	 * - Option isn't saved (get value from defaults).
	 * - Option value is influenced by a metadata filter (modify default value).
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @covers \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::sanitize_managed_option
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_set_default_full_metadata_in_non_posts_returns_expected_values(): void {
		$option_key      = 'full_metadata_in_non_posts';
		$default_options = self::$parsely->get_default_options();
		self::assertSame( true, $default_options[ $option_key ] );

		// Add a filter that will make the default value to return false.
		add_filter( 'wp_parsely_metadata', '__return_true' );

		// No options are saved. Should get the value from option defaults.
		self::assertSame(
			false,
			( new Parsely() )->get_options()[ $option_key ]
		);

		// Options are saved. Should get the value from the saved option.
		add_option( Parsely::OPTIONS_KEY, $default_options );
		self::assertSame(
			true,
			( new Parsely() )->get_options()[ $option_key ]
		);
	}

	/**
	 * Verifies that the set_default_full_metadata_in_non_posts() function
	 * returns false when different metadata filters are being used.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @covers \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_set_default_full_metadata_in_non_posts_returns_false_when_metadata_filters_are_used(): void {
		$option_key = 'full_metadata_in_non_posts';

		// Filter tags and how they should influence the expected value of the
		// full_metadata_in_non_posts option.
		$filters = array(
			'wp_parsely_metadata'          => false,
			'imaginary_filter'             => true, // Fake filter tag that should have no effect.
			'wp_parsely_post_tags'         => false,
			'wp_parsely_load_js_tracker'   => true, // Real filter tag that should have no effect.
			'wp_parsely_permalink'         => false,
			'wp_parsely_enable_admin_bar'  => true, // Real filter tag that should have no effect.
			'wp_parsely_post_category'     => false,
			'wp_parsely_pre_authors'       => false,
			'wp_parsely_post_authors'      => false,
			'wp_parsely_custom_taxonomies' => false,
			'wp_parsely_post_type'         => false,
		);

		/**
		 * Fake callback to be used when adding filters.
		 */
		$callback_function = function (): bool {
			return true;
		};

		foreach ( $filters as $filter_name => $expected_value ) {
			// Filter is not in use yet, so the result should always be true.
			self::assertSame(
				true,
				( new Parsely() )->get_options()[ $option_key ]
			);

			// Filter is being used now, so the result should be equal to the
			// expected value.
			add_filter( $filter_name, $callback_function );
			self::assertSame(
				$expected_value,
				( new Parsely() )->get_options()[ $option_key ]
			);

			// Remove the last used filter for the next round.
			remove_filter( $filter_name, $callback_function );
		}
	}

	/**
	 * Verifies that the full_metadata_in_non_posts option gets set to true when
	 * it does not exist in the options array.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @covers \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_full_metadata_in_non_posts_gets_set_to_true_when_it_does_not_exist_in_options_array(): void {
		$option_key = 'full_metadata_in_non_posts';
		$options    = self::$parsely->get_options();
		unset( $options[ $option_key ] );
		self::assertSame( true, self::$parsely->get_options()[ $option_key ] );
	}

	/**
	 * Verifies that the full_metadata_in_non_posts option gets set to false
	 * when it does not exist in the options array and a metadata filter is in
	 * use.
	 *
	 * @since 3.14.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @covers \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\Parsely::set_managed_options
	 */
	public function test_full_metadata_in_non_posts_gets_set_to_false_when_it_does_not_exist_in_options_array_and_a_metadata_filter_is_used(): void {
		$option_key = 'full_metadata_in_non_posts';
		$options    = self::$parsely->get_options();
		unset( $options[ $option_key ] );
		add_filter( 'wp_parsely_metadata', '__return_true' );
		self::assertSame( false, self::$parsely->get_options()[ $option_key ] );
	}

	/**
	 * Verifies that managed options with a value different than null override
	 * default and saved options.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @covers \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::sanitize_managed_option
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\UI\Settings_Page::get_section_taxonomies
	 */
	public function test_set_managed_options_override_all_other_option_types(): void {
		$default_options = self::$parsely->get_default_options();
		self::assertSame( 'json_ld', $default_options['meta_type'] );

		add_filter(
			'wp_parsely_managed_options',
			function () {
				return array( 'meta_type' => 'repeated_metas' );
			}
		);

		// Options aren't saved. Default meta_type value should be overridden.
		self::assertSame(
			'repeated_metas',
			( new Parsely() )->get_options()['meta_type']
		);

		// Options are saved. Saved meta_type value should be overridden.
		add_option( Parsely::OPTIONS_KEY, $default_options );
		self::assertSame(
			'repeated_metas',
			( new Parsely() )->get_options()['meta_type']
		);
	}

	/**
	 * Verifies that managed options with a null value get their value from the
	 * database or option defaults.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @covers \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::sanitize_managed_option
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 */
	public function test_null_managed_options_get_their_value_from_the_database_or_defaults(): void {
		$default_options = self::$parsely->get_default_options();
		self::assertSame( 'json_ld', $default_options['meta_type'] );

		add_filter(
			'wp_parsely_managed_options',
			function () {
				return array( 'meta_type' => null );
			}
		);

		// No options are saved. Should get the value from option defaults.
		self::assertSame(
			'json_ld',
			( new Parsely() )->get_options()['meta_type']
		);

		// Options are saved. Should get the value from saved option.
		$options              = $default_options;
		$options['meta_type'] = 'repeated_metas';
		add_option( Parsely::OPTIONS_KEY, $options );
		self::assertSame(
			'repeated_metas',
			( new Parsely() )->get_options()['meta_type']
		);
	}

	/**
	 * Verifies that certain options cannot be set as managed.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @covers \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_default_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::sanitize_managed_option
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 */
	public function test_certain_options_cannot_be_set_as_managed(): void {
		add_filter(
			'wp_parsely_managed_options',
			function () {
				return array(
					// Options that are not allowed to be managed.
					'api_secret'       => 'abcde',
					'apikey'           => '12345',
					'metadata_secret'  => 'fghij',
					'plugin_version'   => '1.2.3',
					'track_page_types' => array( 'page1', 'page2' ),
					'track_post_types' => array( 'post1', 'post2' ),
				);
			}
		);

		$expected                     = self::$parsely->get_default_options();
		$expected['track_post_types'] = array( 'post' );
		$expected['track_page_types'] = array( 'page' );

		self::assertSame(
			$expected,
			( new Parsely() )->get_options()
		);
	}

	/**
	 * Verifies that managed options sanitization works as expected.
	 *
	 * @since 3.9.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @covers \Parsely\Parsely::sanitize_managed_option
	 * @covers \Parsely\Parsely::set_managed_options
	 * @uses \Parsely\Parsely::__construct
	 * @uses \Parsely\Parsely::allow_parsely_remote_requests
	 * @uses \Parsely\Parsely::are_credentials_managed
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_full_metadata_in_non_posts
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 * @uses \Parsely\UI\Settings_Page::get_section_taxonomies
	 *
	 * @expectedIncorrectUsage sanitize_managed_option
	 */
	public function test_managed_options_get_sanitized(): void {
		add_filter(
			'wp_parsely_managed_options',
			function () {
				return array(
					'custom_taxonomy_section' => 1, // Should be string.
					'disable_javascript'      => 'string', // Should be boolean.
					'meta_type'               => 'Disallowed value',
					'use_top_level_cats'      => 2, // Should be boolean.
				);
			}
		);

		$options = ( new Parsely() )->get_options();

		self::assertSame( 'category', $options['custom_taxonomy_section'] );
		self::assertSame( false, $options['disable_javascript'] );
		self::assertSame( 'json_ld', $options['meta_type'] );
		self::assertSame( false, $options['use_top_level_cats'] );
	}
}
