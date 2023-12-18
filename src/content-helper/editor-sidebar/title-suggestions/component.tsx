/**
 * WordPress dependencies
 */
import { Button, PanelRow } from '@wordpress/components';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import { createInterpolateElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ContentHelperError } from '../../common/content-helper-error';
import { TitleSuggestion } from './component-title-suggestion';
import { WriteTitleProvider } from './provider';
import { TitleStore, TitleType } from './store';
import { GutenbergFunction } from './types';
import { Telemetry } from '../../../js/telemetry/telemetry';
import { TitleSuggestionsSettings } from './component-settings';
import { ToneProp, getLabel as getLabelForTone } from '../../common/components/tone-selector';
import { PersonaProp, getLabel as getLabelForPersona } from '../../common/components/persona-selector';

/**
 * Title Suggestions Panel.
 *
 * @since 3.12.0
 *
 * @return {JSX.Element} The Title Suggestions Panel.
 */
export const TitleSuggestionsPanel = (): JSX.Element => {
	const [ error, setError ] = useState<ContentHelperError>();

	const {
		loading,
		titles,
		acceptedTitle,
		originalTitle,
		tone,
		persona,
	} = useSelect( ( select ) => {
		const { isLoading,
			getTitles,
			getAcceptedTitle,
			getOriginalTitle,
			getTone,
			getPersona,
		} = select( TitleStore );

		return {
			acceptedTitle: getAcceptedTitle( TitleType.PostTitle ),
			loading: isLoading(),
			titles: getTitles( TitleType.PostTitle ),
			originalTitle: getOriginalTitle( TitleType.PostTitle ),
			tone: getTone(),
			persona: getPersona(),
		};
	}, [] );

	const {
		setTitles,
		setLoading,
		setAcceptedTitle,
		setOriginalTitle,
		setTone,
		setPersona,
	} = useDispatch( TitleStore );

	const currentPostContent = useSelect( ( select ) => {
		const { getEditedPostContent } = select( 'core/editor' ) as GutenbergFunction;
		return getEditedPostContent();
	}, [] );

	const currentPostTitle = useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' ) as GutenbergFunction;
		return getEditedPostAttribute( 'title' );
	}, [] );

	const toneLabel = tone ? getLabelForTone( tone ) : __( 'Neural', 'wp-parsely' );
	const personaLabel = persona ? getLabelForPersona( persona ) : __( 'Journalist', 'wp-parsely' );

	// This state stores the tone and persona label to be displayed when the list
	// of generated titles is shown to the user.
	const [ staticToneAndPersonaLabel, setStaticToneAndPersonaLabel ] = useState<{ tone: string, persona: string}>(
		{
			tone: toneLabel,
			persona: personaLabel,
		}
	);

	const generateTitles = async (
		titleType: TitleType,
		content: string,
		selectedTone: ToneProp,
		selectedPersona: PersonaProp,
	): Promise<void> => {
		await setLoading( true );

		const provider = new WriteTitleProvider();

		try {
			const genTitles = await provider.generateTitles( content, 3, selectedTone, selectedPersona );
			await setTitles( titleType, genTitles );
		} catch ( err: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
			setError( err );
		}

		await setLoading( false );
	};

	const generateOnClickHandler = async () => {
		if ( false === loading ) {
			Telemetry.trackEvent( 'title_suggestions_generate_pressed', {
				request_more: titles.length > 0,
				total_titles: titles.length,
				total_pinned: titles.filter( ( title ) => title.isPinned ).length,
				tone: tone ? tone : 'neutral',
				persona: persona ? persona : 'journalist',
			} );

			// Generate titles based on the current post content.
			await generateTitles(
				TitleType.PostTitle,
				currentPostContent,
				tone as ToneProp,
				persona as PersonaProp
			);

			// Store the current tone and persona label to be displayed later on.
			setStaticToneAndPersonaLabel( {
				tone: toneLabel,
				persona: personaLabel,
			} );
		}
	};

	const saveTitleOnClickHandler = async () => {
		// Save the original title.
		await setOriginalTitle( TitleType.PostTitle, currentPostTitle );

		// Set the post title to the accepted title.
		dispatch( 'core/editor' ).editPost( { title: acceptedTitle?.title } );

		// Pin the accepted title on the list of generated titles.
		if ( acceptedTitle ) {
			await dispatch( TitleStore ).pinTitle( TitleType.PostTitle, acceptedTitle );
			Telemetry.trackEvent( 'title_suggestions_accepted', {
				old_title: currentPostTitle,
				new_title: acceptedTitle.title,
			} );
		}

		// Remove the accepted title
		await setAcceptedTitle( TitleType.PostTitle, undefined );
	};

	const parselyAISettings = <TitleSuggestionsSettings
		tone={ tone }
		persona={ persona }
		onToneChange={ ( selectedTone ) => setTone( selectedTone ) }
		onPersonaChange={ ( selectedPersona ) => setPersona( selectedPersona ) }
		isLoading={ loading }
	/>;

	const generateTitleButton: JSX.Element = (
		<div className="parsely-write-titles-generate-button">
			<Button
				variant={ titles.length > 0 ? 'secondary' : 'primary' }
				isBusy={ loading }
				onClick={ generateOnClickHandler }
			>
				{ loading && 'Generating Titles...' }
				{ ! loading && titles.length > 0 && __( 'Generate More', 'wp-parsely' ) }
				{ ! loading && titles.length === 0 && __( 'Generate Titles', 'wp-parsely' ) }
			</Button>
		</div>
	);

	const titleSuggestionList: JSX.Element = (
		<div className="parsely-write-titles-title-suggestions-container">
			{ ( originalTitle !== undefined ) && (
				<TitleSuggestion title={ originalTitle } type={ TitleType.PostTitle } isOriginal={ true } />
			) }

			{ titles.map( ( title ) => (
				<TitleSuggestion
					key={ title.id }
					title={ title }
					type={ TitleType.PostTitle } // Specify that the title is a post title
				/>
			) ) }
		</div>
	);

	const acceptedTitleElement: JSX.Element = (
		<div className="parsely-write-titles-accepted-title-container">
			<div className="parsely-write-titles-text">
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

	if ( error ) {
		return ( error.Message() );
	}

	return (
		<PanelRow>
			<div className="parsely-write-titles-wrapper">
				{ 0 === titles.length && acceptedTitle === undefined && (
					<>
						<div className="parsely-write-titles-text">
							{ __(
								'Use Parse.ly AI to generate a title for your post.',
								'wp-parsely'
							) }
						</div>
						{ parselyAISettings }
						{ generateTitleButton }
					</>
				) }
				{ 0 < titles.length && acceptedTitle === undefined && (
					<>
						<div className="parsely-write-titles-text">
							{
								createInterpolateElement(
									// translators: %1$s is the tone, %2$s is the persona.
									__(
										"We've generated a few <tone/> titles based on the content of your post, written as a <persona/>.",
										'wp-parsely'
									),
									{
										tone: <strong>{ staticToneAndPersonaLabel.tone }</strong>,
										persona: <strong>{ staticToneAndPersonaLabel.persona }</strong>,
									}
								)
							}
						</div>
						{ titleSuggestionList }
						{ parselyAISettings }
						{ generateTitleButton }
					</>
				) }
				{ acceptedTitle !== undefined && ( acceptedTitleElement ) }
			</div>
		</PanelRow>
	);
};

