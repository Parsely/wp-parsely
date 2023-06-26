import {
	canProcessDate,
	getDateInUserLang,
	getSmartShortDate,
	removeDaysFromDate,
} from '../../../../../src/content-helper/common/utils/date';

const basePath = 'src/content-helper/common/utils/date.ts';

/**
 * Verifies that canProcessDate() returns `true` for valid dates and `false` for
 * invalid dates.
 */
describe( `${ basePath } canProcessDate()`, (): void => {
	it.each( [
		new Date(),
		new Date( '2022-11-10T04:42:03' ),
		new Date( '2022-11-10' ),
	] )( 'should return true for valid dates', ( date ): void => {
		expect( canProcessDate( date ) ).toBe( true );
	} );

	it.each( [
		// @ts-expect-error
		new Date( null ),
		new Date( '' ),
		new Date( 0 ),
		new Date( '1970-01-01' ),
		new Date( 'test' ),
		new Date( 'Date N/A' ),
	] )( 'should return false for invalid dates', ( invalidDate ): void => {
		expect( canProcessDate( new Date( invalidDate ) ) ).toBe( false );
	} );
} );

/**
 * Verifies that getDateInUserLang() returns dates formatted according to the
 * passed options.
 */
describe( `${ basePath } getDateInUserLang()`, (): void => {
	it( 'should format dates according to passed options', (): void => {
		expect( getDateInUserLang(
			new Date( '2022-11-11' ),
			{ month: 'short', day: 'numeric', year: 'numeric' },
		) ).toBe( 'Nov 11, 2022' );

		expect( getDateInUserLang(
			new Date( '2022-12-11' ),
			{ dateStyle: 'full', timeStyle: 'long', timeZone: 'UTC' },
		) ).toBe( 'Sunday, December 11, 2022 at 12:00:00 AM UTC' );
	} );
} );

/**
 * Verifies that getSmartShortDate() returns correctly formatted dates.
 */
describe( `${ basePath } getSmartShortDate()`, (): void => {
	it( 'should format dates according to the short date format', (): void => {
		expect( getSmartShortDate(
			new Date( '2022-11-11' ) )
		).toBe( 'Nov 11, 2022' );
	} );

	it( 'should not include year if the date is in the current year', (): void => {
		const currentYear = new Date().getFullYear();

		expect( getSmartShortDate(
			new Date( currentYear + '-11-11' ) )
		).toBe( 'Nov 11' );
	} );
} );

/**
 * Verifies that removeDaysFromDate() returns the correct date difference, or
 * an error in case of non-integer days or invalid dates.
 */
describe( `${ basePath } removeDaysFromDate()`, (): void => {
	it( 'should calculate date difference correctly', (): void => {
		expect( removeDaysFromDate( '2023-11-11', 10 ) ).toBe( '2023-11-01' );
		expect( removeDaysFromDate( '2023-03-05', 5 ) ).toBe( '2023-02-28' );
		expect( removeDaysFromDate( '2024-03-05', 5 ) ).toBe( '2024-02-29' );
		expect( removeDaysFromDate( '2023-03-05', 0 ) ).toBe( '2023-03-05' );
		expect( removeDaysFromDate( '2023-03-05', -1 ) ).toBe( '2023-03-06' );
	} );

	it( 'should expect days parameter to be an integer', (): void => {
		expect(
			removeDaysFromDate( '2023-03-05', 4.5 )
		).toBe( 'days parameter must be an integer' );
	} );

	it.each( [
		'23-03-05',
		'2023-3-05',
		'2023-003-05',
		'2023-03-5',
		'2023-03-005',
		'2023-03-99',
		'0000-00-00',
		'2023-13-05',
		'2023-03-32',
		'xxxx-xx-xx',
		'invalid',
		'1970-01-01',
	] )( 'should return "Date N/A" for invalid or unsupported dates',
		( invalidDate ): void => {
			expect( removeDaysFromDate( invalidDate, 4 ) ).toBe( 'Date N/A' );
		} );
} );
