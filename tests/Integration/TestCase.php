<?php
/**
 * Integration Tests: Abstract base class for all test case implementations
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use DateInterval;
use DateTime;
use DateTimeZone;
use ReflectionClass;
use ReflectionProperty;
use ReflectionMethod;
use Parsely\Parsely;
use PHPUnit\Framework\RiskyTestError;
use UnexpectedValueException;
use WP_Error;
use WP_Post;
use WP_Term;
use Yoast\WPTestUtils\WPIntegration\TestCase as WPIntegrationTestCase;

use const Parsely\Utils\WP_DATE_TIME_FORMAT;

/**
 * Abstract base class for all test case implementations.
 *
 * @phpstan-type Script_Status 'done'|'enqueued'|'queue'|'registered'|'to_do'
 */
abstract class TestCase extends WPIntegrationTestCase {

	use \Parsely\Tests\Tests_Reflection;

	public const DEFAULT_OPTIONS = array(
		'apikey'                    => 'blog.parsely.com',
		'content_id_prefix'         => '',
		'use_top_level_cats'        => false,
		'cats_as_tags'              => false,
		'track_authenticated_users' => false,
		'custom_taxonomy_section'   => 'category',
		'lowercase_tags'            => true,
		'track_post_types'          => array( 'post' ),
		'track_page_types'          => array( 'page' ),
		'logo'                      => '',
	);

