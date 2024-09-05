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
	 * The controllers for each namespace.
	 *
	 * @since 3.17.0
	 *
	 * @var Base_API_Controller[]
	 */
	public $controllers = array();

	/**
	 * Gets the namespace for the API.
	 *
	 * @since 3.17.0
	 *
	 * @return string The namespace.
	 */
	protected function get_namespace(): string {
		return 'wp-parsely';
	}

	/**
	 * Gets the version for the API.
	 *
	 * @since 3.17.0
	 *
	 * @return string The version.
	 */
	protected function get_version(): string {
		return 'v2';
	}

	/**
	 * Initializes the REST API controller.
	 *
	 * @since 3.17.0
	 */
	public function init(): void {
		// Register the controllers for each namespace.
		$controllers = array(
			new Content_Helper_Controller( $this->get_parsely() ),
		);

		// Initialize the controllers.
		foreach ( $controllers as $controller ) {
			$controller->init();
		}

		$this->controllers = $controllers;
	}
}
