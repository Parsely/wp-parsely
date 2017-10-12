<?php

class parsely_recommended_widget extends WP_Widget
{
    public function __construct()
    {
        $widget_options = array(
            'classname' => 'parsely_recommended_widget',
            'description' => 'Parsely recommendation widget',
        );
        parent::__construct('parsely_recommended_widget', 'Parsely Recommended Widget', $widget_options);
    }

    public function widget( $args, $instance ) {
        $title = apply_filters( 'widget_title', $instance[ 'title' ] );
        $blog_title = get_bloginfo( 'name' );
        $tagline = get_bloginfo( 'description' );
        echo $args['before_widget'] . $args['before_title'] . $title . $args['after_title']; ?>

        <p><strong>Site Name:</strong> <?php echo $blog_title ?></p>
        <p><strong>Tagline:</strong> <?php echo $tagline ?></p>

        <?php echo $args['after_widget'];
    }

    public function form( $instance )
    {
        // editable fields: title
        $title = ! empty( $instance['title'] ) ? $instance['title'] : '';
        $return_limit = ! empty( $instance['return_limit'] ) ? $instance['return_limit'] : 5;
        $published_within = ! empty( $instance['published_within'] ) ? $instance['published_within'] : 0;
        $sort = ! empty( $instance['sort'] ) ? $instance['sort'] : 'score';
        $boost = ! empty( $instance['boost'] ) ? $instance['boost'] : 'views';
        $instance['return_limit'] = $return_limit;
        $instance['published_within'] = $published_within;
        $instance['sort'] = $sort;
        $instance['boost'] = $boost;
        $boost_params = array('views', 'mobile_views', 'tablet_views', 'desktop_views', 'visitors', 'visitors_new',
            'visitors_returning', 'engaged_minutes', 'avg_engaged', 'avg_engaged_new', 'avg_engaged_returning',
            'social_interactions', 'fb_interactions', 'tw_interactions', 'li_interactions', 'pi_interactions',
            'social_referrals', 'fb_referrals', 'tw_referrals', 'li_referrals', 'pi_referrals');
        ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>">Title:</label>
            <br>
            <input type="text" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'published_within' ); ?>">Published Within (0 for no limit):</label>
            <br>
            <input type="number" id="<?php echo $this->get_field_id('published_within'); ?>" name="<?php echo $this->get_field_name('published_within')?>" value="<?php echo (string) $instance['published_within'];?>" min="0" max="30"/>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'return_limit' ); ?>">Number of entries to return (Max 20): </label>
            <br>
            <input type="number" id="<?php echo $this->get_field_id('return_limit'); ?>" name="<?php echo $this->get_field_name('return_limit'); ?>" value="<?php echo (string) $instance['return_limit'];?>" min="1" max="20"/>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'sort' ); ?>">Sort By: </label>
            <br>
            <select id="<?php echo $this->get_field_id('sort'); ?>" name="<?php echo $this->get_field_name('sort'); ?>" class="widefat" style="width:33%;">
                <option <?php selected( $instance['sort'], 'score'); ?> value="score">score</option>
                <option <?php selected( $instance['sort'], 'pub_date'); ?> value="pub_date">pub_date</option>
            </select>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'boost' ); ?>">Boost By: </label>
            <br>
            <select id="<?php echo $this->get_field_id('boost'); ?>" name="<?php echo $this->get_field_name('boost'); ?>" class="widefat" style="width:50%;">
                <?php foreach($boost_params as $boost_param) { ?>
                <option <?php selected( $instance['boost'], $boost_param); ?> value="<?php echo $boost_param;?>"><?php echo $boost_param;?></option>
            <?php } ?>
            </select>
        </p>



        <?php
    }

    public function update($new_instance, $old_instance)
    {
        $instance = $old_instance;
        $instance[ 'title' ] = strip_tags( $new_instance[ 'title' ] );
        $instance['published_within'] = (int) $new_instance['published_within'];
        $instance['return_limit'] = (int) $new_instance['return_limit'] <= 20 ? $new_instance['return_limit'] <= 20 : '20';
        $instance['sort'] = $new_instance['sort'];
        $instance['boost'] = $new_instance['boost'];
        return $instance;
    }
}

function parsely_recommended_widget_register()
{
    register_widget('parsely_recommended_widget');
}

add_action('widgets_init', 'parsely_recommended_widget_register');