	/**
	 * Updates Parse.ly options with a merge of default and custom values.
	 *
	 * @param array<string, mixed> $custom_options Associative array of option keys and values to be saved.
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
	 * @return array<string, mixed> An array of WP_Post fields.
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
	 *
	 * @return int
	 */
	public function create_test_category( string $name ): int {
		/** @var int */
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
	 * @param string $user_role The user's role. Default is subscriber.
	 *
	 * @return int The newly created user's ID.
	 */
	public function create_test_user( string $user_login, string $user_role = 'subscriber' ): int {
		/** @var int */
		return self::factory()->user->create(
			array(
				'user_login' => $user_login,
				'role'       => $user_role,
			)
		);
	}

	/**
	 * Creates a test blog.
	 *
	 * @param string $domain  Site second-level domain without a .com TLD e.g. 'example' will
	 *                        result in a new subsite of 'http://example.com'.
	 * @param int    $user_id User ID for the site administrator.
	 *
	 * @return int
	 */
	public function create_test_blog( string $domain, int $user_id ): int {
		/** @var int */
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
	 *
	 * @return int
	 */
	public function create_test_taxonomy( string $taxonomy_key, string $term_name ): int {
		register_taxonomy(
			$taxonomy_key,
			'post',
			array(
				'label'        => $taxonomy_key,
				'hierarchical' => true,
			)
		);

		/** @var int */
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

		/** @var int */
		return self::factory()->post->create( $post_data );
	}

	/**
	 * Creates test posts in sequence.
	 *
	 * @param int    $num_of_posts Optional. Number of posts we need to create.
	 * @param string $post_type Optional. Type of the posts.
	 * @param string $post_status Optional. Status of the posts.
	 *
	 * @return WP_Post[]
	 */
	public function create_and_get_test_posts( int $num_of_posts = 1, string $post_type = 'post', string $post_status = 'publish' ): array {
		$post_ids = $this->create_posts_and_get_ids( $num_of_posts, $post_type, $post_status );

		return $this->get_test_posts( $post_ids );
	}

	/**
	 * Creates test posts in sequence.
	 *
	 * @param int    $num_of_posts Optional. Number of posts we need to create.
	 * @param string $post_type Optional. Type of the posts.
	 * @param string $post_status Optional. Status of the posts.
	 *
	 * @return int[]
	 */
	private function create_posts_and_get_ids( int $num_of_posts = 1, string $post_type = 'post', string $post_status = 'publish' ): array {
		/**
		 * Variable.
		 *
		 * @var int[]
		 */
		$post_ids = array();

		/**
		 * Variable.
		 *
		 * @var DateTime
		 */
		$date = new DateTime( '2009-12-31', new DateTimeZone( 'America/New_York' ) ); // Date with timezone to replicate real world scenarios.

		/**
		 * Variable.
		 *
		 * @var DateInterval
		 */
		$one_day_interval = date_interval_create_from_date_string( '1 days' );

		for ( $i = 1; $i <= $num_of_posts; $i++ ) {
			/**
			 * Variable.
			 *
			 * @var DateTime
			 */
			$post_date = date_add( $date, $one_day_interval ); // Like sequence increment by 1 day.
			$post_id   = self::factory()->post->create(
				array(
					'post_type'     => $post_type,
					'post_status'   => $post_status,
					'post_title'    => "Title $i-($post_status)",
					'post_author'   => $i,
					'post_content'  => "Content $i",
					'post_date'     => $post_date->format( WP_DATE_TIME_FORMAT ),
					'post_date_gmt' => gmdate( WP_DATE_TIME_FORMAT, $post_date->getTimestamp() ),
				)
			);

			array_push( $post_ids, $post_id );
		}

		/** @var array<int> */
		return $post_ids;
	}

	/**
	 * Wrapper around get_post function which must return WP_Post.
	 *
	 * This function ensures strict typing in our codebase.
	 *
	 * @param int|WP_Error $post_id Optional. Defaults to global $post.
	 *
	 * @throws UnexpectedValueException If $post_id is a WP_Error object.
	 *
	 * @return WP_Post
	 */
	public function get_post( $post_id = null ): WP_Post {
		if ( is_wp_error( $post_id ) ) {
			throw new UnexpectedValueException(
				esc_html( $post_id->get_error_message() )
			);
		}

		if ( null === $post_id ) {
			global $post;
			$post_obj = $post;
		} else {
			$post_obj = get_post( $post_id );
		}

		return $post_obj;
	}

	/**
	 * Wrapper around get_post function which must return WP_Post as an associative array.
	 *
	 * This function ensures strict typing in our codebase.
	 *
	 * @param int|WP_Error $post_id ID of the posts.
	 *
	 * @throws UnexpectedValueException If $post_id is a WP_Error object.
	 *
	 * @return array<string, mixed>
	 */
	public function get_post_in_array( $post_id ): array {
		if ( is_wp_error( $post_id ) ) {
			throw new UnexpectedValueException(
				esc_html( $post_id->get_error_message() )
			);
		}

		return get_post( $post_id, 'ARRAY_A' ) ?? array();
	}

	/**
	 * Gets given test posts.
	 *
	 * @param int[] $post_ids IDs of the posts.
	 *
	 * @return WP_Post[]
	 */
	private function get_test_posts( array $post_ids = array() ): array {
		$posts = array();

		foreach ( $post_ids as $post_id ) {
			array_push( $posts, get_post( $post_id ) );
		}

		/**
		 * Variable.
		 *
		 * @var WP_Post[]
		 */
		return $posts;
	}

	/**
	 * Wrapper around get_permalink function which must return url.
	 *
	 * This function ensures strict typing in our codebase.
	 *
	 * @param int|WP_Error $post_id ID of the post.
	 *
	 * @throws UnexpectedValueException If $post_id is a WP_Error object.
	 *
	 * @return string|false
	 */
	public function get_permalink( $post_id ) {
		if ( is_wp_error( $post_id ) ) {
			throw new UnexpectedValueException(
				esc_html( $post_id->get_error_message() )
			);
		}

		return get_permalink( $post_id );
	}

	/**
	 * Wrapper around get_term function which must return WP_Term.
	 *
	 * This function ensures strict typing in our codebase.
	 *
	 * @param int $term_id ID of the term.
	 *
	 * @return WP_Term
	 */
	public function get_term( int $term_id ): WP_Term {
		/**
		 * Variable.
		 *
		 * @var WP_Term
		 */
		return get_term( $term_id );
	}

	/**
	 * Wrapper around get_term function which must return WP_Term in associative array.
	 *
	 * This function ensures strict typing in our codebase.
	 *
	 * @param int $term_id ID of the term.
	 *
	 * @return array<string, mixed>
	 */
	public function get_term_in_array( int $term_id ): array {
		/**
		 * Variable.
		 *
		 * @var array<string, mixed>
		 */
		return get_term( $term_id, '', 'ARRAY_A' );
	}

	/**
	 * Wrapper around get_term_link function which must return url.
	 *
	 * This function ensures strict typing in our codebase.
	 *
	 * @param int $term_id ID of the term.
	 *
	 * @return string
	 */
	public function get_term_link( int $term_id ): string {
		/**
		 * Variable.
		 *
		 * @var string
		 */
		return get_term_link( $term_id );
	}

	/**
	 * Wrapper around get_post_time function which must return time in int.
	 *
	 * This function ensures strict typing in our codebase.
	 *
	 * @param string      $format Format to use for retrieving the time.
	 * @param bool        $is_gmt Whether to retrieve the GMT time.
	 * @param int|WP_Post $post WP_Post object or ID.
	 *
	 * @return int
	 */
	public function get_post_time_in_int( string $format, bool $is_gmt, $post ): int {
		/**
		 * Variable.
		 *
		 * @var int
		 */
		return get_post_time( $format, $is_gmt, $post );
	}

	/**
	 * Wrapper around wp_json_encode function which must return string.
	 *
	 * This function ensures strict typing in our codebase.
	 *
	 * @param mixed $data — Variable (usually an array or object) to encode as JSON.
	 *
	 * @return string
	 */
	public function wp_json_encode( $data ): string {
		$encoded_data = wp_json_encode( $data );

		return false !== $encoded_data ? $encoded_data : '';
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
	 */
	public function set_admin_user( int $admin_user_id = 1 ): void {
		wp_set_current_user( $admin_user_id );
	}

	/**
	 * Creates a user with role `contributor` and login.
	 */
	public function login_as_contributor(): void {
		$user_id = $this->create_test_user( 'test_contributor', 'contributor' );
		wp_set_current_user( $user_id );
	}

	/**
	 * Verifies that given hooks are called or not.
	 *
	 * @param string[] $hooks WordPress hooks whose availability we have to verify.
	 * @param bool     $availability_type TRUE if we want to check the presence of given hooks.
	 */
	public function assert_wp_hooks_availability( array $hooks, bool $availability_type ): void {
		if ( true === $availability_type ) {
			$this->assert_wp_hooks( $hooks );
		} else {
			$this->assert_wp_hooks( array(), $hooks );
		}
	}

	/**
	 * Asserts WordPress hooks.
	 *
	 * @param string[] $true_hooks Optional. Actions that should have been present.
	 * @param string[] $false_hooks Optional. Actions that should have not been present.
	 *
	 * @throws RiskyTestError If no assertions get passed to the function.
	 */
	private function assert_wp_hooks( array $true_hooks = array(), array $false_hooks = array() ): void {
		if ( 0 === count( $true_hooks ) + count( $false_hooks ) ) {
			throw new RiskyTestError( 'Function assert_wp_hooks() has been used without any arguments' );
		}

		foreach ( $true_hooks as $hook ) {
			self::assertTrue(
				has_action( $hook ),
				"Unexpected hook status: $hook should have been called."
			);
		}

		foreach ( $false_hooks as $hook ) {
			self::assertFalse(
				has_action( $hook ),
				"Unexpected hook status: $hook should have not been called."
			);
		}
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
	 * @param string               $handle       Script handle to test.
	 * @param array<Script_Status> $assert_true  Optional. Statuses that should assert to true. Accepts 'enqueued',
	 *                                           'registered', 'queue', 'to_do', and 'done'. Default is an empty array.
	 * @param array<Script_Status> $assert_false Optional. Statuses that should assert to false. Accepts 'enqueued',
	 *                                           'registered', 'queue', 'to_do', and 'done'. Default is an empty array.
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
	 * @param string        $handle       Style handle to test.
	 * @param array<string> $assert_true  Optional. Statuses that should assert to true. Accepts 'enqueued',
	 *                                    'registered', 'queue', 'to_do', and 'done'. Default is an empty array.
	 * @param array<string> $assert_false Optional. Statuses that should assert to false. Accepts 'enqueued',
	 *                                    'registered', 'queue', 'to_do', and 'done'. Default is an empty array.
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
	 * Gets private property of a class.
	 *
	 * @param class-string $class_name Name of the class.
	 * @param string       $property_name Name of the property.
	 *
	 * @return ReflectionProperty
	 */
	public function get_private_property( string $class_name, string $property_name ): ReflectionProperty {
		$reflector = new ReflectionClass( $class_name );
		$property  = $reflector->getProperty( $property_name );

		$property->setAccessible( true );

		return $property;
	}

	/**
	 * Gets private method of a class.
	 *
	 * @param class-string $class_name Name of the class.
	 * @param string       $method Name of the method.
	 *
	 * @return ReflectionMethod
	 */
	public function get_private_method( string $class_name, string $method ): ReflectionMethod {
		$reflector = new ReflectionClass( $class_name );
		$method    = $reflector->getMethod( $method );

		$method->setAccessible( true );

		return $method;
	}
}
