/**
 * External dependencies.
 */
import { render, screen } from '@testing-library/react';
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
} );
