/**
 * WordPress dependencies
 */
// @ts-ignore InspectorPopoverHeader is exported at runtime, but is missing from the package types.
import { __experimentalInspectorPopoverHeader as InspectorPopoverHeader } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	Dropdown,
	Flex,
	Icon,
	Notice,
	TextareaControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { select as wpSelect, useDispatch, useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useEffect, useState } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import { external, settings as settingsIcon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import { count } from '@wordpress/wordcount';

/**
 * Internal dependencies
 */
import { Telemetry } from '../../../js/telemetry/telemetry';
import {
	ContentHelperError,
	ContentHelperErrorCode,
} from '../../common/content-helper-error';
import { AiIcon } from '../../common/icons/ai-icon';
import {
	ExcerptSuggestionsSettings as ExcerptSuggestionsSettingsType,
	SidebarSettings,
	useSettings,
} from '../../common/settings';
import { ExcerptSuggestionsSettings } from './component-panel-settings';
import { ExcerptSuggestionsProvider } from './provider';

/**
 * The ID of the snackbar notice shown after generating an excerpt.
 *
 * Reusing the same ID replaces the previous notice instead of stacking.
 *
 * @since 3.24.0
 */
const GENERATED_NOTICE_ID = 'wp-parsely-excerpt-generated';

/**
 * Popover props for the settings popover, mirroring the popovers used by the
 * core document sidebar rows.
 *
 * @since 3.24.0
 */
const POPOVER_PROPS = {
	placement: 'left-start' as const,
	offset: 36,
	shift: true,
};

/**
 * The PostExcerptSuggestions component displays the excerpt textarea and the Parse.ly AI controls.
 *
 * Generated excerpts are applied immediately and announced with a snackbar
 * offering Undo, mirroring how core applies one-shot changes such as pushing
 * block styles to Global Styles. The generation settings are progressively
 * disclosed through a settings popover.
 *
 * @since 3.13.0
 * @since 3.24.0 Replaced the review flow with apply + snackbar Undo.
 */
export const PostExcerptSuggestions = () => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	const [ error, setError ] = useState<ContentHelperError>();
	const [ generationCount, setGenerationCount ] = useState<number>( 0 );
	const [ isLoading, setLoading ] = useState<boolean>( false );

	const { editPost } = useDispatch( editorStore );
	const { createSuccessNotice } = useDispatch( noticesStore );

	/**
	 * Handles changes to the excerpt suggestions settings.
	 *
	 * @since 3.17.0
	 *
	 * @param {keyof ExcerptSuggestionsSettingsType} key   The setting key that changed.
	 * @param {string|boolean|number}                value The new value of the setting.
	 */
	const onSettingChange = (
		key: keyof ExcerptSuggestionsSettingsType,
		value: string | boolean | number
	) => {
		setSettings( {
			ExcerptSuggestions: {
				...settings.ExcerptSuggestions,
				[ key ]: value },
		} );
	};

	// Get the current excerpt, post content, and post title.
	const { excerpt, postContent, postTitle } = useSelect( ( select ) => {
		const { getEditedPostAttribute, getEditedPostContent } = select( editorStore );

		let content = getEditedPostContent();
		if ( ! content ) {
			content = '';
		}

		const document = new window.DOMParser().parseFromString( content, 'text/html' );
		const documentRawText = ( document.body.textContent ?? document.body.innerText ) || '';

		// Keep only one break line (\n) between blocks.
		content = documentRawText.replace( /\n{2,}/g, '\n' ).trim();

		return {
			excerpt: getEditedPostAttribute( 'excerpt' ) ?? '',
			postContent: content,
			postTitle: getEditedPostAttribute( 'title' ),
		};
	}, [] );

	const wordCount = count( excerpt, 'words', {} );
	const wordCountString = wordCount > 0
		? sprintf(
			// Translators: %1$s the number of words in the excerpt.
			_n( '%1$s word', '%1$s words', wordCount, 'wp-parsely' ),
			wordCount
		) : '';

	// Scroll the textarea to the top when a new excerpt is generated.
	useEffect( () => {
		const textarea = document.querySelector( '.editor-post-excerpt textarea' );
		if ( textarea ) {
			textarea.scrollTop = 0;
		}
	}, [ generationCount ] );

	/**
	 * Generates an excerpt using Parse.ly AI, applies it to the post, and
	 * shows a snackbar notice offering Undo.
	 *
	 * @since 3.13.0
	 * @since 3.24.0 Applies the excerpt immediately instead of entering a review state.
	 */
	const generateExcerpt = async () => {
		setLoading( true );
		setError( undefined );

		try {
			Telemetry.trackEvent( 'excerpt_generator_pressed' );
			// Read imperatively to avoid capturing a stale excerpt in the Undo closure.
			const previousExcerpt =
				wpSelect( editorStore ).getEditedPostAttribute( 'excerpt' ) ?? '';
			const requestedExcerpt = await ExcerptSuggestionsProvider
				.getInstance()
				.generateExcerpt(
					postTitle,
					postContent,
					settings.ExcerptSuggestions.Persona,
					settings.ExcerptSuggestions.Tone,
					settings.ExcerptSuggestions.Length
				);

			editPost( { excerpt: requestedExcerpt } );
			setGenerationCount( ( prev ) => prev + 1 );

			createSuccessNotice(
				__( 'Excerpt generated.', 'wp-parsely' ),
				{
					type: 'snackbar',
					id: GENERATED_NOTICE_ID,
					actions: [
						{
							label: __( 'Undo', 'wp-parsely' ),
							onClick: () => {
								editPost( { excerpt: previousExcerpt } );
								Telemetry.trackEvent( 'excerpt_generator_discarded' );
							},
						},
					],
				}
			);
		} catch ( err: unknown ) {
			if ( err instanceof ContentHelperError ) {
				setError( err );
			} else {
				setError( new ContentHelperError( __( 'An unknown error occurred.', 'wp-parsely' ), ContentHelperErrorCode.UnknownError ) );
				console.error( err ); // eslint-disable-line no-console
			}
		} finally {
			setLoading( false );
		}
	};

	return (
		<VStack className="wp-parsely-excerpt-suggestions" spacing={ 4 }>
			{ error && (
				<Notice
					className="wp-parsely-excerpt-generator-error"
					onRemove={ () => setError( undefined ) }
					status="info"
				>
					{ error.Message() }
				</Notice>
			) }

			<div className="editor-post-excerpt">
				<TextareaControl
					__nextHasNoMarginBottom
					label={ __( 'Write an excerpt (optional)', 'wp-parsely' ) }
					className="editor-post-excerpt__textarea"
					onChange={ ( value ) => editPost( { excerpt: value } ) }
					value={ excerpt }
					help={ wordCountString ? wordCountString : null }
					disabled={ isLoading }
				/>
			</div>

			<BaseControl
				__nextHasNoMarginBottom
				help={ ! postContent
					? __( 'Add content to generate an excerpt.', 'wp-parsely' )
					: null
				}
			>
				<Flex justify="flex-start" gap={ 2 } wrap>
					<Button
						__next40pxDefaultSize
						variant="secondary"
						icon={ <AiIcon /> }
						onClick={ generateExcerpt }
						isBusy={ isLoading }
						disabled={ isLoading || ! postContent }
					>
						{ isLoading && __( 'Generating…', 'wp-parsely' ) }
						{ ! isLoading && generationCount > 0 && __( 'Regenerate', 'wp-parsely' ) }
						{ ! isLoading && generationCount === 0 && __( 'Generate', 'wp-parsely' ) }
					</Button>
					<Dropdown
						contentClassName="editor-post-excerpt__dropdown__content"
						popoverProps={ POPOVER_PROPS }
						focusOnMount
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								__next40pxDefaultSize
								icon={ settingsIcon }
								label={ __( 'Excerpt Suggestions settings', 'wp-parsely' ) }
								onClick={ onToggle }
								aria-expanded={ isOpen }
							/>
						) }
						renderContent={ ( { onClose } ) => (
							<>
								<InspectorPopoverHeader
									title={ __( 'Excerpt Suggestions settings', 'wp-parsely' ) }
									onClose={ onClose }
								/>
								<ExcerptSuggestionsSettings
									isLoading={ isLoading }
									length={ settings.ExcerptSuggestions.Length }
									onLengthChange={ ( length ) => onSettingChange( 'Length', length ) }
									onPersonaChange={ ( persona ) => onSettingChange( 'Persona', persona ) }
									onToneChange={ ( tone ) => onSettingChange( 'Tone', tone ) }
									persona={ settings.ExcerptSuggestions.Persona }
									tone={ settings.ExcerptSuggestions.Tone }
								/>
							</>
						) }
					/>
				</Flex>
			</BaseControl>

			<Button
				className="excerpt-suggestions-learn-more"
				href="https://docs.wpvip.com/parse-ly/wp-parsely-features/excerpt-suggestions/"
				target="_blank"
				variant="link"
				rel="noopener"
			>
				{ __( 'Learn more about Excerpt Suggestions', 'wp-parsely' ) }
				<Icon
					icon={ external }
					size={ 18 }
					className="parsely-external-link-icon"
				/>
			</Button>
		</VStack>
	);
};
