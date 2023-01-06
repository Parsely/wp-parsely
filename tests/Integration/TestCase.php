<?php
/**
 * Integration Tests: Abstract base class for all test case implementations
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use DateTime;
use DateTimeZone;
use ReflectionClass;
use ReflectionProperty;
use ReflectionMethod;
use Parsely\Parsely;
use PHPUnit\Framework\RiskyTestError;
use WP_Error;
use WP_Post;
use Yoast\WPTestUtils\WPIntegration\TestCase as WPIntegrationTestCase;

use const Parsely\Utils\WP_DATE_TIME_FORMAT;

/**
 * Abstract base class for all test case implementations.
 */
abstract class TestCase extends WPIntegrationTestCase {

	use \Parsely\Tests\Tests_Reflection;

	public const DEFAULT_OPTIONS = array(
		'apikey'                    => 'blog.parsely.com',
		'content_id_prefix'         => '',
		'use_top_level_cats'        => false,
		'cats_as_tags'              => false,
		'track_authenticated_users' => true,
		'custom_taxonomy_section'   => 'category',
		'lowercase_tags'            => true,
		'track_post_types'          => array( 'post' ),
		'track_page_types'          => array( 'page' ),
		'logo'                      => '',
	);

	public const EMPTY_DEFAULT_OPTIONS = array(
		'apikey'                      => '',
		'content_id_prefix'           => '',
		'api_secret'                  => '',
		'use_top_level_cats'          => false,
		'custom_taxonomy_section'     => 'category',
		'cats_as_tags'                => false,
		'track_authenticated_users'   => true,
		'lowercase_tags'              => true,
		'force_https_canonicals'      => false,
		'track_post_types'            => array( 'post' ),
		'track_page_types'            => array( 'page' ),
		'disable_javascript'          => false,
		'disable_amp'                 => false,
		'meta_type'                   => 'json_ld',
		'logo'                        => '',
		'metadata_secret'             => '',
		'parsely_wipe_metadata_cache' => false,
		'disable_autotrack'           => false,
		'plugin_version'              => '',
	);

	/**
	 * Updates Parse.ly options with a merge of default and custom values.
	 *
	 * @param array $custom_options Associative array of option keys and values
	 *                              to be saved.
	 */
	public static function set_options( array $custom_options = array() ): void {
		update_option( Parsely::OPTIONS_KEY, array_merge( self::DEFAULT_OPTIONS, $custom_options ) );
	}

	/**
	 * Creates a test post.
	 *
	 * @param string $post_type Optional. The post's type. Default is 'post'.
	 * @param string $post_status Optional. The post's status. Default is 'publish'.
	 *
	 * @return array An array of WP_Post fields.
	 */
	public function create_test_post_array( string $post_type = 'post', string $post_status = 'publish' ): array {
		return array(
			'post_title'   => 'Sample Parsely Post',
			'post_author'  => 1,
			'post_content' => 'Some sample content just to have here',
			'post_status'  => $post_status,
			'post_type'    => $post_type,
		);
	}

	/**
	 * Creates a test category.
	 *
	 * @param string $name Category name.
	 * @return array|WP_Error Array containing the term_id and term_taxonomy_id,
	 *                        WP_Error otherwise.
	 */
	public function create_test_category( string $name ) {
		return self::factory()->category->create(
			array(
				'name'                 => $name,
				'category_description' => $name,
				'category_nicename'    => 'category-' . $name,
				'taxonomy'             => 'category',
			)
		);
	}

	/**
	 * Creates a test user.
	 *
	 * @param string $user_login The user's login username.
	 * @return int|WP_Error The newly created user's ID or a WP_Error object
	 *                      if the user could not be created.
	 */
	public function create_test_user( string $user_login ) {
		return self::factory()->user->create( array( 'user_login' => $user_login ) );
	}

	/**
	 * Creates a test blog.
	 *
	 * @param string $domain  Site second-level domain without a .com TLD e.g. 'example' will
	 *                        result in a new subsite of 'http://example.com'.
	 * @param int    $user_id User ID for the site administrator.
	 * @return int|WP_Error The site ID on success, WP_Error object on failure.
	 */
	public function create_test_blog( string $domain, int $user_id ) {
		return self::factory()->blog->create(
			array(
				'domain'  => 'https://' . $domain . 'com',
				'user_id' => $user_id,
			)
		);
	}

