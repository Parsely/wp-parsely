import { Panel, PanelBody } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { TitleSuggestion } from './component-title-suggestion';
import { Title, TitleType } from './store';

type PinnedTitleSuggestionsProps = {
	pinnedTitles: Title[];
	originalTitle: Title|undefined;
};

export const PinnedTitleSuggestions = ( {
	pinnedTitles,
}: Readonly<PinnedTitleSuggestionsProps> ): JSX.Element => {
	const [ isCollapsed, setIsCollapsed ] = useState<boolean>( true );

	const toggleCollapse = () => {
		setIsCollapsed( ! isCollapsed );
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
