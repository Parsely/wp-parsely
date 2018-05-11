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
(function($) {
	$(document).ready(function onDOMReady() {
		var apikey = $('#apikey').val();
		var recrawlRequiredMessage = $('<p>')
			.addClass('description');

		recrawlRequiredMessage.append('<strong>')
			.attr('style', 'color:red;')
			.text('Important:');

		recrawlRequiredMessage
			.text('changing this value on a site currently tracked with ' +
			'Parse.ly will require reprocessing of your Parse.ly data. Once ' +
			'you have changed this value, please contact ' );

		recrawlRequiredMessage.append('<a>')
			.attr('href', 'mailto:support@parsely.com?subject=Please reprocess ' +
			apikey)
			.text('support@parsely.com');

		recrawlRequiredMessage
			.text(' to kick off reprocessing of ' +
			'your data.');

		recrawlRequiredMessage
			.appendTo("div.parsely-form-controls[data-requires-recrawl='true'] .help-text");
	});
})(jQuery);
</script>
<!-- end wp-parsely -->
