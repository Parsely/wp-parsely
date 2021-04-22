<?php
/**
 * Facebook Instant Articles integration tests.
 *
 * @package Parsely\Tests\Integrations
 */

namespace Parsely\Tests\Integrations;

use Parsely;
use Parsely\Integrations\Fbia;
use Parsely\Tests\TestCase;

/**
 * Test Facebook Instant Articles integration.
 */
final class FbiaTest extends TestCase {
	/**
	 * Check the integration only happens when a condition is met.
	 *
	 * @covers \Parsely\Integrations\Fbia::integrate
	 */
	public function test_integration_only_runs_when_fbia_is_active() {
		$fbia = new Fbia();

		// By default, the integration will not happen if the condition has not been met.
		$fbia->integrate();
		self::assertFalse(
			has_action(
				'instant_articles_compat_registry_analytics',
				array( $fbia, 'insert_parsely_tracking' )
			)
		);

		// Meet the condition, and check again.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound -- can't prefix this.
		define( 'IA_PLUGIN_VERSION', '1.2.3' );
		$fbia->integrate();
		self::assertNotFalse(
			has_action(
				'instant_articles_compat_registry_analytics',
				array( $fbia, 'insert_parsely_tracking' )
			)
		);
	}

	/**
	 * Check the Facebook Instant Articles integration.
	 *
	 * @covers \Parsely\Integrations\Fbia::insert_parsely_tracking
	 * @uses \Parsely::__construct
	 * @uses \Parsely::get_options()
	 * @group fbia
	 */
	public function test_parsely_is_added_to_provided_registry() {
		$parsely           = new Parsely();
		$options           = get_option( $parsely::OPTIONS_KEY );
		$options['apikey'] = 'my-api-key.com';
		update_option( 'parsely', $options );

		// We use our own registry here, but the integration with the FBIA plugin provides it's own.
		$registry = array();
		$fbia     = new Fbia();

		$fbia->insert_parsely_tracking( $registry );

		// Check Parse.ly got added to the registry.
		self::assertArrayHasKey( 'parsely-analytics-for-wordpress', $registry );

		// Check display name assigned to the integration.
		self::assertSame( 'Parsely Analytics', $registry['parsely-analytics-for-wordpress']['name'] );

		// Check embed code contains a script (don't test for specifics), and the API key.
		self::assertStringContainsString( '<script>', $registry['parsely-analytics-for-wordpress']['payload'] );
		self::assertStringContainsString( $options['apikey'], $registry['parsely-analytics-for-wordpress']['payload'] );
	}
}
