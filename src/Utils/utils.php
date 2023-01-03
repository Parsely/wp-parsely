<?php
/**
 * Util Functions.
 *
 * To enforce typing on commonly used functions.
 *
 * @package Parsely
 * @since   3.7.0
 */

declare(strict_types=1);

namespace Parsely\Utils;

use WP_Post;
use WP_Error;

const WP_MAX_POSTS_PER_PAGE = 999;
const DATE_UTC_FORMAT       = 'Y-m-d';
const DATE_TIME_UTC_FORMAT  = 'Y-m-d\TH:i:s';

/**
 * Get UTC Date.
 *
 * @since 3.7.0
 *
 * @param int $days Number of Days before or after the current date.
 *
 * @return string
 */
function get_utc_date( int $days = 0 ): string {
	if ( 0 === $days ) {
		$utc_date = gmdate( DATE_UTC_FORMAT );
	} else {
		$utc_date = gmdate( DATE_UTC_FORMAT, (int) strtotime( "{$days} days" ) );
	}

	return $utc_date;
}

/**
 * Get default category.
 *
 * @since 3.7.0
 *
 * @return int
 */
function get_default_category(): int {
	/**
	 * Variable.
	 * 
	 * @var string
	 */
	$default_category = get_option( 'default_category' );

	return (int) $default_category;
}

/**
 * Get option `page_for_posts`.
 *
 * @since 3.7.0
 *
 * @param bool $default Default Value.
 *
 * @return int|WP_Post
 */
function get_page_for_posts( $default = false ) {
	/**
	 * Variable.
	 * 
	 * @var int|WP_Post
	 */
	return get_option( 'page_for_posts', $default );
}

/**
 * Get option `page_on_front`.
 *
 * @since 3.7.0
 *
 * @return bool
 */
function get_page_on_front() {
	/**
	 * Variable.
	 * 
	 * @var bool
	 */
	return get_option( 'page_on_front' );
}

/**
 * Get 'string' query variable from WP_Query class.
 *
 * @since 3.7.0
 *
 * @param string $var Variable key to retrieve.
 *
 * @return string
 */
function get_string_query_var( $var ): string {
	/**
	 * Variable.
	 * 
	 * @var string
	 */
	return get_query_var( $var );
}

/**
 * Get 'int' query variable from WP_Query class.
 *
 * @since 3.7.0
 *
 * @param string $var Variable key to retrieve.
 *
 * @return int
 */
function get_int_query_var( $var ): int {
	/**
	 * Variable.
	 * 
	 * @var int
	 */
	return get_query_var( $var );
}

/**
 * Get site date format.
 *
 * @since 3.7.0
 */
function get_date_format(): string {
	/**
	 * Variable.
	 *
	 * @var string
	 */
	return get_option( 'date_format' );
}

/**
 * Get site time format.
 *
 * @since 3.7.0
 */
function get_time_format(): string {
	/**
	 * Variable.
	 *
	 * @var string
	 */
	return get_option( 'time_format' );
}

/**
 * Convert to associate array.
 *
 * @since 3.7.0
 *
 * @param mixed $obj Input object.
 *
 * @return array<string, mixed>|WP_Error
 */
function convert_to_associate_array( $obj ) {
	$encoded = wp_json_encode( $obj );

	if ( false === $encoded ) {
		return new WP_Error( 400, __( 'Unable to encode API response for associative array', 'wp-parsely' ) );
	}

	$decoded = json_decode( $encoded, true );

	/**
	 * Variable.
	 *
	 * @var array<string, mixed>
	 */
	return $decoded;
}
