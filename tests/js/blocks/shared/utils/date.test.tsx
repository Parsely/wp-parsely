import { canProcessDate } from '../../../../../src/blocks/shared/utils/date';

const basePath = 'src/blocks/shared/utils/date.ts';

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
