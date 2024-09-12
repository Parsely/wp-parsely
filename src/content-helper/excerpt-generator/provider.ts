/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { BaseProvider } from '../common/base-provider';

/**
 * Provides the generate excerpt functionality to be used in other components.
 *
 * @since 3.13.0
 */
export class ExcerptGeneratorProvider extends BaseProvider {
	/**
	 * The singleton instance of the ExcerptGeneratorProvider.
	 *
	 * @since 3.16.0
	 */
	private static instance: ExcerptGeneratorProvider;

	/**
	 * Returns the singleton instance of the TitleSuggestionsProvider.
	 *
	 * @since 3.16.0
	 *
	 * @return {ExcerptGeneratorProvider} The singleton instance.
	 */
	public static getInstance(): ExcerptGeneratorProvider {
		if ( ! this.instance ) {
			this.instance = new ExcerptGeneratorProvider();
		}

		return this.instance;
	}

	/**
	 * Generates an excerpt for a given post.
	 *
	 * @param {string} title   The title of the post.
	 * @param {string} content The content of the post.
	 * @param {string} persona The persona to use for the suggestion.
	 * @param {string} tone    The tone to use for the suggestion.
	 *
	 * @return {Promise<string>} The generated excerpt.
	 */
	public async generateExcerpt(
		title: string, content: string, persona: string, tone: string
	): Promise<string> {
		if ( '' === title ) {
			title = 'Untitled';
		}

		return await this.fetch<string>( {
			method: 'POST',
			path: addQueryArgs( '/wp-parsely/v2/content-helper/excerpt-generator/generate', {
				title,
				persona,
				style: tone,
			} ),
			data: {
				text: content,
			},
		} );
	}
}
