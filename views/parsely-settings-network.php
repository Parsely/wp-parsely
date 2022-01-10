<?php
/**
 * Network settings file.
 *
 * Create the network settings page for Parse.ly.
 *
 * @package Parsely\wp-parsely
 * @author Parse.ly
 */

declare(strict_types=1);

namespace Parsely;

/* translators: %s: Plugin version */
$parsely_version_string = sprintf( __( 'Version %s', 'wp-parsely' ), Parsely::VERSION );
?>

<div class="wrap">
	<h1 class="wp-heading-inline"><?php echo esc_html( get_admin_page_title() ); ?></h1>
	<span id="wp-parsely_version"><?php echo esc_html( $parsely_version_string ); ?></span>

	<?php var_dump($parsely_network_sites); ?>
</div>
