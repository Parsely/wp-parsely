import { ParselyAPIError, ParselyAPIErrorInfo } from './common.interface';

export interface ParselyPostsStatsResponse extends ParselyAPIError {
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
	showParselyPostsStatsResponse();
}() );

/**
 * Shows Parse.ly Post Stats or Error depending on response.
 */
export function showParselyPostsStatsResponse(): void {
	updateParselyStatsPlaceholder();

	if ( ! window.wpParselyPostsStatsResponse ) {
		return;
	}

	const response: ParselyPostsStatsResponse = JSON.parse( window.wpParselyPostsStatsResponse );

	if ( response?.error ) {
		showParselyStatsError( response.error );
		return;
	}

	if ( response?.data ) {
		showParselyStats( response.data );
	}
}

/**
 * Replace Parse.ly Stats placeholder from default to differentiate while the API request
 * is in progress or completed.
 */
function updateParselyStatsPlaceholder(): void {
	getAllPostStatsElements()?.forEach( ( statsElement: Element ): void => {
		statsElement.innerHTML = '—';
	} );
}

function showParselyStats( parselyStatsMap: ParselyStatsMap ): void {
	if ( ! parselyStatsMap ) {
		return;
	}

	getAllPostStatsElements()?.forEach( ( statsElement: Element ): void => {
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

function showParselyStatsError( parselyStatsError: ParselyAPIErrorInfo ): void {
	const headerEndElement = document.querySelector( '.wp-header-end' ); // WP has this element before admin notices.
	if ( headerEndElement === null ) {
		return;
	}

	headerEndElement.innerHTML += getWPAdminError( parselyStatsError.htmlMessage );
}

function getAllPostStatsElements(): NodeListOf<Element> {
	return document.querySelectorAll( '.parsely-post-stats' );
}

function getWPAdminError( htmlMessage = '' ): string {
	return `<div class="error notice error-parsely-stats is-dismissible">${ htmlMessage }</div>`;
}
