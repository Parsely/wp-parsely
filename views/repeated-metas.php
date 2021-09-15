<?php
/**
 * Parse.ly repeated meta elements output
 *
 * @package      Parsely\wp-parsely
 * @author       Parse.ly
 * @copyright    2012 Parse.ly
 * @license      GPL-2.0-or-later
 */

foreach ( $parsely_metas as $parsely_meta_key => $parsely_meta_val ) {
	if ( ! empty( $parsely_meta_val ) && is_string( $parsely_meta_val ) ) {
		printf(
			'<meta name="%s" content="%s" />',
			esc_attr( 'parsely-' . $parsely_meta_key ),
			esc_attr( $parsely_meta_val )
		) . "\n";
	}
}

if ( isset( $parsely_page['author'] ) ) {
	foreach ( (array) $parsely_page['author'] as $parsely_author ) {
		if ( empty( $parsely_author['name'] ) || ! is_string( $parsely_author['name'] ) ) {
			continue;
		}
		?>
<meta name="parsely-author" content="<?php echo esc_attr( $parsely_author['name'] ); ?>" />
		<?php
	}
}
