<?php
/**
 * The wp-parsely Recommendations Block entry file.
 *
 * @package Parsely
 */

// Source the Block class.
require __DIR__ . '/class-parsely-recommendations-block.php';

// Hook into the `init` action.
add_action( 'init', 'Parsely_Recommendations_Block::init' );
