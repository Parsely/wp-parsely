/**
 * WordPress dependencies
 */
import {
	createNewPost,
	ensureSidebarOpened,
	visitAdminPage,
} from '@wordpress/e2e-test-utils';

export const PLUGIN_VERSION = '3.16.0';
export const VALID_SITE_ID = 'demoaccount.parsely.com';
export const INVALID_SITE_ID = 'invalid.parsely.com';
export const VALID_API_SECRET = 'valid_api_secret';

export const waitForWpAdmin = () => page.waitForSelector( 'body.wp-admin' );

/**
 * Sets the value of a TextBox by typing the value into it.
 *
 * @param {string} id    The TextBox's ID.
 * @param {string} value The value to be written into the TextBox.
 * @return {Promise<void>}
 */
export const setTextBoxValue = async ( id: string, value: string ) => {
	await page.focus( '#' + id );
	await page.evaluate( ( elementId: string ) => {
		( document.getElementById( elementId ) as HTMLInputElement ).value = '';
	}, id );
	await page.keyboard.type( value );
};

/**
 * Sets the Site ID and API Secret to the given values, using the plugin's
 * settings page.
 *
 * @param {string}  siteId              The site ID to be saved to the database.
 * @param {string}  apiSecret           The API Secret to be saved to the database.
 * @param {boolean} bypassAPIValidation Whether to bypass API validation on Parse.ly API.
 * @return {Promise<void>}
 */
export const setSiteKeys = async (
	siteId: string, apiSecret: string, bypassAPIValidation = true
) => {
	await visitAdminPage( '/options-general.php', '?page=parsely' + ( bypassAPIValidation ? '&e2e_parsely_skip_api_validate=y' : '' ) );

	await setTextBoxValue( 'apikey', siteId );
	await setTextBoxValue( 'api_secret', apiSecret );

	await page.click( 'input#submit' );
	await waitForWpAdmin();
};

/**
 * Sets a new display name for the current WordPress user.
 *
 * @param {string} firstName The user's first name.
 * @param {string} lastName  The user's last name.
 * @return {Promise<void>}
 */
export const setUserDisplayName = async ( firstName: string, lastName: string ) => {
	await visitAdminPage( '/profile.php' );

	await setTextBoxValue( 'first_name', firstName );
	await setTextBoxValue( 'last_name', lastName );

	// Tab out and give some time for the Display Name dropdown to populate.
	await page.keyboard.press( 'Tab' );
	await page.waitForTimeout( 250 );

	// Select the full name if a last name has been given.
	await page.evaluate( () => ( document.getElementById( 'display_name' ) as HTMLSelectElement ).selectedIndex = 0 );
	if ( lastName.length > 0 ) {
		await page.evaluate( () => ( document.getElementById( 'display_name' ) as HTMLSelectElement ).selectedIndex = 3 );
	}

	await page.click( 'input#submit' );
	await waitForWpAdmin();
};

/**
 * Inserts a new record into the specified taxonomy.
 *
 * @param {string} recordName   The newly inserted record's name.
 * @param {string} taxonomyType The taxonomy type (e.g. 'category' or 'post_tag).
 * @return {Promise<void>}
 */
export const insertRecordIntoTaxonomy = async ( recordName: string, taxonomyType: string ) => {
	await visitAdminPage( 'edit-tags.php', '?taxonomy=' + taxonomyType );

	await setTextBoxValue( 'tag-name', recordName );

	await page.click( 'input#submit' );
	await waitForWpAdmin();
};

/**
 * Gets the message returned by the PHC Editor Sidebar Related Posts panel
 * according to the various conditions passed to the function.
 *
 * @param {string} category   Name of the category to select in the Post Editor.
 * @param {string} tag        Name of the tag to select in the Post Editor.
 * @param {string} filterType The filter type to select in the dropdown.
 * @param {number} timeout    Milliseconds to wait after category/tag selection.
 * @param {string} selector   The selector from which to extract the message.
 *
 * @return {Promise<string>} The message returned.
 */
