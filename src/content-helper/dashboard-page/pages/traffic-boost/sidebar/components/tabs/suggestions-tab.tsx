/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { TrafficBoostLink } from '../../../provider';
import { TrafficBoostStore } from '../../../store';
import { LinksList } from '../links-list/links-list';
import { Button, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';

import { plus, update } from '@wordpress/icons';

/**
 * Defines the props structure for SuggestionsTab.
 *
 * @since 3.18.0
 */
interface SuggestionsTabProps {
	onSuggestionClick?: ( suggestion: TrafficBoostLink ) => void;
}

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
 * Component that renders the suggestions tab.
 *
 * @since 3.18.0
 *
 * @param {SuggestionsTabProps} props Component props.
 */
const SuggestionsTab = ( {
	onSuggestionClick,
}: SuggestionsTabProps ): React.JSX.Element => {
	const { selectedLink, suggestions, currentPage, itemsPerPage } = useSelect( ( select ) => ( {
		selectedLink: select( TrafficBoostStore ).getSelectedLink(),
		suggestions: select( TrafficBoostStore ).getSuggestions(),
		currentPage: select( TrafficBoostStore ).getSuggestionsPage(),
		itemsPerPage: select( TrafficBoostStore ).getSuggestionsItemsPerPage(),
	} ), [] );

	const { setSuggestionsPage, setSuggestionsItemsPerPage } = useDispatch( TrafficBoostStore );
	const { createNotice } = useDispatch( noticesStore );

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
				<Button
					icon={ plus }
					variant="secondary"
					className="traffic-boost-add-suggestion"
					onClick={ () => {
						createNotice( 'success', 'Hello', {
							type: 'snackbar',
							explicitDismiss: true,
						} );
					} }
				>
					{ __( 'Add', 'wp-parsely' ) }
				</Button>
			</LinksList>
		</>
	);
};

export default SuggestionsTab;
