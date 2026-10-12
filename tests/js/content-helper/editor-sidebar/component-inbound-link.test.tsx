/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { InboundSmartLink } from '../../../../src/content-helper/editor-sidebar/smart-linking/provider';
import {
	InboundLinkDetails,
} from '../../../../src/content-helper/editor-sidebar/smart-linking/review-modal/component-inbound-link';

// The real preview renders through the block editor.
jest.mock(
	'../../../../src/content-helper/editor-sidebar/smart-linking/review-modal/component-block-preview',
	() => ( {
		BlockPreview: ( { block }: { block?: { attributes: { content: string } } } ) =>
			block?.attributes.content ?? null,
	} )
);

const navigationProps = {
	onPrevious: jest.fn(),
	onNext: jest.fn(),
	hasPrevious: true,
	hasNext: true,
};

/**
 * Returns an inbound Smart Link whose source post has the given paragraph.
 *
 * @since 3.24.3
 *
 * @param {string} paragraph The paragraph's HTML.
 *
 * @return {InboundSmartLink} The inbound Smart Link.
 */
function getLink( paragraph: string ): InboundSmartLink {
	return {
		uid: 'uid',
		smart_link_id: 1,
		href: { raw: 'https://example.com/target/', itm: 'https://example.com/target/' },
		text: 'paragraph',
		title: 'Target',
		offset: 0,
		applied: true,
		status: 'applied',
		post_data: {
			id: 1,
			title: 'Source',
			type: { name: 'post', label: 'Post', rest: 'wp/v2/posts' },
			paragraph,
			is_first_paragraph: false,
			is_last_paragraph: false,
			permalink: 'https://example.com/source/',
			parsely_canonical_url: 'https://example.com/source/',
			edit_link: 'https://example.com/wp-admin/post.php?post=1&action=edit',
			author: 'Author',
			date: 'January 1, 2026',
			image: false,
		},
	};
}

/**
 * Returns the rendered ellipses.
 *
 * @since 3.24.3
 *
 * @return {HTMLElement[]} The ellipses.
 */
function getEllipses(): HTMLElement[] {
	return screen.queryAllByText( '( … )' );
}

describe( 'InboundLinkDetails', () => {
	beforeAll( () => {
		// `parse()` drops blocks of unregistered types.
		registerBlockType<{ content: string }>( 'core/paragraph', {
			apiVersion: 3,
			title: 'Paragraph',
			category: 'text',
			attributes: {
				content: { type: 'string', source: 'html', selector: 'p' },
			},
			save: ( { attributes } ) => <p>{ attributes.content }</p>,
		} );
	} );

	/**
	 * The modal reuses the same instance when another link is selected.
	 *
	 * @since 3.24.3
	 */
	test( 'should not keep showing the previous link\'s paragraph', () => {
		const { rerender } = render(
			<InboundLinkDetails link={ getLink( '<p>First paragraph.</p>' ) } { ...navigationProps } />
		);
		expect( screen.getByText( 'First paragraph.' ) ).toBeInTheDocument();

		rerender( <InboundLinkDetails link={ getLink( '' ) } { ...navigationProps } /> );

		expect( screen.queryByText( 'First paragraph.' ) ).not.toBeInTheDocument();
	} );

	test( 'should show ellipses only around a paragraph', () => {
		const { rerender } = render(
			<InboundLinkDetails link={ getLink( '' ) } { ...navigationProps } />
		);
		expect( getEllipses() ).toHaveLength( 0 );

		rerender( <InboundLinkDetails link={ getLink( '<p>First paragraph.</p>' ) } { ...navigationProps } /> );

		expect( getEllipses() ).toHaveLength( 2 );
	} );
} );
