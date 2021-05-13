<?php

class Parsely_Recommended_Content {
	const RELATED_API_ENDPOINT = 'https://api.parsely.com/v2/related';

	/**
	 * Get the URL for the Recommendation API (GET /related).
	 *
	 * @see https://www.parse.ly/help/api/recommendations#get-related
	 *
	 * @since 2.5.0
	 *
	 * @param string $api_key          Publisher Site ID (API key).
	 * @param int    $published_within Publication filter start date; see https://www.parse.ly/help/api/time for
	 *                                 formatting details. No restriction by default.
	 * @param string $sort             What to sort the results by. There are currently 2 valid options: `score`, which
	 *                                 will sort articles by overall relevance and `pub_date` which will sort results by
	 *                                 their publication date. The default is `score`.
	 * @param string $boost            Available for sort=score only. Sub-sort value to re-rank relevant posts that
	 *                                 received high e.g. views; default is undefined.
	 * @param int    $return_limit     Number of records to retrieve; defaults to "10".
	 * @return string API URL.
	 */
	static function get_api_url( $api_key, $published_within, $sort, $boost, $return_limit ) {
		$query_args = array(
			'apikey' => $api_key,
			'sort'   => $sort,
			'limit'  => $return_limit,
		);

		if ( 'score' === $sort && $boost !== 'no-boost' ) {
			$query_args['boost'] = $boost;
		}

		if ( 0 !== (int) $published_within ) {
			$query_args['pub_date_start'] = $published_within . 'd';
		}

		return add_query_arg( $query_args, self::RELATED_API_ENDPOINT );
	}

	static function api_key_and_secret_are_populated() {
		$options = get_option( 'parsely' ); // TODO: Use the API instead of directly getting the option

		// No options are saved, so API key is not available.
		if ( ! is_array( $options ) ) {
			return false;
		}

		// Parse.ly Site ID settings field is not populated.
		if ( ! array_key_exists( 'apikey', $options ) || $options['apikey'] === '' ) {
			return false;
		}

		// Parse.ly API Secret settings field is not populated.
		if ( ! array_key_exists( 'api_secret', $options ) || $options['api_secret'] === '' ) {
			return false;
		}

		return true;
	}

	static function get_boost_params() {
		return array(
			'no-boost'              => __( 'No boost', 'wp-parsely' ),
			'views'                 => __( 'Page views', 'wp-parsely' ),
			'mobile_views'          => __( 'Page views on mobile devices', 'wp-parsely' ),
			'tablet_views'          => __( 'Page views on tablet devices', 'wp-parsely' ),
			'desktop_views'         => __( 'Page views on desktop devices', 'wp-parsely' ),
			'visitors'              => __( 'Unique page visitors, total', 'wp-parsely' ),
			'visitors_new'          => __( 'New visitors', 'wp-parsely' ),
			'visitors_returning'    => __( 'Returning visitors', 'wp-parsely' ),
			'engaged_minutes'       => __( 'Total engagement time in minutes', 'wp-parsely' ),
			'avg_engaged'           => __( 'Engaged minutes spent by total visitors', 'wp-parsely' ),
			'avg_engaged_new'       => __( 'Average engaged minutes spent by new visitors', 'wp-parsely' ),
			'avg_engaged_returning' => __( 'Average engaged minutes spent by returning visitors', 'wp-parsely' ),
			'social_interactions'   => __( 'Total for Facebook, Twitter, LinkedIn, and Pinterest', 'wp-parsely' ),
			'fb_interactions'       => __( 'Count of Facebook shares, likes, and comments', 'wp-parsely' ),
			'tw_interactions'       => __( 'Count of Twitter tweets and retweets', 'wp-parsely' ),
			'li_interactions'       => __( 'Count of LinkedIn social interactions', 'wp-parsely' ),
			'pi_interactions'       => __( 'Count of Pinterest pins', 'wp-parsely' ),
			'social_referrals'      => __( 'Page views where the referrer was any social network', 'wp-parsely' ),
			'fb_referrals'          => __( 'Page views where the referrer was facebook.com', 'wp-parsely' ),
			'tw_referrals'          => __( 'Page views where the referrer was twitter.com', 'wp-parsely' ),
			'li_referrals'          => __( 'Page views where the referrer was linkedin.com', 'wp-parsely' ),
			'pi_referrals'          => __( 'Page views where the referrer was pinterest.com', 'wp-parsely' ),
		);
	}
}
