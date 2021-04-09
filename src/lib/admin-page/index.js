function initAdmin() {
	document.defaultView.addEventListener( 'DOMContentLoaded', () => {
		const keyEl = document.querySelector( '#apikey' );
		const requiresRecrawlNotice = document.querySelectorAll(
			'div.parsely-form-controls[data-requires-recrawl="true"] .help-text'
		);
		if ( ! ( keyEl && requiresRecrawlNotice.length ) ) {
			return;
		}

		const notice = `<p class="description"><strong style="color:red;">Important:</strong> changing this value on a site currently tracked with Parse.ly will require reprocessing of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please reprocess ${ encodeURIComponent(
			keyEl.value
		) }">support@parsely.com</a></p>`;
		[].forEach.call( requiresRecrawlNotice, function( n ) {
			n.innerHTML += notice;
		} );
	} );
}

initAdmin();
