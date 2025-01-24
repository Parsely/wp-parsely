/**
 * External dependencies
 */
import { Link } from 'react-router';

/**
 * WordPress dependencies
 */
import {
	Button,
	DropdownMenu,
	MenuGroup,
	MenuItem,
	__experimentalNumberControl as NumberControl,
	Spinner,
} from '@wordpress/components';
import { format } from '@wordpress/date';
import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	chevronLeft,
	chevronRight,
	moreVertical,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { HydratedPost, QueryParams } from '../../../common/base-wordpress-provider';
import { Thumbnail } from '../../../common/components/thumbnail';
import { DashboardProvider } from '../../provider';

/**
 * PostInfo component.
 *
 * Represents the post information, the first column in the PostsTable.
 *
 * @since 3.18.0
 *
 * @param {Object}       props      The component props.
 * @param {HydratedPost} props.post The post object.
 */
const PostInfo = ( { post }: { post: HydratedPost } ): React.JSX.Element => {
	const prettyDate = format( 'M j, o', post.date ?? '' );

	return (
		<div className="posts-table-post-info">
			<Thumbnail
				post={ post }
				size={ 45 }
				className="posts-table-thumbnail"
			/>
			<div className="post-details">
				<div className="post-title">
					{ post.title.rendered !== ''
						? <div dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
						: __( '(no title)', 'wp-parsely' )
					}
				</div>
				<div className="post-meta">
					<span className="post-date">{ prettyDate }</span>
					<span className="post-author">{ post.author?.name }</span>
					<div className="post-categories">
						{ post.categories.map( ( category ) => (
							<span key={ category.id }>{ category.name }</span>
						) ) }
					</div>
				</div>
			</div>
		</div>
	);
};

/**
 * TablePagination component.
 *
 * Represents the pagination controls for the PostsTable.
 *
 * @since 3.18.0
 *
 * @param {Object}   props                The component props.
 * @param {number}   props.currentPage    The current page.
 * @param {Function} props.setCurrentPage The function to set the current page.
 * @param {number}   props.totalPages     The total number of pages.
 * @param {Function} props.onPrevious     The function to handle the previous button click.
 * @param {Function} props.onNext         The function to handle the next button click.
 */
const TablePagination = ( {
	currentPage,
	setCurrentPage,
	totalPages,
	onPrevious,
	onNext,
}: {
	currentPage: number;
	setCurrentPage: ( value: number ) => void;
	totalPages: number;
	onPrevious: () => void;
	onNext: () => void;
} ): React.JSX.Element => {
	return (
		<div className="posts-table-pagination-controls">
			<div className="page-selector">
				<span>{ __( 'Page', 'wp-parsely' ) }</span>
				<NumberControl
					value={ currentPage }
					onChange={ ( value ) => {
						let selectedPage = parseInt( value ?? '1', 10 );
						if ( selectedPage > totalPages ) {
							selectedPage = totalPages;
						} else if ( selectedPage < 1 ) {
							selectedPage = 1;
						}

						setCurrentPage( selectedPage );
					} }
					min={ 1 }
					max={ totalPages }
					dragDirection="e"
				/>
				<span>{ __( 'of', 'wp-parsely' ) } { totalPages }</span>
			</div>
			<div className="page-navigation">
				<Button icon={ chevronLeft } onClick={ onPrevious } disabled={ currentPage === 1 } />
				<Button icon={ chevronRight } onClick={ onNext } disabled={ currentPage >= totalPages } />
			</div>
		</div>
	);
};

/**
 * ActionDropdown component.
 *
 * Represents the action dropdown for each post in the PostsTable.
 *
 * @since 3.18.0
 */
const ActionDropdown = () => (
	<DropdownMenu icon={ moreVertical } label={ __( 'Actions', 'wp-parsely' ) }>
		{ ( { onClose } ) => (
			<>
				<MenuGroup>
					<MenuItem onClick={ onClose }>
						{ __( 'View', 'wp-parsely' ) }
					</MenuItem>
					<MenuItem onClick={ onClose }>
						{ __( 'Edit', 'wp-parsely' ) }
					</MenuItem>
				</MenuGroup>
			</>
		) }
	</DropdownMenu>
);

/**
 * Type definition for the PostsTable component.
 *
 * @since 3.18.0
 */
type PostsTableType = {
	query?: QueryParams;
	hideHeader?: boolean;
	hidePagination?: boolean;
	hideLoading?: boolean;
	compact?: boolean;
	noResultsMessage?: React.ReactNode;
	className?: string;
	onPostClick?: ( post: HydratedPost ) => void;
};

