export const SHORT_DATE_FORMAT: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
export const SHORT_DATE_FORMAT_WITHOUT_YEAR: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

export function getDateInUserLang( date: Date, options: Intl.DateTimeFormatOptions ): string {
	return Intl.DateTimeFormat(
		document.documentElement.lang || 'en',
		options
	).format( date );
}

/**
 * Returns the passed date in short format or in short format without year (if
 * the passed date is within the current year), respecting the user's language.
 *
 * @param {Date} date The date to be formatted.
 * @return {string} The resulting date in its final format.
 */
export function getSmartShortDate( date: Date ): string {
	let dateFormat = SHORT_DATE_FORMAT;

	if ( date.getUTCFullYear() === new Date().getUTCFullYear() ) {
		dateFormat = SHORT_DATE_FORMAT_WITHOUT_YEAR;
	}

	return Intl.DateTimeFormat(
		document.documentElement.lang || 'en',
		dateFormat
	).format( date );
}
