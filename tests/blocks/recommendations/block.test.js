/**
 * External dependencies.
 */
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * Internal dependencies.
 */
import ParselyRecommendations from '../../../src/blocks/recommendations/components/parsely-recommendations';
import ParselyRecommendationsList from '../../../src/blocks/recommendations/components/parsely-recommendations-list';
import ParselyRecommendationsTitle from '../../../src/blocks/recommendations/components/parsely-recommendations-title';
import RecommendationsStore from '../../../src/blocks/recommendations/recommendations-store';

/**
 * Initializations.
 */
const apiResultSingle = [
	{
		author: 'John Doe',
		authors: [ 'John Doe', 'Jane Doe' ],
		full_content_word_count: 0,
		image_url: 'https://example.com/image.jpg',
		metadata: null,
		pub_date: '2022-03-14T13:14:00',
		section: 'Articles',
		tags: [ 'parsely_smart:entity:Tag 1', 'parsely_smart:iab:Tag 2' ],
		thumb_url_medium: 'https://example.com/image-thumb.jpg',
		title: 'My nice article',
		url: 'https://example.com/my-nice-article/',
	},
];
const apiResultMultiple = [
	{
		author: 'John Doe',
		authors: [ 'John Doe', 'Jane Doe' ],
		full_content_word_count: 0,
		image_url: 'https://example.com/image-1.jpg',
		metadata: null,
		pub_date: '2022-03-14T13:14:00',
		section: 'Articles',
		tags: [ 'parsely_smart:entity:Tag 1', 'parsely_smart:iab:Tag 2' ],
		thumb_url_medium: 'https://example.com/image-first-article-thumb.jpg',
		title: 'My first article',
		url: 'https://example.com/my-first-article/',
	},
	{
		author: 'Jane Doe',
		authors: [ 'Jane Doe', 'John Doe' ],
		full_content_word_count: 0,
		image_url: 'https://example.com/image-2.jpg',
		metadata: null,
		pub_date: '2022-04-14T13:14:00',
		section: 'Articles',
		tags: [ 'parsely_smart:entity:Tag 1', 'parsely_smart:iab:Tag 2' ],
		thumb_url_medium: 'https://example.com/image-second-article-thumb.jpg',
		title: 'My second article',
		url: 'https://example.com/my-second-article/',
	},
];

/**
 * Verifies that the Block's structure remains consistent and correct
 * when loading one or multiple results, while using different options.
 *
 * API data is mocked in the Initializations section above and is passed
 * into the Block using the `recommendations` prop.
 */
