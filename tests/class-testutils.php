<?php

namespace Parsely\Tests;

class TestUtils {
	const DEFAULT_OPTIONS = array(
		'apikey'                    => 'blog.parsely.com',
		'content_id_prefix'         => '',
		'use_top_level_cats'        => false,
		'cats_as_tags'              => false,
		'track_authenticated_users' => true,
		'custom_taxonomy_section'   => 'category',
		'lowercase_tags'            => true,
		'track_post_types'          => array( 'post' ),
		'track_page_types'          => array( 'page' ),
	);

	public static function set_options( $custom_options = array() ) {
		update_option( \Parsely::OPTIONS_KEY, array_merge( self::DEFAULT_OPTIONS, $custom_options ) );
	}
}
