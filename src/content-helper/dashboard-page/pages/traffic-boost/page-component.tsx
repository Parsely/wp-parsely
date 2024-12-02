/**
 * WordPress dependencies
 */
import { SearchControl } from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PageBody, PageContainer, PageHeader, PostsTable } from '../../components';
import './traffic-boost.scss';

/**
 * Traffic Boost page component.
 *
 * @since 3.18.0
 */
export const TrafficBoostPage = (): React.JSX.Element => {
	const [ searchQuery, setSearchQuery ] = useState<string>( '' );
	const debouncedSetSearchQuery = useDebounce( setSearchQuery, 300 );

	return (
		<PageContainer name="traffic-boost">
			<PageHeader>
				<h1>{ __( 'Manage Traffic Boost', 'wp-parsely' ) }</h1>
			</PageHeader>
			<PageBody>
				<div className="traffic-boost-search-container">
					<SearchControl
						value={ searchQuery }
						onChange={ debouncedSetSearchQuery }
						label={ __( 'Search', 'wp-parsely' ) }
						placeholder={ __( 'Search', 'wp-parsely' ) }
						__nextHasNoMarginBottom
					/>
				</div>
				<PostsTable
					query={ {
						status: 'publish',
						per_page: 10,
						search: searchQuery,
					} }
				/>
			</PageBody>
		</PageContainer>
	);
};
