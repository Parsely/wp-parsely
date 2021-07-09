<?php
/**
 * The wp-parsely Recommendations Block entry file.
 *
 * @package Parsely
 */

require __DIR__ . '/class-parsely-recommendations-block.php';

add_action( 'init', 'Parsely_Recommendations_Block::init' );
