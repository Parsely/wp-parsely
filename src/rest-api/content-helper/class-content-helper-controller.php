<?php
/**
 * API Content Helper Controller
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\REST_API\Content_Helper;

use Parsely\REST_API\REST_API_Controller;

/**
 * The Content Helper API Controller.
 *
 * Used to define the namespace, version, and endpoints for the Content Helper API.
 *
 * @since 3.17.0
 */
class Content_Helper_Controller extends REST_API_Controller {

	/**
	 * The route prefix, which acts as a namespace for the endpoints.
	 *
	 * @since 3.17.0
	 *
	 * @var string
	 */
	public const ROUTE_PREFIX = 'content-helper';

	/**
	 * Initializes the Content Helper API endpoints.
	 *
	 * @since 3.17.0
	 */
	public function init(): void {
		$endpoints = array(
			new Endpoint_Smart_Linking( $this ),
			new Endpoint_Excerpt_Generator( $this ),
			new Endpoint_Title_Suggestions( $this ),
		);

		$this->register_endpoints( $endpoints );
	}
}