export const getRelatedPostsMessage = async (
	category = '', tag = '', filterType = '', timeout = 500, selector = '.content-helper-error-message'
): Promise<string> => {
	// Selectors
	const addCategoryButton = 'button.components-button.editor-post-taxonomies__hierarchical-terms-add.is-link';
	const pluginButton = 'button[aria-label="Parse.ly"]';
	const contentHelperMessageSelector = '.wp-parsely-content-helper div.components-panel__body.is-opened ' + selector;
	const periodSettingSelector = 'div.related-posts-settings div:nth-child(2) select';

	// Run basic operations.
	await createNewPost();
	await ensureSidebarOpened();
	await page.waitForTimeout( 1000 );

	// Select/add category in the Post Editor.
	if ( category !== '' ) {
		const categoryToggleButton = await findSidebarPanelToggleButtonWithTitle( 'Categories' );
		await categoryToggleButton.click();
		await page.waitForTimeout( 500 );
		await page.click( addCategoryButton );
		await page.keyboard.press( 'Tab' );
		await page.keyboard.type( category );
		await page.keyboard.press( 'Enter' );
		await categoryToggleButton.click();
	}

	// Select/add tag in the Post Editor.
	if ( tag !== '' ) {
		const tagToggleButton = await findSidebarPanelToggleButtonWithTitle( 'Tags' );
		await tagToggleButton.click();
		await page.keyboard.press( 'Tab' );
		await page.keyboard.type( tag );
		await page.keyboard.press( 'Enter' );
		await tagToggleButton.click();
	}

	// Add a delay to wait for taxonomy selection/saving.
	if ( category !== '' || tag !== '' ) {
		await page.waitForTimeout( timeout );
	}

	// Show the panel and get the displayed message.
	await page.waitForSelector( pluginButton );
	await page.click( pluginButton );

	// Select 30 days to reduce the possibility of a "No related posts" message.
	if ( ( await page.$( periodSettingSelector ) ) !== null ) {
		// TODO: update this after the Related Posts panel revamp.
		await page.select( periodSettingSelector, '30d' );
	}

	setSidebarPanelExpanded( 'Related Posts', true );
	if ( '' !== filterType ) {
		await page.waitForTimeout( 500 );
		await page.keyboard.press( 'Tab' );
		await page.keyboard.type( filterType.charAt( 0 ) );
		await page.waitForTimeout( 1250 );
	}
	await page.waitForSelector( contentHelperMessageSelector );
	await page.waitForFunction( // Wait for the message to appear.
		'document.querySelector("' + contentHelperMessageSelector + '").innerText.length > 0',
		{ polling: 'mutation', timeout: 5000 }
	);
	const text = await page.$eval( contentHelperMessageSelector, ( element: Element ): string => element.textContent ?? '' );

	return text;
};

/**
 * Saves settings in the settings page and forces a hard refresh.
 *
 * @return {Promise<void>}
 */
export const saveSettingsAndHardRefresh = async () => {
	await page.click( '#submit' );
	await page.waitForSelector( '#submit' );
	await page.evaluate( () => {
		location.reload();
	} );
	await page.waitForSelector( '#submit' );
};

/**
 * Returns whether the passed arrays are equal.
 *
 * This function is meant to compare very simple arrays.Please don't use it to
 * compare arrays that contain objects, or that are complex or large.
 *
 * @param {Array<string | null>} array1
 * @param {Array<string | null>} array2
 * @return {boolean} Whether the passed arrays are equal.
 */
export const arraysEqual = ( array1: ( string | null )[], array2: ( string | null )[] ) => JSON.stringify( array1 ) === JSON.stringify( array2 );

/**
 * Activates the passed WordPress theme.
 *
 * Acts as a lightweight replacement for the `activatePlugin()` function from
 * `@wordpress/e2e-test-utils`.
 *
 * @param {string} slug The theme's slug.
 */
export const activateTheme = async ( slug: string ): Promise<void> => {
	await visitAdminPage( 'themes.php' );
	await waitForWpAdmin();

	await page.click( `div[data-slug="${ slug }"] .button.activate` );
	await page.waitForSelector( `div[data-slug="${ slug }"].active` );
};

/**
 * Expands or collapses the passed Sidebar panel.
 *
 * @since 3.13.0
 *
 * @param {string}  panelTitle The title of the panel to expand or collapse.
 * @param {boolean} expand     Whether to expand or collapse the panel.
 */
export const setSidebarPanelExpanded = async (
	panelTitle: string, expand: boolean
): Promise<void> => {
	const panelButton = await findSidebarPanelToggleButtonWithTitle( panelTitle, 'wp-parsely-sidebar-tabs' );
	const panelHandle = await page.evaluateHandle(
		( el: HTMLElement ) => el, panelButton
	);
	const isPanelExpanded = await page.evaluate(
		( el: HTMLElement ) => el.getAttribute( 'aria-expanded' ), panelHandle
	);

	if ( expand && isPanelExpanded === 'false' ) {
		await panelButton.click();
	} else if ( ! expand && isPanelExpanded === 'true' ) {
		await panelButton.click();
	}
};

/**
 * Overrides the findSidebarPanelToggleButtonWithTitle() function of the
 * wordpress/e2e-test-utils package, as we started having issues with it and
 * some tests were failing.
 *
 * @since 3.15.0
 *
 * @param {string} title          The title of the element to find.
 * @param {string} containerClass The class of one of the element's containers.
 *
 * @return {Promise<Element>} The found element.
 */
const findSidebarPanelToggleButtonWithTitle = async (
	title: string, containerClass: string = 'edit-post-sidebar'
) => {
	const [ button ] = await page.$x(
		`//div[contains(@class,"${ containerClass }")]//button[@class="components-button components-panel__body-toggle"][contains(text(),"${ title }")]`
	);

	return button;
};
