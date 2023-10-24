<?php

declare(strict_types=1);

namespace Parsely\RemoteAPI\ContentSuggestions;
use Parsely\RemoteAPI\Remote_API_Base;
use UnexpectedValueException;

class Content_Suggestions_Base_API extends Remote_API_Base {

	public const API_BASE_URL = 'http://api-recs-lb-267948692.us-east-1.elb.amazonaws.com';

	/**
	 * Returns the request's options for the remote API call.
	 *
	 * @return array<string, mixed> The array of options.
	 * @since 3.9.0
	 *
	 */
	protected function get_request_options(): array {
		return array(
			'headers'     => array('Content-Type' => 'application/json; charset=utf-8'),
			'data_format' => 'body',
			'timeout'     => 60,
			'body'        => "{}",
		);
	}

	/**
	 * Gets the URL for a particular Parse.ly API endpoint.
	 *
	 * @since 3.2.0
	 *
	 * @throws UnexpectedValueException If the endpoint constant is not defined.
	 * @throws UnexpectedValueException If the query filter constant is not defined.
	 *
	 * @param array<string, mixed> $query The query arguments to send to the remote API.
	 * @return string
	 */
	public function get_api_url( array $query ): string {
		//TODO: duplicated from parent class due to API URL differences
		if ( static::ENDPOINT === '' ) {
			throw new UnexpectedValueException( 'ENDPOINT constant must be defined in child class.' );
		}
		if ( static::QUERY_FILTER === '' ) {
			throw new UnexpectedValueException( 'QUERY_FILTER constant must be defined in child class.' );
		}

		$query['apikey'] = $this->parsely->get_site_id();
		if ( $this->parsely->api_secret_is_set() ) {
			$query['secret'] = $this->parsely->get_api_secret();
		}
		$query = array_filter( $query );

		// Sort by key so the query args are in alphabetical order.
		ksort( $query );

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.DynamicHooknameFound -- Hook names are defined in child classes.
		$query = apply_filters( static::QUERY_FILTER, $query );
		return add_query_arg( $query, self::API_BASE_URL . static::ENDPOINT );
	}

}
