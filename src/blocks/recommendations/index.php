<?php
/**
 * The wp-parsely Recommendations Block entry file.
 *
 * @package Parsely
 */

if ( version_compare( $wp_version, '5.6' ) < 0 ) {
	// WordPress is not recent enough to run this block.
	return;
}

require __DIR__ . '/class-parsely-recommendations-block.php';
require __DIR__ . '/class-parsely-recommendations-block-api.php';

add_action( 'init', 'Parsely_Recommendations_Block::register_block_and_assets' );
add_action( 'rest_api_init', array( 'Parsely_Recommendations_Block_API', 'rest_api_init' ) );
