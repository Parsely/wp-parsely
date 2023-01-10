import { ParselyAPIError } from './common.interface';

export interface ParselyStatsResponse extends ParselyAPIError {
	data: ParselyStatsMap;
}

interface ParselyStats {
	page_views: string;
	visitors: string;
	avg_engaged: string;
}

export interface ParselyStatsMap {
	[key: string]: ParselyStats;
}

const response = ( window as any ).wpParselyAdminStatsResponse as ParselyStatsResponse; // eslint-disable-line @typescript-eslint/no-explicit-any
const parselyStatsMap = response && response.data;
const parselyStatsError = response && response.error;
const allPostStatsElements = document.querySelectorAll( '.parsely-post-stats' );

if ( parselyStatsMap ) {
	allPostStatsElements?.forEach( ( statsElement: Element ): void => {
		const statsKey = statsElement.getAttribute( 'data-stats-key' );

		if ( statsKey === null || parselyStatsMap[ statsKey ] === undefined ) {
			statsElement.innerHTML = '—';
			return;
		}

		const stats: ParselyStats = parselyStatsMap[ statsKey ];
		statsElement.innerHTML = '';

		if ( stats.page_views ) {
			statsElement.innerHTML += `<span class="parsely-post-page-views"> ${ stats.page_views } </span> <br/>`;
		}

		if ( stats.visitors ) {
			statsElement.innerHTML += `<span class="parsely-post-visitors"> ${ stats.visitors } </span> <br/>`;
		}

		if ( stats.avg_engaged ) {
			statsElement.innerHTML += `<span class="parsely-post-avg-engaged"> ${ stats.avg_engaged } </span> <br/>`;
		}
	} );
}

if ( parselyStatsError ) {
	const headerEndElement = document.querySelector( '.wp-header-end' );

	if ( headerEndElement !== null ) {
		headerEndElement.innerHTML += parselyStatsError.html;
	}

	allPostStatsElements?.forEach( ( statsElement: Element ): void => {
		statsElement.innerHTML = '—';
	} );
}
