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
import { HydratedPost } from '../../../../../../common/base-wordpress-provider';
import { TrafficBoostLink, TrafficBoostProvider } from '../../../provider';
import { TrafficBoostStore } from '../../../store';
import { AddNewLinkButton } from '../add-new-link-button';
import { LinksList } from '../links-list/links-list';

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
 * Defines the props structure for GenerateButton.
 *
 * @since 3.18.0
 */
interface GenerateButtonProps {
	variant: 'primary' | 'secondary' | 'tertiary';
	isGeneratingSuggestions: boolean;
	handleGenerateSuggestions: () => void;
}

/**
 * Component that renders the generate button.
 *
 * @since 3.18.0
 *
 * @param {GenerateButtonProps} props The component's props.
 */
const GenerateButton = ( {
	variant,
	isGeneratingSuggestions,
	handleGenerateSuggestions,
}: GenerateButtonProps ): React.JSX.Element => (
	<Button
		icon={ update }
		variant={ variant }
		isBusy={ isGeneratingSuggestions }
		disabled={ isGeneratingSuggestions }
		className="traffic-boost-add-suggestion"
		onClick={ handleGenerateSuggestions }
	>
		{ isGeneratingSuggestions ? __( 'Generating…', 'wp-parsely' ) : __( 'Generate', 'wp-parsely' ) }
	</Button>
);

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
 * @param {SuggestionsTabProps} props The component's props.
 */
const SuggestionsTab = ( {
	onSuggestionClick,
}: SuggestionsTabProps ): React.JSX.Element => {
	const trafficBoostProvider = TrafficBoostProvider.getInstance();

	const {
		currentPost,
		selectedLink,
		suggestions,
		currentPage,
		itemsPerPage,
		isGeneratingSuggestions,
	} = useSelect( ( select ) => ( {
		currentPost: select( TrafficBoostStore ).getCurrentPost(),
		selectedLink: select( TrafficBoostStore ).getSelectedLink(),
		suggestions: select( TrafficBoostStore ).getSuggestions(),
		currentPage: select( TrafficBoostStore ).getSuggestionsPage(),
		itemsPerPage: select( TrafficBoostStore ).getSuggestionsItemsPerPage(),
		isGeneratingSuggestions: select( TrafficBoostStore ).isGeneratingSuggestions(),
	} ), [] );

	const {
		setSuggestionsPage,
		setSuggestionsItemsPerPage,
		addSuggestion,
		setSuggestions,
		updateSuggestion,
		setIsGeneratingSuggestions,
		setIsGenerating,
	} = useDispatch( TrafficBoostStore );

	/**
	 * Adds a Traffic Boost link suggestion to the current post.
	 *
	 * @since 3.18.0
	 *
	 * @param {HydratedPost} post The post that will be added to the suggestion list.
	 */
	const addTrafficBoostLink = async ( post: HydratedPost ) => {
		const trafficBoostLink = trafficBoostProvider.createSuggestion( post );
		await addSuggestion( trafficBoostLink );
		await setIsGenerating( trafficBoostLink, true );

		// Generate the placement for the suggestion.
		const updatedLink = await trafficBoostProvider.generateSuggestionForPost( trafficBoostLink );
		await updateSuggestion( updatedLink );
		setTimeout( () => {
			setIsGenerating( trafficBoostLink, false );
		}, 1000 );
	};

	/**
	 * Handles the generation of suggestions.
	 *
	 * @since 3.18.0
	 */
	const handleGenerateSuggestions = async () => {
		if ( ! currentPost ) {
			return;
		}

		setIsGeneratingSuggestions( true );
		const generatedSuggestions = await trafficBoostProvider.generateSuggestions( currentPost );

		setSuggestions( generatedSuggestions );
		setIsGeneratingSuggestions( false );
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
				renderEmptyState={ () => (
					<div className="traffic-boost-suggestions-empty-state">
						<p>{ __( 'This post has no suggestions. Do you want to generate some?', 'wp-parsely' ) }</p>
						<GenerateButton
							variant="primary"
							isGeneratingSuggestions={ isGeneratingSuggestions }
							handleGenerateSuggestions={ handleGenerateSuggestions }
						/>
					</div>
				) }
			>
				<GenerateButton
					variant="secondary"
					isGeneratingSuggestions={ isGeneratingSuggestions }
					handleGenerateSuggestions={ handleGenerateSuggestions }
				/>
				<AddNewLinkButton
					disabled={ isGeneratingSuggestions }
					suggestions={ suggestions }
					onPostClick={ addTrafficBoostLink }
				/>
			</LinksList>
		</>
	);
};

export default SuggestionsTab;
