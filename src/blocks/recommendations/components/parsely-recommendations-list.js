/**
 * External dependencies
 */
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ParselyRecommendationsListItem from './parsely-recommendations-list-item';

const ParselyRecommendationsList = ( { imagestyle, layoutstyle, recommendations, showimages } ) => (
	<ul
		className={ classNames(
			'parsely-recommendations__ul',
			layoutstyle && `parsely-recommendations__ul-${ layoutstyle }`
		) }
	>
		{ recommendations.map( ( recommendation, index ) => (
			<ParselyRecommendationsListItem
				imagestyle={ imagestyle }
				imageAlt={ __( 'Image for link', 'wp-parsely' ) }
				key={ index }
				recommendation={ recommendation }
				showimages={ showimages }
			/>
		) ) }
	</ul>
);

export default ParselyRecommendationsList;
