<?php
/**
 * REST API Controller
 *
 * @package Parsely
 * @since   3.17.0
 */

declare(strict_types=1);

namespace Parsely\REST_API;

use Parsely\REST_API\Content_Helper\Content_Helper_Controller;

/**
 * The REST API Controller.
 *
 * Used to define the namespace, version, and controllers for the REST API.
 *
 * @since 3.17.0
 */
class REST_API_Controller extends Base_API_Controller {
	/**
	 * The API namespace.
	 *
	 * @since 3.17.0
	 *
	 * @var string
	 */
	public const NAMESPACE = 'wp-parsely';

	/**
	 * The API version.
	 *
	 * @since 3.17.0
	 *
	 * @var string
	 */
	public const VERSION = 'v2';

	/**
	 * The controllers for each namespace.
	 *
	 * @since 3.17.0
	 *
	 * @var Base_API_Controller[]
	 */
	public $controllers = array();

	/**
	 * Initializes the REST API controller.
	 *
	 * @since 3.17.0
	 */
	public function init(): void {
		// Register the controllers for each namespace.
		$controllers = array(
			new Content_Helper_Controller( $this->parsely ),
		);

		// Initialize the controllers.
		foreach ( $controllers as $controller ) {
			$controller->init();
		}

		$this->controllers = $controllers;
	}
}
