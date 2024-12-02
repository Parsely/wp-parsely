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
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	chevronLeft,
	chevronRight,
	Icon,
	moreVertical,
	page,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { Link } from 'react-router-dom';
import { HydratedPost, QueryParams } from '../../../common/base-wordpress-provider';
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
			<div className="thumbnail">
				{ post.thumbnail ? (
					<img src={ post.thumbnail } alt={ post.title.rendered } />
				) : (
					<div className="icon-container">
						<Icon icon={ page } size={ 24 } />
					</div>
				) }
			</div>
			<div className="post-details">
				<div className="post-title">
					{ post.title.rendered !== ''
						? post.title.rendered
						: __( '(no title)', 'wp-parsely' ) }
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
export const PostsTable = ( { query = {} }: PostsTableType ): React.JSX.Element => {
	const [ posts, setPosts ] = useState<HydratedPost[]>( [] );
	const [ currentPage, setCurrentPage ] = useState<number>( 1 );
	const [ totalPages, setTotalPages ] = useState<number>( 1 );
	const [ itemsPerPage ] = useState<number>( query.per_page ?? 10 );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );

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

	// Show a loading spinner if the posts are still loading.
	if ( isLoading && posts.length === 0 ) {
		return (
			<div className="parsely-table-container is-loading">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="parsely-table-container">
			<table>
				<thead>
					<tr>
						<th className="post-info-header">{ __( 'POST', 'wp-parsely' ) }</th>
						<th className="boost-perf-header">{ __( 'BOOST PERFORMANCE', 'wp-parsely' ) }</th>
					</tr>
				</thead>
				<tbody>
					{ posts.map( ( post, index ) => (
						<tr key={ post.id } className={ index % 2 === 0 ? 'row-even' : 'row-odd' }>
							<td className="post-info">
								<PostInfo post={ post } />
							</td>
							<td className="boost-perf">35%</td>
							<td className="actions">
								<Link to="/traffic-boost">{ __( 'Boost Traffic', 'wp-parsely' ) }</Link>
								<ActionDropdown />
							</td>
						</tr>
					) ) }
				</tbody>
			</table>
			<TablePagination
				currentPage={ currentPage }
				setCurrentPage={ setCurrentPage }
				totalPages={ totalPages }
				onPrevious={ handlePrevious }
				onNext={ handleNext }
			/>
		</div>
	);
};
