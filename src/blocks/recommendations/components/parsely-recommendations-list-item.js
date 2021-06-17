/**
 * External dependencies
 */
import { Card, CardBody, CardMedia } from '@wordpress/components';

const getImageForLink = ( { imagestyle, imageUrl, thumbUrlMedium } ) => {
	if ( imagestyle === 'original' ) {
		return imageUrl;
	}
	return thumbUrlMedium;
};

const ParselyRecommendationsListItem = ( {
	imageAlt,
	imagestyle,
	imageUrl,
	linkTitle,
	key,
	linkUrl,
	showimages,
	thumbUrlMedium,
} ) => {
	const imageForLink = showimages && getImageForLink( { imagestyle, imageUrl, thumbUrlMedium } );

	return (
		<li key={ key }>
			<a href={ linkUrl } className="parsely-recommendations__link">
				<Card className="parsely-recommendations__card" size="custom">
					{ imageForLink && (
						<CardMedia className="parsely-recommendations__cardmedia">
							<img
								className="parsely-recommendations__list-img"
								src={ imageForLink }
								alt={ imageAlt }
							/>
						</CardMedia>
					) }
					<CardBody className="parsely-recommendations__cardbody">{ linkTitle }</CardBody>
				</Card>
			</a>
		</li>
	);
};
export default ParselyRecommendationsListItem;
