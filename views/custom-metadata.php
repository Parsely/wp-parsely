<?php
/**
 * Views: Parse.ly custom metadata output
 *
 * @package   Parsely\wp-parsely
 * @copyright 2012 Parse.ly
 * @license   GPL-2.0-or-later
 */

declare(strict_types=1);

namespace Parsely;

?>
<meta name="parsely-metadata" content="<?php echo esc_attr( $metadata['custom_metadata'] ); ?>" />
