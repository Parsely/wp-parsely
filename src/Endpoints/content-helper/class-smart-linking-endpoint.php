<?php

declare(strict_types=1);

namespace Parsely\Endpoints\ContentHelper;

use Parsely\Endpoints\Base_Endpoint;
use Parsely\Parsely;
use WP_HTML_Processor;
use WP_Post;
use WP_REST_Request;

class Smart_Linking_Endpoint extends Base_Endpoint {

	/**
	 * The endpoint base path.
	 *
	 * @since 3.15.0
	 *
	 * @var string
	 */
	protected const ENDPOINT = '/smart-linking';


	/**
	 * Current post
	 *
	 * @var array|WP_Post|null $current_post The current post.
	 */
	protected $current_post;

	public function __construct( Parsely $parsely ) {
		parent::__construct( $parsely );
	}

	/**
	 * Returns whether the endpoint is available for access by the current
	 * user.
	 *
	 * @since 3.15.0
	 *
	 * @param WP_REST_Request|null $request The request object.
	 * @return bool
	 */
	public function is_available_to_current_user( $request = null ): bool {
		if ( $request === null ) {
			return true;
		}

		$post_id = $request->get_param( 'post_id' );

		// Check if the current user has edit capabilities for the post.
		$can_edit = current_user_can( 'edit_post', $post_id );

		// Check if the current user has the smart linking capability.
		$has_capability = current_user_can(
			$this->apply_capability_filters(
				Base_Endpoint::DEFAULT_ACCESS_CAPABILITY
			)
		);

		return $can_edit && $has_capability;
	}

	public function run(): void {
		$this->register_endpoint(
			static::ENDPOINT . '/(?P<post_id>\d+)/apply-smart-links',
			'apply_smart_links',
			array( 'POST' ),
			array(
				'post_id' => array(
					'description' => 'The post ID to apply smart links to.',
					'type'        => 'integer',
					'required'    => true,
					'validate_callback' => function ( $param, $request, $key ) {
						if ( ! is_numeric( $param ) ) {
							return new \WP_Error(
								'rest_invalid_param',
								__( 'The post ID must be a number.', 'parsely' ),
								array( 'status' => 400 )
							);
						}

						$this->current_post = get_post( $param );

						if ( ! $this->current_post ) {
							return new \WP_Error(
								'rest_invalid_param',
								__( 'The post ID does not exist.', 'parsely' ),
								array( 'status' => 400 )
							);
						}

						return true;
					},
					'sanitize_callback' => function ( $post_id ) {
						return $post_id;
					},
				),
			)
		);

		/*
		$this->register_endpoint(
			static::ENDPOINT . '/add-smart-link',
			'add_smart_link',
			array( 'POST' )
		);

		$this->register_endpoint(
			static::ENDPOINT . '/delete-smart-link',
			'delete_smart_link',
			array( 'POST' )
		);

		$this->register_endpoint(
			static::ENDPOINT . '/get-smart-links',
			'get_smart_links',
			array( 'GET' )
		);
		*/
	}

	/**
	 * @param \WP_REST_Request $request
	 *
	 * @return array
	 */
	public function apply_smart_links( WP_REST_Request $request ): array {
		// Get a random 4 words sentence from the post content
		$post_content = $this->current_post->post_content;

		// Clean up any HTML from the post content
		$post_content = wp_strip_all_tags( $post_content );

		$words = explode( ' ', $post_content );
		$words_count = count( $words );
		$random_index = rand( 0, $words_count - 4 );

		$random_sentence = implode( ' ', array_slice( $words, $random_index, 4 ) );

		// Search the post content for the random sentence and replace with a hyperlink
		$post_content = str_replace( $random_sentence, '<a href="https://www.google.com">' . $random_sentence . '</a>', $this->current_post->post_content );

		// Save the post content with the hyperlink
		$updated = wp_update_post( array(
			'ID' => $this->current_post->ID,
			'post_content' => $post_content,
		) );

		if ( is_wp_error( $updated ) ) {
			return array(
				'result' => false,
				'error' => $updated->get_error_message(),
			);
		}

		return array(
			'result' => true,
			'post_id' => $this->current_post->ID,
			'random_sentence' => $random_sentence,
		);

	}

	public function set_smart_links( WP_REST_Request $request ): string {
        return 'set_smart_links';
	}

	public function add_smart_link( WP_REST_Request $request ): string {
        return 'add_smart_link';
	}

	public function delete_smart_link( WP_REST_Request $request ): string {
		return 'add_smart_link';
	}

	public function get_smart_links( WP_REST_Request $request ): string {
		return 'add_smart_link';
	}

	public function delete_all_smart_links( WP_REST_Request $request ): string {
		return 'add_smart_link';
	}
}
