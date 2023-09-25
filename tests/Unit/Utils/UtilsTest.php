<?php
/**
 * Unit Tests: Util Functions
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Unit;

use Yoast\WPTestUtils\BrainMonkey\TestCase;

use function Parsely\Utils\convert_to_associative_array;
use function Parsely\Utils\get_formatted_number;
use function Parsely\Utils\get_formatted_time;
use function Parsely\Utils\get_utc_date_format;

use const Parsely\Utils\DATE_UTC_FORMAT;

/**
 * Unit Tests: Util Functions
 *
 * @phpstan-type Test_UTC_Date_Format_Data array{
 *   args: array{
 *     days: int,
 *   },
 *   expected_output: string,
 *   msg: string,
 * }
 *
 * @phpstan-type Test_Formatted_Number_Data array{
 *   args: array{
 *     number: int,
 *   },
 *   expected_output: string,
 *   msg: string,
 * }
 *
 * @phpstan-type Test_Formatted_Time_Data array{
 *   args: array{
 *     seconds: int,
 *   },
 *   expected_output: string,
 *   msg: string,
 * }
 *
 * @phpstan-type Test_Convert_To_Associative_Data array{
 *   args: array{
 *     obj: stdClass,
 *   },
 *   expected_output: array<mixed>,
 *   msg: string,
 * }
 */
final class UtilsTest extends TestCase {
	/**
	 * Tests get_utc_date_format function.
	 *
	 * @covers function \Parsely\Utils\get_utc_date_format
	 */
	public function test_get_utc_date_format(): void {
		$current_date = gmdate( DATE_UTC_FORMAT );
		$past_date    = gmdate( DATE_UTC_FORMAT, strtotime( '-1 days' ) );
		$future_date  = gmdate( DATE_UTC_FORMAT, strtotime( '1 days' ) );

		/**
		 * Variable.
		 *
		 * @var array<Test_UTC_Date_Format_Data>
		 */
		$tests_data = array(
			array(
				'args'            => array( 'days' => 0 ),
				'expected_output' => $current_date,
				'msg'             => 'Should match with the format of the current date.',
			),
			array(
				'args'            => array( 'days' => -1 ),
				'expected_output' => $past_date,
				'msg'             => 'Should match with the format of the past date.',
			),
			array(
				'args'            => array( 'days' => 1 ),
				'expected_output' => $future_date,
				'msg'             => 'Should match with the format of the future date.',
			),
		);

		foreach ( $tests_data as $t ) {
			$args   = $t['args'];
			$output = get_utc_date_format( $args['days'] );

			self::assertSame( $t['expected_output'], $output, $t['msg'] );
		}
	}

	/**
	 * Tests get_formatted_number function.
	 *
	 * @covers function \Parsely\Utils\get_formatted_number
	 */
	public function test_get_formatted_number(): void {
		$this->mock_wordpress_functions();

		/**
		 * Variable.
		 *
		 * @var array<Test_Formatted_Number_Data>
		 */
		$tests_data = array(
			array(
				'args'            => array( 'number' => 0 ),
				'expected_output' => '0',
				'msg'             => 'Should show number without any special format.',
			),
			array(
				'args'            => array( 'number' => 10 ),
				'expected_output' => '10',
				'msg'             => 'Should show number without any special format.',
			),
			array(
				'args'            => array( 'number' => 1000 ),
				'expected_output' => '1k',
				'msg'             => 'Should show number in thousands format.',
			),
			array(
				'args'            => array( 'number' => 1100 ),
				'expected_output' => '1.1k',
				'msg'             => 'Should show number in thousands format.',
			),
			array(
				'args'            => array( 'number' => 1000000 ),
				'expected_output' => '1M',
				'msg'             => 'Should show number in millions format.',
			),
			array(
				'args'            => array( 'number' => 1000000000 ),
				'expected_output' => '1B',
				'msg'             => 'Should show number in billions format.',
			),
		);

		foreach ( $tests_data as $t ) {
			$args   = $t['args'];
			$output = get_formatted_number( (string) $args['number'] );

			self::assertSame( $t['expected_output'], $output, $t['msg'] );
		}
	}

