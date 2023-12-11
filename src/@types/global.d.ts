/**
 * This global definition is used to declare global types for the plugin
 * so that TypeScript knows about them.
 */
declare global {
	interface Window {
		// Jetpack Editor Initial State.
		// https://github.com/Automattic/jetpack/blob/4eb6a42833879b30aa2a7f4c82e44fc094307de3/projects/plugins/jetpack/extensions/plugins/ai-content-lens/editor.js#L16
		Jetpack_Editor_Initial_State: {
			available_blocks: {
				[key: string]: {
					available: boolean,
					unavailable_reason?: string,
					details: [],
				};
			};
		};
	}
}

export {};
