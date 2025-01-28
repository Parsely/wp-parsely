/**
 * WordPress dependencies
 */
import {
	__experimentalInputControlPrefixWrapper as InputControlPrefixWrapper,
	SelectControl,
} from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { Telemetry } from '../../../js/telemetry/telemetry';
import { ContentHelperError } from '../../common/content-helper-error';
import { SidebarSettings, useSettings } from '../../common/settings';
import {
	Metric,
	Period,
	PostFilterType,
	PostFilters,
	getMetricDescription,
	getPeriodDescription,
	isInEnum,
} from '../../common/utils/constants';
import { PostData } from '../../common/utils/post';
import { SidebarPostData } from '../editor-sidebar';
import { RelatedPostsFilterSettings } from './component-filter-settings';
import { RelatedPostItem } from './component-item';
import { usePostData } from './hooks';
import { RelatedPostsProvider } from './provider';
import './related-posts.scss';

const FETCH_RETRIES = 1;

/**
 * The Related Posts panel in the Editor Sidebar.
 *
 * @since 3.14.0
 */
export const RelatedPostsPanel = (): React.JSX.Element => {
	const { settings, setSettings } = useSettings<SidebarSettings>();

	const period = settings.RelatedPosts.Period;
	const metric = settings.RelatedPosts.Metric;

	const [ postData, setPostData ] = useState<SidebarPostData>( {
		authors: [], categories: [], tags: [],
	} );

	/**
	 * Returns the current Post's ID, tags and categories.
	 *
	 * @since 3.11.0
	 * @since 3.14.0 Moved from `editor-sidebar.tsx`.
	 * @since 3.14.3 Moved to a custom usePostData hook in `hooks.ts`.
	 */
	const {
		authors,
		categories,
		tags,
		isReady: isPostDataReady,
	} = usePostData();

	/**
	 * Validates that the passed value is an array of Users or Taxonomies, with
	 * at least one item.
	 *
	 * @since 3.14.4
	 *
	 * @param {unknown} value The value to be validated.
	 *
	 * @return {boolean} Whether validation succeeded.
	 */
	const isArrayOfUsersOrTaxonomies = ( value: unknown ): boolean => {
		if ( ! Array.isArray( value ) || value.length === 0 ) {
			return false;
		}

		// Every array item should have the following required properties.
		return value.every( ( item ) => {
			return 'name' in item && 'id' in item && 'slug' in item &&
				'description' in item && 'link' in item;
		} );
	};

	useEffect( () => {
		if ( ! isPostDataReady ) {
			return;
		}

		/**
		 * Returns the name properties present in the passed value, or an empty
		 * array if any errors occur.
		 *
		 * @since 3.14.4
		 *
		 * @param {unknown} value The value to be processed.
		 *
		 * @return {string[]} The names extracted from the value.
		 */
		const extractNamesAsArray = ( value: unknown ): string[] => {
			if ( ! isArrayOfUsersOrTaxonomies( value ) ) {
				return [];
			}

			const array = value as Array<{ name: string }>;
			return array.map( ( item ) => item.name );
		};

		setPostData( {
			// Pass the data through validation, as `usePostData()` could return
			// unexpected results.
			authors: extractNamesAsArray( authors ),
			categories: extractNamesAsArray( categories ),
			tags: extractNamesAsArray( tags ),
		} );
	}, [ authors, categories, tags, isPostDataReady ] );

	const [ loading, setLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState<ContentHelperError>();
	const [ posts, setPosts ] = useState<PostData[]>( [] );
	const [ filters, setFilters ] = useState<PostFilters>( {
		author: '',
		section: '',
		tags: [],
	} );

	const [ postContent, setPostContent ] = useState<string|undefined>( undefined );
	const debouncedSetPostContent = useDebounce( setPostContent, 1000 );
	useSelect( ( select ) => {
		if ( typeof jest === 'undefined' ) {
			const { getEditedPostContent } = select( 'core/editor' ) as GutenbergFunction;
			debouncedSetPostContent( getEditedPostContent() );
		} else {
			// It would be better to mock this in the Content Helper structure
			// test.
			debouncedSetPostContent( 'Jest test is running' );
		}
	}, [ debouncedSetPostContent ] );

	/**
	 * Updates the metric setting.
	 *
	 * @since 3.14.0
	 *
	 * @param {string} selection The new metric.
	 */
	const onMetricChange = ( selection: string ) => {
		if ( isInEnum( selection, Metric ) ) {
			setSettings( {
				RelatedPosts: {
					...settings.RelatedPosts,
					Metric: selection as Metric,
				},
			} );
			Telemetry.trackEvent( 'related_posts_metric_changed', { metric: selection } );
		}
	};

	/**
	 * Updates the period setting.
	 *
	 * @since 3.14.0
	 *
	 * @param {string} selection The new period.
	 */
	const onPeriodChange = ( selection: string ) => {
		if ( isInEnum( selection, Period ) ) {
			setSettings( {
				RelatedPosts: {
					...settings.RelatedPosts,
					Period: selection as Period,
				},
			} );
			Telemetry.trackEvent( 'related_posts_period_changed', { period: selection } );
		}
	};

	useEffect( () => {
		const fetchPosts = async ( retries: number ) => {
			RelatedPostsProvider.getInstance().getRelatedPosts( period, metric, filters )
				.then( ( result ): void => {
					setPosts( result );
					setLoading( false );
				} )
				.catch( async ( err ) => {
					if ( retries > 0 && err.retryFetch ) {
						await new Promise( ( r ) => setTimeout( r, 500 ) );
						await fetchPosts( retries - 1 );
					} else {
						setLoading( false );
						setError( err );
					}
				} );
		};

		setLoading( true );
		fetchPosts( FETCH_RETRIES );

		return (): void => {
			setLoading( false );
			setPosts( [] );
			setError( undefined );
		};
	}, [ period, metric, filters, postData ] );

	/**
	 * Updates the filters value.
	 *
	 * @since 3.11.0
	 *
	 * @param {PostFilters}    newValue   The new filters value.
	 * @param {PostFilterType} filterType The type of filter being changed.
	 */
	const updateFilters = (
		newValue: string | null | undefined,
		filterType: PostFilterType
	): void => {
		if ( newValue === null || newValue === undefined ) {
			newValue = '';
		}

		if ( PostFilterType.Tag === filterType ) {
			let values: string[] = [];

			if ( '' !== newValue ) {
				values = newValue.split( ',' ).map( ( tag ) => tag.trim() );
			}

			setFilters( { ...filters, tags: values } );
		} else {
			setFilters( { ...filters, [ filterType ]: newValue } );
		}
	};

	// No filter data could be retrieved. Prevent the component from rendering.
	if ( postData.authors.length === 0 && postData.categories.length === 0 &&
			postData.tags.length === 0 && isPostDataReady
	) {
		return (
			<div className="wp-parsely-related-posts">
				<div className="related-posts-body">
					{ __(
						'Error: No author, section, or tags could be found for this post.',
						'wp-parsely'
					) }
				</div>
			</div>
		);
	}

	return (
		<div className="wp-parsely-related-posts">
			<div className="related-posts-description">
				{ __( 'Find top-performing related posts.', 'wp-parsely' ) }
			</div>
			<div className="related-posts-body">
				<div className="related-posts-settings">
					<SelectControl
						size="__unstable-large"
						onChange={ ( value ) => onMetricChange( value ) }
						prefix={
							<InputControlPrefixWrapper>{ __( 'Metric:', 'wp-parsely' ) }</InputControlPrefixWrapper>
						}
						value={ metric }
					>
						{ Object.values( Metric ).map( ( value ) => (
							<option key={ value } value={ value }>
								{ getMetricDescription( value ) }
							</option>
						) ) }
					</SelectControl>
					<SelectControl
						size="__unstable-large"
						value={ period }
						prefix={
							<InputControlPrefixWrapper>{ __( 'Period:', 'wp-parsely' ) } </InputControlPrefixWrapper>
						}
						onChange={ ( selection ) => onPeriodChange( selection ) }
					>
						{ Object.values( Period ).map( ( value ) => (
							<option key={ value } value={ value }>
								{ getPeriodDescription( value ) }
							</option>
						) ) }
					</SelectControl>
				</div>
				{
					<RelatedPostsFilterSettings
						label={ __( 'Filter by', 'wp-parsely' ) }
						filters={ filters }
						onFiltersChange={ updateFilters }
						postData={ postData }
					/>
				}

				<div className="related-posts-wrapper">
					{ error && (
						error.Message()
					) }
					{ loading && (
						<div
							className="related-posts-loading-message"
							data-testid="parsely-related-posts-loading-message"
						>
							{ __( 'Loading…', 'wp-parsely' ) }
						</div>
					) }
					{ ! loading && ! error && posts.length === 0 && (
						<div className="related-posts-empty">
							{ __( 'No related posts found.', 'wp-parsely' ) }
						</div>
					) }
					{ ! loading && posts.length > 0 && (
						<div className="related-posts-list">
							{ posts.map( ( post: PostData ) => (
								<RelatedPostItem
									key={ post.id }
									metric={ metric }
									post={ post }
									postContent={ postContent }
								/>
							) ) }
						</div>
					) }
				</div>
			</div>
		</div>
	);
};