	/**
	 * Tests get_formatted_time function.
	 *
	 * @covers function \Parsely\Utils\get_formatted_time
	 */
	public function test_get_formatted_time(): void {
		$this->mock_wordpress_functions();

		/**
		 * Variable.
		 *
		 * @var array<Test_Formatted_Time_Data>
		 */
		$tests_data = array(
			array(
				'args'            => array( 'seconds' => 0 ),
				'expected_output' => '0 sec.',
				'msg'             => 'Should show seconds.',
			),
			array(
				'args'            => array( 'seconds' => 0.5 ),
				'expected_output' => '1 sec.',
				'msg'             => 'Should show seconds.',
			),
			array(
				'args'            => array( 'seconds' => 0.5000 ),
				'expected_output' => '1 sec.',
				'msg'             => 'Should show seconds.',
			),
			array(
				'args'            => array( 'seconds' => 0.51 ),
				'expected_output' => '1 sec.',
				'msg'             => 'Should show seconds.',
			),
			array(
				'args'            => array( 'seconds' => 59 ),
				'expected_output' => '59 sec.',
				'msg'             => 'Should show seconds.',
			),
			array(
				'args'            => array( 'seconds' => 65 ),
				'expected_output' => '1:05',
				'msg'             => 'Should show minute and seconds.',
			),
			array(
				'args'            => array( 'seconds' => 3665 ),
				'expected_output' => '1:01:05',
				'msg'             => 'Should show hour, minute and seconds.',
			),
		);

		foreach ( $tests_data as $t ) {
			$args   = $t['args'];
			$output = get_formatted_time( $args['seconds'] );

			self::assertSame( $t['expected_output'], $output, $t['msg'] );
		}
	}

	/**
	 * Tests convert_to_associative_array function.
	 *
	 * @covers function \Parsely\Utils\convert_to_associative_array
	 */
	public function test_convert_to_associative_array(): void {
		/**
		 * Variable.
		 *
		 * @var array<Test_Convert_To_Associative_Data>
		 */
		$tests_data = array(
			array(
				'args'            => array(
					'obj' => (object) array(
						'first'  => 1,
						'second' => 2,
					),
				),
				'expected_output' => array(
					'first'  => 1,
					'second' => 2,
				),
				'msg'             => 'Should convert simple stdClass to array.',
			),
			array(
				'args'            => array(
					'obj' => (object) array(
						'first'  => 1,
						'second' => (object) array(
							'third'  => 3,
							'fourth' => (object) array( 'five' => 5 ),
						),
					),
				),
				'expected_output' => array(
					'first'  => 1,
					'second' => array(
						'third'  => 3,
						'fourth' => array( 'five' => 5 ),
					),
				),
				'msg'             => 'Should convert multi-level nested stdClass to array.',
			),
		);

		foreach ( $tests_data as $t ) {
			$args   = $t['args'];
			$output = convert_to_associative_array( $args['obj'] );

			self::assertSame( $t['expected_output'], $output, $t['msg'] );
		}
	}

	/**
	 * Mocks some WordPress functions needed by the calling tests.
	 *
	 * @since 3.9.1
	 */
	public function mock_wordpress_functions(): void {
		// Mock __() function.
		\Brain\Monkey\Functions\expect( '__' )
			->with( \Mockery::type( 'string' ) )
			->andReturnUsing(
				function ( string $str ): string {
					return $str;
				}
			);

		// Mock esc_html() function.
		\Brain\Monkey\Functions\expect( 'esc_html' )
			->with( \Mockery::type( 'string' ) )
			->andReturnUsing(
				function ( string $str ): string {
					return $str;
				}
			);
	}
}
