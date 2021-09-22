<?php
/**
 * Integrations collection tests.
 *
 * @package Parsely\Tests\Integrations
 */

namespace Parsely\Tests\Integrations;

use Parsely\Integrations\Integration;
use Parsely\Integrations\Integrations;
use ReflectionClass;
use Yoast\WPTestUtils\BrainMonkey\TestCase;

/**
 * Test integrations collection class.
 *
 * Despite the name, this is a Unit test!
 *
 * todo: Instantiate and then try to register something that doesn't implement the Integration interface.
 * todo: Check calling integrate will call integrate on all registered integrations.
 */
final class IntegrationsTest extends TestCase {
	/**
	 * Check the integration only happens when a condition is met.
	 *
	 * @covers \Parsely\Integrations\Integrations::register
	 */
	public function test_an_integration_can_be_registered_to_new_integrations_object() {
		$integrations = new Integrations();

		$integrations->register( 'class', FakeIntegration::class );
		$integrations->register( 'object', new FakeIntegration() );

		// Use Reflection to look inside the collection.
		$reflector          = new ReflectionClass( $integrations );
		$reflector_property = $reflector->getProperty( 'integrations' );
		$reflector_property->setAccessible( true );
		$registered_integrations = $reflector_property->getValue( $integrations );

		self::assertCount( 2, $registered_integrations );
		self::assertSame( array( 'class', 'object' ), array_keys( $registered_integrations ) );

		// Override an existing integration.
		$integrations->register( 'object', new FakeIntegration2() );

		self::assertCount( 2, $registered_integrations );
		self::assertSame( array( 'class', 'object' ), array_keys( $registered_integrations ) );
	}

	/**
	 * Check an integration can be added via a filter.
	 *
	 * @covers ::parsely_integrations
	 * @uses \Parsely\Integrations\Amp::integrate
	 * @uses \Parsely\Integrations\Facebook_Instant_Articles::integrate
	 * @uses \Parsely\Integrations\Integrations::integrate
	 * @uses \Parsely\Integrations\Integrations::register
	 */
	public function test_an_integration_can_be_registered_via_the_filter() {
		add_action(
			'wp_parsely_add_integration',
			function( $integrations ) {
				$integrations->register( 'fake', new FakeIntegration2() );

				return $integrations;
			}
		);

		$integrations = parsely_integrations();

		// Use Reflection to look inside the collection.
		$reflector_property = ( new ReflectionClass( $integrations ) )->getProperty( 'integrations' );
		$reflector_property->setAccessible( true );
		$registered_integrations = $reflector_property->getValue( $integrations );

		self::assertCount( 3, $registered_integrations );
		self::assertSame( array( 'amp', 'fbia', 'fake' ), array_keys( $registered_integrations ) );

		// Use filter to override existing key.
		add_action(
			'wp_parsely_add_integration',
			function( $integrations ) {
				$integrations->register( 'amp', new FakeIntegration2() );

				return $integrations;
			}
		);

		self::assertCount( 3, $registered_integrations );
		self::assertSame( array( 'amp', 'fbia', 'fake' ), array_keys( $registered_integrations ) );
	}

	/**
	 * Ensure integrations have their integrate() method called when looping through them.
	 *
	 * @covers \Parsely\Integrations\Integrations::integrate
	 * @uses \Parsely\Integrations\Integrations::register
	 */
	public function test_registered_integrations_have_their_integrate_method_called() {
		$mock_integration = $this->getMockBuilder( Integration::class )->setMethods( array( 'integrate' ) )->getMock();
		$mock_integration->expects( $this->once() )->method( 'integrate' );

		$integrations = new Integrations();
		$integrations->register( 'mock-integration', $mock_integration );

		$integrations->integrate();
	}

}
// phpcs:disable Generic.Files.OneObjectStructurePerFile.MultipleFound
/**
 * Class FakeIntegration
 *
 * @package Parsely\Tests\Integrations
 */
class FakeIntegration {
}

/**
 * Class FakeIntegration2
 *
 * @package Parsely\Tests\Integrations
 */
class FakeIntegration2 {
	/**
	 * Stub this method to avoid a fatal error.
	 */
	public function integrate() {
	}
}

