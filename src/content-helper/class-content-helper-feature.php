<?php
/**
 * Content Helper: Base class for all Content Helper features
 *
 * @package Parsely
 * @since   3.9.0
 */

declare(strict_types=1);

namespace Parsely\Content_Helper;

/**
 * Base class for all Content Helper features.
 *
 * @since 3.9.0
 */
abstract class Content_Helper_Feature {
	/**
	 * Returns the global Content Helper filter name. The global filter controls
	 * the enabled/disabled state of all Content Helper features.
	 *
	 * @since 3.9.0
	 *
	 * @return string The filter name.
	 */
	final public static function get_global_filter_name(): string {
		return 'wp_parsely_enable_content_helper';
	}

	/**
	 * Returns the feature's filter name. The feature filter controls the
	 * enabled/disabled state of a particular Content Helper feature.
	 *
	 * @since 3.9.0
	 *
	 * @return string The filter name.
	 */
	abstract public static function get_feature_filter_name(): string;

	/**
	 * Returns the feature's script ID.
	 *
	 * @since 3.9.0
	 *
	 * @return string The script ID.
	 */
	abstract public static function get_script_id(): string;

	/**
	 * Returns the feature's style ID.
	 *
	 * @since 3.9.0
	 *
	 * @return string The style ID.
	 */
	abstract public static function get_style_id(): string;

	/**
	 * Runs the feature's initialization process.
	 */
	abstract public function run(): void;

	/**
	 * Returns whether the feature should be enabled.
	 *
	 * @since 3.9.0
	 *
	 * @return bool Whether the feature should be enabled.
	 */
	abstract public function should_be_enabled(): bool;

	/**
	 * Examines the global and feature filter values, and returns whether the
	 * feature is considered to be enabled from a filter perspective.
	 *
	 * - By default (no filters are explicitly set), the value returns true.
	 * - If not set, the feature filter will take the global filter's value.
	 * - When explicitly set, the feature filter overrides the global filter.
	 * - Possible invalid filter values will resolve to false.
	 *
	 * @since 3.9.0
	 *
	 * @return bool Whether the feature is enabled by filters.
	 */
	protected function is_enabled_by_filters(): bool {
		// Get filter values.
		$global  = apply_filters( self::get_global_filter_name(), null ); // phpcs:ignore
		$feature = apply_filters( static::get_feature_filter_name(), null ); // phpcs:ignore

		// If not set, the feature filter will get its value from the global
		// filter.
		$global_filter_is_false = null !== $global && true !== $global;
		if ( null === $feature && $global_filter_is_false ) {
			return false;
		}

		// Feature filter has explicitly been set to a value different than true.
		$feature_filter_is_false = null !== $feature && true !== $feature;
		if ( $feature_filter_is_false ) {
			return false;
		}

		return true;
	}
}
