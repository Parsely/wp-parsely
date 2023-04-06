<?php
/**
 * Integration Tests: Base class for all Content Helper feature tests
 *
 * @package Parsely\Tests
 * @since   3.9.0
 */

declare(strict_types=1);

namespace Parsely\Tests\ContentHelper;

use Parsely\Tests\Integration\TestCase;
use Parsely\Content_Helper\Content_Helper_Feature;

/**
 * Base class for all Content Helper feature integration tests.
 */
abstract class ContentHelperFeatureTest extends TestCase {
	/**
	 * Sets the global and feature filters according to the passed values.
	 *
	 * Note: Passing null for a filter will not set it.
	 *
	 * @since 3.9.0
	 *
	 * @param string $feature_filter The feature filter to be set.
	 * @param mixed  $global_filter_value The global filter value.
	 * @param mixed  $feature_filter_value The feature filter value.
	 */
	protected static function set_filters( string $feature_filter, $global_filter_value, $feature_filter_value ): void {
		remove_all_filters( Content_Helper_Feature::get_global_filter_name() );
		remove_all_filters( $feature_filter );

		// Global filter.
		if ( null !== $global_filter_value ) {
			add_filter(
				Content_Helper_Feature::get_global_filter_name(),
				function() use ( $global_filter_value ) {
					return $global_filter_value;
				}
			);
		}

		// Feature filter.
		if ( null !== $feature_filter_value ) {
			add_filter(
				$feature_filter,
				function() use ( $feature_filter_value ) {
					return $feature_filter_value;
				}
			);
		}
	}
}
