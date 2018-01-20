<!-- BEGIN wp-parsely Plugin Version <?php echo esc_html( Parsely::VERSION ); ?> -->
<meta name='wp-parsely_version' id='wp-parsely_version' content='<?php echo esc_html( Parsely::VERSION ); ?>'/>
<?php if ( ! empty( $parsely_page ) && isset( $parsely_page['headline'] ) ) : ?>
	<script type="application/ld+json">
	<?php echo json_encode( $parsely_page ); ?>

	</script>
	<?php if ( isset( $parsely_page['custom_metadata'] ) ) : ?>
		<meta name='parsely-metadata' content='<?php echo json_encode( $parsely_page['custom_metadata'] ); ?>'>
	<?php endif; ?>
<?php else : ?>
	<!-- parsleyPage is not defined / has no attributes.  What kind of page are you loading? -->
<?php endif; ?>
<!-- END wp-parsely Plugin Version <?php echo esc_html( Parsely::VERSION ); ?> -->
<?php
