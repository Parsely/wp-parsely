/**
 * WordPress dependencies
 */
// eslint-disable-next-line import/named
import { store as coreStore, Taxonomy, User } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { GutenbergFunction } from '../../../@types/gutenberg/types';

/**
 * Internal dependencies
 */

/**
 * Defines the states of post data as handled in the usePostData() function.
 *
 * - When `undefined`, the data is still being fetched.
 * - When `null`, an error has occurred before fetching the data.
 * - When an array, the data has been fetched and is available.
 *
 * @since 3.14.3
 * @since 3.14.4 Renamed to PostData from PostDataStore.
 */
interface PostData {
	authors: User[] | null | undefined;
	categories: Taxonomy[] | null | undefined;
	tags: Taxonomy[] | null | undefined;
	isReady: boolean;
}

/**
 * Hook to get the post data for the current post.
 *
 * Note: in some rare cases this function could process or return unexpected
 * data due to Gutenberg functions not working as expected. Consumers should
 * validate the data before using it.
 *
 * @since 3.14.3
 * @since 3.14.4 Implemented checks to reduce risk of invalid data being processed.
 * @since 3.16.2 Added a timeout to ensure the hook returns after `timeoutDurationMs` milliseconds.
 *
 * @see https://github.com/Parsely/wp-parsely/issues/2423
 *
 * @param {number} timeoutDurationMs The duration in milliseconds before the hook times out and
 *                                   returns the data as is.
 *
 * @return {PostData} The post data for the current post.
 */
export function usePostData( timeoutDurationMs: number = 200 ): PostData {
	const [ isTimeout, setIsTimeout ] = useState<boolean>( false );
	const [ postData, setPostData ] = useState<PostData>( {
		authors: undefined,
		categories: undefined,
		tags: undefined,
		isReady: false,
	} );

	/**
	 * Fetches the post attributes from the editor.
	 * This includes the author, categories, and tags, and if the data is not available, it will be set to `null`.
	 *
	 * @since 3.14.4
	 */
	const postAttributes = useSelect( ( select ) => {
		const { getEntityRecords } = select( coreStore );
		let authorRecords: User[] | null | undefined;
		let categoryRecords: Taxonomy[] | null | undefined;
		let tagRecords: Taxonomy[] | null | undefined;

		const editor = select( 'core/editor' ) as GutenbergFunction;
		const authorId = editor.getEditedPostAttribute( 'author' );
		const categoryIds = editor.getEditedPostAttribute( 'categories' );
		const tagIds = editor.getEditedPostAttribute( 'tags' );

		if ( Number.isInteger( authorId ) ) {
			authorRecords = getEntityRecords(
				'root', 'user', { include: [ authorId ], context: 'view' }
			) ?? undefined; // Coalescing null to undefined
		} else {
			authorRecords = null;
		}

		if ( Array.isArray( categoryIds ) && categoryIds.length > 0 &&
			categoryIds.every( Number.isInteger )
		) {
			categoryRecords = getEntityRecords(
				'taxonomy', 'category', { include: categoryIds, context: 'view' }
			) ?? undefined; // Coalescing null to undefined
		} else {
			categoryRecords = null;
		}

		if ( Array.isArray( tagIds ) && tagIds.length > 0 &&
			tagIds.every( Number.isInteger )
		) {
			tagRecords = getEntityRecords(
				'taxonomy', 'post_tag', { include: tagIds, context: 'view' }
			) ?? undefined; // Coalescing null to undefined
		} else {
			tagRecords = null;
		}

		return { authorRecords, categoryRecords, tagRecords };
	}, [] );

	/**
	 * Sets the post data when all the data is ready.
	 * This is done when all the data is fetched or when the timeout is reached.
	 *
	 * @since 3.16.2
	 */
	useEffect( () => {
		const {
			authorRecords,
			categoryRecords,
			tagRecords,
		} = postAttributes;

		// Check if all the data is ready or if the timeout has been reached.
		const isPostDataReady: boolean = (
			authorRecords !== undefined &&
			categoryRecords !== undefined &&
			tagRecords !== undefined
		) || isTimeout;

		if ( isPostDataReady ) {
			setPostData( {
				authors: authorRecords,
				categories: categoryRecords,
				tags: tagRecords,
				isReady: true,
			} );
		}
	}, [ postAttributes, isTimeout ] );

	/**
	 * Sets a timeout to ensure the hook returns after `timeoutDurationMs` milliseconds.
	 *
	 * @since 3.16.2
	 */
	useEffect( () => {
		const timeout = setTimeout( () => {
			setIsTimeout( true );
		}, timeoutDurationMs );

		return () => clearTimeout( timeout );
	} );

	return postData;
}
