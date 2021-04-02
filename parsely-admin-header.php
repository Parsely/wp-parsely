<?php
/**
 * JavaScript file
 *
 * Main javascript file for plugin
 *
 * @category   Components
 * @package    WordPress
 * @subpackage Parse.ly
 */

?>

<!-- wp-parsely -->
<style type="text/css">
	#wp-parsely_version {color: #777; font-size: 12px; margin-left: 1em;}
	.help-text {
		width: 75%;
	}
</style>
<script type="text/javascript">
(function() {
	window.addEventListener( 'DOMContentLoaded', function( event ) {
		var keyEl = document.querySelector( '#apikey' );
		var requiresRecrawlNotice = document.querySelectorAll( 'div.parsely-form-controls[data-requires-recrawl="true"] .help-text' );
		if ( ! ( keyEl && requiresRecrawlNotice.length ) ) {
			return;
		}
		var notice = '<p class="description">' +
			'<strong style="color:red;">Important:</strong>' +
			' changing this value on a site currently tracked with ' +
			'Parse.ly will require reprocessing of your Parse.ly data. Once ' +
			'you have changed this value, please contact ' +
			'<a href="mailto:support@parsely.com?subject=Please reprocess ' + encodeURIComponent( keyEl.value ) + '">' +
				'support@parsely.com'
			'</a>' +
		'</p>';
		[].forEach.call( requiresRecrawlNotice, function( n ) {
			n.innerHTML += notice;
		} );
	} );
})();
</script>
<!-- end wp-parsely -->
