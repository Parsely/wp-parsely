import { Button, PanelRow } from '@wordpress/components';
import { TitleSuggestion } from './component-title-suggestion';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import { TitleStore, TitleType } from './store';
import { WriteTitleProvider } from './provider';

export const WriteTitlesPanel = () => {
	const {
		loading,
		titles,
		acceptedTitle,
		originalTitle,
	} = useSelect( ( select ) => {
		const { isLoading,
			getTitles,
			getAcceptedTitle,
			getOriginalTitle,
		} = select( TitleStore );

		return {
			acceptedTitle: getAcceptedTitle( TitleType.PostTitle ),
			loading: isLoading(),
			titles: getTitles( TitleType.PostTitle ),
			originalTitle: getOriginalTitle( TitleType.PostTitle ),
		};
	}, [] );

	const {
		setTitles,
		setLoading,
		setAcceptedTitle,
		setOriginalTitle,
	} = useDispatch( TitleStore );

	const currentPostContent = useSelect( ( select ) => {
		const { getEditedPostContent } = select( 'core/editor' );
		// @ts-ignore
		return getEditedPostContent();
	}, [] );

	const currentPostTitle = useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' );
		// @ts-ignore
		return getEditedPostAttribute( 'title' );
	}, [] );

	const generateTitles = async ( titleType: TitleType, content: string ): Promise<void> => {
		await setLoading( true );

		const provider = new WriteTitleProvider();

		try {
			const genTitles = await provider.generateTitles( content, 3 );
			await setTitles( titleType, genTitles );
		} catch ( error ) {
			// TODO: handle error
			throw error;
		}

		await setLoading( false );
	};

	const generateOnClickHandler = async () => {
		await generateTitles( TitleType.PostTitle, currentPostContent );
	};

	const saveTitleOnClickHandler = async () => {
		// Save the original title.
		await setOriginalTitle( TitleType.PostTitle, currentPostTitle );

		// Set the post title to the accepted title.
		// @ts-ignore
		dispatch( 'core/editor' ).editPost( { title: acceptedTitle?.title } );

		// Pin the accepted title on the list of generated titles.
		if ( acceptedTitle ) {
			await dispatch( TitleStore ).pinTitle( TitleType.PostTitle, acceptedTitle );
		}

		// Remove the accepted title
		await setAcceptedTitle( TitleType.PostTitle, undefined );
	};

	const generateTitleButton: JSX.Element = (
		<div className="parsely-write-titles-generate-button">
			<Button
				variant={ titles.length > 0 ? 'secondary' : 'primary' }
				isBusy={ loading }
				onClick={ generateOnClickHandler }
			>
				{ loading && 'Generating Titles...' }
				{ ! loading && titles.length > 0 && 'Generate More' }
				{ ! loading && titles.length === 0 && 'Generate Titles' }
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
				You have accepted the following title:
			</div>
			<div className="parsely-write-titles-accepted-title">{ acceptedTitle?.title }</div>
			<div className="parsely-write-titles-accepted-title-actions">
				<Button
					variant="primary"
					onClick={ saveTitleOnClickHandler }
				>
					Save as Post Title
				</Button>
				<Button
					variant="secondary"
					onClick={ () => {
						setAcceptedTitle( TitleType.PostTitle, undefined );
					} }
				>
					I have changed my mind
				</Button>
			</div>
		</div>
	);

	return (
		<PanelRow>
			<div className="parsely-write-titles-wrapper">
				{ 0 === titles.length && acceptedTitle === undefined && (
					<>
						<div className="parsely-write-titles-text">
							Use Parse.ly AI to generate a title for your post.
						</div>
						{ generateTitleButton }
					</>
				) }
				{ 0 < titles.length && acceptedTitle === undefined && (
					<>
						<div className="parsely-write-titles-text">
							We&apos;ve generated a few titles based on the content of your post.
						</div>
						{ titleSuggestionList }
						{ generateTitleButton }
					</>
				) }
				{ acceptedTitle !== undefined && ( acceptedTitleElement ) }
			</div>
		</PanelRow>
	);
};

