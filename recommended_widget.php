<?php

class Parsely_Recommended_Widget extends WP_Widget {
	public function __construct() {
		$widget_options = array(
			'classname'   => 'Parsely_Recommended_Widget',
			'description' => 'Parsely recommendation widget',
		);
		parent::__construct( 'Parsely_Recommended_Widget', 'Parsely Recommended Widget', $widget_options );
	}

	public function widget( $args, $instance ) {
		$title = apply_filters( 'widget_title', $instance['title'] );

		$instance['display_options'] = ! empty( $instance['display_options'] ) ? $instance['display_options'] : array();
		echo esc_html( $args['before_widget'] . $args['before_title'] . $title . $args['after_title'] ); ?>

		<?php
		// set up variables
		$options = get_option( 'parsely' );
		if ( array_key_exists( 'apikey', $options ) && array_key_exists( 'api_secret', $options ) && ! empty( $options['api_secret'] ) ) {
			$root_url       = 'https://api.parsely.com/v2/related?apikey=' . $options['apikey'];
			$pub_date_start = '&pub_date_start=' . $instance['published_within'] . 'd';
			$sort           = '&sort=' . $instance['sort'];
			$boost          = '&boost=' . $instance['boost'];
			$limit          = '&limit=' . $instance['return_limit'];
			$url            = '&url=' . get_permalink();
			$full_url       = $root_url . $sort . $boost . $limit;

			if ( ! $instance['personalize_results'] ) {
				$full_url .= $url;
			}

			if ( 0 !== (int) $instance['published_within'] ) {
				$full_url .= $pub_date_start;
			}
			?>
			<script>
				var parsely_results = [];
				// regex stolen from Mozilla's docs
				var uuid = document.cookie.replace(/(?:(?:^|.*;\s*)_parsely_visitor\s*\=\s*([^;]*).*$)|^.*$/, "$1");
				var full_url = <?php echo esc_attr( $full_url ); ?>;

				if ( JSON.parse(<?php echo esc_attr( $instance['personalize_results'] ); ?> ) && uuid ) {
					full_url += '&uuid=';
					full_url += uuid;

				}
				else {
					full_url += '&url=';
					full_url += <?php echo esc_attr( $url ); ?>;

				}
				var outerDiv = jQuery('<div>').addClass('parsely-recommendation-widget');
				var outerList = jQuery('<ul>').addClass('parsely-recommended-widget');
				jQuery.getJSON( full_url, function (data) {
					jQuery.each(data, function(key, value) {
						var widgetEntry = jQuery('<li>')
							.addClass(parsely-recommended-widget-entry)
							.attr('id', 'parsely-recommended-widget-item' + key);
						<?php
						if ( in_array( 'display_thumbnail', $instance['display_options'] ) ) {
						?>
						var thumbnailImage = jQuery('<img>').attr('src', value['thumb_url_medium']);
						<?php
						}
						?>
						var authorDiv = jQuery('<div>').addClass('parsely-title-author-wrapper');
						var postLink = jQuery('<a>').attr('href', value['url']).text(value['title']);
						var authorLink = jQuery('<a>').attr('href', value['url']).text(value['author']);

						// set up the rest of entry
						authorDiv.append(postLink);
						authorDiv.append(authorLink);
						widgetEntry.append(thumbnailImage);
						widgetEntry.append(authorDiv);
						outerList.append(widgetEntry);
					});
					outerDiv.append(outerList);
				});


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
		echo esc_html( $args['after_widget'] );
	}

	public function form( $instance ) {
		// editable fields: title
		$title               = ! empty( $instance['title'] ) ? $instance['title'] : '';
		$return_limit        = ! empty( $instance['return_limit'] ) ? $instance['return_limit'] : 5;
		$published_within    = ! empty( $instance['published_within'] ) ? $instance['published_within'] : 0;
		$sort                = ! empty( $instance['sort'] ) ? $instance['sort'] : 'score';
		$boost               = ! empty( $instance['boost'] ) ? $instance['boost'] : 'views';
		$personalize_results = ! empty( $instance['personalize_results'] ) ? $instance['personalize_results'] : false;

		$instance['return_limit']        = $return_limit;
		$instance['published_within']    = $published_within;
		$instance['sort']                = $sort;
		$instance['boost']               = $boost;
		$instance['personalize_results'] = $personalize_results;
		$instance['display_options']     = ! empty( $instance['display_options'] ) ? $instance['display_options'] : array();

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
				<option <?php selected( $instance['boost'], $boost_param ); ?> value=" <?php echo esc_attr( $boost_param ); ?>"><?php echo esc_attr( $boost_param ); ?></option>
			<?php } ?>
			</select>

		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'display_options' ) ); ?>">Display Options</label>
			<br>
			<select multiple="multiple" id="<?php echo esc_attr( $this->get_field_id( 'display_options' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'display_options' ) ); ?>[]" class="widefat" style="width:33%;">
				<option
					<?php
					if ( in_array( 'display_author', $instance['display_options'], true ) ) {
						echo 'selected="selected"';
					};
				?>
						value="display_author">Display Author</option>
				<option
					<?php
					if ( in_array( 'display_thumbnail', $instance['display_options'], true ) ) {
						echo 'selected="selected"';
					};
					?>
						value="display_thumbnail">Display Thumbnail</option>
			</select>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'personalize_results' ) ); ?>">Personalize Recommended Results:</label>
			<br>
			<input type="checkbox" id="<?php echo esc_attr( $this->get_field_id( 'personalize_results' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'personalize_results' ) ); ?>" value="personalize_results" <?php checked( $instance['personalize_results'], 'personalize_results' ); ?> />
		</p>



		<?php
	}

	public function update( $new_instance, $old_instance ) {
		$instance                        = $old_instance;
		$instance['title']               = strip_tags( $new_instance['title'] );
		$instance['published_within']    = (int) $new_instance['published_within'];
		$instance['return_limit']        = (int) $new_instance['return_limit'] <= 20 ? $new_instance['return_limit'] : '20';
		$instance['sort']                = $new_instance['sort'];
		$instance['boost']               = $new_instance['boost'];
		$instance['display_options']     = esc_sql( $new_instance['display_options'] );
		$instance['personalize_results'] = $new_instance['personalize_results'];
		return $instance;
	}
}



function parsely_recommended_widget_register() {
	register_widget( 'Parsely_Recommended_Widget' );
}

add_action( 'widgets_init', 'parsely_recommended_widget_register' );
