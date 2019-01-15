<?php
/**
 * Recommended Widget file
 *
 * This provides a widget to put on a page, will have parsely recommended articles
 *
 * @category   Components
 * @package    WordPress
 * @subpackage Parse.ly
 */

/**
 * This is the class for the recommended widget
 *
 * @category   Class
 * @package    Parsely_Recommended_Widget
 */
class Parsely_Recommended_Widget extends WP_Widget {
	/**
	 * This is the constructor function
	 *
	 * @category   Function
	 * @package    WordPress
	 * @subpackage Parse.ly
	 */
	public function __construct() {
		$widget_options = array(
			'classname'   => 'Parsely_Recommended_Widget',
			'description' => 'Parsely recommendation widget',
		);
		parent::__construct( 'Parsely_Recommended_Widget', 'Parsely Recommended Widget', $widget_options );
	}

	/**
	 * This is the widget function
	 *
	 * @category   Function
	 * @package    WordPress
	 * @subpackage Parse.ly
	 * @param array $args Widget Arguments.
	 * @param array $instance Values saved to the db.
	 */
	public function widget( $args, $instance ) {
		$title = apply_filters( 'widget_title', $instance['title'] );

		$allowed_tags = wp_kses_allowed_html( 'post' );
		$title_html   = $args['before_widget'] . $args['before_title'] . $title . $args['after_title'];
		echo wp_kses( $title_html, $allowed_tags );

		// Set up the variables.
		$options = get_option( 'parsely' );
		if ( is_array( $options ) && array_key_exists( 'apikey', $options ) && array_key_exists( 'api_secret', $options ) && ! empty( $options['api_secret'] ) ) {
			$root_url       = 'https://api.parsely.com/v2/related?apikey=' . esc_attr( $options['apikey'] );
			$pub_date_start = '&pub_date_start=' . $instance['published_within'] . 'd';
			$sort           = '&sort=' . trim( $instance['sort'] );
			// No idea why boost is coming back with a space prepended: I've trimmed it everywhere I possibly could.
			// Trimming here too to avoid it ruining the query.
			$boost    = '&boost=' . trim( $instance['boost'] );
			$limit    = '&limit=' . $instance['return_limit'];
			$full_url = $root_url . $sort . $boost . $limit;

			if ( 0 !== (int) $instance['published_within'] ) {
				$full_url .= $pub_date_start;
			}
			?>
			<script data-cfasync="false">
				// adapted from https://stackoverflow.com/questions/7486309/how-to-make-script-execution-wait-until-jquery-is-loaded

				function defer(method) {
					if (window.jQuery) {
						method();
					} else {
						setTimeout(function() { defer(method); }, 50);
					}
				}

				function widgetLoad() {
					var parsely_results = [];

					uuid = false;
					// regex stolen from Mozilla's docs
					var cookieVal = document.cookie.replace(/(?:(?:^|.*;\s*)_parsely_visitor\s*\=\s*([^;]*).*$)|^.*$/, "$1");
					if ( cookieVal ) {
						var uuid = JSON.parse(unescape(cookieVal))['id'];
					}

					var full_url = '<?php echo esc_js( esc_url_raw( $full_url ) ); ?>';

					var img_src = "<?php echo ( isset( $instance['img_src'] ) ? esc_js( $instance['img_src'] ) : null ); ?>";

					var display_author = "<?php echo ( isset( $instance['display_author'] ) ? wp_json_encode( boolval( $instance['display_author'] ) ) : false ); ?>";

					var display_direction = "<?php echo ( isset( $instance['display_direction'] ) ? esc_js( $instance['display_direction'] ) : null ); ?>";

					var itm_medium = "site_widget";
					var itm_source = "parsely_recommended_widget";

					var personalized = "<?php echo wp_json_encode( boolval( $instance['personalize_results'] ) ); ?>";
					if ( personalized && uuid ) {
						full_url += '&uuid=';
						full_url += uuid;

					}
					else {
						full_url += '&url=';
						full_url += '<?php echo wp_json_encode( esc_url_raw( get_permalink() ) ); ?>';

					}
					var parentDiv = jQuery.find('#<?php echo esc_attr( $this->id ); ?>');
					if (parentDiv.length === 0) {
						parentDiv = jQuery.find('.Parsely_Recommended_Widget');
					}
					// make sure page is not attempting to load widget twice in the same spot
					if (jQuery(parentDiv).find("div.parsely-recommendation-widget").length != 0) {
						return;
					}

					var outerDiv = jQuery('<div>').addClass('parsely-recommendation-widget').appendTo(parentDiv);
					if (img_src !== 'none') {
						outerDiv.addClass('display-thumbnail');
					}
					if (display_direction) {
						outerDiv.addClass('list-' + display_direction);
					}

					var outerList = jQuery('<ul>').addClass('parsely-recommended-widget').appendTo(outerDiv);
					jQuery.getJSON( full_url, function (data) {
						jQuery.each(data.data, function(key, value) {
							var widgetEntry = jQuery('<li>')
								.addClass('parsely-recommended-widget-entry')
								.attr('id', 'parsely-recommended-widget-item' + key);

							var textDiv = jQuery('<div>').addClass('parsely-text-wrapper');

							if (img_src === 'parsely_thumb') {
								jQuery('<img>').attr('src', value['thumb_url_medium']).appendTo(widgetEntry);
							}
							else if (img_src === 'original') {
								jQuery('<img>').attr('src', value['image_url']).appendTo(widgetEntry);
							}

							var cmp_cmp = '?itm_campaign=<?php echo esc_attr( $this->id ); ?>';
							var cmp_med = '&itm_medium=' + itm_medium;
							var cmp_src = '&itm_source=' + itm_source;
							var cmp_con = '&itm_content=widget_item-' + key;
							var itm_link = value['url'] + cmp_cmp + cmp_med + cmp_src + cmp_con;

							var postTitle = jQuery('<div>').attr('class', 'parsely-recommended-widget-title');
							var postLink = jQuery('<a>').attr('href', itm_link).text(value['title']);
							postTitle.append(postLink);
							textDiv.append(postTitle);

							if ( display_author ) {
								var authorLink = jQuery('<div>').attr('class', 'parsely-recommended-widget-author').text(value['author']);
								textDiv.append(authorLink);
							}

							widgetEntry.append(textDiv);



							// set up the rest of entry
							outerList.append(widgetEntry);
						});
						outerDiv.append(outerList);
					});

				}
				defer(widgetLoad);


			</script>
			<?php
		} else {
			?>
			<p>
			you must set the Parsely API Secret for this widget to work!
			</p>
			<?php
		}

		?>


		<?php
		echo wp_kses( $args['after_widget'], $allowed_tags );
	}

