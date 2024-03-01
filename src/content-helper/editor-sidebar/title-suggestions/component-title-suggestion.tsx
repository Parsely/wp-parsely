/**
 * WordPress dependencies
 */
import { Button, ButtonGroup } from '@wordpress/components';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	check,
	closeSmall,
	Icon,
	reset,
	starEmpty,
	undo,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { Telemetry } from '../../../js/telemetry/telemetry';
import { Title, TitleStore, TitleType } from './store';

/**
 * Defines the props structure for TitleSuggestion.
 *
 * @since 3.12.0
 */
interface TitleSuggestionProps {
	title: Title,
	type: TitleType,
	isOriginal?: boolean,
}

/**
 * Renders a single title suggestion.
 *
 * @since 3.12.0
 *
 * @param {TitleSuggestionProps} props The component's props.
 *
 * @return {JSX.Element} The title suggestion JSX Element.
 */
export const TitleSuggestion = (
	props: Readonly<TitleSuggestionProps>
): JSX.Element => {
	const {
		removeTitle,
		setAcceptedTitle,
		pinTitle,
		unpinTitle,
		setOriginalTitle,
	} = useDispatch( TitleStore );

	const isPinned = useSelect(
		( select ) => {
			return select( TitleStore ).isPinned( props.type, props.title );
		},
		[ props.title, props.type ] );

	const currentPostTitle = useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' ) as GutenbergFunction;
		return getEditedPostAttribute( 'title' );
	}, [] );

	// Flag if the current title has been accepted and applied to the post.
	const titleInUse = currentPostTitle === props.title.title;

	const onClickApply = async () => {
		if ( titleInUse ) {
			return;
		}

		Telemetry.trackEvent( 'title_suggestion_applied', {
			title: props.title.title,
			type: props.type,
		} );
		await setAcceptedTitle( props.type, props.title );
	};

	const onClickPin = async () => {
		Telemetry.trackEvent( 'title_suggestion_pinned', {
			pinned: ! isPinned,
			type: props.type,
			title: props.title.title,
		} );
		if ( isPinned ) {
			await unpinTitle( props.type, props.title );
		} else {
			await pinTitle( props.type, props.title );
		}
	};

	const onClickRemove = async () => {
		Telemetry.trackEvent( 'title_suggestion_removed', {
			type: props.type,
			title: props.title.title,
		} );
		await removeTitle( props.type, props.title );
	};

	const onClickRestore = async () => {
		Telemetry.trackEvent( 'title_suggestion_restored', {
			type: props.type,
			restored_title: props.title.title,
			accepted_title: currentPostTitle,
		} );

		// Set current post title to the original title.
		dispatch( 'core/editor' ).editPost( { title: props.title.title } );

		// Unset the original title prop by setting it to undefined.
		await setOriginalTitle( props.type, undefined );
	};

	return (
		<>
			<div className={
				`wp-parsely-title-suggestion${ titleInUse ? ' title-in-use' : '' }${ props.isOriginal ? ' original-title' : '' }`
			}>
				<div className="suggested-title">{ props.title.title }</div>

				<ButtonGroup className="suggested-title-actions">
					{ ( ! props.isOriginal ) && (
						<>
							<Button	variant="link" onClick={ onClickApply } disabled={ titleInUse } >
								{ ( titleInUse )
									? __( 'Applied', 'wp-parsely' )
									: __( 'Apply', 'wp-parsely' )
								}
								<Icon size={ 18 } icon={ check } />
							</Button>
							<Button	variant="link" onClick={ onClickRemove } >
								{ __( 'Discard', 'wp-parsely' ) }
								<Icon size={ 18 } icon={ closeSmall } />
							</Button>
							{ ( isPinned ) ? (
								<Button	variant="link" onClick={ onClickPin } >
									{ __( 'Remove', 'wp-parsely' ) }
									<Icon size={ 18 } icon={ reset } />
								</Button>
							) : (
								<Button	variant="link" onClick={ onClickPin } >
									{ __( 'Favorite', 'wp-parsely' ) }
									<Icon size={ 18 } icon={ starEmpty } />
								</Button>
							) }
						</>
					) }
					{ ( props.isOriginal ) && (
						<Button	variant="link" onClick={ onClickRestore } >
							{ __( 'Restore', 'wp-parsely' ) }
							<Icon size={ 18 } icon={ undo } />
						</Button>
					) }
				</ButtonGroup>
			</div>
		</>
	);
};
