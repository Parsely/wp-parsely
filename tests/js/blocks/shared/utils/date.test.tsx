import { canProcessDate } from '../../../../../src/blocks/shared/utils/date';

const basePath = 'src/blocks/shared/utils/date.ts';

describe( `${ basePath } canProcessDate()`, (): void => {
	it( 'should return true for valid dates', (): void => {
		expect( canProcessDate( new Date() ) ).toBe( true );
		expect( canProcessDate( new Date( '2022-11-10T04:42:03' ) ) ).toBe( true );
		expect( canProcessDate( new Date( '2022-11-10' ) ) ).toBe( true );
	} );

	it( 'should return false for invalid dates', (): void => {
		// @ts-expect-error
		expect( canProcessDate( new Date( null ) ) ).toBe( false );
		expect( canProcessDate( new Date( '' ) ) ).toBe( false );
		expect( canProcessDate( new Date( 0 ) ) ).toBe( false );
		expect( canProcessDate( new Date( '1970-01-01' ) ) ).toBe( false );
		expect( canProcessDate( new Date( 'test' ) ) ).toBe( false );
		expect( canProcessDate( new Date( 'Date N/A' ) ) ).toBe( false );
	} );
} );
