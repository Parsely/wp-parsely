export const Cookies = {
	get: () => document.cookie,
}

/**
 * Get the value of a particular cookie
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @param {string} key Which cookie value to get
 * @return {string | undefined} The value of the specified key, or `undefined` if it's not set.
 */
export const getCookieValue = ( key ) => Cookies.get()
		?.split( '; ' )
		?.find( ( row ) => row.startsWith( `${ key }=` ) )
		?.split( '=' )[ 1 ];
