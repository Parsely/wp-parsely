<?php
/**
 * Headline Testing feature class
 *
 * @package Parsely
 * @since   3.21.0
 */

declare(strict_types=1);

namespace Parsely;

use Parsely\Content_Helper\Content_Helper_Feature;
use Parsely\Permissions;

/**
 * Handles the Headline Testing feature functionality.
 *
 * @since 3.21.0
 */
class Headline_Testing extends Content_Helper_Feature {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	protected $parsely;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Registers the Headline Testing feature.
	 *
	 * @since 3.21.0
	 */
	public function run(): void {
		if ( false === $this->can_enable_feature( $this->should_initialize() ) ) {
			return;
		}

		// Enqueue the headline testing script properly.
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_headline_testing_script' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
	}

	/**
	 * Determines if the Headline Testing feature should be initialized.
	 *
	 * @since 3.21.0
	 *
	 * @return bool True if the feature should be initialized, false otherwise.
	 */
	private function should_initialize(): bool {
		$options = $this->parsely->get_options();
		
		if ( ! isset( $options['headline_testing']['enabled'] ) || false === $options['headline_testing']['enabled'] ) {
			return false;
		}

		// Check if user has permission to see headline testing.
		if ( ! $this->user_has_permission() ) {
			return false;
		}

		return true;
	}

	/**
	 * Checks if the current user has permission to use Headline Testing.
	 *
	 * @since 3.21.0
	 *
	 * @return bool True if user has permission, false otherwise.
	 */
	private function user_has_permission(): bool {
		// For headline testing, we'll allow all users since it's a frontend feature.
		return true;
	}

	/**
	 * Enqueues the Headline Testing script properly.
	 *
	 * @since 3.21.0
	 */
	public function enqueue_headline_testing_script(): void {
		$options = $this->parsely->get_options();
		
		// Check if headline testing options exist and are enabled.
		if ( ! isset( $options['headline_testing'] ) || ! is_array( $options['headline_testing'] ) || ! isset( $options['headline_testing']['enabled'] ) || false === $options['headline_testing']['enabled'] ) {
			return;
		}
		
		$headline_testing_options = $options['headline_testing'];
		$site_id                  = $this->parsely->get_site_id();

		if ( '' === $site_id ) {
			return;
		}

		$installation_method = $headline_testing_options['installation_method'] ?? 'one_line';
		
		if ( 'one_line' === $installation_method ) {
			$this->enqueue_one_line_script( $headline_testing_options, $site_id );
		} else {
			$this->enqueue_advanced_script( $headline_testing_options, $site_id );
		}
	}

	/**
	 * Enqueues the one-line snippet script.
	 *
	 * @since 3.21.0
	 *
	 * @param array<string, mixed> $options The headline testing options.
	 * @param string               $site_id The Parse.ly site ID.
	 */
	private function enqueue_one_line_script( array $options, string $site_id ): void {
		$script_url = 'https://experiments.parsely.com/vip-experiments.js?apiKey=' . esc_attr( $site_id );
		
		// Add query parameters for options instead of data attributes.
		$query_params = array();
		
		if ( (bool) ( $options['enable_live_updates'] ?? false ) ) {
			$query_params[] = 'enableLiveUpdates=true';
			
			$timeout = (int) ( $options['live_update_timeout'] ?? 30000 );
			if ( 30000 !== $timeout ) {
				$query_params[] = 'liveUpdateTimeout=' . $timeout;
			}
		}

		if ( (bool) ( $options['allow_after_content_load'] ?? false ) ) {
			$query_params[] = 'allowAfterContentLoad=true';
		}
		
		if ( ! empty( $query_params ) ) {
			$script_url .= '&' . implode( '&', $query_params );
		}

		// Register and enqueue the script.
		wp_register_script(
			'parsely-headline-testing-one-line',
			$script_url,
			array(),
			PARSELY_VERSION,
			false
		);

		wp_enqueue_script( 'parsely-headline-testing-one-line' );
	}

