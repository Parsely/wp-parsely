<?php
/**
 * Settings file
 *
 * Create the settings page for parse.ly
 *
 * @category   Components
 * @package    WordPress
 * @subpackage Parse.ly
 */

/* translators: %s: Plugin version */
$version_string = sprintf( __( 'Version %s', 'wp-parsely' ), $this::VERSION );
?>

<div class="wrap">
	<h1 class="wp-heading-inline"><?php echo esc_html( get_admin_page_title() ); ?></h1> <span id="wp-parsely_version"><?php echo esc_html( $version_string ); ?></span>
	<div id="wp-parsely-react-entrypoint"></div>
</div>
