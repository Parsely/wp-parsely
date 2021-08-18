/**
 * This integration test provides confidence js-cookie's `get` function continues to work as expected.
 */

/**
 * External dependencies
 */
import { get as getCookie, remove as removeCookie } from 'js-cookie';

describe( 'js-cookies integration', () => {
	beforeEach( () => {
		Object.keys( getCookie() ).forEach( ( cookieName ) => removeCookie( cookieName ) );
	} );

	test( 'Unset key should return undefined', () => {
		global.document.cookie = 'tea=hot';
		global.document.cookie = 'earl=gray';
		expect( global.document.cookie ).toBe( 'tea=hot; earl=gray' );
		expect( getCookie( 'biscuits' ) ).toBeUndefined();
	} );

	test( 'All Keys with populated values should return value', () => {
		global.document.cookie = 'rank=Captain';
		global.document.cookie = 'fname=Jean Luc';
		global.document.cookie = 'lname=Picard';
		global.document.cookie = 'lights=4';
		expect( global.document.cookie ).toBe( 'rank=Captain; fname=Jean Luc; lname=Picard; lights=4' );
		expect( getCookie( 'rank' ) ).toBe( 'Captain' );
		expect( getCookie( 'fname' ) ).toBe( 'Jean Luc' );
		expect( getCookie( 'lname' ) ).toBe( 'Picard' );
		expect( getCookie( 'lights' ) ).toBe( '4' );
	} );

	test( 'Keys without populated values should return empty string', () => {
		global.document.cookie = 'rank=Captain';
		global.document.cookie = 'OPAfaction=';
		global.document.cookie = 'fname=James';
		global.document.cookie = 'lname=Holden';
		expect( global.document.cookie ).toBe( 'rank=Captain; fname=James; lname=Holden; OPAfaction=' );
		expect( getCookie( 'rank' ) ).toBe( 'Captain' );
		expect( getCookie( 'fname' ) ).toBe( 'James' );
		expect( getCookie( 'lname' ) ).toBe( 'Holden' );
		expect( getCookie( 'OPAfaction' ) ).toBe( '' );
	} );

	test( 'Values that include an equal sign should be parsed appropriately', () => {
		global.document.cookie = '_dlt=1';
		global.document.cookie = 'hasLiveRampMatch=true';
		global.document.cookie =
			'_parsely_visitor={%22id%22:%22pid=abc123%22%2C%22session_count%22:1%2C%22last_session_ts%22:1629211115751}';
		global.document.cookie = '_pnvl=false';
		expect( global.document.cookie ).toBe(
			'_dlt=1; hasLiveRampMatch=true; _parsely_visitor={%22id%22:%22pid=abc123%22%2C%22session_count%22:1%2C%22last_session_ts%22:1629211115751}; _pnvl=false'
		);
		expect( getCookie( '_parsely_visitor' ) ).toBe(
			'{"id":"pid=abc123","session_count":1,"last_session_ts":1629211115751}'
		);
	} );
} );