/**
 * PostsTable component.
 *
 * Represents a table of posts, that support custom queries and pagination.
 *
 * @since 3.18.0
 *
 * @param {PostsTableType} props The component props.
 */
export const PostsTable = ( {
	query = {},
	hideHeader = false,
	hidePagination = false,
	hideLoading = false,
	compact = false,
	noResultsMessage = __( 'No posts found.', 'wp-parsely' ),
	className,
	onPostClick,
}: PostsTableType ): React.JSX.Element => {
	// TODO: Add a global state to store the posts for faster loading.
	const [ posts, setPosts ] = useState<HydratedPost[]>( [] );

	const [ currentPage, setCurrentPage ] = useState<number>( 1 );
	const [ totalPages, setTotalPages ] = useState<number>( 1 );
	const [ itemsPerPage ] = useState<number>( query.per_page ?? 10 );

	const [ isLoading, setIsLoading ] = useState<boolean>( true );
	const didFirstSearch = useRef( false );

	/**
	 * Fetches posts from the API, using the query and pagination.
	 *
	 * @since 3.18.0
	 */
	useEffect( () => {
		const fetchPosts = async () => {
			try {
				const fetchedPosts = await DashboardProvider.getInstance().getPosts( {
					...query,
					per_page: itemsPerPage,
					page: currentPage,
				} );

				setPosts( fetchedPosts.data );
				setTotalPages( fetchedPosts.total_pages );
				didFirstSearch.current = true;
			} catch ( error ) {
				console.error( error ); // eslint-disable-line no-console
			} finally {
				setIsLoading( false );
			}
		};
		setIsLoading( true );
		fetchPosts();
	}, [ currentPage, itemsPerPage, query ] );

	/**
	 * Handles the previous button click.
	 *
	 * @since 3.18.0
	 */
	const handlePrevious = () => {
		setCurrentPage( ( prev ) => Math.max( prev - 1, 1 ) );
	};

	/**
	 * Handles the next button click.
	 *
	 * @since 3.18.0
	 */
	const handleNext = () => {
		setCurrentPage( ( prev ) => prev + 1 );
	};

	const tableClasses: string[] = [ 'parsely-table-container' ];
	if ( className ) {
		tableClasses.push( className );
	}

	// Hide the table if loading and hideLoading is true.
	if ( isLoading && hideLoading && ! didFirstSearch.current ) {
		return <></>;
	}

	// Show a loading spinner if the posts are still loading.
	if ( isLoading && ! hideLoading && posts.length === 0 ) {
		tableClasses.push( 'is-loading' );
		return (
			<div className={ tableClasses.join( ' ' ) }>
				<Spinner />
			</div>
		);
	}

	// Show a "no results" message if there are no posts.
	if ( posts.length === 0 ) {
		return (
			<div className="parsely-table-container no-results">
				{ noResultsMessage }
			</div>
		);
	}

	if ( hideHeader ) {
		tableClasses.push( 'hide-header' );
	}
	if ( hidePagination ) {
		tableClasses.push( 'hide-pagination' );
	}
	if ( compact ) {
		tableClasses.push( 'compact' );
	}

	return (
		<div className={ tableClasses.join( ' ' ) }>
			<table className={ tableClasses.join( ' ' ) }>
				{ ! hideHeader && (
					<thead>
						<tr>
							<th className="post-info-header">{ __( 'POST', 'wp-parsely' ) }</th>
							{ ! compact && (
								<th className="boost-perf-header">{ __( 'BOOST PERFORMANCE', 'wp-parsely' ) }</th>
							) }
						</tr>
					</thead>
				) }
				<tbody>
					{ posts.map( ( post, index ) => (
						<tr
							key={ post.id }
							className={ index % 2 === 0 ? 'row-even' : 'row-odd' }
							onClick={ () => onPostClick?.( post ) }
						>
							<td className="post-info">
								<PostInfo post={ post } />
							</td>
							{ ! compact && (
								<>
									<td className="boost-perf">35%</td>
									<td className="actions">
										<Link
											to={ {
												pathname: `/traffic-boost/${ post.id }`,
											} }
											state={ {
												post,
											} }
										>
											{ __( 'Boost Traffic', 'wp-parsely' ) }
										</Link>
										<ActionDropdown />
									</td>
								</>
							) }
						</tr>
					) ) }
				</tbody>
			</table>
			{ ! hidePagination && (
				<TablePagination
					currentPage={ currentPage }
					setCurrentPage={ setCurrentPage }
					totalPages={ totalPages }
					onPrevious={ handlePrevious }
					onNext={ handleNext }
				/>
			) }
		</div>
	);
};
