<?php
/**
 * Uninstall script for wp-parsely. It deletes the `parsely` option on the database
 *
 * @since 3.0.0
 */

declare(strict_types=1);

// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) {
	die;
}

$option_name = 'parsely';

delete_option($option_name);

// for site options in Multisite
delete_site_option($option_name);
