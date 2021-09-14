<?php
/**
 * Parse.ly repeated meta elements output
 *
 * @package      Parsely\wp-parsely
 * @author       Parse.ly
 * @copyright    2012 Parse.ly
 * @license      GPL-2.0-or-later
 */

foreach ($metas as $key => $val) {
	if ( ! empty( $val ) && is_string( $val ) ) {
		echo '<meta name="parsely-' . $key . '" content="' . esc_attr( $val ) .'" />' . "\n";
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
