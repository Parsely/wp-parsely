/**
 * WordPress dependencies
 */
// eslint-disable-next-line import/named
import { store as coreStore, Taxonomy, User } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';

export interface PostDataStore {
	authors: User[],
	categories: Taxonomy[],
	tags: Taxonomy[],
}

/**
 * Hook to get the post data for the current post.
 *
 * @since 3.14.3
 *
 * @return {PostDataStore} The post data for the current post.
 */
export function usePostData(): PostDataStore {
	return useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( editorStore ) as GutenbergFunction;
		const { getEntityRecords } = select( coreStore );

		const authorRecords: User[] | null = getEntityRecords(
			'root', 'user', { include: getEditedPostAttribute( 'author' ) }
		);

		const categoryRecords: Taxonomy[] | null = getEntityRecords(
			'taxonomy', 'category', { include: getEditedPostAttribute( 'categories' ) }
		);

		const tagRecords: Taxonomy[]|null = getEntityRecords(
			'taxonomy', 'post_tag', { include: getEditedPostAttribute( 'tags' ) }
		);

		return {
			authors: authorRecords ?? [],
			categories: categoryRecords ?? [],
			tags: tagRecords ?? [],
		};
	}, [] );
}
