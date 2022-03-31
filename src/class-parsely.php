<?php
/**
 * Parsely class
 *
 * @package Parsely
 * @since 2.5.0
 */

declare(strict_types=1);

namespace Parsely;

use WP_Post;

/**
 * Holds most of the logic for the plugin.
 *
 * @since 1.0.0
 * @since 2.5.0 Moved from plugin root file to this file.
 */
class Parsely {
	/**
	 * Declare our constants
	 */
	public const VERSION     = PARSELY_VERSION;
	public const MENU_SLUG   = 'parsely';             // Defines the page param passed to options-general.php.
	public const OPTIONS_KEY = 'parsely';             // Defines the key used to store options in the WP database.
	public const CAPABILITY  = 'manage_options';      // The capability required for the user to administer settings.

	/**
	 * Declare some class properties
	 *
	 * @var array<string, mixed> $option_defaults The defaults we need for the class.
	 */
	private $option_defaults = array(
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
	);

	/**
	 * Declare post types that Parse.ly will process as "posts".
	 *
	 * @link https://www.parse.ly/help/integration/jsonld#distinguishing-between-posts-and-pages
	 *
	 * @since 2.5.0
	 * @var string[]
	 */
	public const SUPPORTED_JSONLD_POST_TYPES = array(
		'NewsArticle',
		'Article',
		'TechArticle',
		'BlogPosting',
		'LiveBlogPosting',
		'Report',
		'Review',
		'CreativeWork',
	);

	/**
	 * Declare post types that Parse.ly will process as "non-posts".
	 *
	 * @link https://www.parse.ly/help/integration/jsonld#distinguishing-between-posts-and-pages
	 *
	 * @since 2.5.0
	 * @var string[]
	 */
	public const SUPPORTED_JSONLD_NON_POST_TYPES = array(
		'WebPage',
		'Event',
		'Hotel',
		'Restaurant',
		'Movie',
	);

	/**
	 * Register action and filter hook callbacks.
	 *
	 * Also, immediately upgrade options if needed.
	 *
	 * @return void
	 */
	public function run(): void {
		// Run upgrade options if they exist for the version currently defined.
		$options = $this->get_options();
		if ( empty( $options['plugin_version'] ) || self::VERSION !== $options['plugin_version'] ) {
			$method = 'upgrade_plugin_to_version_' . str_replace( '.', '_', self::VERSION );
			if ( method_exists( $this, $method ) ) {
				call_user_func_array( array( $this, $method ), array( $options ) );
			}
			// Update our version info.
			$options['plugin_version'] = self::VERSION;
			update_option( self::OPTIONS_KEY, $options );
		}

		// phpcs:ignore WordPress.WP.CronInterval.CronSchedulesInterval
		add_filter( 'cron_schedules', array( $this, 'wpparsely_add_cron_interval' ) );
		add_action( 'parsely_bulk_metas_update', array( $this, 'bulk_update_posts' ) );
		add_action( 'save_post', array( $this, 'update_metadata_endpoint' ) );
	}

	/**
	 * Adds 10 minute cron interval.
	 *
	 * @param array $schedules WP schedules array.
	 * @return array
	 */
	public function wpparsely_add_cron_interval( array $schedules ): array {
		$schedules['everytenminutes'] = array(
			'interval' => 600, // time in seconds.
			'display'  => __( 'Every 10 Minutes', 'wp-parsely' ),
		);
		return $schedules;
	}

	/**
	 * Get the full URL of the JavaScript tracker file for the site. If an API key is not set, return an empty string.
	 *
	 * @since 3.2.0
	 *
	 * @return string
	 */
	public function get_tracker_url(): string {
		if ( $this->api_key_is_set() ) {
			$tracker_url = 'https://cdn.parsely.com/keys/' . $this->get_api_key() . '/p.js';
			return esc_url( $tracker_url );
		}
		return '';
	}

	/**
	 * Insert the code for the <meta name='parsely-page'> parameter within the <head></head> tag.
	 *
	 * @since 3.2.0
	 *
	 * @param string $meta_type `json_ld` or `repeated_metas`.
	 * @return void
	 */
	public function render_metadata( string $meta_type ): void {
	}

	/**
	 * Insert the code for the <meta name='parsely-page'> parameter within the <head></head> tag.
	 *
	 * @since 3.0.0
	 *
	 * @return void
	 */
	public function insert_page_header_metadata(): void {
		$parsely_options = $this->get_options();
		$this->render_metadata( $parsely_options['meta_type'] );
	}

	/**
	 * Deprecated. Echo the metadata into the page, and return the inserted values.
	 *
	 * To just echo the metadata, use the `insert_page_header_metadata()` method.
	 * To get the metadata to be inserted, use the `construct_parsely_metadata()` method.
	 *
	 * @deprecated 3.0.0
	 * @see construct_parsely_metadata()
	 *
	 * @return array<string, mixed>
	 */
	public function insert_parsely_page(): array {
		_deprecated_function( __FUNCTION__, '3.0', 'construct_parsely_metadata()' );
		$this->insert_page_header_metadata();

		global $post;

		$parsed_post = get_post( $post );
		if ( ! $parsed_post instanceof WP_Post ) {
			return array();
		}

		return $this->construct_parsely_metadata( $this->get_options(), $parsed_post );
	}

