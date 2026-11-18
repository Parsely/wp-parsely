/**
 * WordPress dependencies
 */
import { expect, test as base } from '@wordpress/e2e-test-utils-playwright';

/**
 * Defines the structure of this file's custom fixtures.
 *
 * @since 3.23.6
 */
type ParselyFixtures = {
	pageErrors: Error[];
};

/**
 * Extends the WordPress Playwright test object with wp-parsely fixtures.
 *
 * `pageErrors` collects uncaught exceptions and fails the test if any were
 * recorded. Tests opt in by destructuring it, so existing specs are unaffected.
 *
 * @since 3.23.6
 */
export const test = base.extend<ParselyFixtures>( {
	pageErrors: async ( { page }, use ) => {
		const errors: Error[] = [];

		page.on( 'pageerror', ( error ) => errors.push( error ) );

		await use( errors );

		expect(
			errors.map( ( error ) => error.message )
		).toEqual( [] );
	},
} );

export { expect };
