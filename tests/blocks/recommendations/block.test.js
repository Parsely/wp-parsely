/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

/**
 * Internal dependencies
 */
import ParselyRecommendations from '../../../src/blocks/recommendations/components/parsely-recommendations';
import RecommendationsStore from '../../../src/blocks/recommendations/recommendations-store';

const server = setupServer(
	rest.get( '/wp-parsely/v1/related', ( req, res, ctx ) => {
		return res(
			ctx.status( 200 ),
			ctx.json( {
				data: [
					{
						author: 'Jeff Mills',
						authors: [ 'Jeff Mills' ],
						full_content_word_count: 0,
						image_url: 'https://wpvip.com/wp-content/uploads/sites/3/2022/03/epoint2.jpeg?w=120',
						metadata: null,
						pub_date: '2022-03-14T13:14:00',
						section: 'Partners',
						tags: [
							'parsely_smart:entity:Business-to-business',
							'parsely_smart:entity:E-commerce',
							'parsely_smart:entity:ING Group',
							'parsely_smart:entity:Internet',
							'parsely_smart:entity:Omnichannel',
							'parsely_smart:iab:Business',
							'parsely_smart:iab:Software',
							'parsely_smart:iab:Technology',
						],
						thumb_url_medium: 'https://images.parsely.com/4VDsnDpILAn1YSIm2CcFkX70ows=/85x85/smart/https%3A//wpvip.com/wp-content/uploads/sites/3/2022/03/epoint2.jpeg%3Fw%3D120',
						title: 'e-point Named a WordPress VIP Silver Agency Partner',
						url: 'http://wpvip.com/2022/03/14/e-point-named-a-wordpress-vip-silver-agency-partner/?itm_source=parsely-api',
					},
					// {
					// 	author: 'Tess Needham',
					// 	authors: [ 'Tess Needham' ],
					// 	full_content_word_count: 0,
					// 	image_url: 'https://wpvip.com/wp-content/uploads/sites/3/2022/03/Webinar-Demystifying-WP-Sec_FeaturedImage_1536x804.jpg?w=120',
					// 	metadata: null,
					// 	pub_date: '2022-03-09T20:03:00',
					// 	section: 'Security',
					// 	tags: [
					// 		'parsely_smart:entity:Denial-of-service attack',
					// 		'parsely_smart:entity:Fear, uncertainty, and doubt',
					// 		'parsely_smart:entity:Open source',
					// 		'parsely_smart:entity:Open-source software',
					// 		'parsely_smart:entity:Patch (computing)',
					// 		'parsely_smart:entity:Proprietary software',
					// 		'parsely_smart:entity:Software bug',
					// 		'parsely_smart:entity:Vulnerability (computing)',
					// 		'parsely_smart:entity:Web conferencing',
					// 		'parsely_smart:entity:Website',
					// 		'parsely_smart:entity:Windows Update',
					// 		'parsely_smart:entity:WordPress',
					// 		'parsely_smart:iab:Graphics',
					// 		'parsely_smart:iab:Software',
					// 		'parsely_smart:iab:Technology',
					// 	],
					// 	thumb_url_medium: 'https://images.parsely.com/GNKrg6t1oJ5jZ2SvYXOw04OIaBc=/85x85/smart/https%3A//wpvip.com/wp-content/uploads/sites/3/2022/03/Webinar-Demystifying-WP-Sec_FeaturedImage_1536x804.jpg%3Fw%3D120',
					// 	title: 'WordPress Security Best Practices',
					// 	url: 'http://wpvip.com/2022/03/09/wordpress-security-best-practices/?itm_source=parsely-api',
					// },
					// {
					// 	author: 'Jeff Mills',
					// 	authors: [ 'Jeff Mills' ],
					// 	full_content_word_count: 0,
					// 	image_url: 'https://wpvip.com/wp-content/uploads/sites/3/2022/03/Screenshot-2022-03-04-at-06.50.14.png?w=120',
					// 	metadata: null,
					// 	pub_date: '2022-03-07T17:20:00',
					// 	section: 'News',
					// 	tags: [
					// 		'parsely_smart:iab:Business',
					// 		'parsely_smart:iab:Science',
					// 		'parsely_smart:iab:Software',
					// 		'parsely_smart:iab:Technology',
					// 	],
					// 	thumb_url_medium: 'https://images.parsely.com/l6nYxx0BlxdfJ3PQ_7s5sOiDslU=/85x85/smart/https%3A//wpvip.com/wp-content/uploads/sites/3/2022/03/Screenshot-2022-03-04-at-06.50.14.png%3Fw%3D120',
					// 	title: 'WPExperts Named a WordPress VIP Silver Agency Partner',
					// 	url: 'http://wpvip.com/2022/03/07/wpexperts-named-a-wordpress-vip-silver-agency-partner/?itm_source=parsely-api',
					// },
				],
			} ) );
	} )
);

beforeAll( () => server.listen() );
afterEach( () => server.resetHandlers() );
afterAll( () => server.close() );

describe( 'Recommendations Block', () => {
	it( 'should display loading text', () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendations />
			</RecommendationsStore>
		);

		const loadingText = screen.getByText( /Loading/i );

		expect( loadingText ).toBeVisible();
	} );

	it( 'should load results from API', async () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendations />
			</RecommendationsStore>
		);

		// Doesn't work. works with "/Loading/i".
		const pattern = /e-point Named a WordPress VIP Silver Agency Partner/i;
		const resultText = await screen.findByText( pattern );

		// Another approach, same as above.
		// const test = await waitFor( () => screen.findByText( pattern ), {
		// 	timeout: 3000,
		// } );

		expect( resultText ).toBeVisible();
	} );
} );
