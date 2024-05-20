/**
 * WordPress dependencies
 */
import { useRef, useState, useEffect } from '@wordpress/element';
import { dispatch, useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { GutenbergFunction } from '../../../@types/gutenberg/types';
import { validateAndFixSmartLinksInPost } from './utils';

/**
 * Returns `true` if the post is done saving, `false` otherwise.
 *
 * @since 3.16.0
 *
 * @return {boolean} Whether the post is done saving.
 */
export const useAfterSave = (): boolean => {
	const [ isPostSaved, setIsPostSaved ] = useState( false );
	const isPostSavingInProgress = useRef( false );
	const { isSavingPost, isAutosavingPost } = useSelect( ( selectFn ) => {
		const coreEditorSelect = selectFn( 'core/editor' ) as GutenbergFunction;

		return {
			isSavingPost: coreEditorSelect.isSavingPost(),
			isAutosavingPost: coreEditorSelect.isAutosavingPost(),
		};
	}, [] );

	useEffect( () => {
		if ( ( isSavingPost || isAutosavingPost ) && ! isPostSavingInProgress.current ) {
			setIsPostSaved( false );
			isPostSavingInProgress.current = true;
		}
		if ( ! ( isSavingPost || isAutosavingPost ) && isPostSavingInProgress.current ) {
			// Code to run after post is done saving.
			setIsPostSaved( true );
			isPostSavingInProgress.current = false;
		}
	}, [ isSavingPost, isAutosavingPost ] );

	return isPostSaved;
};

/**
 * Validates and fixes smart links before saving the post, and saves the smart links to the database.
 *
 * @since 3.16.0
 */
export const useValidateSmartLinksBeforeSave = () => {
	const { isSavingPost } = useSelect( ( selectFn ) => {
		const coreEditorSelect = selectFn( 'core/editor' ) as GutenbergFunction;
		return {
			isSavingPost: coreEditorSelect.isSavingPost(),
			postContent: coreEditorSelect.getEditedPostContent(),
		};
	}, [] );

	const isAfterSave = useAfterSave();
	const hasSavedRef = useRef<boolean>( false );

	/**
	 * Handles the before save action.
	 *
	 * @since 3.16.0
	 */
	useEffect( () => {
		if ( isSavingPost ) {
			( async () => {
				// Validate and fix smart links that might have had the data-smartlink attribute removed.
				await validateAndFixSmartLinksInPost();
				hasSavedRef.current = true;
			} )();
		}
	}, [ isSavingPost ] );

	/**
	 * Handles the after save action, which will save the post after the smart links have been validated.
	 *
	 * @since 3.16.0
	 */
	useEffect( () => {
		if ( isAfterSave && hasSavedRef.current ) {
			( async () => {
				// Trigger the save action
				await dispatch( editorStore ).savePost();

				// TODO: Save the smart links to the database.
			} )();
		}

		hasSavedRef.current = false;
	}, [ isAfterSave ] );
};
