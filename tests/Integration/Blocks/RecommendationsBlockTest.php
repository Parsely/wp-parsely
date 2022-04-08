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
	 * Verifies that the run method registers the Recommendations Block.
	 *
	 * @covers \Parsely\Recommendations_Block::run
	 *
	 * @group blocks
	 */
	public function test_recommendations_block_gets_registered_on_run(): void {
		$recommendations_block = new Recommendations_Block();
		$recommendations_block->run();

		self::assertTrue( WP_Block_Type_Registry::get_instance()->is_registered( self::BLOCK_NAME ) );
	}
}