	/**
	 * Enqueues the advanced installation script.
	 *
	 * @since 3.21.0
	 *
	 * @param array<string, mixed> $options The headline testing options.
	 * @param string               $site_id The Parse.ly site ID.
	 */
	private function enqueue_advanced_script( array $options, string $site_id ): void {
		$config_options = array();

		if ( (bool) ( $options['enable_flicker_control'] ?? false ) ) {
			$config_options[] = 'enableFlickerControl: true';
		}

		if ( (bool) ( $options['enable_live_updates'] ?? false ) ) {
			$config_options[] = 'enableLiveUpdates: true';
			
			$timeout = (int) ( $options['live_update_timeout'] ?? 30000 );
			if ( 30000 !== $timeout ) {
				$config_options[] = 'liveUpdateTimeout: ' . $timeout;
			}
		}

		if ( (bool) ( $options['allow_after_content_load'] ?? false ) ) {
			$config_options[] = 'allowAfterContentLoad: true';
		}

		$config_str = count( $config_options ) > 0 ? ', {' . implode( ', ', $config_options ) . '}' : '';

		$script_content = '!function(){"use strict";var e=window.VIP_EXP=window.VIP_EXP||{config:{}};e.loadVIPExp=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t&&(e.config=n,e.config.apikey=t,function(e){if(!e)return;var t="https://experiments.parsely.com/vip-experiments.js"+"?apiKey=".concat(e),n=document.createElement("script");n.src=t,n.type="text/javascript",n.fetchPriority="high";var i=document.getElementsByTagName("script")[0];i&&i.parentNode&&i.parentNode.insertBefore(n,i)}(t),n.enableFlickerControl&&function(){var t,n;if(null!==(t=performance)&&void 0!==t&&null!==(n=t.getEntriesByName)&&void 0!==n&&null!==(n=n.call(t,"first-contentful-paint"))&&void 0!==n&&n[0])return;var i="vipexp-fooc-prevention";e.config.disableFlickerControl=function(){var e=document.getElementById(i);null!=e&&e.parentNode&&e.parentNode.removeChild(e)};var o=document.createElement("style");o.setAttribute("type","text/css"),o.appendChild(document.createTextNode("body { visibility: hidden; }")),o.id=i,document.head.appendChild(o),window.setTimeout(e.config.disableFlickerControl,500)}())},e.loadVIPExp("' . esc_js( $site_id ) . '"' . $config_str . ')}();';

		// Register and enqueue the inline script.
		wp_register_script(
			'parsely-headline-testing-advanced',
			'',
			array(),
			PARSELY_VERSION,
			false
		);

		wp_add_inline_script( 'parsely-headline-testing-advanced', $script_content );
		wp_enqueue_script( 'parsely-headline-testing-advanced' );
	}

	/**
	 * Enqueues admin scripts for the Headline Testing feature.
	 *
	 * @since 3.21.0
	 */
	public function enqueue_admin_scripts(): void {
		// Add any admin-specific scripts here if needed.
	}

	/**
	 * Checks if Headline Testing is enabled and configured.
	 *
	 * @since 3.21.0
	 *
	 * @return bool True if enabled and configured, false otherwise.
	 */
	public function is_enabled(): bool {
		$options = $this->parsely->get_options();
		
		return isset( $options['headline_testing']['enabled'] ) && 
				true === $options['headline_testing']['enabled'] &&
				'' !== $this->parsely->get_site_id();
	}

	/**
	 * Gets the feature filter name.
	 *
	 * @since 3.21.0
	 *
	 * @return string The feature filter name.
	 */
	public static function get_feature_filter_name(): string {
		return 'wp_parsely_headline_testing';
	}

	/**
	 * Gets the script ID.
	 *
	 * @since 3.21.0
	 *
	 * @return string The script ID.
	 */
	public static function get_script_id(): string {
		return 'parsely-headline-testing';
	}

	/**
	 * Gets the style ID.
	 *
	 * @since 3.21.0
	 *
	 * @return string The style ID.
	 */
	public static function get_style_id(): string {
		return 'parsely-headline-testing';
	}
}
