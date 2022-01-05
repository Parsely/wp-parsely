<?php
/**
 * Admin bar tests.
 *
 * @package Parsely
 */

declare(strict_types=1);

namespace Parsely\Tests\Integration\UI;

use Parsely\Parsely;
use Parsely\Tests\Integration\TestCase;
use Parsely\UI\Admin_Bar;

final class AdminBarTest extends TestCase {
	/**
	 * Internal variable.
	 *
	 * @var Admin_Bar $admin_bar Holds the Admin_Bar object
	 */
	private static $admin_bar;

	/**
	 * The setUp run before each test
	 */
	public function set_up(): void {
		parent::set_up();

		self::$admin_bar = new Admin_Bar( new Parsely() );
	}


}
