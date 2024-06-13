/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { BaseProvider } from '../../common/base-provider';

interface ConversionMetric {
	attribution_type: string;
	conversion_label: string;
	conversion_type: string;
	conversions: number;
	converting_visitors: number;
}

/**
 * Returns data from the `content-suggestions/suggest-headline` WordPress REST API
 * endpoint.
 *
 * @since 3.12.0
 */
export class ConversionMetricsProvider extends BaseProvider {
	/**
	 * The singleton instance of the TitleSuggestionsProvider.
	 *
	 * @since 3.15.0
	 */
	private static instance: ConversionMetricsProvider;

	/**
	 * Returns the singleton instance of the TitleSuggestionsProvider.
	 *
	 * @since 3.15.0
	 *
	 * @return {TitleSuggestionsProvider} The singleton instance.
	 */
	public static getInstance(): ConversionMetricsProvider {
		if ( ! this.instance ) {
			this.instance = new ConversionMetricsProvider();
		}

		return this.instance;
	}

	public async getConversionMetrics(): Promise<ConversionMetric[]> {
		const response = this.fetch<ConversionMetric[]>( {
			method: 'GET',
			path: '/wp-parsely/v1/conversions/conversions-metric',
		} );

		return response ?? [];
	}
}
