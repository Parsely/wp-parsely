// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require( '@wordpress/scripts/config/jest-e2e.config' );

module.exports = {
	...baseConfig,
	testMatch: [ '**/tests/e2e/specs/**/*.[jt]s?(x)' ], // Prevent running Playwright tests.
	testTimeout: 35000, // Increased timeout for E2E tests.
};
