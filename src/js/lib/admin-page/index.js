import domReady from '@wordpress/dom-ready';
import { sprintf } from '@wordpress/i18n';

domReady( () => {
	const keyEl = document.querySelector( '#apikey' );
	const requiresRecrawlNotice = document.querySelectorAll(
		'.parsely-form-controls[data-requires-recrawl="true"] .help-text'
	);
	if ( ! ( keyEl && requiresRecrawlNotice.length ) ) {
		return;
	}

	const notice = sprintf(
		'<p class="description"><strong style="color:red;">Important:</strong> changing this value on a site currently tracked with Parse.ly will require reprocessing of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please reprocess %s">support@parsely.com</a></p>',
		keyEl.value,
		'wp-parsely'
	);
	[].forEach.call( requiresRecrawlNotice, function( n ) {
		n.innerHTML += notice;
	} );
} );
