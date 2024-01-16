
/**
 * Replaces the nth occurrence of a substring within a string.
 *
 * @since 3.12.0
 *
 * @param {string} inputString The original string.
 * @param {string} search      The substring to search for.
 * @param {string} replacement The string to replace the nth occurrence of the search string.
 * @param {number} n           The 0-based index of the occurrence to replace.
 *
 * @return {string} The modified string with the nth occurrence of the search string replaced. If the search string does not occur n times, the original string is returned.
 */
export function replaceNthOccurrence( inputString: string, search: RegExp, replacement: string, n: number ): string {
	let match;
	let i = 0;

	// Ensure the global flag is set to find all occurrences
	const globalSearch = new RegExp( search.source, 'g' + ( search.ignoreCase ? 'i' : '' ) + ( search.multiline ? 'm' : '' ) );

	while ( ( match = globalSearch.exec( inputString ) ) !== null ) {
		if ( i === n ) {
			// Replace the nth occurrence
			return inputString.substring( 0, match.index ) + replacement + inputString.substring( globalSearch.lastIndex );
		}
		i++;
	}

	// Return the original string if the nth occurrence is not found
	return inputString;
}

/**
 * Escapes special characters in a string for use in a regular expression.
 *
 * @since 3.14.0
 *
 * @param {string} string - The string to be escaped.
 *
 * @return {string} The escaped string.
 */
export function escapeRegExp( string: string ): string {
	return string.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ); // $& means the whole matched string
}
