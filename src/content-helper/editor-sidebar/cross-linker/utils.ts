
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
export function replaceNthOccurrence( inputString: string, search: string, replacement: string, n: number ): string {
	const match = new RegExp( search );
	const matches = inputString.match( match );
	if ( matches ) {
		if ( matches.length > n ) {
			const matchIndex = inputString.indexOf( matches[ n ] );
			return inputString.slice( 0, matchIndex ) + inputString.slice( matchIndex ).replace( match, replacement );
		}
	}
	return inputString;
}

/**
 * Escapes special characters in a string for use in a regular expression.
 *
 * @since 3.12.0
 *
 * @param {string} string - The string to be escaped.
 *
 * @return {string} The escaped string.
 */
export function escapeRegExp( string: string ): string {
	return string.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ); // $& means the whole matched string
}
