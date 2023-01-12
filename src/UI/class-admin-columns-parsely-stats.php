<?php
/**
 * UI: Class for adding `Parse.ly Stats` on admin columns
 *
 * @package Parsely
 * @since   3.7.0
 */

declare(strict_types=1);

namespace Parsely\UI;

use DateTime;
use WP_Screen;
use Parsely\Parsely;
use Parsely\RemoteAPI\Remote_API_Base;
use Parsely\RemoteAPI\Analytics_Posts_API;

use function Parsely\Utils\get_formatted_number;
use function Parsely\Utils\get_formatted_time;
use function Parsely\Utils\get_utc_date_format;

use const Parsely\PARSELY_FILE;
use const Parsely\Utils\DATE_UTC_FORMAT;
use const Parsely\Utils\DATE_TIME_UTC_FORMAT;

/**
 * Shows `Parse.ly Stats` on Admin Columns.
 *
 * @since 3.7.0
 *
 * @phpstan-import-type Analytics_Post_API_Params from Analytics_Posts_API
 * @phpstan-import-type Analytics_Post from Analytics_Posts_API
 * @phpstan-import-type Remote_API_Error from Remote_API_Base
 *
 * @phpstan-type Parsely_Stats array{
 *   page_views: string,
 *   visitors: string,
 *   avg_time: string,
 * }
 *
 * @phpstan-type Parsely_Stats_Response array{
 *   data: array<string, Parsely_Stats>|null,
 *   error: Remote_API_Error|null,
 * }
 */
class Admin_Columns_Parsely_Stats {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * Internal Variable.
	 *
	 * @var WP_Screen|null
	 */
	private $current_screen;

