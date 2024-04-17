/**
 * WordPress dependencies
 */
import { Button, __experimentalNumberControl as NumberControl, Notice } from '@wordpress/components';
import { select, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import { GutenbergFunction } from '../../../@types/gutenberg/types';

/**
 * Internal dependencies
 */
import { ContentAmplifierProvider } from './provider';
import './content-amplifier.scss';

export const ContentAmplifierPanel = (): JSX.Element => {
	const [ postId, setPostId ] = useState<number>( 1 );
	const [ isLoading, setIsLoading ] = useState<boolean>( false );
	const [ isUpdated, setIsUpdated ] = useState<boolean>( false );
	const editor = select( 'core/editor' );

	const onClickUpdatePost = async () => {
		setIsLoading( true );
		ContentAmplifierProvider.updateExternalPost( postId, postPermalink ).then( () => {
			setIsLoading( false );
			setIsUpdated( true );
		} );
	};

	/**
	 * Loads the selected block and post content.
	 *
	 * @since 3.14.0
	 */
	const { postPermalink } = useSelect( ( selectFn ) => {
		const { getCurrentPostAttribute } = selectFn( 'core/editor' ) as GutenbergFunction;

		return {
			postPermalink: getCurrentPostAttribute( 'link' ),
		};
	}, [] );

	// We cannot show data for non-published posts.
	if ( false === editor.isCurrentPostPublished() ) {
		return (
			<div className="wp-parsely-content-amplifier">
				<p>
					{ __(
						'You must publish the post before you can use the Content Amplifier.',
						'wp-parsely',
					) }
				</p>
			</div>
		);
	}

	const editURL = addQueryArgs( 'post.php', {
		post: postId,
		action: 'edit',
	} );

	return (
		<div className="wp-parsely-content-amplifier">
			{ isUpdated &&
				<Notice status="success">
					{ __( 'Post updated successfully. ', 'wp-parsely' ) }
					<Button
						variant={ 'link' }
						href={ editURL }
						target="_blank"
					>
						{ __( 'View post', 'wp-parsely' ) }
					</Button>
				</Notice>
			}
			<NumberControl
				label={ __( 'Post ID', 'wp-parsely' ) }
				min={ 1 }
				onChange={ ( value ) => {
					const numericValue = parseInt( value as string, 10 );
					setPostId( numericValue );
				} }
				value={ postId }
			/>
			<Button
				__next40pxDefaultSize
				variant="primary"
				onClick={ onClickUpdatePost }
			>
				{ __( 'Update that Post', 'wp-parsely' ) }
			</Button>
			{ isLoading && <p>{ __( 'Updating post…', 'wp-parsely' ) }</p> }
		</div>
	);
};
