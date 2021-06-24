<?php
/**
 * AMP integration tests.
 *
 * @package Parsely\Tests\Integrations
 */

namespace Parsely\Tests\Integrations;

use Parsely;
use Parsely\Tests\TestCase;
use Parsely\Integrations\Amp;

/**
 * Test AMP integration.
 */
final class AmpTest extends TestCase {
	/**
	 * Check the integration only happens when a condition is met.
	 *
	 * @covers \Parsely\Integrations\Amp::integrate
	 */
	public function test_integration_only_runs_when_amp_is_active() {
		$amp = new Amp();

		// By default, the integration will not happen if the condition has not been met.
		$amp->integrate();
		self::assertFalse(
			has_action(
				'template_redirect',
				array( $amp, 'add_actions' )
			)
		);

		// Meet the condition, and check again.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound -- can't prefix this.
		define( 'AMP__VERSION', '1.2.3' );
		$amp->integrate();
		self::assertNotFalse(
			has_action(
				'template_redirect',
				array( $amp, 'add_actions' )
			)
		);
	}

	/**
	 * Check the AMP integration when plugin is not active or request is not an AMP request.
	 *
	 * @covers \Parsely\Integrations\Amp::add_actions
	 * @uses \Parsely::__construct
	 * @uses \Parsely::get_options()
	 * @uses \Parsely\Integrations\Amp::is_amp_request()
	 * @group amp
	 */
	public function test_amp_integration_with_amp_plugin_not_active_or_not_an_AMP_request() {
		// Mock the Amp class, but only the is_amp_request() method. This leaves
		// the other methods unmocked, and therefore testable.

		$amp_mock = $this->getMockBuilder( Amp::class )->setMethods( array( 'is_amp_request' ) )->getMock();

		// On the first run, let is_amp_request() return false.
		$amp_mock->method( 'is_amp_request' )->willReturn( false );

		self::assertSame( '', $amp_mock->add_actions() );
	}

	/**
	 * Check the AMP integration when plugin is active and a request is an AMP request.
	 *
	 * @covers \Parsely\Integrations\Amp::add_actions
	 * @uses \Parsely::__construct
	 * @uses \Parsely::get_options()
	 * @uses \Parsely\Integrations\Amp::is_amp_request()
	 * @group amp
	 * @group settings
	 */
	public function test_amp_integration_with_amp_plugin_active_and_a_request_is_an_AMP_request() {
		// Mock the Amp class, but only the is_amp_request() method. This leaves
		// the other methods unmocked, and therefore testable.

		$amp_mock = $this->getMockBuilder( Amp::class )->setMethods( array( 'is_amp_request' ) )->getMock();

		$amp_mock->method( 'is_amp_request' )->willReturn( true );

		// Check with AMP marked as disabled.
		$parsely                = new \Parsely();
		$options                = get_option( \Parsely::OPTIONS_KEY );
		$options['disable_amp'] = true;
		update_option( $parsely::OPTIONS_KEY, $options );

		// Check the early return because AMP is marked as disabled.
		self::assertSame( '', $amp_mock->add_actions() );

		// Now check with AMP not marked as disabled.
		$options['disable_amp'] = false;
		update_option( $parsely::OPTIONS_KEY, $options );

		// Null return, so check filters have been added.
		self::assertNull( $amp_mock->add_actions() );
		self::assertNotFalse( has_filter( 'amp_post_template_analytics', array( $amp_mock, 'register_parsely_for_amp_analytics' ) ) );
		self::assertNotFalse( has_filter( 'amp_analytics_entries', array( $amp_mock, 'register_parsely_for_amp_native_analytics' ) ) );
	}

	/**
	 * Check the registration of Parse.ly with AMP.
	 *
	 * @covers \Parsely\Integrations\Amp::add_actions
	 * @covers \Parsely\Integrations\Amp::register_parsely_for_amp_analytics
	 * @uses \Parsely::__construct
	 * @uses \Parsely::get_options()
	 * @uses \Parsely\Integrations\Amp::is_amp_request()
	 * @group amp
	 * @group settings
	 */
	public function test_registration_for_amp_analytics() {
		$options   = get_option( 'parsely' );
		$amp       = new Parsely\Integrations\Amp();
		$analytics = array();

		// If apikey is empty, $analytics are returned.
		self::assertSame( $analytics, $amp->register_parsely_for_amp_analytics( $analytics ) );

		// Now set the key and test for changes.
		$options['apikey'] = 'my-api-key.com';
		update_option( 'parsely', $options );

		$output = $amp->register_parsely_for_amp_analytics( $analytics );

		self::assertSame( 'parsely', $output['parsely']['type'] );
		self::assertSame( 'my-api-key.com', $output['parsely']['config_data']['vars']['apikey'] );
	}

	/**
	 * Check the registration of Parse.ly with AMP Native.
	 *
	 * @covers \Parsely\Integrations\Amp::add_actions
	 * @covers \Parsely\Integrations\Amp::register_parsely_for_amp_native_analytics
	 * @uses \Parsely::__construct
	 * @uses \Parsely::get_options()
	 * @uses \Parsely\Integrations\Amp::is_amp_request()
	 * @group amp
	 * @group settings
	 */
	public function test_registration_for_amp_native_analytics() {
		$options   = get_option( 'parsely' );
		$amp       = new Parsely\Integrations\Amp();
		$analytics = array();

		// If apikey is empty, $analytics are returned.
		self::assertSame( $analytics, $amp->register_parsely_for_amp_native_analytics( $analytics ) );

		// Check with AMP marked as disabled.
		$parsely                = new \Parsely();
		$options                = get_option( \Parsely::OPTIONS_KEY );
		$options['disable_amp'] = true;
		update_option( $parsely::OPTIONS_KEY, $options );

		self::assertSame( $analytics, $amp->register_parsely_for_amp_native_analytics( $analytics ) );

		// Now enable AMP, and set the API key and test for changes.
		$options['disable_amp'] = false;
		$options['apikey']      = 'my-api-key.com';
		update_option( $parsely::OPTIONS_KEY, $options );

		$output = $amp->register_parsely_for_amp_native_analytics( $analytics );
		self::assertSame( 'parsely', $output['parsely']['type'] );
		self::assertStringContainsString( 'my-api-key.com', $output['parsely']['config'] );
	}
}
