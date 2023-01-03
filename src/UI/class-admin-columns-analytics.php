<?php
/**
 * UI: Class for adding `Parse.ly Stats` on admin columns.
 *
 * @package Parsely
 * @since   3.7.0
 */

declare(strict_types=1);

namespace Parsely\UI;

use DateTime;
use WP_Post;
use WP_Error;
use Parsely\Parsely;
use Parsely\RemoteAPI\Analytics_Posts_API;

use function Parsely\Utils\get_formatted_number;
use function Parsely\Utils\get_formatted_time;
use function Parsely\Utils\get_utc_date;

use const Parsely\PARSELY_FILE;
use const Parsely\Utils\DATE_UTC_FORMAT;
use const Parsely\Utils\WP_MAX_POSTS_PER_PAGE;
use const Parsely\Utils\DATE_TIME_UTC_FORMAT;

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
	 * @var array<string, Analytics_Post_Metrics>
	 */
	private $parsely_stats_map = array();

	/**
	 * Internal Variable.
	 *
	 * @var WP_Error|null
	 */
	private $parsely_stats_api_error = null;

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
	 */
	public function run(): void {
		if ( $this->parsely->site_id_is_set() && $this->parsely->api_secret_is_set() && $this->is_post_list_screen() ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_parsely_stats_styles' ) );
			add_action( 'admin_notices', array( $this, 'show_parsely_stats_api_error' ) );
			add_filter( 'the_posts', array( $this, 'set_parsely_stats' ) );
			add_filter( 'manage_posts_columns', array( $this, 'add_parsely_stats_column_on_list_view' ) );
			add_action( 'manage_posts_custom_column', array( $this, 'show_parsely_stats' ) );
		}
	}

	/**
	 * Enqueues styles for Parse.ly Stats.
	 */
	public function enqueue_parsely_stats_styles(): void {
		$admin_settings_asset = require_once plugin_dir_path( PARSELY_FILE ) . 'build/admin-parsely-stats.asset.php';
		$built_assets_url     = plugin_dir_url( PARSELY_FILE ) . '/build/';

		wp_enqueue_style(
			'parsely-admin-settings',
			$built_assets_url . 'admin-parsely-stats.css',
			$admin_settings_asset['dependencies'] ?? null,
			$admin_settings_asset['version'] ?? Parsely::VERSION
		);
	}

	/**
	 * Show notice related to Parsely Analytics API Error.
	 *
	 * @since 3.7.0
	 *
	 * @return void
	 */
	public function show_parsely_stats_api_error(): void {
		if ( is_null( $this->parsely_stats_api_error ) ) {
			return;
		}

		$error = $this->parsely_stats_api_error;

		?>
		<div class="error notice">
			<p>
				<?php esc_html_e( 'Error while getting data for Parse.ly Stats.', 'wp-parsely' ); ?> <br/>
				<?php
					esc_html_e( 'Detail: ', 'wp-parsely' );
					esc_html( "({$error->get_error_code()}) {$error->get_error_message()}" );
				?>
				<br/>
			</p>
		</div>
		<?php
	}

	/**
	 * Calculate Min and Max Publish date from all the found posts.
	 *
	 *  @param WP_Post[] $posts Array of post objects.
	 *
	 * @return WP_Post[]
	 */
	public function set_parsely_stats( array $posts ): array {
		$date_params = $this->get_publish_date_params_for_analytics_api( $posts );
		if ( is_null( $date_params ) ) {
			return $posts;
		}

		$analytics_api = new Analytics_Posts_API( $this->parsely );
		$response      = $analytics_api->get_post_analytics(
			array(
				'period_start'   => get_utc_date( - Analytics_Posts_API::ANALYTICS_API_DAYS_LIMIT ),
				'period_end'     => get_utc_date(),
				'pub_date_start' => $date_params['pub_date_start'] ?? '',
				'pub_date_end'   => $date_params['pub_date_end'] ?? '',
				'limit'          => WP_MAX_POSTS_PER_PAGE,
				'sort'           => 'avg_engaged',
			)
		);

		if ( is_wp_error( $response ) ) {
			$this->parsely_stats_api_error = $response;
			return $posts;
		}

		foreach ( $response as $analytics_post ) {
			$key = $this->get_unique_stats_key_from_analytics( $analytics_post );

			if ( '' !== $key && isset( $analytics_post['metrics'] ) ) {
				$this->parsely_stats_map[ $key ] = $analytics_post['metrics'];
			}
		}

		return $posts;
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
	 * Show Parsely Stats.
	 *
	 * @param string $column_key Key of the column.
	 *
	 * @return void
	 */
	public function show_parsely_stats( string $column_key ): void {
		if ( 'parsely-stats' !== $column_key ) {
			return;
		}

		$key = $this->get_unique_stats_key_of_current_post();

		if ( '' === $key || ! isset( $this->parsely_stats_map[ $key ] ) ) {
			echo '—';
			return;
		}

		$metrics = $this->parsely_stats_map[ $key ];

		if ( isset( $metrics['views'] ) ) {
			$views = $metrics['views'];
			?>

			<span class='parsely-post-page-views'>
				<?php echo esc_html( get_formatted_number( $views ) . ' ' . _n( 'page view', 'page views', $views, 'wp-parsely' ) ); ?>
			</span> <br/>

			<?php 
		}

		if ( isset( $metrics['visitors'] ) ) {
			$visitors = $metrics['visitors'];
			?>

			<span class='parsely-post-visitors'>
				<?php echo esc_html( get_formatted_number( $visitors ) . ' ' . _n( 'visitor', 'visitors', $visitors, 'wp-parsely' ) ); ?>
			</span> <br/>

			<?php
		}

		if ( isset( $metrics['avg_engaged'] ) ) {
			$engaged_seconds = $metrics['avg_engaged'] * 60;
			?>

			<span class='parsely-post-avg_engaged'>
				<?php echo esc_html( get_formatted_time( $engaged_seconds ) . ' ' . __( 'avg time', 'wp-parsely' ) ); ?>
			</span> <br/>

			<?php
		}
	}

	/**
	 * Get publish date params for analytics API.
	 *
	 * For getting date params we loop through all the posts and calculate
	 * the min and max publish dates based on which we will limit the analytics API.
	 *
	 * @param WP_Post[] $posts Array of post objects.
	 *
	 * @return Analytics_Post_API_Params|null
	 */
	private function get_publish_date_params_for_analytics_api( array $posts ) {
		if ( count( $posts ) === 0 ) {
			return null;
		}

		$max_date_time = '';
		$min_date_time = '';

		foreach ( $posts as $post ) {
			$published_date_time = $post->post_date_gmt;

			if ( '' === $min_date_time || $published_date_time < $min_date_time ) {
				$min_date_time = $published_date_time;
			}

			if ( $published_date_time > $max_date_time ) {
				$max_date_time = $published_date_time;
			}
		}

		return array(
			'pub_date_start' => ( new DateTime( $min_date_time ) )->format( DATE_UTC_FORMAT ),
			'pub_date_end'   => ( new DateTime( $max_date_time ) )->format( DATE_UTC_FORMAT ),
		);
	}

	/**
	 * Get unique key which we can use for Parse.ly stats map.
	 * Mainly we need this because Parse.ly doesn't have anything unique in its analytics API.
	 *
	 * @param Analytics_Post $analytics_post Post analytics obj returned from Parse.ly API.
	 *
	 * @return string
	 */
	private function get_unique_stats_key_from_analytics( $analytics_post ): string {
		if ( ! isset( $analytics_post['title'] ) || ! isset( $analytics_post['pub_date'] ) ) {
			return '';
		}

		return $analytics_post['title'] . '-' . $analytics_post['pub_date'];
	}

	/**
	 * Get unique key from currently set post which we can use to get data from Parse.ly stats map.
	 *
	 * @return string
	 */
	private function get_unique_stats_key_of_current_post(): string {
		global $post;

		$published_date     = $post->post_date_gmt;
		$published_utc_date = ( new DateTime( $published_date ) )->format( DATE_TIME_UTC_FORMAT );

		return get_the_title() . '-' . $published_utc_date;
	}

	/**
	 * Return TRUE if the current screen is post list screen.
	 *
	 * @since 3.7.0
	 * @todo Add support for pages and custom post types (currently pending due to API limitation).
	 *
	 * @return bool
	 */
	private function is_post_list_screen(): bool {
		if ( ! isset( $_SERVER['REQUEST_URI'] ) ) {
			return false;
		}

		return '/wp-admin/edit.php' === $_SERVER['REQUEST_URI']; // Compare current screen url with post list screen.
	}
}
