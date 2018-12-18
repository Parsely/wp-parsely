<?php
/**
 * Parsely Page file
 *
 * This creates a page with parse.ly meta data and tracking
 *
 * @category   Components
 * @package    WordPress
 * @subpackage Parse.ly
 */

?>

<!-- BEGIN wp-parsely Plugin Version <?php echo esc_html( Parsely::VERSION ); ?> -->
<meta name="wp-parsely_version" id="wp-parsely_version" content="<?php echo esc_attr( Parsely::VERSION ); ?>"/>
<?php if ( ! empty( $parsely_page ) && isset( $parsely_page['headline'] ) ) : ?>
	<?php
	if ( 'json_ld' === $parsely_options['meta_type'] ) {
		?>
		<script type="application/ld+json">
		<?php echo wp_json_encode( $parsely_page ); ?>

		</script>

		<?php
	} else {
			$parsely_post_type = 'NewsArticle' === $parsely_page['@type'] ? 'post' : 'sectionpage';
		?>
			<meta name="parsely-title" content="<?php echo esc_attr( $parsely_page['headline'] ); ?>"/>
			<meta name="parsely-link" content="<?php echo esc_attr( $parsely_page['url'] ); ?>"/>
			<meta name="parsely-type" content="<?php echo esc_attr( $parsely_post_type ); ?>"/>
			<meta name="parsely-image-url" content="<?php echo esc_attr( $parsely_page['thumbnailUrl'] ); ?>"/>
			<meta name="parsely-pub-date" content="<?php echo esc_attr( $parsely_page['datePublished'] ); ?>"/>
			<meta name="parsely-section" content="<?php echo esc_attr( $parsely_page['articleSection'] ); ?>"/>
		<?php
		foreach ( $parsely_page['author'] as $author ) {
			?>
		<meta name="parsely-author" content="<?php echo esc_attr( $author['name'] ); ?>"/>
			<?php
		}
		?>
	<meta name="parsely-tags" content="<?php echo esc_attr( implode( ',', $parsely_page['keywords'] ) ); ?>"/>

		<?php

	}
	if ( isset( $parsely_page['custom_metadata'] ) ) :
		?>
			<meta name="parsely-metadata" content="<?php echo esc_attr( $parsely_page['custom_metadata'] ); ?>"/>
		<?php endif; ?>
	<?php else : ?>
		<!-- parsleyPage is not defined / has no attributes.  What kind of page are you loading? -->
	<?php endif; ?>
<!-- END wp-parsely Plugin Version <?php echo esc_html( Parsely::VERSION ); ?> -->
<?php
