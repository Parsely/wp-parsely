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
		echo $args['before_widget'] . $args['before_title'] . $title . $args['after_title'];

		// set up variables
		$options = get_option( 'parsely' );
		if ( array_key_exists( 'apikey', $options ) && array_key_exists( 'api_secret', $options ) && ! empty( $options['api_secret'] ) ) {
			$root_url       = 'https://api.parsely.com/v2/related?apikey=' . $options['apikey'];
			$pub_date_start = '&pub_date_start=' . $instance['published_within'] . 'd';
			$sort           = '&sort=' . trim( $instance['sort'] );
			// No idea why boost is coming back with a space prepended: I've trimmed it everywhere I possibly could
			// Trimming here too to avoid it ruining the query
			$boost          = '&boost=' . trim( $instance['boost'] );
			$limit          = '&limit=' . $instance['return_limit'];
			$full_url       = $root_url . $sort . $boost . $limit;

			if ( 0 !== (int) $instance['published_within'] ) {
				$full_url .= $pub_date_start;
			}
			?>
			<script>
				var parsely_results = [];
				// regex stolen from Mozilla's docs
				uuid = false;
				var cookieVal = document.cookie.replace(/(?:(?:^|.*;\s*)_parsely_visitor\s*\=\s*([^;]*).*$)|^.*$/, "$1");
				if ( cookieVal ) {
					var uuid = JSON.parse(unescape(cookieVal))['id'];
				}
				var full_url = '<?php echo $full_url; ?>';
				var personalized = new Boolean(<?php echo esc_attr( $instance['personalize_results'] ); ?>);
				if ( personalized && uuid ) {
					full_url += '&uuid=';
					full_url += uuid;

				}
				else {
					full_url += '&url=';
					full_url += '<?php echo  esc_url( get_permalink() ); ?>';

				}
				var parentDivClass = '<?php echo esc_attr( $this->id ); ?>';
				var outerDiv = jQuery('<div>').addClass('parsely-recommendation-widget').appendTo('#' + parentDivClass);
				var outerList = jQuery('<ul>').addClass('parsely-recommended-widget').appendTo(outerDiv);
				jQuery.getJSON( full_url, function (data) {
					jQuery.each(data.data, function(key, value) {
						jQuery('#parent').html('<li class="parsely-recommended-widget-entry" ')
						var widgetEntry = jQuery('<li>')
							.addClass('parsely-recommended-widget-entry')
							.attr('id', 'parsely-recommended-widget-item' + key);
						<?php
						if ( in_array( 'display_thumbnail', $instance['display_options'], true ) ) {
						?>
						var thumbnailImage = jQuery('<img>').attr('src', value['thumb_url_medium']).appendTo(widgetEntry);
						<?php
						}
						?>
						var postLink = jQuery('<a>').attr('href', value['url']).text(value['title']);
						widgetEntry.append(postLink);

						<?php
						if ( in_array( 'display_author', $instance['display_options'], true ) ) {
							?>
							console.log('is this firing');
							var authorDiv = jQuery('<div>').addClass('parsely-title-author-wrapper');
							var authorLink = jQuery('<a>').attr('href', value['url']).text(value['author']);
							authorDiv.append(authorLink);
							widgetEntry.append(authorDiv);
							<?php
						}
							?>



						// set up the rest of entry
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
		echo $args['after_widget'];
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
				<option <?php selected( $instance['boost'], $boost_param ); ?> value="<?php echo esc_attr( $boost_param ); ?>"><?php echo esc_attr( $boost_param ); ?></option>
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
		$instance['title']               = trim( strip_tags( $new_instance['title'] ) );
		$instance['published_within']    = (int) trim( $new_instance['published_within'] );
		$instance['return_limit']        = (int) $new_instance['return_limit'] <= 20 ? $new_instance['return_limit'] : '20';
		$instance['sort']                = trim( $new_instance['sort'] );
		$instance['boost']               = trim( $new_instance['boost'] );
		$instance['display_options']     = esc_sql( $new_instance['display_options'] );
		$instance['personalize_results'] = $new_instance['personalize_results'];
		return $instance;
	}
}



function parsely_recommended_widget_register() {
	register_widget( 'Parsely_Recommended_Widget' );
}

add_action( 'widgets_init', 'parsely_recommended_widget_register' );