	/**
	 * Migrates previous display_options settings
	 *
	 * @category   Function
	 * @package    WordPress
	 * @subpackage Parse.ly
	 * @param array $instance Values saved to the db.
	 */
	private function migrate_old_fields( $instance ) {
		if ( ! empty( $instance['display_options'] ) && is_array( $instance['display_options'] ) ) {
			if ( empty( $instance['img_src'] ) ) {
				$instance['img_src'] = in_array( 'display_thumbnail', $instance['display_options'], true ) ? 'parsely_thumb' : 'none';
			}

			if ( empty( $instance['display_author'] ) ) {
				$instance['display_author'] = in_array( 'display_author', $instance['display_options'], true );
			}
		}
	}


	/**
	 * This is the form function
	 *
	 * @category   Function
	 * @package    WordPress
	 * @subpackage Parse.ly
	 * @param array $instance Values saved to the db.
	 */
	public function form( $instance ) {
		$this->migrate_old_fields( $instance );

		// editable fields: title.
		$title               = ! empty( $instance['title'] ) ? $instance['title'] : '';
		$return_limit        = ! empty( $instance['return_limit'] ) ? $instance['return_limit'] : 5;
		$display_direction   = ! empty( $instance['display_direction'] ) ? $instance['display_direction'] : 'vertical';
		$published_within    = ! empty( $instance['published_within'] ) ? $instance['published_within'] : 0;
		$sort                = ! empty( $instance['sort'] ) ? $instance['sort'] : 'score';
		$boost               = ! empty( $instance['boost'] ) ? $instance['boost'] : 'views';
		$personalize_results = ! empty( $instance['personalize_results'] ) ? $instance['personalize_results'] : false;
		$img_src             = ! empty( $instance['img_src'] ) ? $instance['img_src'] : 'parsely_thumb';
		$display_author      = ! empty( $instance['display_author'] ) ? $instance['display_author'] : false;

		$instance['return_limit']        = $return_limit;
		$instance['display_direction']   = $display_direction;
		$instance['published_within']    = $published_within;
		$instance['sort']                = $sort;
		$instance['boost']               = $boost;
		$instance['personalize_results'] = $personalize_results;
		$instance['img_src']             = $img_src;
		$instance['display_author']      = $display_author;

		$boost_params = array(
			'views',
			'mobile_views',
			'tablet_views',
			'desktop_views',
			'visitors',
			'visitors_new',
			'visitors_returning',
			'engaged_minutes',
			'avg_engaged',
			'avg_engaged_new',
			'avg_engaged_returning',
			'social_interactions',
			'fb_interactions',
			'tw_interactions',
			'li_interactions',
			'pi_interactions',
			'social_referrals',
			'fb_referrals',
			'tw_referrals',
			'li_referrals',
			'pi_referrals',
		);
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">Title:</label>
			<br>
			<input type="text" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'published_within' ) ); ?>">Published Within ( 0 for no limit ):</label>
			<br>
			<input type="number" id="<?php echo esc_attr( $this->get_field_id( 'published_within' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'published_within' ) ); ?>" value="<?php echo esc_attr( (string) $instance['published_within'] ); ?>" min="0" max="30"/>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'return_limit' ) ); ?>">Number of entries to return ( Max 20 ): </label>
			<br>
			<input type="number" id="<?php echo esc_attr( $this->get_field_id( 'return_limit' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'return_limit' ) ); ?>" value="<?php echo esc_attr( (string) $instance['return_limit'] ); ?>" min="1" max="20"/>
		</p>
		<p>
			<label>List Entries: </label>
			<br>
			<input type="radio" id="<?php echo esc_attr( $this->get_field_id( 'display_direction' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'display_direction' ) ); ?>" <?php checked( $instance['display_direction'], 'horizontal' ); ?> value="horizontal" />
			<label for="horizontal">horizontally</label>
			<br>
			<input type="radio" id="<?php echo esc_attr( $this->get_field_id( 'display_direction' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'display_direction' ) ); ?>" <?php checked( $instance['display_direction'], 'vertical' ); ?> value="vertical" />
			<label for="vertical">vertically</label>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'sort' ) ); ?>">Sort By: </label>
			<br>
			<select id="<?php echo esc_attr( $this->get_field_id( 'sort' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'sort' ) ); ?>" class="widefat" style="width:33%;">
				<option <?php selected( $instance['sort'], 'score' ); ?> value="score">score</option>
				<option <?php selected( $instance['sort'], 'pub_date' ); ?> value="pub_date">pub_date</option>
			</select>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'boost' ) ); ?>">Boost By: </label>
			<br>
			<select id="<?php echo esc_attr( $this->get_field_id( 'boost' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'boost' ) ); ?>" class="widefat" style="width:50%;">
				<?php foreach ( $boost_params as $boost_param ) { ?>
				<option <?php selected( $instance['boost'], $boost_param ); ?> value="<?php echo esc_attr( $boost_param ); ?>"><?php echo esc_attr( $boost_param ); ?></option>
			<?php } ?>
			</select>

		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'img_src' ) ); ?>">Image Source: </label>
			<br>
			<select id="<?php echo esc_attr( $this->get_field_id( 'img_src' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'img_src' ) ); ?>" class="widefat" style="width:70%;">
				<option <?php selected( $instance['img_src'], 'parsely_thumb' ); ?> value="parsely_thumb">Parse.ly generated thumbnail (85x85px)</option>
				<option <?php selected( $instance['img_src'], 'original' ); ?> value="original">Original image</option>
				<option <?php selected( $instance['img_src'], 'none' ); ?> value="none">No image</option>
			</select>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'display_author' ) ); ?>">Display Author:</label>
			<br>
			<input type="checkbox" id="<?php echo esc_attr( $this->get_field_id( 'display_author' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'display_author' ) ); ?>" value="display_author" <?php checked( $instance['display_author'], 'display_author' ); ?> />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'personalize_results' ) ); ?>">Personalize Recommended Results:</label>
			<br>
			<input type="checkbox" id="<?php echo esc_attr( $this->get_field_id( 'personalize_results' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'personalize_results' ) ); ?>" value="personalize_results" <?php checked( $instance['personalize_results'], 'personalize_results' ); ?> />
		</p>



		<?php
	}

	/**
	 * This is the update function
	 *
	 * @category   Function
	 * @package    WordPress
	 * @subpackage Parse.ly
	 * @param array $new_instance The new values for the db.
	 * @param array $old_instance Values saved to the db.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance                        = $old_instance;
		$instance['title']               = trim( wp_strip_all_tags( $new_instance['title'] ) );
		$instance['published_within']    = (int) trim( $new_instance['published_within'] );
		$instance['return_limit']        = (int) $new_instance['return_limit'] <= 20 ? $new_instance['return_limit'] : '20';
		$instance['display_direction']   = trim( $new_instance['display_direction'] );
		$instance['sort']                = trim( $new_instance['sort'] );
		$instance['boost']               = trim( $new_instance['boost'] );
		$instance['display_author']      = $new_instance['display_author'];
		$instance['personalize_results'] = $new_instance['personalize_results'];
		$instance['img_src']             = trim( $new_instance['img_src'] );
		return $instance;
	}
}


/**
 * This is the registration function
 *
 * @category   Function
 * @package    WordPress
 * @subpackage Parse.ly
 */
function parsely_recommended_widget_register() {
	register_widget( 'Parsely_Recommended_Widget' );
}

add_action( 'widgets_init', 'parsely_recommended_widget_register' );
