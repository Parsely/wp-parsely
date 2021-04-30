<?php

namespace Parsely\Tests;

class TestUtils {
	public static function set_options( $custom_options = array() ) {
		static $option_defaults = array(
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
		update_option( \Parsely::OPTIONS_KEY, array_merge( $option_defaults, $custom_options ) );
	}
}
