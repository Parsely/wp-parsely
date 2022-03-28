<?php
/**
 * Parse.ly Recommendations Block tests.
 *
 * @package Parsely\Tests\Blocks
 */

declare(strict_types=1);

namespace Parsely\Tests\Blocks;

use Parsely\Recommendations_Block;
use Parsely\Tests\Integration\TestCase;
use WP_Block_Type_Registry;

/**
 * Parse.ly Recommendations Block tests.
 */
final class RecommendationsBlockTest extends TestCase {
	private const BLOCK_NAME = 'wp-parsely/recommendations';

	/**
	 * Unregister Block after every test run to avoid random test errors.
	 */
	public function tear_down(): void {
		parent::tear_down();
		self::unregister_block();
	}

	/**
	 * Verify that the run method does not register the Recommendations
	 * Block when the feature flag is not set.
	 *
	 * @covers \Parsely\Recommendations_Block::run
	 *
	 * @group blocks
	 */
	public function test_recommendations_block_is_not_registered_when_feature_flag_is_off(): void {
		$recommendations_block = new Recommendations_Block();
		$recommendations_block->run();

		self::assertFalse( self::is_block_registered() );
	}

	/**
	 * Verify that the run method registers the Recommendations Block when the
	 * feature flag is set.
	 *
	 * @covers \Parsely\Recommendations_Block::run
	 *
	 * @group blocks
	 */
	public function test_recommendations_block_is_registered_when_feature_flag_is_on(): void {
		add_filter( 'wp_parsely_recommendations_block_enabled', '__return_true' );
		$recommendations_block = new Recommendations_Block();
		$recommendations_block->run();

		self::assertTrue( self::is_block_registered() );
	}

	/**
	 * Check if Recommendations Block is registered and return result.
	 *
	 * @return bool
	 */
	private static function is_block_registered(): bool {
		return WP_Block_Type_Registry::get_instance()->is_registered( self::BLOCK_NAME );
	}

	/**
	 * Unregister Recommendations Block if it is registered.
	 *
	 * @return void
	 */
	private static function unregister_block(): void {
		if ( self::is_block_registered() ) {
			WP_Block_Type_Registry::get_instance()->unregister( self::BLOCK_NAME );
		}
	}
}