	/**
	 * Publish date time list of visible posts.
	 *
	 * Analytics Endpoint don't support post_ids as param so to limit the API we will pass the
	 * min/max publish dates.
	 *
	 * @var string[]
	 */
	private $post_utc_publish_date_times = array();

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
	 *
	 * @return void
	 */
	public function run(): void {
		if ( $this->parsely->site_id_is_set() && $this->parsely->api_secret_is_set() ) {
			add_action( 'current_screen', array( $this, 'set_current_screen' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_parsely_stats_styles' ) );
			add_filter( 'manage_posts_columns', array( $this, 'add_parsely_stats_column_on_list_view' ) );
			add_action( 'manage_posts_custom_column', array( $this, 'update_post_publish_date_times_and_show_placeholder' ) );
			add_filter( 'manage_pages_columns', array( $this, 'add_parsely_stats_column_on_list_view' ) );
			add_action( 'manage_pages_custom_column', array( $this, 'update_post_publish_date_times_and_show_placeholder' ) );
			add_action( 'admin_footer', array( $this, 'enqueue_parsely_stats_script_and_pass_data' ) );
		}
	}

	/**
	 * Set current screen variable.
	 *
	 * @since 3.7.0
	 *
	 * @return void
	 */
	public function set_current_screen(): void {
		$this->current_screen = get_current_screen();
	}

	/**
	 * Enqueues styles for Parse.ly Stats.
	 *
	 * @return void
	 */
	public function enqueue_parsely_stats_styles(): void {
		if ( ! $this->is_tracked_as_post_type() ) {
			return;
		}

		$admin_settings_asset = require_once plugin_dir_path( PARSELY_FILE ) . 'build/admin-parsely-stats.asset.php';
		$built_assets_url     = plugin_dir_url( PARSELY_FILE ) . 'build/';

		wp_enqueue_style(
			'parsely-stats-admin-styles',
			$built_assets_url . 'admin-parsely-stats.css',
			$admin_settings_asset['dependencies'] ?? null,
			$admin_settings_asset['version'] ?? Parsely::VERSION
		);
	}

	/**
	 * Add the `Parse.ly Stats` on admin columns.
	 *
	 * @param array<string, string> $columns Columns array which contain keys and labels.
	 *
	 * @return array<string, string>
	 */
	public function add_parsely_stats_column_on_list_view( array $columns ): array {
		if ( $this->is_tracked_as_post_type() ) {
			$columns['parsely-stats'] = 'Parse.ly Stats';
		}

		return $columns;
	}

	/**
	 * Update our publish date_times list with current post info and show placeholder.
	 *
	 * Note: We don't have `the_posts` hook for hierarchical post types like pages so we are following this approach:
	 *
	 * 1. Get post publish dates and show a placeholder while displaying rows on Admin List.
	 * 2. Make Parsely Analytics API call limited by publish dates inside `wp_footer` hook and pass the stats data to JS script.
	 * 3. Show data on each Admin Row using JS.
	 *
	 * @return void
	 */
	public function update_post_publish_date_times_and_show_placeholder() {
		if ( ! $this->is_tracked_as_post_type() ) {
			return;
		}

		global $post;

		if ( 'publish' === $post->post_status ) {
			array_push( $this->post_utc_publish_date_times, $post->post_date_gmt );
		}

		$stats_key = $this->get_unique_stats_key_of_current_post();
		?>
		<div class="parsely-post-stats" data-stats-key="<?php echo esc_attr( $stats_key ); ?>">
			<span class="parsely-post-stats-placeholder">...</span>
		</div>
		<?php
	}

	/**
	 * Enqueue script and pass Parse.ly Stats data for showing on Frontend using JS.
	 */
	public function enqueue_parsely_stats_script_and_pass_data(): void {
		if ( ! $this->is_tracked_as_post_type() ) {
			return;
		}

		$parsely_stats_response = $this->get_parsely_stats_response( new Analytics_Posts_API( $this->parsely ) );

		if ( null === $parsely_stats_response ) {
			return;
		}

		$admin_settings_asset = require_once plugin_dir_path( PARSELY_FILE ) . 'build/admin-parsely-stats.asset.php';
		$built_assets_url     = plugin_dir_url( PARSELY_FILE ) . 'build/';

		wp_enqueue_script(
			'parsely-stats-admin-script',
			$built_assets_url . 'admin-parsely-stats.js',
			$admin_settings_asset['dependencies'] ?? null,
			$admin_settings_asset['version'] ?? Parsely::VERSION,
			true
		);

		wp_localize_script(
			'parsely-stats-admin-script',
			'wpParselyAdminStatsResponse',
			$parsely_stats_response
		);
	}

	/**
	 * Call Parsely Analytics API and get needed data.
	 *
	 * @param Analytics_Posts_API $analytics_api Instance of Analytics_Posts_API.
	 *
	 * @return Parsely_Stats_Response|null
	 */
	public function get_parsely_stats_response( $analytics_api ) {
		if ( ! $this->is_tracked_as_post_type() ) {
			return null;
		}

		$date_params = $this->get_publish_date_params_for_analytics_api();
		if ( is_null( $date_params ) ) {
			return null;
		}

		$response = $analytics_api->get_posts_analytics(
			array(
				'period_start'   => get_utc_date_format( - Analytics_Posts_API::ANALYTICS_API_DAYS_LIMIT ),
				'period_end'     => get_utc_date_format(),
				'pub_date_start' => $date_params['pub_date_start'] ?? '',
				'pub_date_end'   => $date_params['pub_date_end'] ?? '',
				'limit'          => Analytics_Posts_API::MAX_RECORDS_LIMIT,
				'sort'           => 'avg_engaged', // Note: API sends different stats on different sort options.
			)
		);

		if ( is_wp_error( $response ) ) {
			return array(
				'data'  => null,
				'error' => array(
					'code'    => (int) $response->get_error_code(),
					'message' => $response->get_error_message(),
					'html'    => (
						'<div class="error notice error-parsely-stats is-dismissible">' .
							'<p>' .
								esc_html__( 'Error while getting data for Parse.ly Stats.', 'wp-parsely' ) . '<br/>' .
								esc_html__( 'Detail: ', 'wp-parsely' ) . esc_html( "({$response->get_error_code()}) {$response->get_error_message()}" ) .
							'</p>' .
						'</div>'
					),
				),
			);
		}

		if ( null === $response ) {
			return array(
				'data'  => array(),
				'error' => null,
			);
		}

		/**
		 * Variable.
		 *
		 * @var array<string, Parsely_Stats>
		 */
		$parsely_stats_map = array();

		foreach ( $response as $post_analytics ) {
			$key = $this->get_unique_stats_key_from_analytics( $post_analytics );

			if ( '' === $key || ! isset( $post_analytics['metrics'] ) ) {
				continue;
			}

			$metrics = $post_analytics['metrics'];

			if ( isset( $metrics['views'] ) ) {
				$views = $metrics['views'];
			}

			if ( isset( $metrics['visitors'] ) ) {
				$visitors = $metrics['visitors'];
			}

			if ( isset( $metrics['avg_engaged'] ) ) {
				$engaged_seconds = $metrics['avg_engaged'] * 60;
			}

			/**
			 * Variable.
			 *
			 * @var Parsely_Stats
			 */
			$stats = array(
				'page_views'  => isset( $views ) ? get_formatted_number( $views ) . ' ' . _n( 'page view', 'page views', $views, 'wp-parsely' ) : '',
				'visitors'    => isset( $visitors ) ? get_formatted_number( $visitors ) . ' ' . _n( 'visitor', 'visitors', $visitors, 'wp-parsely' ) : '',
				'avg_engaged' => isset( $engaged_seconds ) ? get_formatted_time( $engaged_seconds ) . ' ' . __( 'avg time', 'wp-parsely' ) : '',
			);

			$parsely_stats_map[ $key ] = $stats;
		}

		return array(
			'data'  => $parsely_stats_map,
			'error' => null,
		);
	}

	/**
	 * Get publish date params for analytics API by using publish date times list
	 * to get the min/max date param which we can use to limit the API.
	 *
	 * @return Analytics_Post_API_Params|null
	 */
	private function get_publish_date_params_for_analytics_api() {
		$publish_date_times = $this->post_utc_publish_date_times;

		if ( count( $publish_date_times ) === 0 ) {
			return null;
		}

		$max_date_time = '';
		$min_date_time = '';

		foreach ( $publish_date_times as $publish_date_time ) {
			if ( '' === $min_date_time || $publish_date_time < $min_date_time ) {
				$min_date_time = $publish_date_time;
			}

			if ( $publish_date_time > $max_date_time ) {
				$max_date_time = $publish_date_time;
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
	 * Return TRUE if the current screen is the list screen and we are tracking it as Post
	 * in plugin settings.
	 *
	 * Note: As of now Parse.ly Analytics API don't include Non-Post data so we can only show
	 * stats on tracked post types.
	 *
	 * @since 3.7.0
	 *
	 * @return bool
	 */
	private function is_tracked_as_post_type(): bool {
		if ( is_null( $this->current_screen ) ) {
			return false;
		}

		$track_post_types = $this->parsely->get_options()['track_post_types'];
		foreach ( $track_post_types as $track_post_type ) {
			if ( 'edit' === $this->current_screen->base && $track_post_type === $this->current_screen->post_type ) {
				return true;
			}
		}

		return false;
	}
}
