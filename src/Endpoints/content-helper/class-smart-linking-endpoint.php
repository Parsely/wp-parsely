<?php


use Parsely\Endpoints\Base_Endpoint;
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
		if ( ! $request ) {
			return false;
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
		// Endpoint "[post-id]/set"
		$this->register_endpoint(
			static::ENDPOINT .
			'set_smart_links',
			array( 'POST' )
		);

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
