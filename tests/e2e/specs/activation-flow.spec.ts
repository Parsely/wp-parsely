/**
 * External dependencies
 */
import { visitAdminPage } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	setSiteKeys,
	startUpTest,
	waitForWpAdmin,
} from '../utils';

describe( 'Activation flow', (): void => {
	beforeAll( startUpTest );

	it( 'Should progress as intended', async (): Promise<void> => {
		await setSiteKeys( '' );

		await visitAdminPage( '/options-general.php', '?page=parsely' );
		await waitForWpAdmin();

		const versionText: string = await page.$eval( '#wp-parsely_version', ( el : Element ) => el.textContent || '' );
		expect( versionText ).toMatch( /^Version \d+.\d+/ );

		const errorData = await page.$eval( '#wp-parsely-site-id-error-notice', ( el: Element ) => ( {
			classes: el.classList.value,
			message: el.textContent,
		} ) );

		expect( errorData.classes ).toBe( 'notice notice-error' );
		expect( errorData.message ).toBe(
			'The Parse.ly plugin is not active. You need to provide your Parse.ly Dash Site ID before things get cooking.'
		);

		await setSiteKeys();

		await waitForWpAdmin();
		expect( await page.$( '#message.error' ) ).toBe( null );
	} );

	it( 'Should display all admin sections', async (): Promise<void> => {
		await visitAdminPage( '/options-general.php', '?page=parsely' );
		await waitForWpAdmin();

		const basicSectionSelector = '.basic-section';
		const recrawlSectionSelector = '.recrawl-section';
		const advancedSectionSelector = '.advanced-section';

		// Default tab.
		expect( await getSectionStyles( basicSectionSelector ) ).toContain( 'display: initial' );
		expect( await getSectionStyles( recrawlSectionSelector ) ).toContain( 'display: none' );
		expect( await getSectionStyles( advancedSectionSelector ) ).toContain( 'display: none' );

		// Basic Settings Tab.
		await page.click( '.basic-section-tab' );
		expect( await getSectionStyles( basicSectionSelector ) ).toContain( 'display: initial' );
		expect( await getSectionStyles( recrawlSectionSelector ) ).toContain( 'display: none' );
		expect( await getSectionStyles( advancedSectionSelector ) ).toContain( 'display: none' );

		// Recrawl Settings Tab.
		await page.click( '.recrawl-section-tab' );
		expect( await getSectionStyles( basicSectionSelector ) ).toContain( 'display: none' );
		expect( await getSectionStyles( recrawlSectionSelector ) ).toContain( 'display: initial' );
		expect( await getSectionStyles( advancedSectionSelector ) ).toContain( 'display: none' );

		// Advanced Settings Tab.
		await page.click( '.advanced-section-tab' );
		expect( await getSectionStyles( basicSectionSelector ) ).toContain( 'display: none' );
		expect( await getSectionStyles( recrawlSectionSelector ) ).toContain( 'display: none' );
		expect( await getSectionStyles( advancedSectionSelector ) ).toContain( 'display: initial' );

		await page.click( '.basic-section-tab' ); // Revert to initial state
	} );

	async function getSectionStyles( selector: string ): Promise<string> {
		return await page.$eval( selector, ( e: Element ): string => e.getAttribute( 'style' ) || '' );
	}
} );
