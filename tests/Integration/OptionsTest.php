<?php
/**
 * Integration Tests: Plugin options
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration;

use Parsely\Parsely;

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
	 */
	public function test_default_options_are_returned_when_options_are_corrupted_or_not_set(): void {
		update_option( Parsely::OPTIONS_KEY, 'someinvalidvalue' );

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
	 */
	public function test_get_options_returns_correct_track_as_defaults(): void {
		$options = self::$parsely->get_options();
		self::assertSame( array( 'post' ), $options['track_post_types'] );
		self::assertSame( array( 'page' ), $options['track_page_types'] );

		delete_option( Parsely::OPTIONS_KEY );
		$options = self::$parsely->get_options();

		self::assertSame( array( 'post' ), $options['track_post_types'] );
		self::assertSame( array( 'page' ), $options['track_page_types'] );
	}

	/**
	 * Verifies that get_options() returns the correct "Track As" defaults when
	 * Custom Post Types are registered.
	 *
	 * @since 3.9.0
	 *
	 * @covers Parsely\Parsely::get_options
	 */
	public function test_get_options_track_as_defaults_when_cpts_are_registered(): void {
		// Post.
		register_post_type(
			'custom_post_type',
			array(
				'public'       => true,
				'supports'     => array( 'editor' ),
				'hierarchical' => false,
			)
		);

		// Private post.
		register_post_type(
			'excluded_post_type_1',
			array(
				'public'       => false,
				'supports'     => array( 'editor' ),
				'hierarchical' => false,
			)
		);

		// Post without editor support.
		register_post_type(
			'excluded_post_type_2',
			array(
				'public'       => true,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => false,
			)
		);

		// Private post without editor support.
		register_post_type(
			'excluded_post_type_3',
			array(
				'public'       => false,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => false,
			)
		);

		// Page.
		register_post_type(
			'custom_page_type',
			array(
				'public'       => true,
				'supports'     => array( 'editor' ),
				'hierarchical' => true,
			)
		);

		// Private page.
		register_post_type(
			'excluded_page_type_1',
			array(
				'public'       => false,
				'supports'     => array( 'editor' ),
				'hierarchical' => true,
			)
		);

		// Page without editor support.
		register_post_type(
			'excluded_page_type_2',
			array(
				'public'       => true,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => true,
			)
		);

		// Private page without editor support.
		register_post_type(
			'excluded_page_type_3',
			array(
				'public'       => false,
				'supports'     => array( 'editor' => false ),
				'hierarchical' => true,
			)
		);

		delete_option( Parsely::OPTIONS_KEY );
		$options = self::$parsely->get_options();

		self::assertSame( array( 'post', 'custom_post_type' ), $options['track_post_types'] );
		self::assertSame( array( 'page', 'custom_page_type' ), $options['track_page_types'] );

		// Clean up.
		unregister_post_type( 'custom_post_type' );
		unregister_post_type( 'excluded_post_type_1' );
		unregister_post_type( 'excluded_post_type_2' );
		unregister_post_type( 'excluded_post_type_3' );
		unregister_post_type( 'custom_page_type' );
		unregister_post_type( 'excluded_page_type_1' );
		unregister_post_type( 'excluded_post_type_2' );
		unregister_post_type( 'excluded_post_type_3' );
	}
}
