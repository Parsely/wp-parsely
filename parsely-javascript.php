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

<?php
if ( ! isset( $parsely_options['apikey'] ) || empty( $parsely_options['apikey'] ) ) {
	return;
}
?>

<!-- START Parse.ly Include: Standard -->
<?php if ( ! empty( $parsely_options['api_secret'] ) ) : ?>
	<script data-cfasync="false">

		function uuidProfileCall() {
			var rootUrl = 'https://api.parsely.com/v2/profile?apikey=<?php echo esc_html( $parsely_options['apikey'] ); ?>';
			var uuid = '&uuid=' + PARSELY.config.parsely_site_uuid;
			var requestUrl = rootUrl + uuid + '&url=' + window.location.href;
			jQuery.ajax({
				url: requestUrl,
				dataType: "jsonp"
			});
		}

		if (typeof PARSELY == 'object') {
			var oldonload = PARSELY.onload;
			if (typeof PARSELY.onload != 'function') {
				PARSELY.onload = uuidProfileCall
			}
			else {
				PARSELY.onload = function () {
					if (oldonload) {
						oldonload();
					}
					uuidProfileCall();
				};
			}
		}

		else {
			PARSELY = {
				onload: uuidProfileCall
			}
		}
	</script>
<?php endif; ?>

<script data-cfasync="false" id="parsely-cfg" data-parsely-site="<?php echo esc_attr( $parsely_options['apikey'] ); ?>" src="//cdn.parsely.com/keys/<?php echo esc_attr( $parsely_options['apikey'] ); ?>/p.js"></script>

<!-- END Parse.ly Include: Standard -->
