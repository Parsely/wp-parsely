<?php
/**
 * Parsely_Recommended_Content class file.
 *
 * @package Parsely
 * @since 3.2.0
 */

declare(strict_types=1);

namespace Parsely\Recommendations;

/**
 * Parsely_Recommended_Content
 *
 * @since 3.2.0
 */
class Parsely_Recommended_Content {
	const RELATED_API_ENDPOINT = 'https://api.parsely.com/v2/related';

	/**
	 * Get the URL for the Recommendation API (GET /related).
	 *
	 * @see https://www.parse.ly/help/api/recommendations#get-related
	 *
	 * @since 2.6.0
	 *
	 * @param string $api_key          Publisher Site ID (API key).
	 * @param int    $published_within TODO, from Gary: Needs something in here to indicate that this is the number of days.
	 *                                 Publication filter start date; see https://www.parse.ly/help/api/time for
	 *                                 formatting details. No restriction by default.
	 * @param string $sort             What to sort the results by. There are currently 2 valid options: `score`, which
	 *                                 will sort articles by overall relevance and `pub_date` which will sort results by
	 *                                 their publication date. The default is `score`.
	 * @param string $boost            Available for sort=score only. Sub-sort value to re-rank relevant posts that
	 *                                 received high e.g. views; default is undefined.
	 * @param int    $return_limit     Number of records to retrieve; defaults to "10".
	 * @return string API URL.
	 */
	public static function get_api_url( $api_key, $published_within, $sort, $boost, $return_limit ) {
		$query_args = array(
			'apikey' => $api_key,
			'sort'   => $sort,
			'limit'  => $return_limit,
		);

		if ( 'score' === $sort && 'no-boost' !== $boost ) {
			$query_args['boost'] = $boost;
		}

		if ( 0 !== (int) $published_within ) {
			$query_args['pub_date_start'] = $published_within . 'd';
		}

		return add_query_arg( $query_args, self::RELATED_API_ENDPOINT );
	}
}
