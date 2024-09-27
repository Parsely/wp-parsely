<?php
/**
 * Stats API Endpoint: Posts
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\REST_API\Stats;

use Parsely\RemoteAPI\Analytics_Posts_API;
use Parsely\REST_API\Base_Endpoint;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use stdClass;

/**
 * The Stats API Posts endpoint.
 *
 * Provides an endpoint for retrieving posts.
 *
 * @since 3.17.0
 */
class Endpoint_Posts extends Base_Endpoint {
	use Post_Data_Trait;

	public const TOP_POSTS_DEFAULT_LIMIT = 5;
	public const SORT_DEFAULT            = 'views';

	/**
	 * The metrics that can be sorted by.
	 *
	 * @since 3.17.0
	 *
	 * @var array<int, string>
	 * @see https://docs.parse.ly/api-available-metrics/
	 */
	public const SORT_METRICS = array(
		'views',
		'mobile_views',
		'tablet_views',
		'desktop_views',
		'visitors',
		'visitors_new',
		'visitors_returning',
		'engaged_minutes',
		'avg_engaged',
		'avg_engaged_new',
		'avg_engaged_returning',
		'social_interactions',
		'fb_interactions',
		'tw_interactions',
		'pi_interactions',
		'social_referrals',
		'fb_referrals',
		'tw_referrals',
		'pi_referrals',
		'search_refs',
	);

	/**
	 * The Analytics Posts API.
	 *
	 * @since 3.17.0
	 *
	 * @var Analytics_Posts_API
	 */
	public $analytics_posts_api;

	/**
	 * Constructor.
	 *
	 * @since 3.17.0
	 *
	 * @param Stats_Controller $controller The stats controller.
	 */
	public function __construct( Stats_Controller $controller ) {
		parent::__construct( $controller );
		$this->analytics_posts_api = new Analytics_Posts_API( $this->parsely );
	}

	/**
	 * Returns the endpoint name.
	 *
	 * @since 3.17.0
	 *
	 * @return string
	 */
	public static function get_endpoint_name(): string {
		return 'posts';
	}

	/**
	 * Registers the routes for the objects of the controller.
	 *
	 * @since 3.17.0
	 */
	public function register_routes(): void {
		/**
		 * GET /posts
		 * Retrieves posts for the given criteria.
		 */
		$this->register_rest_route(
			'/',
			array( 'GET' ),
			array( $this, 'get_posts' ),
			array_merge(
				array(
					'period_start'   => array(
						'description' => 'The start of the period to query.',
						'type'        => 'string',
						'required'    => false,
					),
					'period_end'     => array(
						'description' => 'The end of the period to query.',
						'type'        => 'string',
						'required'    => false,
					),
					'pub_date_start' => array(
						'description' => 'The start of the publication date range to query.',
						'type'        => 'string',
						'required'    => false,
					),
					'pub_date_end'   => array(
						'description' => 'The end of the publication date range to query.',
						'type'        => 'string',
						'required'    => false,
					),
					'limit'          => array(
						'description' => 'The number of posts to return.',
						'type'        => 'integer',
						'required'    => false,
						'default'     => self::TOP_POSTS_DEFAULT_LIMIT,
					),
					'sort'           => array(
						'description' => 'The sort order of the posts.',
						'type'        => 'string',
						'enum'        => self::SORT_METRICS,
						'default'     => self::SORT_DEFAULT,
						'required'    => false,
					),
					'page'           => array(
						'description' => 'The page to fetch.',
						'type'        => 'integer',
						'required'    => false,
						'default'     => 1,
					),
					'author'         => array(
						'description' => 'The author to filter by.',
						'type'        => 'array',
						'items'       => array(
							'type' => 'string',
						),
						'required'    => false,
						'maxItems'    => 5,
					),
					'section'        => array(
						'description' => 'The section to filter by.',
						'type'        => 'string',
						'required'    => false,
					),
					'tag'            => array(
						'description' => 'The tag to filter by.',
						'type'        => 'array',
						'items'       => array(
							'type' => 'string',
						),
						'required'    => false,
						'maxItems'    => 5,
					),
					'segment'        => array(
						'description' => 'The segment to filter by.',
						'type'        => 'string',
						'required'    => false,
					),
				),
				$this->get_itm_source_param_args()
			)
		);
	}

	/**
	 * API Endpoint: GET /stats/posts
	 *
	 * Retrieves the posts with the given query parameters.
	 *
	 * @since 3.17.0
	 *
	 * @param WP_REST_Request $request The request.
	 * @return array<string, stdClass>|WP_Error|WP_REST_Response
	 */
	public function get_posts( WP_REST_Request $request ) {
		$params = $request->get_params();

		// Setup the itm_source if it is provided.
		$this->set_itm_source_from_request( $request );

		// TODO: Needed before the Public API refactor.
		// Convert array of authors to a string with the first element.
		if ( isset( $params['author'] ) && is_array( $params['author'] ) ) {
			$params['author'] = $params['author'][0];
		}
		// Convert array of tags to a string with the first element.
		if ( isset( $params['tag'] ) && is_array( $params['tag'] ) ) {
			$params['tag'] = $params['tag'][0];
		}
		// TODO END.

		/**
		 * The raw analytics data, received by the API.
		 *
		 * @var array<stdClass>|WP_Error $analytics_request
		 */
		$analytics_request = $this->analytics_posts_api->get_items(
			array(
				'period_start'   => $params['period_start'] ?? null,
				'period_end'     => $params['period_end'] ?? null,
				'pub_date_start' => $params['pub_date_start'] ?? null,
				'pub_date_end'   => $params['pub_date_end'] ?? null,
				'limit'          => $params['limit'] ?? self::TOP_POSTS_DEFAULT_LIMIT,
				'sort'           => $params['sort'] ?? self::SORT_DEFAULT,
				'page'           => $params['page'] ?? 1,
				'author'         => $params['author'] ?? null,
				'section'        => $params['section'] ?? null,
				'tag'            => $params['tag'] ?? null,
				'segment'        => $params['segment'] ?? null,
				'itm_source'     => $params['itm_source'] ?? null,
			)
		);

		if ( is_wp_error( $analytics_request ) ) {
			return $analytics_request;
		}

		// Process the data.
		$posts = array();
		foreach ( $analytics_request as $item ) {
			$posts[] = $this->extract_post_data( $item );
		}

		$response_data = array(
			'params' => $params,
			'data'   => $posts,
		);

		return new WP_REST_Response( $response_data, 200 );
	}
}
