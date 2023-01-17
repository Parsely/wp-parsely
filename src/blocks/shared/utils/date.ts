export const SHORT_DATE_FORMAT: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

export function getDateInUserLang( date: Date, options: Intl.DateTimeFormatOptions ): string {
	return Intl.DateTimeFormat(
		document.documentElement.lang || 'en',
		options
	).format( date );
}

/**
 * Removes the given number of days from a "YYYY-MM-DD" string, and returns
 * the result in the same format.
 *
 * @param {string} date The date in "YYYY-MM-DD" format.
 * @param {number} days The number of days to remove from the date.
 * @return {string} The resulting date in "YYYY-MM-DD" format.
 */
export function removeDaysFromDate( date: string, days: number ): string {
	const pastDate = new Date( date );
	pastDate.setDate( pastDate.getDate() - days );

	return convertDateToString( pastDate );
}

/**
 * Converts a date to a string in "YYYY-MM-DD" format.
 *
 * @param {Date} date The  date to format.
 * @return {string} The date in "YYYY-MM-DD" format.
 */
export function convertDateToString( date: Date ): string {
	return date.toISOString().substring( 0, 10 );
}
