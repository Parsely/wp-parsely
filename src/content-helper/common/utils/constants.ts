export const DASHBOARD_BASE_URL = 'https://dash.parsely.com';
export const PUBLIC_API_BASE_URL = 'https://api.parsely.com/v2';

/**
 * Periods that are available in the Content Helper.
 *
 * @since 3.10.0
 * @since 3.11.0 Moved to constants.ts.
 */
export enum Period {
	Day = '1',
	Week = '7',
	Month = '30'
}

/**
 * Metrics that are available in the Content Helper.
 *
 * @since 3.10.0
 * @since 3.11.0 Moved to constants.ts.
 */
export enum Metric {
	Views = 'views',
	AvgEngaged = 'avg_engaged'
}

/**
 * Post filter types that are available in the Content Helper.
 *
 * @since 3.11.0
 */
export enum PostFilterType {
	Author = 'author',
	Section = 'section',
	Tag = 'tag'
}

/**
 * Returns whether the passed value is present in the given enum.
 *
 * @param {string|number} value      The value to check for.
 * @param {Object}        enumObject The enum to check against.
 *
 * @since 3.11.0
 */
export const isInEnum = <T extends object>(
	value: string|number, enumObject: T
): boolean => {
	return Object.values( enumObject ).includes( value );
};
