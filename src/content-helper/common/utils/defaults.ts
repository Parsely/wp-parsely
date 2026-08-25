/**
 * The suggestion features that expose site-wide generation defaults.
 *
 * @since 3.24.0
 */
export type DefaultsFeature = 'excerptSuggestions' | 'titleSuggestions';

/**
 * Returns a feature's site-wide default for the given setting.
 *
 * PHP resolves these from the plugin's settings and injects them. Read at call
 * time rather than at module load, so a screen that injects them late is still
 * served.
 *
 * @since 3.24.0
 *
 * @param {DefaultsFeature}  feature  The feature to read the default of.
 * @param {'persona'|'tone'} setting  The setting to read.
 * @param {string}           fallback The value to use when none was injected.
 *
 * @return {string} The site-wide default.
 */
export const getSiteDefault = (
	feature: DefaultsFeature,
	setting: 'persona' | 'tone',
	fallback: string
): string => {
	const value = window.wpParselyContentHelperDefaults?.[ feature ]?.[ setting ];

	return 'string' === typeof value && '' !== value ? value : fallback;
};
