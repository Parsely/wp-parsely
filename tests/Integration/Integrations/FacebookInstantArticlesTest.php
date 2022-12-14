<?php
/**
 * Integration Tests: Facebook Instant Articles Integration
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Integrations;

use ReflectionClass;
use Parsely\Integrations\Facebook_Instant_Articles;
use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration Tests for the Facebook Instant Articles Integration.
 */
final class FacebookInstantArticlesTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Facebook_Instant_Articles $fbia Holds the Facebook_Instant_Articles object.
	 */
	private static $fbia;

	/**
	 * Internal variable.
	 *
	 * @var string $registry_identifier Holds the same value as the private constant in the class.
	 */
	private static $registry_identifier;

	/**
	 * Internal variable.
	 *
	 * @var string $registry_display_name Hols the same value as the private constant in the class.
	 */
	private static $registry_display_name;

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::$fbia = new Facebook_Instant_Articles( new Parsely() );
		$reflect    = new ReflectionClass( self::$fbia );

		self::$registry_identifier   = $reflect->getReflectionConstant( 'REGISTRY_IDENTIFIER' )->getValue();
		self::$registry_display_name = $reflect->getReflectionConstant( 'REGISTRY_DISPLAY_NAME' )->getValue();
	}

	/**
	 * Verifies that the integration is active only if the FBIA plugin is
	 * active.
	 *
	 * @covers \Parsely\Integrations\Facebook_Instant_Articles::integrate
	 */
	public function test_integration_only_runs_when_FBIA_plugin_is_active(): void {
		// FBIA plugin is inactive.
		self::$fbia->integrate();
		self::assertFalse(
			has_action(
				'instant_articles_compat_registry_analytics',
				array( self::$fbia, 'insert_parsely_tracking' )
			)
		);

		// FBIA plugin is active.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
		define( 'IA_PLUGIN_VERSION', '1.2.3' );
		self::$fbia->integrate();
		self::assertNotFalse(
			has_action(
				'instant_articles_compat_registry_analytics',
				array( self::$fbia, 'insert_parsely_tracking' )
			)
		);
	}

	/**
	 * Verifies that the integration is active only if a Site ID is set.
	 *
	 * @covers \Parsely\Integrations\Facebook_Instant_Articles::insert_parsely_tracking
	 * @covers \Parsely\Integrations\Facebook_Instant_Articles::get_embed_code
	 * @uses \Parsely\Parsely::site_id_is_missing
	 * @uses \Parsely\Parsely::site_id_is_set
	 * @uses \Parsely\Parsely::get_site_id
	 * @uses \Parsely\Parsely::get_options
	 * @group fbia
	 */
	public function test_parsely_is_added_to_FBIA_registry(): void {
		// We use our own registry here, but the integration with the FBIA
		// plugin provides its own.
		$registry = array();

		// Site ID is not set.
		self::$fbia->insert_parsely_tracking( $registry );
		self::assertArrayNotHasKey( self::$registry_identifier, $registry );

		// Site ID is set.
		$fake_site_id = 'my-site-id.com';
		self::set_options( array( 'site_id' => $fake_site_id ) );
		self::$fbia->insert_parsely_tracking( $registry );
		self::assert_parsely_added_to_registry( $registry, $fake_site_id );
	}

	/**
	 * Verifies that the registry array has the integration identifier as a key,
	 * and that the display name and payload are correct.
	 *
	 * @param array  $registry Representation of Facebook Instant Articles registry.
	 * @param string $site_id  Site ID.
	 */
	public static function assert_parsely_added_to_registry( array $registry, string $site_id ): void {
		self::assertArrayHasKey( self::$registry_identifier, $registry );
		self::assertSame( self::$registry_display_name, $registry[ self::$registry_identifier ]['name'] );

		// Payload should contain a script tag and the Site ID.
		self::assertStringContainsString( '<script>', $registry[ self::$registry_identifier ]['payload'] );
		self::assertStringContainsString( $site_id, $registry[ self::$registry_identifier ]['payload'] );
	}
}
