/**
 * The default desired excerpt length, in characters.
 *
 * Kept in sync with the `max_characters` default of the
 * `/excerpt-generator/generate` endpoint.
 *
 * @since 3.24.0
 */
export const DEFAULT_EXCERPT_LENGTH = 160;

/**
 * The default persona used when generating excerpts.
 *
 * @since 3.24.0
 */
export const DEFAULT_PERSONA = 'journalist';

/**
 * The default tone used when generating excerpts.
 *
 * @since 3.24.0
 */
export const DEFAULT_TONE = 'neutral';

/**
 * The minimum desired excerpt length, in characters.
 *
 * @since 3.24.0
 */
export const MIN_EXCERPT_LENGTH = 50;

/**
 * The maximum desired excerpt length, in characters.
 *
 * @since 3.24.0
 */
export const MAX_EXCERPT_LENGTH = 300;

/**
 * The key denoting that a free-text (custom) tone or persona is in use.
 *
 * @since 3.24.0
 */
export const CUSTOM_VALUE = 'custom';

/**
 * The delay before persisting a settings change, in milliseconds.
 *
 * Settings are saved with a REST request per change, so continuous controls
 * (the length slider, the custom tone/persona fields) must be debounced.
 *
 * @since 3.24.0
 */
export const SETTINGS_SAVE_DELAY = 500;