describe( 'Recommendations Block', () => {
	it( 'should display loading text when starting', () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendations />
			</RecommendationsStore>
		);

		const loadingText = screen.getByText( /Loading/i );

		expect( loadingText ).toBeVisible();
	} );

	it( 'should load one recommendation without image', () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendationsTitle title="Recommendations Block test title" />
				<ParselyRecommendationsList imagestyle="original" showimages={ false } recommendations={ apiResultSingle } />
			</RecommendationsStore>
		);

		// Initialize elements.
		const blockTitle = screen.getByText( /Recommendations Block test title/i );
		const list = screen.getByRole( 'list' );
		const listItems = screen.getAllByRole( 'listitem' );
		const listItem = listItems[ 0 ];
		const listItemLink = screen.getByRole( 'link' );
		const listItemText = screen.getByText( 'My nice article' );
		const listItemImage = screen.queryByRole( 'img' );

		// We should have only one list item.
		expect( listItems.length ).toBe( 1 );

		// Element hierarchy checks.
		expect( listItem ).toContainElement( listItemLink );
		expect( listItemLink ).toContainElement( listItemText );
		expect( listItemLink ).not.toContainElement( listItemImage );

		// Element property checks.
		expect( listItemLink ).toHaveProperty( 'href', 'https://example.com/my-nice-article/' );

		// Element class name checks.
		expect( blockTitle ).toHaveClass( 'parsely-recommendations-list-title' );
		expect( list ).toHaveClass( 'parsely-recommendations-list' );
		expect( listItem ).not.toHaveClass();
		expect( listItemLink ).toHaveClass( 'parsely-recommendations-link' );
		expect( listItemText ).toHaveClass( 'components-card__body components-card-body parsely-recommendations-cardbody' );
	} );

	it( 'should load one recommendation with image', () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendationsTitle title="Recommendations Block test title" />
				<ParselyRecommendationsList imagestyle="original" showimages={ true } recommendations={ apiResultSingle } />
			</RecommendationsStore>
		);

		// Initialize elements.
		const blockTitle = screen.getByText( /Recommendations Block test title/i );
		const list = screen.getByRole( 'list' );
		const listItems = screen.getAllByRole( 'listitem' );
		const listItem = listItems[ 0 ];
		const listItemLink = screen.getByRole( 'link' );
		const listItemText = screen.getByText( 'My nice article' );
		const listItemImage = screen.getByRole( 'img' );

		// We should have only one list item.
		expect( listItems.length ).toBe( 1 );

		// Element hierarchy checks.
		expect( listItem ).toContainElement( listItemLink );
		expect( listItemLink ).toContainElement( listItemText );
		expect( listItemLink ).toContainElement( listItemImage );

		// Element property checks.
		expect( listItemLink ).toHaveProperty( 'href', 'https://example.com/my-nice-article/' );
		expect( listItemImage ).toHaveProperty( 'src', 'https://example.com/image.jpg' );

		// Element class name checks.
		expect( blockTitle ).toHaveClass( 'parsely-recommendations-list-title' );
		expect( list ).toHaveClass( 'parsely-recommendations-list' );
		expect( listItem ).not.toHaveClass();
		expect( listItemLink ).toHaveClass( 'parsely-recommendations-link' );
		expect( listItemText ).toHaveClass( 'components-card__body components-card-body parsely-recommendations-cardbody' );
		expect( listItemImage ).toHaveClass( 'parsely-recommendations-image' );
	} );

	it( 'should load one recommendation with thumbnail', () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendationsTitle title="Recommendations Block test title" />
				<ParselyRecommendationsList imagestyle="thumbnail" showimages={ true } recommendations={ apiResultSingle } />
			</RecommendationsStore>
		);

		// Initialize elements.
		const blockTitle = screen.getByText( /Recommendations Block test title/i );
		const list = screen.getByRole( 'list' );
		const listItems = screen.getAllByRole( 'listitem' );
		const listItem = listItems[ 0 ];
		const listItemLink = screen.getByRole( 'link' );
		const listItemText = screen.getByText( 'My nice article' );
		const listItemImage = screen.getByRole( 'img' );

		// We should have only one list item.
		expect( listItems.length ).toBe( 1 );

		// Element hierarchy checks.
		expect( listItem ).toContainElement( listItemLink );
		expect( listItemLink ).toContainElement( listItemText );
		expect( listItemLink ).toContainElement( listItemImage );

		// Element property checks.
		expect( listItemLink ).toHaveProperty( 'href', 'https://example.com/my-nice-article/' );
		expect( listItemImage ).toHaveProperty( 'src', 'https://example.com/image-thumb.jpg' );

		// Element class name checks.
		expect( blockTitle ).toHaveClass( 'parsely-recommendations-list-title' );
		expect( list ).toHaveClass( 'parsely-recommendations-list' );
		expect( listItem ).not.toHaveClass();
		expect( listItemLink ).toHaveClass( 'parsely-recommendations-link' );
		expect( listItemText ).toHaveClass( 'components-card__body components-card-body parsely-recommendations-cardbody' );
		expect( listItemImage ).toHaveClass( 'parsely-recommendations-image' );
	} );

	it( 'should load multiple recommendations without image', () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendationsTitle title="Recommendations Block with multiple items" />
				<ParselyRecommendationsList imagestyle="original" showimages={ false } recommendations={ apiResultMultiple } />
			</RecommendationsStore>
		);

		// Initialize elements.
		const blockTitle = screen.getByText( /Recommendations Block with multiple items/i );
		const list = screen.getByRole( 'list' );
		const listItems = screen.getAllByRole( 'listitem' );
		const listItem1 = listItems[ 0 ];
		const listItem1Link = within( listItem1 ).getByRole( 'link' );
		const listItem1Text = within( listItem1 ).getByText( 'My first article' );
		const listItem1Image = within( listItem1 ).queryByRole( 'img' );
		const listItem2 = listItems[ 1 ];
		const listItem2Link = within( listItem2 ).getByRole( 'link' );
		const listItem2Text = within( listItem2 ).getByText( 'My second article' );
		const listItem2Image = within( listItem2 ).queryByRole( 'img' );

		// We should have two list items.
		expect( listItems.length ).toBe( 2 );

		// Element hierarchy checks.
		expect( listItem1 ).toContainElement( listItem1Link );
		expect( listItem1Link ).toContainElement( listItem1Text );
		expect( listItem1Link ).not.toContainElement( listItem1Image );
		expect( listItem2 ).toContainElement( listItem2Link );
		expect( listItem2Link ).toContainElement( listItem2Text );
		expect( listItem2Link ).not.toContainElement( listItem2Image );

		// Element property checks.
		expect( listItem1Link ).toHaveProperty( 'href', 'https://example.com/my-first-article/' );
		expect( listItem2Link ).toHaveProperty( 'href', 'https://example.com/my-second-article/' );

		// Element class name checks.
		expect( blockTitle ).toHaveClass( 'parsely-recommendations-list-title' );
		expect( list ).toHaveClass( 'parsely-recommendations-list' );
		expect( listItem1 ).not.toHaveClass();
		expect( listItem1Link ).toHaveClass( 'parsely-recommendations-link' );
		expect( listItem1Text ).toHaveClass( 'components-card__body components-card-body parsely-recommendations-cardbody' );
		expect( listItem2 ).not.toHaveClass();
		expect( listItem2Link ).toHaveClass( 'parsely-recommendations-link' );
		expect( listItem2Text ).toHaveClass( 'components-card__body components-card-body parsely-recommendations-cardbody' );
	} );

	it( 'should load multiple recommendations with image', () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendationsTitle title="Recommendations Block with multiple items" />
				<ParselyRecommendationsList imagestyle="original" showimages={ true } recommendations={ apiResultMultiple } />
			</RecommendationsStore>
		);

		// Initialize elements.
		const blockTitle = screen.getByText( /Recommendations Block with multiple items/i );
		const list = screen.getByRole( 'list' );
		const listItems = screen.getAllByRole( 'listitem' );
		const listItem1 = listItems[ 0 ];
		const listItem1Link = within( listItem1 ).getByRole( 'link' );
		const listItem1Text = within( listItem1 ).getByText( 'My first article' );
		const listItem1Image = within( listItem1 ).getByRole( 'img' );
		const listItem2 = listItems[ 1 ];
		const listItem2Link = within( listItem2 ).getByRole( 'link' );
		const listItem2Text = within( listItem2 ).getByText( 'My second article' );
		const listItem2Image = within( listItem2 ).getByRole( 'img' );

		// We should have two list items.
		expect( listItems.length ).toBe( 2 );

		// Element hierarchy checks.
		expect( listItem1 ).toContainElement( listItem1Link );
		expect( listItem1Link ).toContainElement( listItem1Text );
		expect( listItem1Link ).toContainElement( listItem1Image );
		expect( listItem2 ).toContainElement( listItem2Link );
		expect( listItem2Link ).toContainElement( listItem2Text );
		expect( listItem2Link ).toContainElement( listItem2Image );

		// Element property checks.
		expect( listItem1Link ).toHaveProperty( 'href', 'https://example.com/my-first-article/' );
		expect( listItem1Image ).toHaveProperty( 'src', 'https://example.com/image-1.jpg' );
		expect( listItem2Link ).toHaveProperty( 'href', 'https://example.com/my-second-article/' );
		expect( listItem2Image ).toHaveProperty( 'src', 'https://example.com/image-2.jpg' );

		// Element class name checks.
		expect( blockTitle ).toHaveClass( 'parsely-recommendations-list-title' );
		expect( list ).toHaveClass( 'parsely-recommendations-list' );
		expect( listItem1 ).not.toHaveClass();
		expect( listItem1Link ).toHaveClass( 'parsely-recommendations-link' );
		expect( listItem1Text ).toHaveClass( 'components-card__body components-card-body parsely-recommendations-cardbody' );
		expect( listItem1Image ).toHaveClass( 'parsely-recommendations-image' );
		expect( listItem2 ).not.toHaveClass();
		expect( listItem2Link ).toHaveClass( 'parsely-recommendations-link' );
		expect( listItem2Text ).toHaveClass( 'components-card__body components-card-body parsely-recommendations-cardbody' );
		expect( listItem2Image ).toHaveClass( 'parsely-recommendations-image' );
	} );

	it( 'should load multiple recommendations with thumbnail', () => {
		render(
			<RecommendationsStore>
				<ParselyRecommendationsTitle title="Recommendations Block with multiple items" />
				<ParselyRecommendationsList imagestyle="thumbnail" showimages={ true } recommendations={ apiResultMultiple } />
			</RecommendationsStore>
		);

		// Initialize elements.
		const blockTitle = screen.getByText( /Recommendations Block with multiple items/i );
		const list = screen.getByRole( 'list' );
		const listItems = screen.getAllByRole( 'listitem' );
		const listItem1 = listItems[ 0 ];
		const listItem1Link = within( listItem1 ).getByRole( 'link' );
		const listItem1Text = within( listItem1 ).getByText( 'My first article' );
		const listItem1Image = within( listItem1 ).getByRole( 'img' );
		const listItem2 = listItems[ 1 ];
		const listItem2Link = within( listItem2 ).getByRole( 'link' );
		const listItem2Text = within( listItem2 ).getByText( 'My second article' );
		const listItem2Image = within( listItem2 ).getByRole( 'img' );

		// We should two list items.
		expect( listItems.length ).toBe( 2 );

		// Element hierarchy checks.
		expect( listItem1 ).toContainElement( listItem1Link );
		expect( listItem1Link ).toContainElement( listItem1Text );
		expect( listItem1Link ).toContainElement( listItem1Image );
		expect( listItem2 ).toContainElement( listItem2Link );
		expect( listItem2Link ).toContainElement( listItem2Text );
		expect( listItem2Link ).toContainElement( listItem2Image );

		// Element property checks.
		expect( listItem1Link ).toHaveProperty( 'href', 'https://example.com/my-first-article/' );
		expect( listItem1Image ).toHaveProperty( 'src', 'https://example.com/image-first-article-thumb.jpg' );
		expect( listItem2Link ).toHaveProperty( 'href', 'https://example.com/my-second-article/' );
		expect( listItem2Image ).toHaveProperty( 'src', 'https://example.com/image-second-article-thumb.jpg' );

		// Element class name checks.
		expect( blockTitle ).toHaveClass( 'parsely-recommendations-list-title' );
		expect( list ).toHaveClass( 'parsely-recommendations-list' );
		expect( listItem1 ).not.toHaveClass();
		expect( listItem1Link ).toHaveClass( 'parsely-recommendations-link' );
		expect( listItem1Text ).toHaveClass( 'components-card__body components-card-body parsely-recommendations-cardbody' );
		expect( listItem1Image ).toHaveClass( 'parsely-recommendations-image' );
		expect( listItem2 ).not.toHaveClass();
		expect( listItem2Link ).toHaveClass( 'parsely-recommendations-link' );
		expect( listItem2Text ).toHaveClass( 'components-card__body components-card-body parsely-recommendations-cardbody' );
		expect( listItem2Image ).toHaveClass( 'parsely-recommendations-image' );
	} );
} );
