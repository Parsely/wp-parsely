<?php
/**
 * Integration Tests: Inbound Smart Link model
 *
 * @package Parsely
 * @since   3.24.3
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\Models;

use Parsely\Models\Inbound_Smart_Link;
use Parsely\Tests\Integration\TestCase;

/**
 * Integration tests for the Inbound_Smart_Link model.
 *
 * @since 3.24.3
 *
 * @covers \Parsely\Models\Inbound_Smart_Link
 */
final class InboundSmartLinkTest extends TestCase {
	/**
	 * Verifies that the serialized post data names the source post's author by
	 * display name.
	 *
	 * @since 3.24.3
	 */
	public function test_post_data_author_is_display_name(): void {
		/** @var int $author_id */
		$author_id = self::factory()->user->create(
			array(
				'user_login'   => 'inbound-author-login',
				'display_name' => 'Inbound Author',
				'role'         => 'author',
			)
		);
		/** @var int $source_post_id */
		$source_post_id = self::factory()->post->create( array( 'post_author' => $author_id ) );

		$link = new Inbound_Smart_Link( 'https://example.com/destination', 'Destination', 'link text', 0, $source_post_id );

		/** @var array{post_data: array{author: string}} $data */
		$data = $link->to_array();

		self::assertSame( 'Inbound Author', $data['post_data']['author'] );
		self::assertNotSame( 'inbound-author-login', $data['post_data']['author'] );
	}
}
