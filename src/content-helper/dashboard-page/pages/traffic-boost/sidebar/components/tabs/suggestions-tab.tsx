/**
 * WordPress dependencies
 */
import { Button, PanelBody, PanelRow } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { update } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { TrafficBoostLink, TrafficBoostProvider } from '../../../provider';
import { TrafficBoostStore } from '../../../store';
import { AddNewLinkButton } from '../add-new-link-button';
import { LinksList } from '../links-list/links-list';
import { HydratedPost } from '../../../../../../common/base-wordpress-provider';

/**
 * Component that renders the suggestions settings.
 *
 * @since 3.18.0
 */
const SuggestionsSettings = (): React.JSX.Element => {
	return (
		<div className="traffic-boost-suggestions-settings">
			<PanelBody
				title={ __( 'Filters', 'wp-parsely' ) }
				initialOpen={ false }
			>
				<PanelRow>
					<div>
						<div>
							<p>{ __( 'Adjust parameters used to generate suggestions.', 'wp-parsely' ) }</p>
						</div>
					</div>
				</PanelRow>
			</PanelBody>
			<PanelBody
				title={ __( 'Advanced Settings', 'wp-parsely' ) }
				initialOpen={ false }
			>
				<PanelRow>
					<div>
						<div>
							{ __( 'Scope suggestions based on content attributes or Parse.ly smart tags.', 'wp-parsely' ) }
						</div>
					</div>
				</PanelRow>
			</PanelBody>
		</div>
	);
};

/**
 * Defines the props structure for SuggestionsTab.
 *
 * @since 3.18.0
 */
interface SuggestionsTabProps {
	onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;
}

/**
 * Component that renders the suggestions tab.
 *
 * @since 3.18.0
 *
 * @param {SuggestionsTabProps} props Component props.
 */
const SuggestionsTab = ( {
	onSuggestionClick,
}: SuggestionsTabProps ): React.JSX.Element => {
	const trafficBoostProvider = TrafficBoostProvider.getInstance();

	const { selectedLink, suggestions, currentPage, itemsPerPage } = useSelect( ( select ) => ( {
		selectedLink: select( TrafficBoostStore ).getSelectedLink(),
		suggestions: select( TrafficBoostStore ).getSuggestions(),
		currentPage: select( TrafficBoostStore ).getSuggestionsPage(),
		itemsPerPage: select( TrafficBoostStore ).getSuggestionsItemsPerPage(),
	} ), [] );

	const {
		setSuggestionsPage,
		setSuggestionsItemsPerPage,
		addSuggestion,
		updateSuggestion,
	} = useDispatch( TrafficBoostStore );

	const addTrafficBoostLink = async ( post: HydratedPost ) => {
		const trafficBoostLink = trafficBoostProvider.createSuggestion( post );
		addSuggestion( trafficBoostLink );

		// Generate the placement for the suggestion.
		const updatedLink = await trafficBoostProvider.generateSuggestionForPost( trafficBoostLink );
		updateSuggestion( updatedLink );
	};

	return (
		<>
			<SuggestionsSettings />
			<LinksList
				links={ suggestions }
				onClick={ onSuggestionClick }
				activeLink={ selectedLink?.isSuggestion ? selectedLink : null }
				currentPage={ currentPage }
				itemsPerPage={ itemsPerPage }
				onPageChange={ setSuggestionsPage }
				onItemsPerPageChange={ setSuggestionsItemsPerPage }
			>
				<Button
					icon={ update }
					variant="secondary"
					className="traffic-boost-add-suggestion"
				>
					{ __( 'Generate', 'wp-parsely' ) }
				</Button>
				<AddNewLinkButton
					suggestions={ suggestions }
					onPostClick={ addTrafficBoostLink }
				/>
			</LinksList>
		</>
	);
};

export default SuggestionsTab;
