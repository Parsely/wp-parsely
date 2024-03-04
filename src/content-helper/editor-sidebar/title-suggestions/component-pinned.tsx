/**
 * WordPress dependencies
 */
import { Panel, PanelBody } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Telemetry } from '../../../js/telemetry/telemetry';
import { TitleSuggestionsSettings } from '../../common/settings';
import { TitleSuggestion } from './component-title-suggestion';
import { Title, TitleType } from './store';

/**
 * Props for the Pinned Title Suggestions component.
 *
 * @since 3.14.0
 */
type PinnedTitleSuggestionsProps = {
	pinnedTitles: Title[];
	isOpen: boolean;
	onSettingChange: ( key: keyof TitleSuggestionsSettings, value: string|boolean ) => void;
	originalTitle: Title|undefined;
};

/**
 * Renders the Pinned Title Suggestions panel.
 *
 * @since 3.14.0
 *
 * @param {PinnedTitleSuggestionsProps} props The component's props.
 */
export const PinnedTitleSuggestions = ( {
	pinnedTitles,
	isOpen,
	onSettingChange,
}: Readonly<PinnedTitleSuggestionsProps> ): JSX.Element => {
	const [ isCollapsed, setIsCollapsed ] = useState<boolean>( isOpen );

	const toggleCollapse = () => {
		setIsCollapsed( ! isCollapsed );
		onSettingChange( 'PinnedOpen', ! isCollapsed );
		Telemetry.trackEvent( 'title_suggestions_pinned_toggle', {
			isOpen: ! isCollapsed,
			pinnedTitles: pinnedTitles.length,
		} );
	};

	return (
		<Panel className="wp-parsely-pinned-suggestions">
			<PanelBody
				className="pinned-suggestions-body"
				title={ __( 'Pinned Suggestions', 'wp-parsely' ) }
				onToggle={ toggleCollapse }
				opened={ isCollapsed }>
				{ pinnedTitles.map( ( title ) => (
					<TitleSuggestion
						key={ title.title }
						title={ title }
						type={ TitleType.PostTitle }
					/>
				) ) }
			</PanelBody>
		</Panel>
	);
};
