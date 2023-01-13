import { ParselyAPIError, ParselyAPIErrorInfo } from './common.interface';

export interface ParselyStatsResponse extends ParselyAPIError {
	data: ParselyStatsMap | null;
}

interface ParselyStats {
	page_views?: string;
	visitors?: string;
	avg_time?: string;
}

interface ParselyStatsMap {
	[key: string]: ParselyStats;
}

( function() {
	showParselyStatsResponse( document.body );
}() );

export function showParselyStatsResponse( body: HTMLElement ) {
	const response = getParselyStatsResponse();

	if ( response?.error ) {
		showParselyStatsError( body, response.error );
		return;
	}

	showParselyStats( body, response?.data );
}

function getParselyStatsResponse(): ParselyStatsResponse {
	return ( window as any ).wpParselyAdminStatsResponse as ParselyStatsResponse; // eslint-disable-line @typescript-eslint/no-explicit-any
}

function updateParselyStatsPlaceholder( body: HTMLElement ): void {
	getAllPostStatsElements( body )?.forEach( ( statsElement: Element ): void => {
		statsElement.innerHTML = '—';
	} );
}

function showParselyStats( body: HTMLElement, parselyStatsMap: ParselyStatsMap | null ): void {
	updateParselyStatsPlaceholder( body );

	if ( ! parselyStatsMap ) {
		return;
	}

	getAllPostStatsElements( body )?.forEach( ( statsElement: Element ): void => {
		const statsKey = statsElement.getAttribute( 'data-stats-key' );

		if ( statsKey === null || parselyStatsMap[ statsKey ] === undefined ) {
			return;
		}

		const stats: ParselyStats = parselyStatsMap[ statsKey ];
		statsElement.innerHTML = '';

		if ( stats.page_views ) {
			statsElement.innerHTML += `<span class="parsely-post-page-views">${ stats.page_views }</span><br/>`;
		}

		if ( stats.visitors ) {
			statsElement.innerHTML += `<span class="parsely-post-visitors">${ stats.visitors }</span><br/>`;
		}

		if ( stats.avg_time ) {
			statsElement.innerHTML += `<span class="parsely-post-avg-time">${ stats.avg_time }</span><br/>`;
		}
	} );
}

function showParselyStatsError( body: HTMLElement, parselyStatsError: ParselyAPIErrorInfo | null ): void {
	updateParselyStatsPlaceholder( body );

	if ( ! parselyStatsError ) {
		return;
	}

	const headerEndElement = body.querySelector( '.wp-header-end' );

	if ( headerEndElement !== null && parselyStatsError?.htmlMessage ) {
		headerEndElement.innerHTML += getWPAdminError( parselyStatsError?.htmlMessage );
	}
}

function getAllPostStatsElements( body: HTMLElement ): NodeListOf<Element> {
	return body.querySelectorAll( '.parsely-post-stats' );
}

function getWPAdminError( htmlMessage: string ): string {
	return `<div class="error notice error-parsely-stats is-dismissible">${ htmlMessage || '' }</div>`;
}
