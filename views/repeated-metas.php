<?php
/**
 * Parse.ly repeated meta elements output
 *
 * @package      Parsely\wp-parsely
 * @author       Parse.ly
 * @copyright    2012 Parse.ly
 * @license      GPL-2.0-or-later
 */

// phpcs:disable Generic.WhiteSpace.ScopeIndent
if ( ! empty( $parsely_page['headline'] ) && is_string( $parsely_page['headline'] ) ) : ?>
<meta name="parsely-title" content="<?php echo esc_attr( $parsely_page['headline'] ); ?>" />
<?php
endif;
if ( ! empty( $parsely_page['url'] && is_string( $parsely_page['url'] ) ) ) :
?>
<meta name="parsely-link" content="<?php echo esc_attr( isset( $parsely_page['url'] ) ? $parsely_page['url'] : '' ); ?>" />
<?php
endif;
if ( ! empty( $parsely_post_type ) && is_string( $parsely_post_type ) ) :
?>
<meta name="parsely-type" content="<?php echo esc_attr( isset( $parsely_post_type ) ? $parsely_post_type : '' ); ?>" />
<?php
endif;
if ( ! empty( $parsely_page['thumbnailUrl'] ) && is_string( $parsely_page['thumbnailUrl'] ) ) :
?>
<meta name="parsely-image-url" content="<?php echo esc_attr( isset( $parsely_page['thumbnailUrl'] ) ? $parsely_page['thumbnailUrl'] : '' ); ?>" />
<?php
endif;
if ( ! empty( $parsely_page['datePublished'] ) && is_string( $parsely_page['datePublished'] ) ) :
?>
<meta name="parsely-pub-date" content="<?php echo esc_attr( isset( $parsely_page['datePublished'] ) ? $parsely_page['datePublished'] : '' ); ?>" />
<?php
endif;
if ( ! empty( $parsely_page['articleSection'] ) && is_string( $parsely_page['articleSection'] ) ) :
?>
<meta name="parsely-section" content="<?php echo esc_attr( isset( $parsely_page['articleSection'] ) ? $parsely_page['articleSection'] : '' ); ?>" />
<?php
endif;
if ( ! empty( $parsely_page['keywords'] ) && is_string( $parsely_page['keywords'] ) ) :
?>
<meta name="parsely-tags" content="<?php echo esc_attr( isset( $parsely_page['keywords'] ) ? $parsely_page['keywords'] : '' ); ?>" />
<?php
endif;

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
