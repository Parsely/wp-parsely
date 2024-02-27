<?php
/**
 * Endpoints: Endpoint for saving and retrieving Content Helper Sidebar
 * settings
 *
 * @package Parsely
 * @since   3.13.0
 */

declare(strict_types=1);

namespace Parsely\Endpoints\User_Meta;

/**
 * Endpoint for saving and retrieving Content Helper Sidebar settings.
 *
 * @since 3.13.0
 *
 * @phpstan-import-type Subvalue_Spec from Base_Endpoint_User_Meta
 */
final class Editor_Sidebar_Settings_Endpoint extends Base_Endpoint_User_Meta {
	protected const ENDPOINT = '/user-meta/content-helper/editor-sidebar-settings';

	/**
	 * Returns the meta entry's key.
	 *
	 * @since 3.13.0
	 *
	 * @return string The meta entry's key.
	 */
	protected function get_meta_key(): string {
		return 'parsely_content_helper_settings_editor_sidebar';
	}

	/**
	 * Returns the endpoint's subvalues specifications.
	 *
	 * @since 3.13.0
	 *
	 * @return array<string, Subvalue_Spec>
	 */
	protected function get_subvalues_specs(): array {
		return array(
			'InitialTabName'               => array(
				'values'  => array( 'tools', 'performance' ),
				'default' => 'tools',
			),
			'RelatedPostsFilterBy'         => array(
				'values'  => array( 'unavailable', 'tag', 'section', 'author' ),
				'default' => 'unavailable',
			),
			'RelatedPostsFilterValue'      => array(
				'values'  => array(),
				'default' => '',
			),
			'RelatedPostsMetric'           => array(
				'values'  => array( 'views', 'avg_engaged' ),
				'default' => 'views',
			),
			'RelatedPostsOpen'             => array(
				'values'  => array( true, false ),
				'default' => false,
			),
			'RelatedPostsPeriod'           => array(
				'values'  => array( '10m', '1h', '2h', '4h', '24h', '7d', '30d' ),
				'default' => '7d',
			),
			'SmartLinkingMaxLinks'         => array(
				'values'  => array(),
				'default' => 10,
			),
			'SmartLinkingMaxLinkWords'     => array(
				'values'  => array(),
				'default' => 4,
			),
			'SmartLinkingOpen'             => array(
				'values'  => array( true, false ),
				'default' => false,
			),
			'SmartLinkingSettingsOpen'     => array(
				'values'  => array( true, false ),
				'default' => false,
			),
			'TitleSuggestionsOpen'         => array(
				'values'  => array( true, false ),
				'default' => false,
			),
			'TitleSuggestionsPersona'      => array(
				'values'  => array(),
				'default' => 'journalist',
			),
			'TitleSuggestionsSettingsOpen' => array(
				'values'  => array( true, false ),
				'default' => false,
			),
			'TitleSuggestionsTone'         => array(
				'values'  => array(),
				'default' => 'neutral',
			),
		);
	}
}
