<?php
/**
 * Integration Tests: Plugin options
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;
use SebastianBergmann\RecursionContext\InvalidArgumentException;
use PHPUnit\Framework\ExpectationFailedException;

/**
 * Integration Tests for plugin options.
 */
final class OptionsTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Parsely $parsely Holds the Parsely object.
	 */
	private static $parsely;

	/**
	 * Setup method called before each test.
	 */
	public function set_up(): void {
		parent::set_up();

		self::$parsely = new Parsely();
	}

	/**
	 * Verifies that get_options() can handle corrupted or unset values.
	 *
	 * @since 3.0.0
	 *
	 * @covers \Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 */
	public function test_default_options_are_returned_when_options_are_corrupted_or_not_set(): void {
		add_option( Parsely::OPTIONS_KEY, 'someinvalidvalue' );

		$options = self::$parsely->get_options();
		self::assertSame( self::$parsely->get_default_options(), $options );

		delete_option( Parsely::OPTIONS_KEY );
		self::assertSame( self::$parsely->get_default_options(), $options );
	}

	/**
	 * Verifies that get_options() returns the correct "Track As" defaults.
	 *
	 * @since 3.9.0
	 *
	 * @covers Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 */
	public function test_get_options_returns_correct_track_as_defaults(): void {
		$options = self::$parsely->get_options();
		self::assertSame( array( 'post' ), $options['track_post_types'] );
		self::assertSame( array( 'page' ), $options['track_page_types'] );
	}

	/**
	 * Verifies that set_default_track_as_values() does not get called when
	 * saved plugin options exist.
	 *
	 * @since 3.9.0
	 *
	 * @covers Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 */
	public function test_set_default_track_as_values_should_not_be_called_when_saved_options_exist(): void {
		$options                     = self::$parsely->get_options();
		$options['track_post_types'] = array( 'new_post_type' );
		$options['track_page_types'] = array( 'new_page_type' );

		add_option( Parsely::OPTIONS_KEY, $options );
		$saved_options = self::$parsely->get_options();

		self::assertSame( array( 'new_post_type' ), $saved_options['track_post_types'] );
		self::assertSame( array( 'new_page_type' ), $saved_options['track_page_types'] );

		delete_option( Parsely::OPTIONS_KEY );
	}

	/**
	 * Verifies that get_options() returns the correct "Track As" defaults when
	 * Custom Post Types are registered.
	 *
	 * @since 3.9.0
	 *
	 * @covers Parsely\Parsely::get_options
	 * @uses \Parsely\Parsely::get_managed_credentials
	 * @uses \Parsely\Parsely::set_default_track_as_values
	 */
	public function test_get_options_track_as_defaults_when_cpts_are_registered(): void {
		$custom_post_types = array(
			// Post.
			'custom_post_type'     => array(
				'public'       => true,
				'supports'     => array( 'editor' ),
				'hierarchical' => false,
			),
			// Private post.
			'excluded_post_type_1' => array(
				'public'       => false,
				'supports'     => array( 'editor' ),
				'hierarchical' => false,
			),
			// Post without editor support.
			'excluded_post_type_2' => array(
				'public'       => true,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => false,
			),
			// Private post without editor support.
			'excluded_post_type_3' => array(
				'public'       => false,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => false,
			),
			// Page.
			'custom_page_type'     => array(
				'public'       => true,
				'supports'     => array( 'editor' ),
				'hierarchical' => true,
			),
			// Private page.
			'excluded_page_type_1' => array(
				'public'       => false,
				'supports'     => array( 'editor' ),
				'hierarchical' => true,
			),
			// Page without editor support.
			'excluded_page_type_2' => array(
				'public'       => true,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => true,
			),
			// Private page without editor support.
			'excluded_page_type_3' => array(
				'public'       => false,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => true,
			),
		);

		foreach ( $custom_post_types as $key => $value ) {
			register_post_type( $key, $value );
		}

		$options = self::$parsely->get_options();

		self::assertSame( array( 'post', 'custom_post_type' ), $options['track_post_types'] );
		self::assertSame( array( 'page', 'custom_page_type' ), $options['track_page_types'] );

		// Clean up.
		foreach ( $custom_post_types as $key => $value ) {
			unregister_post_type( $key );
		}
	}
}
