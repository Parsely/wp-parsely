<?php
/**
 * UI: Class for adding `Parse.ly Stats` on admin columns.
 *
 * @package Parsely
 * @since   3.7.0
 */

declare(strict_types=1);

namespace Parsely\UI;

use stdClass;
use DateTime;
use WP_Post;
use Parsely\Parsely;
use Parsely\RemoteAPI\Analytics_Posts_API;

use const Parsely\Utils\WP_MAX_POSTS_PER_PAGE;

/**
 * Shows `Parse.ly Stats` on Admin Columns
 *
 * @since 3.7.0
 *
 * @phpstan-import-type Analytics_Post_API_Params from Analytics_Posts_API
 * @phpstan-import-type Analytics_Post from Analytics_Posts_API
 * @phpstan-import-type Analytics_Post_Metrics from Analytics_Posts_API
 */
final class Admin_Columns_Analytics {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * Internal Variable.
	 *
	 * @var array<string, mixed>
	 */
	private $parsely_stats_map = array();

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Registers action and filter hook callbacks.
	 *
	 * @since 3.7.0
	 * @todo  Add columns for pages and all other custom post types.
	 */
	public function run(): void {
		if ( $this->parsely->site_id_is_set() && $this->parsely->api_secret_is_set() ) {
			add_filter( 'the_posts', array( $this, 'set_parsely_stats' ), 10, 1 );
			add_filter( 'manage_posts_columns', array( $this, 'add_parsely_stats_column_on_list_view' ), 10, 1 );
			add_action( 'manage_posts_custom_column', array( $this, 'show_parsely_stats' ), 10, 2 );
			add_filter( 'manage_edit-post_sortable_columns', array( $this, 'makes_parsely_stats_sortable' ), 10, 1 );
		}
	}

	/**
	 * Adds the `Parse.ly Stats` on admin columns.
	 *
	 * @param array<string, string> $columns Columns array which contain keys and labels.
	 *
	 * @return array<string, string>
	 */
	public function add_parsely_stats_column_on_list_view( array $columns ): array {
		$columns['parsely-stats'] = 'Parse.ly Stats';

		return $columns;
	}

	/**
	 * Makes `Parse.ly Stats` column sortable.
	 *
	 * @param array<string, string> $columns Columns array which contain keys and labels.
	 *
	 * @return array<string, string>
	 */
	public function makes_parsely_stats_sortable( array $columns ): array {
		$columns['parsely-stats'] = 'parsely-stats';

		return $columns;
	}

	/**
	 * Show Parsely Stats.
	 *
	 * @param string $column_key Key of the column.
	 * @param int    $post_id ID of the post.
	 *
	 * @return void
	 */
	public function show_parsely_stats( string $column_key, int $post_id ): void {
		if ( 'parsely-stats' === $column_key ) {
			echo "
				<span class='parsely-post-page-views'> 30k page views </span> <br/>
				<span class='parsely-post-page-visitors'> 13k visitors </span> <br/>
				<span class='parsely-post-avg-time'> 1:04 avg time </span>
			";
		}
	}

	/**
	 * Calculate Min and Max Publish date from all the found posts.
	 *
	 *  @param WP_Post[] $posts Array of post objects.
	 *
	 * @return WP_Post[]
	 */
	public function set_parsely_stats( array $posts ): array {
		$post_type = is_null( get_current_screen() ) ? '' : get_current_screen()->post_type;
		if ( ! in_array( $post_type, array( 'post', 'page' ), true ) ) {
			return $posts;
		}

		$date_params = $this->get_date_params_for_analytics( $posts );
		if ( is_null( $date_params ) ) {
			return $posts;
		}

		$analytics_api = new Analytics_Posts_API( $this->parsely );
		$response      = $analytics_api->get_items(
			array(
				'pub_date_start' => $date_params['pub_date_start'] ?? '',
				'pub_date_end'   => $date_params['pub_date_end'] ?? '',
				'limit'          => WP_MAX_POSTS_PER_PAGE,
				'sort'           => 'avg_engaged',
			)
		);

		if ( is_wp_error( $response ) ) {
			// TODO: handle error.
			return $posts;
		}

		/**
		 * Variable.
		 *
		 * @var stdClass $analytics_post
		 */
		foreach ( $response as $analytics_post ) {
			/**
			 * Variable.
			 *
			 * @var string
			 */
			$url_with_api_utm                = $analytics_post->url;
			$url                             = str_replace( '/?itm_source=parsely-api', '', $url_with_api_utm );
			$this->parsely_stats_map[ $url ] = (array) $analytics_post->metrics;
		}

		return $posts;
	}

	/**
	 * Get date params for analytics API.
	 *
	 * @param WP_Post[] $posts Array of post objects.
	 *
	 * @return Analytics_Post_API_Params|null
	 */
	private function get_date_params_for_analytics( array $posts ) {
		if ( count( $posts ) === 0 ) {
			return null;
		}

		$max_date_time = '';
		$min_date_time = '';

		foreach ( $posts as $post ) {
			$published_date_time = $post->post_date;

			if ( '' === $min_date_time || $published_date_time < $min_date_time ) {
				$min_date_time = $published_date_time;
			}

			if ( $published_date_time > $max_date_time ) {
				$max_date_time = $published_date_time;
			}
		}

		// TODO: Any timezone issue to handle?
		$date_format    = 'Y-m-d';
		$pub_date_start = ( new DateTime( $min_date_time ) )->format( $date_format );
		$pub_date_end   = ( new DateTime( $max_date_time ) )->format( $date_format );

		return array(
			'pub_date_start' => $pub_date_start,
			'pub_date_end'   => $pub_date_end,
		);
	}
}
