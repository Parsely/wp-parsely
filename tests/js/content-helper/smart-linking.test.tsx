import { trimURLForDisplay } from '../../../src/content-helper/editor-sidebar/smart-linking/utils';

describe( 'trimURLForDisplay', () => {
	it( 'should remove protocol and www', () => {
		expect( trimURLForDisplay( 'https://www.example.com', 20 ) ).toBe( 'example.com' );
	} );

	it( 'should keep the domain in long URLs correctly', () => {
		expect( trimURLForDisplay( 'https://www.example.com/long-url-path', 20 ) ).toBe( 'example.com/lo...ath' );
		expect( trimURLForDisplay( 'https://www.example.com/long-url-path', 20 ) ).toContain( 'example.com' );
	} );
	it( 'should trim long URLs correctly', () => {
		expect( trimURLForDisplay( 'https://www.example.com/it-a-very-long-url-path', 30 ) ).toBe( 'example.com/it-a-ve...url-path' );
	} );
	it( 'should return the full URL if it is shorter than maxLength', () => {
		expect( trimURLForDisplay( 'https://example.com', 50 ) ).toBe( 'example.com' );
	} );

	it( 'should handle edge cases gracefully', () => {
		expect( trimURLForDisplay( 'https://a.com', 5 ) ).toBe( 'a.com' );
		expect( trimURLForDisplay( 'https://example.com', 0 ) ).toBe( 'example.com' );
	} );
} );
