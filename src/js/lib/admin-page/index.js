import domReady from '@wordpress/dom-ready';
import { __, sprintf } from '@wordpress/i18n';

domReady( () => {
	const keyEl = document.querySelector( '#apikey' );
	const requiresRecrawlNotice = document.querySelectorAll(
		'.parsely-form-controls[data-requires-recrawl="true"] .help-text'
	);
	if ( ! ( keyEl && requiresRecrawlNotice.length ) ) {
		return;
	}

	const notice = sprintf(
		/* translators: %s: The API Key that will be used to request a recrawl */
		__(
			'<p class="description"><strong style="color:red;">Important:</strong> changing this value on a site currently tracked with Parse.ly will require reprocessing of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please reprocess %s">support@parsely.com</a></p>'
		),
		keyEl.value,
		'wp-parsely'
	);
	[].forEach.call( requiresRecrawlNotice, function( n ) {
		n.innerHTML += notice;
	} );
} );
