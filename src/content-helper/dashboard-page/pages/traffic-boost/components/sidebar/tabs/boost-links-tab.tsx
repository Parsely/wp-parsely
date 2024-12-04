/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { HydratedPost } from '../../../../../../common/base-wordpress-provider';
import { DashboardProvider } from '../../../../../provider';
import { Spinner } from '@wordpress/components';

/**
 * Component that renders the boost links tab.
 *
 * @since 3.18.0
 */
const BoostLinksTab = (): React.JSX.Element => {
	const [ posts, setPosts ] = useState<HydratedPost[]>( [] );
	const [ isLoading, setIsLoading ] = useState<boolean>( true );

	useEffect( () => {
		const fetchPosts = async () => {
			try {
				const fetchedPosts = await DashboardProvider.getInstance().getPosts( {
					per_page: 5,
					order: 'desc',
				} );

				setPosts( fetchedPosts.data );
			} catch ( error ) {
				console.error( error ); // eslint-disable-line no-console
			} finally {
				setIsLoading( false );
			}
		};

		setIsLoading( true );
		fetchPosts();
	}, [] );

	if ( isLoading ) {
		return <Spinner />;
	}

	return (
		<div className="traffic-boost-links">
			<h2>{ __( 'Boost Links', 'wp-parsely' ) }</h2>
			{ posts.length > 0 ? (
				<ul>
					{ posts.map( ( post ) => (
						<li key={ post.id }>
							{ post.title.rendered || __( '(no title)', 'wp-parsely' ) }
						</li>
					) ) }
				</ul>
			) : (
				<p>{ __( 'No posts found.', 'wp-parsely' ) }</p>
			) }
		</div>
	);
};

export default BoostLinksTab;
