<?php
/**
 * Abilities registrations for Parse.ly analytics.
 *
 * @package Parsely
 * @since   3.21.0
 */

declare(strict_types=1);

namespace Parsely\Abilities;

use Parsely\Parsely;
use WP_Error;

/**
 * Registers Parse.ly ability categories when the category registry is initialized.
 */
function register_parsely_ability_categories(): void {
	if ( ! function_exists( 'wp_register_ability_category' ) ) {
		return;
	}

	wp_register_ability_category(
		'parsely-analytics',
		array(
			'label'       => __( 'Parse.ly Analytics', 'wp-parsely' ),
			'description' => __( 'Abilities that retrieve Parse.ly analytics data.', 'wp-parsely' ),
		)
	);
}
add_action( 'abilities_api_category_registry_init', __NAMESPACE__ . '\\register_parsely_ability_categories' );

/**
 * Registers Parse.ly abilities under the Abilities API if available.
 */
function register_parsely_abilities(): void {
	if ( ! function_exists( 'wp_register_ability' ) ) {
		return;
	}

		$permission_cb = static function () {
			$parsely = \Parsely\get_parsely();
			if ( ! $parsely->site_id_is_set() ) {
				return new WP_Error( 'parsely_site_id_not_set', __( 'A Parse.ly Site ID must be set to use this ability.', 'wp-parsely' ) );
			}
			return current_user_can( 'publish_posts' );
		};

		// Get Post Analytics (views/visitors/etc.).
	wp_register_ability(
		'wp-parsely/get-post-analytics',
		array(
			'label'               => __( 'Get Parse.ly Post Analytics', 'wp-parsely' ),
			'description'         => __( 'Returns analytics details for a specific post or URL (pageviews, visitors) for an optional time period.', 'wp-parsely' ),
			'category'            => 'parsely-analytics',
			'input_schema'        => array(
				'type'                 => 'object',
				'properties'           => array(
					'post_id'      => array(
						'type'        => 'integer',
						'minimum'     => 1,
						'description' => 'WordPress post ID. If set, used to derive URL.',
					),
					'url'          => array(
						'type'        => 'string',
						'format'      => 'uri',
						'description' => 'Canonical URL to fetch stats for. Used if post_id is not provided.',
					),
					'period_start' => array(
						'type'        => 'string',
						'description' => 'Start of period (e.g., 2024-09-01 or 7d).',
					),
					'period_end'   => array(
						'type'        => 'string',
						'description' => 'End of period (e.g., 2024-09-30).',
					),
				),
				'anyOf'                => array(
					array( 'required' => array( 'post_id' ) ),
					array( 'required' => array( 'url' ) ),
				),
				'additionalProperties' => false,
			),
			'output_schema'       => array(
				'type'                 => 'object',
				'properties'           => array(
					'params' => array( 'type' => 'object' ),
					'data'   => array( 'type' => 'array' ),
				),
				'additionalProperties' => true,
			),
			'execute_callback'    => static function ( array $input ) {
					$parsely  = \Parsely\get_parsely();
					$content  = $parsely->get_content_api();

					$url = isset( $input['url'] ) ? (string) $input['url'] : '';
				if ( '' === $url && isset( $input['post_id'] ) ) {
						$post_id  = (int) $input['post_id'];
						$permalink = get_permalink( $post_id );
					if ( ! is_string( $permalink ) || '' === $permalink ) {
						return new WP_Error( 'invalid_post', __( 'Invalid post.', 'wp-parsely' ) );
					}
						$url = $permalink;
				}

					$resp = $content->get_post_details(
						$url,
						$input['period_start'] ?? null,
						$input['period_end'] ?? null
					);

				if ( is_wp_error( $resp ) ) {
					return $resp;
				}

					return array(
						'params' => array(
							'url'          => $url,
							'period_start' => $input['period_start'] ?? null,
							'period_end'   => $input['period_end'] ?? null,
						),
						'data'   => $resp,
					);
			},
			'permission_callback' => $permission_cb,
		) 
	);

		// Get Post Referrers.
	wp_register_ability(
		'wp-parsely/get-post-referrers',
		array(
			'label'               => __( 'Get Parse.ly Post Referrers', 'wp-parsely' ),
			'description'         => __( 'Returns top referrers for a specific post or URL for an optional time period.', 'wp-parsely' ),
			'category'            => 'parsely-analytics',
			'input_schema'        => array(
				'type'                 => 'object',
				'properties'           => array(
					'post_id'      => array(
						'type'    => 'integer',
						'minimum' => 1,
					),
					'url'          => array(
						'type'   => 'string',
						'format' => 'uri',
					),
					'period_start' => array( 'type' => 'string' ),
					'period_end'   => array( 'type' => 'string' ),
				),
				'anyOf'                => array(
					array( 'required' => array( 'post_id' ) ),
					array( 'required' => array( 'url' ) ),
				),
				'additionalProperties' => false,
			),
			'output_schema'       => array(
				'type'                 => 'object',
				'properties'           => array(
					'params' => array( 'type' => 'object' ),
					'data'   => array( 'type' => 'array' ),
				),
				'additionalProperties' => true,
			),
			'execute_callback'    => static function ( array $input ) {
					$parsely  = \Parsely\get_parsely();
					$content  = $parsely->get_content_api();

					$url = isset( $input['url'] ) ? (string) $input['url'] : '';
				if ( '' === $url && isset( $input['post_id'] ) ) {
					$post_id  = (int) $input['post_id'];
					$permalink = get_permalink( $post_id );
					if ( ! is_string( $permalink ) || '' === $permalink ) {
						return new WP_Error( 'invalid_post', __( 'Invalid post.', 'wp-parsely' ) );
					}
					$url = $permalink;
				}

					$resp = $content->get_post_referrers(
						$url,
						$input['period_start'] ?? null,
						$input['period_end'] ?? null
					);

				if ( is_wp_error( $resp ) ) {
					return $resp;
				}

					return array(
						'params' => array(
							'url'          => $url,
							'period_start' => $input['period_start'] ?? null,
							'period_end'   => $input['period_end'] ?? null,
						),
						'data'   => $resp,
					);
			},
			'permission_callback' => $permission_cb,
		) 
	);

		// Get Related Posts.
	wp_register_ability(
		'wp-parsely/get-related',
		array(
			'label'               => __( 'Get Parse.ly Related Posts', 'wp-parsely' ),
			'description'         => __( 'Returns related posts for a specific post or URL, with optional filters.', 'wp-parsely' ),
			'category'            => 'parsely-analytics',
			'input_schema'        => array(
				'type'                 => 'object',
				'properties'           => array(
					'post_id'        => array(
						'type'    => 'integer',
						'minimum' => 1,
					),
					'url'            => array(
						'type'   => 'string',
						'format' => 'uri',
					),
					'limit'          => array(
						'type'    => 'integer',
						'minimum' => 1,
						'maximum' => 20,
					),
					'sort'           => array( 'type' => 'string' ),
					'pub_date_start' => array( 'type' => 'string' ),
					'pub_date_end'   => array( 'type' => 'string' ),
					'page'           => array(
						'type'    => 'integer',
						'minimum' => 1,
					),
					'section'        => array( 'type' => 'string' ),
					'tag'            => array( 'type' => 'string' ),
					'author'         => array( 'type' => 'string' ),
				),
				'anyOf'                => array(
					array( 'required' => array( 'post_id' ) ),
					array( 'required' => array( 'url' ) ),
				),
				'additionalProperties' => false,
			),
			'output_schema'       => array(
				'type'                 => 'object',
				'properties'           => array(
					'params' => array( 'type' => 'object' ),
					'data'   => array( 'type' => 'array' ),
				),
				'additionalProperties' => true,
			),
			'execute_callback'    => static function ( array $input ) {
					$parsely  = \Parsely\get_parsely();
					$content  = $parsely->get_content_api();

					$url = isset( $input['url'] ) ? (string) $input['url'] : '';
				if ( '' === $url && isset( $input['post_id'] ) ) {
					$post_id  = (int) $input['post_id'];
					$permalink = get_permalink( $post_id );
					if ( ! is_string( $permalink ) || '' === $permalink ) {
						return new WP_Error( 'invalid_post', __( 'Invalid post.', 'wp-parsely' ) );
					}
					$url = $permalink;
				}

					$params = array();
				foreach ( array( 'limit', 'sort', 'pub_date_start', 'pub_date_end', 'page', 'section', 'tag', 'author' ) as $k ) {
					if ( isset( $input[ $k ] ) && '' !== $input[ $k ] ) {
						$params[ $k ] = $input[ $k ];
					}
				}

					$resp = $content->get_related_posts_with_url( $url, $params );
				if ( is_wp_error( $resp ) ) {
					return $resp;
				}

					return array(
						'params' => array_merge( array( 'url' => $url ), $params ),
						'data'   => $resp,
					);
			},
			'permission_callback' => $permission_cb,
		) 
	);

		// Get Analytics Posts (top posts, listings).
	wp_register_ability(
		'wp-parsely/get-analytics-posts',
		array(
			'label'               => __( 'Get Parse.ly Analytics Posts', 'wp-parsely' ),
			'description'         => __( 'Queries the Parse.ly /analytics/posts endpoint with filters (period, publication dates, tags, URLs, sort, limit).', 'wp-parsely' ),
			'category'            => 'parsely-analytics',
			'input_schema'        => array(
				'type'                 => 'object',
				'properties'           => array(
					'period_start'   => array(
						'type'        => 'string',
						'description' => 'Start of period (YYYY-MM-DD or Nd).',
					),
					'period_end'     => array(
						'type'        => 'string',
						'description' => 'End of period (YYYY-MM-DD).',
					),
					'pub_date_start' => array( 'type' => 'string' ),
					'pub_date_end'   => array( 'type' => 'string' ),
					'sort'           => array(
						'type'        => 'string',
						'description' => 'Sort metric, e.g., views, visitors, avg_engaged.',
					),
					'limit'          => array(
						'type'        => array( 'integer', 'string' ),
						'description' => 'Max results (number or "max").',
					),
					'tag'            => array(
						'type'        => 'array',
						'items'       => array( 'type' => 'string' ),
						'description' => 'Filter by tag(s).',
					),
					'urls'           => array(
						'type'        => 'array',
						'items'       => array(
							'type'   => 'string',
							'format' => 'uri',
						),
						'description' => 'Filter by specific URL(s).',
					),
				),
				'additionalProperties' => false,
			),
			'output_schema'       => array(
				'type'  => 'array',
				'items' => array( 'type' => 'object' ),
			),
			'execute_callback'    => static function ( array $input ) {
					$parsely  = \Parsely\get_parsely();
					$content  = $parsely->get_content_api();

					$params = array();
				foreach ( array( 'period_start', 'period_end', 'pub_date_start', 'pub_date_end', 'sort', 'limit', 'tag', 'urls' ) as $k ) {
					if ( isset( $input[ $k ] ) && ( is_array( $input[ $k ] ) ? count( $input[ $k ] ) > 0 : '' !== $input[ $k ] ) ) {
						$params[ $k ] = $input[ $k ];
					}
				}

					$resp = $content->get_posts( $params );
					return $resp;
			},
			'permission_callback' => $permission_cb,
		) 
	);

		// Optional: Validate credentials.
	wp_register_ability(
		'wp-parsely/validate-credentials',
		array(
			'label'               => __( 'Validate Parse.ly Credentials', 'wp-parsely' ),
			'description'         => __( 'Validates the configured Parse.ly Site ID and API Secret with the Parse.ly API.', 'wp-parsely' ),
			'category'            => 'parsely-analytics',
			'input_schema'        => array(
				'type'                 => 'object',
				'properties'           => array(),
				'additionalProperties' => false,
			),
			'output_schema'       => array(
				'type'       => 'object',
				'properties' => array(
					'valid' => array( 'type' => 'boolean' ),
				),
			),
			'execute_callback'    => static function () {
				$parsely = \Parsely\get_parsely();
				$api     = $parsely->get_content_api();

				$site_id = $parsely->get_site_id();
				$secret  = $parsely->get_api_secret();

				if ( '' === $site_id || '' === $secret ) {
					return new WP_Error( 'parsely_credentials_missing', __( 'Site ID and API Secret are required to validate credentials.', 'wp-parsely' ) );
				}

				$ok = $api->validate_credentials( $site_id, $secret );
				if ( is_wp_error( $ok ) ) {
					return $ok;
				}

					return array( 'valid' => $ok );
			},
			'permission_callback' => static function () {
					// phpcs:ignore WordPress.WP.Capabilities.Undetermined
					return current_user_can( Parsely::CAPABILITY ); // manage_options by default.
			},
		) 
	);

		// Convenience: Get Dashboard URL for a post or URL.
	wp_register_ability(
		'wp-parsely/get-dash-url',
		array(
			'label'               => __( 'Get Parse.ly Dashboard URL', 'wp-parsely' ),
			'description'         => __( 'Returns the Parse.ly dashboard URL for a specific post or URL.', 'wp-parsely' ),
			'category'            => 'parsely-analytics',
			'input_schema'        => array(
				'type'                 => 'object',
				'properties'           => array(
					'post_id' => array(
						'type'    => 'integer',
						'minimum' => 1,
					),
					'url'     => array(
						'type'   => 'string',
						'format' => 'uri',
					),
				),
				'anyOf'                => array(
					array( 'required' => array( 'post_id' ) ),
					array( 'required' => array( 'url' ) ),
				),
				'additionalProperties' => false,
			),
			'output_schema'       => array(
				'type'       => 'object',
				'properties' => array(
					'dash_url' => array(
						'type'   => 'string',
						'format' => 'uri',
					),
				),
			),
			'execute_callback'    => static function ( array $input ) {
					$parsely = \Parsely\get_parsely();
					$site_id = $parsely->get_site_id();

					$url = isset( $input['url'] ) ? (string) $input['url'] : '';
				if ( '' === $url && isset( $input['post_id'] ) ) {
					$post_id  = (int) $input['post_id'];
					$permalink = get_permalink( $post_id );
					if ( ! is_string( $permalink ) || '' === $permalink ) {
						return new WP_Error( 'invalid_post', __( 'Invalid post.', 'wp-parsely' ) );
					}
					$url = $permalink;
				}

					return array( 'dash_url' => Parsely::get_dash_url( $site_id, $url ) );
			},
			'permission_callback' => $permission_cb,
		) 
	);
}

// Hook into the Abilities API init if present.
add_action( 'abilities_api_init', __NAMESPACE__ . '\\register_parsely_abilities' );
