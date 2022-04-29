<?php
/**
 * Views: Parse.ly JSON-LD output
 *
 * @package   Parsely\wp-parsely
 * @license   GPL-2.0-or-later
 */

declare(strict_types=1);

namespace Parsely;

?>
<script type="application/ld+json">
<?php echo wp_json_encode( $metadata ) . "\n"; ?>
</script>
