<!-- wp-parsely Plugin Version <?php echo Parsely::$VERSION; ?> -->
<meta name='wp-parsely_version' id='wp-parsely_version' content='<?php echo Parsely::$VERSION; ?>' />
<?php if (!empty($parselyPage)) : ?>
<meta name='parsely-page' id='parsely-page' content='<?php echo json_encode($parselyPage); ?>' />
<?php else: ?>
<!-- parsleyPage is not defined / has no attributes.  What kind of page are you loading? -->
<?php endif; ?>