	/**
	 * Creates a test taxonomy with a single term.
	 *
	 * @param string $taxonomy_key Taxonomy key, must not exceed 32 characters.
	 * @param string $term_name    The term name to add.
	 * @return array|WP_Error An array containing the term_id and term_taxonomy_id,
	 *                        WP_Error otherwise.
	 */
	public function create_test_taxonomy( string $taxonomy_key, string $term_name ) {
		register_taxonomy(
			$taxonomy_key,
			'post',
			array(
				'label'        => $taxonomy_key,
				'hierarchical' => true,
			)
		);

		return self::factory()->term->create(
			array(
				'name'     => $term_name,
				'taxonomy' => $taxonomy_key,
			)
		);
	}

	/**
	 * Creates a new post.
	 *
	 * @param string $post_status Optional. The post's status. Default is 'publish'.
	 *
	 * @return int The new post's ID.
	 */
	public function create_test_post( string $post_status = 'publish' ): int {
		$post_data = $this->create_test_post_array( 'post', $post_status );

		return self::factory()->post->create( $post_data );
	}

	/**
	 * Creates multiple test posts in sequence.
	 *
	 * @param int $num_of_posts Optional. Number of posts we need to create.
	 *
	 * @return int[]
	 */
	public function create_test_posts( int $num_of_posts = 1 ) {
		/**
		 * Variable.
		 *
		 * @var int[]
		 */
		$post_ids = array();
		$date     = new DateTime( '2009-12-31', new DateTimeZone( 'America/New_York' ) ); // Start date with timezone to replicate scenarios like real world.

		for ( $i = 1; $i <= $num_of_posts; $i++ ) {
			$post_date = date_add( $date, date_interval_create_from_date_string( '1 days' ) ); // Increment by 1 day like sequence.
			$post_id   = self::factory()->post->create(
				array(
					'post_title'    => "Title $i",
					'post_author'   => $i,
					'post_content'  => "Content $i",
					'post_date'     => $post_date->format( WP_DATE_TIME_FORMAT ),
					'post_date_gmt' => gmdate( WP_DATE_TIME_FORMAT, $post_date->getTimestamp() ),
					'post_status'   => 'publish',
					'post_type'     => 'post',
				) 
			);

			array_push( $post_ids, $post_id );
		}

		return $post_ids;
	}

	/**
	 * Get given test posts.
	 *
	 * @param int[] $post_ids IDs of the posts.
	 *
	 * @return WP_Post[]
	 */
	public function get_test_posts( $post_ids = array() ) {
		// phpcs:disable
		return get_posts(
			array(
				'include'          => $post_ids,
				'suppress_filters' => false,
			)
		);
		// phpcs:enable
	}

	/**
	 * Creates a new post and navigates to it.
	 *
	 * @param string $post_status Optional. The post's status. Default is 'publish'.
	 *
	 * @return int The new post's ID.
	 */
	public function go_to_new_post( string $post_status = 'publish' ): int {
		$post_id = $this->create_test_post( $post_status );
		$this->go_to( '/?p=' . $post_id );

		return $post_id;
	}

	/**
	 * Sets current user as admin.
	 *
	 * @param int $admin_user_id User ID for the site administrator.
	 *                           Default is 1 which is assigned to first admin user while creating the site.
	 *
	 * @return void
	 */
	public function set_admin_user( $admin_user_id = 1 ): void {
		wp_set_current_user( $admin_user_id );
	}

	/**
	 * Asserts that a passed script is not registered.
	 *
	 * @param string $handle Script handle to test.
	 */
	public function assert_is_script_not_registered( string $handle ): void {
		$this->assert_script_statuses( $handle, array(), array( 'registered' ) );
	}

	/**
	 * Asserts that a passed script is registered.
	 *
	 * @param string $handle Script handle to test.
	 */
	public function assert_is_script_registered( string $handle ): void {
		$this->assert_script_statuses( $handle, array( 'registered' ) );
	}

	/**
	 * Asserts that a passed script is not enqueued.
	 *
	 * @param string $handle Script handle to test.
	 */
	public function assert_is_script_not_enqueued( string $handle ): void {
		$this->assert_script_statuses( $handle, array(), array( 'enqueued' ) );
	}

	/**
	 * Asserts that a passed script is enqueued.
	 *
	 * @param string $handle Script handle to test.
	 */
	public function assert_is_script_enqueued( string $handle ): void {
		$this->assert_script_statuses( $handle, array( 'enqueued' ) );
	}

