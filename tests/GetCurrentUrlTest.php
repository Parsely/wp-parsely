<?php
/**
 * \Parsely::get_current_url() tests.
 *
 * @package Parsely\Tests
 */

namespace Parsely\Tests;

use Parsely;

/**
 * \Parsely::get_current_url() tests.
 */
final class GetCurrentUrlTest extends TestCase {
	/**
	 * Data provider for test_get_current_url
	 *
	 * @return iterable
	 */
	public function data_for_test_get_current_url() {
		yield 'Home is http with force HTTPS true' => array(
			'force_https' => true,
			'home'        => 'http://example.com',
			'expected'    => 'https://example.com/',
		);

		yield 'Home is https with force HTTPS true' => array(
			'force_https' => true,
			'home'        => 'https://example.com',
			'expected'    => 'https://example.com/',
		);

		yield 'Home is http with port with force HTTPS true' => array(
			'force_https' => true,
			'home'        => 'http://example.com:1234',
			'expected'    => 'https://example.com:1234/',
		);

		yield 'Home is https with port with force HTTPS true' => array(
			'force_https' => true,
			'home'        => 'https://example.com:1234',
			'expected'    => 'https://example.com:1234/',
		);

		yield 'Home is http with port and path with force HTTPS true' => array(
			'force_https' => true,
			'home'        => 'http://example.com:1234/foo/bar',
			'expected'    => 'https://example.com:1234/foo/bar/',
		);

		yield 'Home is https with port and path with force HTTPS true' => array(
			'force_https' => true,
			'home'        => 'https://example.com:1234/foo/bar',
			'expected'    => 'https://example.com:1234/foo/bar/',
		);

		// Start cases with 'force_https_canonicals' = false.
		yield 'Home is http with force HTTPS false' => array(
			'force_https' => false,
			'home'        => 'http://example.com',
			'expected'    => 'http://example.com/',
		);

		yield 'Home is https with force HTTPS false' => array(
			'force_https' => false,
			'home'        => 'https://example.com',
			'expected'    => 'http://example.com/',
		);

		yield 'Home is http with port with force HTTPS false' => array(
			'force_https' => false,
			'home'        => 'http://example.com:1234',
			'expected'    => 'http://example.com:1234/',
		);

		yield 'Home is https with port with force HTTPS false' => array(
			'force_https' => false,
			'home'        => 'https://example.com:1234',
			'expected'    => 'http://example.com:1234/',
		);

		yield 'Home is http with port and path with force HTTPS false' => array(
			'force_https' => false,
			'home'        => 'http://example.com:1234/foo/bar',
			'expected'    => 'http://example.com:1234/foo/bar/',
		);

		yield 'Home is https with port and path with force HTTPS false' => array(
			'force_https' => false,
			'home'        => 'https://example.com:1234/foo/bar',
			'expected'    => 'http://example.com:1234/foo/bar/',
		);
	}

	/**
	 * Test the get_current_url() method.
	 *
	 * @testdox Given Force HTTPS is $force_https, when home is $home, then expect $expected.
	 * @dataProvider data_for_test_get_current_url
	 * @covers \Parsely::get_current_url
	 * @uses \Parsely::get_options
	 * @uses \Parsely::update_metadata_endpoint
	 *
	 * @param bool   $force_https Force HTTPS Canonical setting value.
	 * @param string $home        Home URL.
	 * @param string $expected    Expected current URL.
	 */
	public function test_get_current_url( $force_https, $home, $expected ) {
		$parsely                           = new Parsely();
		$options                           = get_option( Parsely::OPTIONS_KEY );
		$options['force_https_canonicals'] = $force_https;
		update_option( Parsely::OPTIONS_KEY, $options );

		update_option( 'home', $home );

		// Test homepage.
		$this->go_to( '/' );
		$res = $parsely->get_current_url();
		self::assertEquals( $expected, $res );
	}

	/**
	 * Test the get_current_url() method with a specific post (query parameter).
	 *
	 * @testdox Given Force HTTPS is $force_https, when home is $home, then expect $expected.
	 * @dataProvider data_for_test_get_current_url
	 * @covers \Parsely::get_current_url
	 * @uses \Parsely::get_options
	 * @uses \Parsely::update_metadata_endpoint
	 *
	 * @param bool   $force_https Force HTTPS Canonical setting value.
	 * @param string $home        Home URL.
	 * @param string $expected    Expected current URL.
	 */
	public function test_get_current_url_specific_post( $force_https, $home, $expected ) {
		$parsely                           = new Parsely();
		$options                           = get_option( Parsely::OPTIONS_KEY );
		$options['force_https_canonicals'] = $force_https;
		update_option( Parsely::OPTIONS_KEY, $options );

		update_option( 'home', $home );

		// Test a specific post.
		$post_array = $this->create_test_post_array();
		$post_id    = $this->factory->post->create( $post_array );
		$this->go_to( '/?p=' . $post_id );
		$res = $parsely->get_current_url( 'post', $post_id );

		$constructed_expected = $expected . '?p=' . $post_id;
		self::assertEquals( $constructed_expected, $res );
	}

	/**
	 * Test the get_current_url() method with a random URL.
	 *
	 * @testdox Given Force HTTPS is $force_https, when home is $home, then expect $expected.
	 * @dataProvider data_for_test_get_current_url
	 * @covers \Parsely::get_current_url
	 * @uses \Parsely::get_options
	 * @uses \Parsely::update_metadata_endpoint
	 *
	 * @param bool   $force_https Force HTTPS Canonical setting value.
	 * @param string $home        Home URL.
	 * @param string $expected    Expected current URL.
	 */
	public function test_get_current_url_random( $force_https, $home, $expected ) {
		$parsely                           = new Parsely();
		$options                           = get_option( Parsely::OPTIONS_KEY );
		$options['force_https_canonicals'] = $force_https;
		update_option( Parsely::OPTIONS_KEY, $options );

		update_option( 'home', $home );

		// Test a random URL.
		$this->go_to( '/random-url' );
		$res = $parsely->get_current_url();

		$constructed_expected = $expected . 'random-url';
		self::assertEquals( $constructed_expected, $res );
	}
}
