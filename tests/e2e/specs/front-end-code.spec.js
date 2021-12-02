/**
 * External dependencies
 */
import {
	activatePlugin,
	createURL,
	loginUser,
} from '@wordpress/e2e-test-utils';
import { activatePluginApiKey, PLUGIN_VERSION } from '../utils';

/**
 * Internal dependencies
 */


describe( 'Front end code insertion', () => {
	it('Should inject loading script homepage', async () => {
		await loginUser();
		await activatePlugin('wp-parsely');
		await activatePluginApiKey();

		await page.goto(createURL('/'));

		const content = await page.content();

		expect(content).toContain(`<script data-parsely-site="e2etest.example.com" src="https://cdn.parsely.com/keys/e2etest.example.com/p.js?ver=${PLUGIN_VERSION}" id="parsely-cfg"></script>`);
	})
} )
