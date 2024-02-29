/**
 * WordPress dependencies
 */
import { Button, Notice, PanelRow } from '@wordpress/components';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import { createInterpolateElement, useEffect, useState } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import { external, Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { Telemetry } from '../../../js/telemetry/telemetry';
import { PersonaProp, getPersonaLabel } from '../../common/components/persona-selector';
import { ToneProp, getToneLabel } from '../../common/components/tone-selector';
import { ContentHelperError } from '../../common/content-helper-error';
import { SidebarSettings, useSettings } from '../../common/settings';
import { PinnedTitleSuggestions } from './component-pinned';
import { TitleSuggestionsSettings } from './component-settings';
import { TitleSuggestion } from './component-title-suggestion';
import { TitleSuggestionsProvider } from './provider';
import { TitleStore, TitleType } from './store';
import './title-suggestions.scss';

/**
 * Title Suggestions Panel.
 *
 * @since 3.12.0
 *
 * @return {JSX.Element} The Title Suggestions Panel.
 */
export const TitleSuggestionsPanel = (): JSX.Element => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	const [ error, setError ] = useState<ContentHelperError>();
	const [ tone, setTone ] = useState<ToneProp>( settings.TitleSuggestionsTone );
	const [ persona, setPersona ] = useState<PersonaProp>( settings.TitleSuggestionsPersona );

	const {
		loading,
		titles,
		pinnedTitles,
		allTitles,
		acceptedTitle,
		originalTitle,
	} = useSelect( ( select ) => {
		const { isLoading,
			getTitles,
			getAcceptedTitle,
			getOriginalTitle,
		} = select( TitleStore );

		// eslint-disable-next-line @typescript-eslint/no-shadow
		const allTitles = getTitles( TitleType.PostTitle );

		return {
			acceptedTitle: getAcceptedTitle( TitleType.PostTitle ),
			loading: isLoading(),
			titles: allTitles.filter( ( title ) => ! title.isPinned ),
			pinnedTitles: allTitles.filter( ( title ) => title.isPinned ),
			allTitles,
			originalTitle: getOriginalTitle( TitleType.PostTitle ),
		};
	}, [] );

	const {
		setTitles,
		setLoading,
		setAcceptedTitle,
		setOriginalTitle,
	} = useDispatch( TitleStore );

	const onSettingChange = ( key: keyof SidebarSettings, value: string | boolean ) => {
		setSettings( { [ key ]: value } );
	};

	const currentPostContent = useSelect( ( select ) => {
		const { getEditedPostContent } = select( 'core/editor' ) as GutenbergFunction;
		return getEditedPostContent();
	}, [] );

	const currentPostTitle = useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' ) as GutenbergFunction;
		return getEditedPostAttribute( 'title' );
	}, [] );

	const generateTitles = async (
		titleType: TitleType,
		content: string,
		selectedTone: ToneProp,
		selectedPersona: PersonaProp,
	): Promise<void> => {
		await setLoading( true );

		const provider = new TitleSuggestionsProvider();

		try {
			const genTitles = await provider.generateTitles( content, 3, selectedTone, selectedPersona );
			await setTitles( titleType, genTitles );
		} catch ( err: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			setError( err );
			setTitles( titleType, [] );
		}

		await setLoading( false );
	};

	const generateOnClickHandler = async () => {
		setError( undefined );
		if ( false === loading ) {
			Telemetry.trackEvent( 'title_suggestions_generate_pressed', {
				request_more: titles.length > 0,
				total_titles: titles.length,
				total_pinned: titles.filter( ( title ) => title.isPinned ).length,
				tone,
				persona,
			} );

			// Generate titles based on the current post content.
			await generateTitles(
				TitleType.PostTitle,
				currentPostContent,
				tone,
				persona
			);
		}
	};

	const saveTitleOnClickHandler = async () => {

	};

	/**
	 * Handle the accepted title change.
	 *
	 * @since 3.14.0
	 */
	useEffect( () => {
		if ( ! acceptedTitle ) {
			return;
		}

		console.log( 'acceptedTitle', acceptedTitle );

		// Save the original title.
		setOriginalTitle( TitleType.PostTitle, currentPostTitle );

		// Set the post title to the accepted title.
		dispatch( 'core/editor' ).editPost( { title: acceptedTitle?.title } );

		// Pin the accepted title on the list of generated titles.
		if ( acceptedTitle ) {
			dispatch( TitleStore ).pinTitle( TitleType.PostTitle, acceptedTitle );
			Telemetry.trackEvent( 'title_suggestions_accept_pressed', {
				old_title: currentPostTitle,
				new_title: acceptedTitle.title,
			} );
		}

		// Remove the accepted title
		setAcceptedTitle( TitleType.PostTitle, undefined );
	}, [ acceptedTitle, currentPostTitle, setAcceptedTitle, setOriginalTitle ] );

	const parselyAISettings = <TitleSuggestionsSettings
		isLoading={ loading }
		isOpen={ settings.TitleSuggestionsSettingsOpen }
		onPersonaChange={ ( selectedPersona ) => {
			onSettingChange( 'TitleSuggestionsPersona', selectedPersona );
			setPersona( selectedPersona );
		} }
		onSettingChange={ onSettingChange }
		onToneChange={ ( selectedTone ) => {
			onSettingChange( 'TitleSuggestionsTone', selectedTone );
			setTone( selectedTone );
		} }
		persona={ settings.TitleSuggestionsPersona }
		tone={ settings.TitleSuggestionsTone }
	/>;

	const generateTitleButton: JSX.Element = (
		<div className="title-suggestions-generate">
			<Button
				variant="primary"
				isBusy={ loading }
				disabled={ loading || tone === 'custom' || persona === 'custom' }
				onClick={ generateOnClickHandler }
			>
				{ loading && __( 'Generating Titles…', 'wp-parsely' ) }
				{ ! loading && allTitles.length > 0 && __( 'Generate More', 'wp-parsely' ) }
				{ ! loading && allTitles.length === 0 && __( 'Generate Titles', 'wp-parsely' ) }
			</Button>
		</div>
	);

	const titleSuggestionList: JSX.Element = (
		<div className="wp-parsely-title-suggestions-container">
			{ ( originalTitle !== undefined ) && (
				<TitleSuggestion title={ originalTitle } type={ TitleType.PostTitle } isOriginal={ true } />
			) }

			{ titles.map( ( title ) => (
				<TitleSuggestion
					key={ title.id }
					title={ title }
					type={ TitleType.PostTitle } // Specify that the title is a post title.
				/>
			) ) }
		</div>
	);

	// TODO: remove
	const acceptedTitleElement: JSX.Element = (
		<div className="parsely-write-titles-accepted-title-container">
			<div className="title-suggestions-header">
				{ __(
					'Replace the current post title with the following?',
					'wp-parsely'
				) }
			</div>
			<div className="parsely-write-titles-accepted-title">{ acceptedTitle?.title }</div>
			<div className="parsely-write-titles-accepted-title-actions">
				<Button
					variant="secondary"
					onClick={ () => {
						setAcceptedTitle( TitleType.PostTitle, undefined );
						Telemetry.trackEvent( 'title_suggestions_cancel_pressed', {
							original_title: currentPostTitle,
							canceled_title: acceptedTitle?.title ?? '',
						} );
					} }
				>
					{ __( 'Cancel', 'wp-parsely' ) }
				</Button>
				<Button
					variant="primary"
					onClick={ saveTitleOnClickHandler }
				>
					{ __( 'Replace', 'wp-parsely' ) }
				</Button>
			</div>
		</div>
	);

	return (
		<PanelRow>
			<div className="wp-parsely-title-suggestions-wrapper">
				<div className="title-suggestions-header">
					{ __(
						'Use Parse.ly AI to generate a title for your post.',
						'wp-parsely'
					) }
					<Button
						href="https://docs.parse.ly/plugin-content-helper/#h-title-suggestions-beta"
						target="_blank"
						variant="link"
					>
						{ __( 'Learn more about Parse.ly AI', 'wp-parsely' ) }
						<Icon
							icon={ external }
							size={ 18 }
							className="parsely-external-link-icon"
						/>
					</Button>
				</div>
				{ error && (
					<Notice status="info" isDismissible={ false } className="wp-parsely-content-helper-error">
						{ error.message }
					</Notice>
				) }
				{ 0 < allTitles.length && (
					<>
						{ error && (
							<Notice status="info" isDismissible={ false } className="wp-parsely-content-helper-error">
								{ error.message }
							</Notice>
						) }
						{ pinnedTitles.length > 0 && (
							<PinnedTitleSuggestions
								pinnedTitles={ pinnedTitles }
								originalTitle={ originalTitle }
							/>
						) }
						{ titleSuggestionList }
					</>
				) }
				{ parselyAISettings }
				{ generateTitleButton }
			</div>
		</PanelRow>
	);
};

