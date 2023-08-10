// eslint-disable-next-line
const baseConfig = require( '@wordpress/scripts/config/jest-e2e.config' );

module.exports = {
	...baseConfig,
	testTimeout: 35000, // Increased timeout for e2e tests.
};
