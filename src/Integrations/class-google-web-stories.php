<?php
/**
 * Google Web Stories integration class
 *
 * @package Parsely\Integrations
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely\Integrations;

use Parsely\Parsely;

/**
 * Integrates Parse.ly tracking with the Google Web Stories plugin.
 *
 * @since 3.2.0
 */
final class Google_Web_Stories implements Integration {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		$this->parsely = $parsely;
	}

	/**
	 * Apply the hooks that integrate the plugin or theme with the Parse.ly plugin.
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	public function integrate(): void {
		if ( defined( 'WEBSTORIES_PLUGIN_FILE' ) ) {
			add_action( 'web_stories_print_analytics', array( $this, 'render_amp_analytics_tracker' ) );
		}
	}

	/**
	 * Load additional JavaScript for Google's Web Stories WordPress plugin. This relies on the `amp-analytics` element.
	 * See more at: https://www.parse.ly/help/integration/google-amp.
	 *
	 * @since 3.2.0
	 *
	 * @return void
	 */
	public function render_amp_analytics_tracker(): void {
		?>
		<amp-analytics type="parsely">
			<script type="application/json">
				{
					"vars": {
						"apikey": "<?php echo esc_js( $this->parsely->get_api_key() ); ?>"
					}
				}
			</script>
		</amp-analytics>
		<?php
	}
}
