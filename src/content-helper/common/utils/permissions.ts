/**
 * Defines the structure of a Content Helper Permissions object.
 *
 * @since 3.16.0
 */
export interface ContentHelperPermissions {
	SmartLinking: boolean;
	TitleSuggestions: boolean;
}

/**
 * Returns the current user's permissions for the Content Helper.
 *
 * @since 3.16.0
 *
 * @return {ContentHelperPermissions} The current user's permissions.
 */
export function getContentHelperPermissions(): ContentHelperPermissions {
	if ( ! window.wpParselyContentHelperPermissions ) {
		return {
			SmartLinking: false,
			TitleSuggestions: false,
		};
	}

	return JSON.parse( window.wpParselyContentHelperPermissions );
}