	/**
	 * Asserts multiple enqueuing statuses for a script.
	 *
	 * @param string $handle       Script handle to test.
	 * @param array  $assert_true  Optional. Statuses that should assert to true. Accepts 'enqueued',
	 *                             'registered', 'queue', 'to_do', and 'done'. Default is an empty array.
	 * @param array  $assert_false Optional. Statuses that should assert to false. Accepts 'enqueued',
	 *                             'registered', 'queue', 'to_do', and 'done'. Default is an empty array.
	 *
	 * @throws RiskyTestError If no assertions ($assert_true, $assert_false) get passed to the function.
	 */
	private function assert_script_statuses( string $handle, array $assert_true = array(), array $assert_false = array() ): void {
		if ( 0 === count( $assert_true ) + count( $assert_false ) ) {
			throw new RiskyTestError( 'Function assert_script_statuses() has been used without any arguments' );
		}

		foreach ( $assert_true as $status ) {
			self::assertTrue(
				wp_script_is( $handle, $status ),
				"Unexpected script status: $handle status should be '$status'"
			);
		}

		foreach ( $assert_false as $status ) {
			self::assertFalse(
				wp_script_is( $handle, $status ),
				"Unexpected script status: $handle status should NOT be '$status'"
			);
		}
	}

	/**
	 * Asserts that a passed style is not registered.
	 *
	 * @param string $handle Style handle to test.
	 */
	public function assert_is_style_not_registered( string $handle ): void {
		$this->assert_style_statuses( $handle, array(), array( 'registered' ) );
	}

	/**
	 * Asserts that a passed style is registered.
	 *
	 * @param string $handle Style handle to test.
	 */
	public function assert_is_style_registered( string $handle ): void {
		$this->assert_style_statuses( $handle, array( 'registered' ) );
	}

	/**
	 * Asserts that a passed style is not enqueued.
	 *
	 * @param string $handle Style handle to test.
	 */
	public function assert_is_style_not_enqueued( string $handle ): void {
		$this->assert_style_statuses( $handle, array(), array( 'enqueued' ) );
	}

	/**
	 * Asserts that a passed style is enqueued.
	 *
	 * @param string $handle Style handle to test.
	 */
	public function assert_is_style_enqueued( string $handle ): void {
		$this->assert_style_statuses( $handle, array( 'enqueued' ) );
	}

	/**
	 * Asserts multiple enqueuing statuses for a style.
	 *
	 * @param string $handle       Style handle to test.
	 * @param array  $assert_true  Optional. Statuses that should assert to true. Accepts 'enqueued',
	 *                             'registered', 'queue', 'to_do', and 'done'. Default is an empty array.
	 * @param array  $assert_false Optional. Statuses that should assert to false. Accepts 'enqueued',
	 *                             'registered', 'queue', 'to_do', and 'done'. Default is an empty array.
	 *
	 * @throws RiskyTestError If no assertions ($assert_true, $assert_false) get passed to the function.
	 */
	private function assert_style_statuses( string $handle, array $assert_true = array(), array $assert_false = array() ): void {
		if ( 0 === count( $assert_true ) + count( $assert_false ) ) {
			throw new RiskyTestError( 'Function assert_style_statuses() has been used without any arguments' );
		}

		foreach ( $assert_true as $status ) {
			self::assertTrue(
				wp_style_is( $handle, $status ),
				"Unexpected style status: $handle status should be '$status'"
			);
		}

		foreach ( $assert_false as $status ) {
			self::assertFalse(
				wp_style_is( $handle, $status ),
				"Unexpected style status: $handle status should NOT be '$status'"
			);
		}
	}

	/**
	 * Get private property of a class.
	 *
	 * @param class-string $class_name Name of the class.
	 * @param string       $property_name Name of the property.
	 *
	 * @return ReflectionProperty
	 */
	public function getPrivateProperty( $class_name, $property_name ) {
		$reflector = new ReflectionClass( $class_name );
		$property  = $reflector->getProperty( $property_name );

		$property->setAccessible( true );

		return $property;
	}

	/**
	 * Get private method of a class.
	 *
	 * @param class-string $class_name Name of the class.
	 * @param string       $method Name of the method.
	 *
	 * @return ReflectionMethod
	 */
	public function getPrivateMethod( $class_name, $method ) {
		$reflector = new ReflectionClass( $class_name );
		$method    = $reflector->getMethod( $method );

		$method->setAccessible( true );

		return $method;
	}
}
