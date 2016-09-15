add_action( 'pre_amp_render_post', 'parsely_amp_add_actions' );
function parsely_add_amp_actions() {
    add_filter( 'amp_post_template_analytics', 'parsely_amp_add_analytics' );
}

function parsely_amp_add_analytics( $analytics ) {
    global $parsely;
    $parsely_options = $parsely->get_options();

    if ( empty( $parsely_options['apikey'] ) ) {
        return $analytics;
    }

    $analytics['wp-parsely'] = array(
        'type' => 'parsely',
        'attributes' => array(),
        'config_data' => array(
            'vars' => array(
                'apikey' => $parsely_options['apikey'],
            )
        ),
    );

    return $analytics;
}
