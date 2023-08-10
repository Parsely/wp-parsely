// eslint-disable-next-line
const baseConfig = require( '@wordpress/scripts/config/jest-e2e.config' );

module.exports = {
	...baseConfig,
	testTimeout: 5000, // Increased timeout for E2E tests.
};