	/**
	 * Function to be used in `array_filter` to clean up repeated metas.
	 *
	 * @since 2.6.0
	 *
	 * @param mixed $var Value to filter from the array.
	 * @return bool True if the variable is not empty, and it's a string.
	 */
	private static function filter_empty_and_not_string_from_array( $var ): bool {
		return is_string( $var ) && '' !== $var;
	}

	/**
	 * Compare the post_status key against an allowed list (by default, only 'publish'ed content includes tracking data).
	 *
	 * @since 2.5.0
	 *
	 * @param int|WP_Post $post Which post object or ID to check.
	 * @return bool Should the post status be tracked for the provided post's post_type. By default, only 'publish' is allowed.
	 */
	public static function post_has_trackable_status( $post ): bool {
		static $cache = array();
		$post_id      = is_int( $post ) ? $post : $post->ID;
		if ( isset( $cache[ $post_id ] ) ) {
			return $cache[ $post_id ];
		}

		/**
		 * Filters whether the post password check should be skipped when getting the post trackable status.
		 *
		 * @since 3.0.1
		 *
		 * @param bool $skip True if the password check should be skipped.
		 * @param int|WP_Post $post Which post object or ID is being checked.
		 *
		 * @returns bool
		 */
		$skip_password_check = apply_filters( 'wp_parsely_skip_post_password_check', false, $post );
		if ( ! $skip_password_check && post_password_required( $post ) ) {
			$cache[ $post_id ] = false;
			return false;
		}

		/**
		 * Filters the statuses that are permitted to be tracked.
		 *
		 * By default, the only status tracked is 'publish'. Use this filter if you have other published content that has a different (custom) status.
		 *
		 * @since 2.5.0
		 *
		 * @param string[]    $trackable_statuses The list of post statuses that are allowed to be tracked.
		 * @param int|WP_Post $post               Which post object or ID is being checked.
		 */
		$statuses          = apply_filters( 'wp_parsely_trackable_statuses', array( 'publish' ), $post );
		$cache[ $post_id ] = in_array( get_post_status( $post ), $statuses, true );
		return $cache[ $post_id ];
	}

	/**
	 * Deprecated. Please use the `Metadata` class instead.
	 *
	 * Creates parsely metadata object from post metadata.
	 *
	 * @deprecated 3.3.0
	 * @see \Parsely\Metadata::construct_metadata
	 *
	 * @param array<string, mixed> $parsely_options parsely_options array.
	 * @param WP_Post              $post object.
	 * @return array<string, mixed>
	 */
	public function construct_parsely_metadata( array $parsely_options, WP_Post $post ): array {
		$metadata = new Metadata( $this );
		return $metadata->construct_metadata( $parsely_options, $post );
	}

	/**
	 * Updates the Parsely metadata endpoint with the new metadata of the post.
	 *
	 * @param int $post_id id of the post to update.
	 * @return void
	 */
	public function update_metadata_endpoint( int $post_id ): void {
		$parsely_options = $this->get_options();

		if ( $this->api_key_is_missing() || empty( $parsely_options['metadata_secret'] ) ) {
			return;
		}

		$post     = get_post( $post_id );
		$metadata = $this->construct_parsely_metadata( $parsely_options, $post );

		$endpoint_metadata = array(
			'canonical_url' => $metadata['url'],
			'page_type'     => $this->convert_jsonld_to_parsely_type( $metadata['@type'] ),
			'title'         => $metadata['headline'],
			'image_url'     => $metadata['thumbnailUrl'],
			'pub_date_tmsp' => $metadata['datePublished'],
			'section'       => $metadata['articleSection'],
			'authors'       => $metadata['creator'],
			'tags'          => $metadata['keywords'],
		);

		$parsely_api_endpoint    = 'https://api.parsely.com/v2/metadata/posts';
		$parsely_metadata_secret = $parsely_options['metadata_secret'];
		$headers                 = array(
			'Content-Type' => 'application/json',
		);
		$body                    = wp_json_encode(
			array(
				'secret'   => $parsely_metadata_secret,
				'apikey'   => $parsely_options['apikey'],
				'metadata' => $endpoint_metadata,
			)
		);
		$response                = wp_remote_post(
			$parsely_api_endpoint,
			array(
				'method'      => 'POST',
				'headers'     => $headers,
				'blocking'    => false,
				'body'        => $body,
				'data_format' => 'body',
			)
		);

		if ( ! is_wp_error( $response ) ) {
			$current_timestamp = time();
			update_post_meta( $post_id, 'parsely_metadata_last_updated', $current_timestamp );
		}
	}

