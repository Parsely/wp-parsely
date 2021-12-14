module.exports = {
	/**
	 * For visibility into the list of the defaults we're inheriting with this config, see:
	 * https://github.com/conventional-changelog/commitlint/blob/v15.0.0/@commitlint/config-conventional/index.js
	 * Obviously, these are subject to change if we update the package to a new version.
	 */
	extends: [ '@commitlint/config-conventional' ],
	// See https://commitlint.js.org/#/reference-rules for the full list of rules.
	rules: {
		'subject-min-length': [ 2, 'always', 50 ],
		'body-min-length': [ 2, 'always', 72 ],
	},
};