	/**
	 * Updates posts with Parsely metadata api in bulk.
	 *
	 * @return void
	 */
	public function bulk_update_posts(): void {
		global $wpdb;
		$parsely_options      = $this->get_options();
		$allowed_types        = array_merge( $parsely_options['track_post_types'], $parsely_options['track_page_types'] );
		$allowed_types_string = implode(
			', ',
			array_map(
				function( $v ) {
					return "'" . esc_sql( $v ) . "'";
				},
				$allowed_types
			)
		);
		$ids                  = wp_cache_get( 'parsely_post_ids_need_meta_updating' );
		if ( false === $ids ) {
			$ids = array();
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
			$results = $wpdb->get_results(
				$wpdb->prepare( "SELECT DISTINCT(id) FROM {$wpdb->posts} WHERE post_type IN (\" . %s . \") AND id NOT IN (SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'parsely_metadata_last_updated');", $allowed_types_string ),
				ARRAY_N
			);
			foreach ( $results as $result ) {
				array_push( $ids, $result[0] );
			}
			wp_cache_set( 'parsely_post_ids_need_meta_updating', $ids, '', 86400 );
		}

		for ( $i = 0; $i < 100; $i++ ) {
			$post_id = array_pop( $ids );
			if ( null === $post_id ) {
				wp_clear_scheduled_hook( 'parsely_bulk_metas_update' );
				break;
			}
			$this->update_metadata_endpoint( $post_id );
		}
	}

	/**
	 * Get the cache buster value for script and styles.
	 *
	 * If WP_DEBUG is defined and truthy, and we're not running tests, then use a random number.
	 * Otherwise, use the plugin version.
	 *
	 * @since 2.5.0
	 * @deprecated 3.2.0
	 *
	 * @return string Random number string or plugin version string.
	 */
	public static function get_asset_cache_buster(): string {
		_deprecated_function( 'Parsely::get_asset_cache_buster', '3.2.0' );
		static $cache_buster;
		if ( isset( $cache_buster ) ) {
			return $cache_buster;
		}

		$cache_buster = defined( 'WP_DEBUG' ) && WP_DEBUG && empty( 'WP_TESTS_DOMAIN' ) ? wp_rand() : PARSELY_VERSION;

		/**
		 * Filters the cache buster value for linked scripts and styles.
		 *
		 * @since 2.5.0
		 *
		 * @param string $cache_buster Plugin version, unless WP_DEBUG is defined and truthy, and tests are not running.
		 */
		$cache_buster = apply_filters_deprecated( 'wp_parsely_cache_buster', array( (string) $cache_buster ), '3.2.0' );

		return $cache_buster;
	}

	/**
	 * Safely returns options for the plugin by assigning defaults contained in optionDefaults.  As soon as actual
	 * options are saved, they override the defaults. This prevents us from having to do a lot of isset() checking
	 * on variables.
	 *
	 * @return array<string, mixed>
	 */
	public function get_options(): array {
		$options = get_option( self::OPTIONS_KEY, $this->option_defaults );

		if ( ! is_array( $options ) ) {
			return $this->option_defaults;
		}

		return array_merge( $this->option_defaults, $options );
	}

	/**
	 * Get the URL of the plugin settings page.
	 *
	 * @param int|null $_blog_id The Blog ID for the multisite subsite to use for context (Default null for current).
	 *
	 * @return string
	 */
	public static function get_settings_url( int $_blog_id = null ): string {
		return get_admin_url( $_blog_id, 'options-general.php?page=' . self::MENU_SLUG );
	}

	/**
	 * Check to see if parsely user is logged in.
	 *
	 * @return bool
	 */
	public function parsely_is_user_logged_in(): bool {
		// can't use $blog_id here because it futzes with the global $blog_id.
		$current_blog_id = get_current_blog_id();
		$current_user_id = get_current_user_id();
		return is_user_member_of_blog( $current_user_id, $current_blog_id );
	}

	/**
	 * Convert JSON-LD type to respective Parse.ly page type.
	 *
	 * If the JSON-LD type is one of the types Parse.ly supports as a "post", then "post" will be returned.
	 * Otherwise, for "non-posts" and unknown types, "index" is returned.
	 *
	 * @since 2.5.0
	 *
	 * @see https://www.parse.ly/help/integration/metatags#field-description
	 *
	 * @param string $type JSON-LD type.
	 * @return string "post" or "index".
	 */
	public function convert_jsonld_to_parsely_type( string $type ): string {
		return in_array( $type, self::SUPPORTED_JSONLD_POST_TYPES, true ) ? 'post' : 'index';
	}

	/**
	 * Determine if an API key is saved in the options.
	 *
	 * @since 2.6.0
	 *
	 * @return bool True is API key is set, false if it is missing.
	 */
	public function api_key_is_set(): bool {
		$options = $this->get_options();

		return (
				isset( $options['apikey'] ) &&
				is_string( $options['apikey'] ) &&
				'' !== $options['apikey']
		);
	}

	/**
	 * Determine if an API key is not saved in the options.
	 *
	 * @since 2.6.0
	 *
	 * @return bool True if API key is missing, false if it is set.
	 */
	public function api_key_is_missing(): bool {
		return ! $this->api_key_is_set();
	}

	/**
	 * Get the API key if set.
	 *
	 * @since 2.6.0
	 *
	 * @return string API key if set, or empty string if not.
	 */
	public function get_api_key(): string {
		$options = $this->get_options();

		return $this->api_key_is_set() ? $options['apikey'] : '';
	}
}
