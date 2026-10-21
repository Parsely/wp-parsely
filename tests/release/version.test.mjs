import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { nextVersion, parseVersion, releaseMetadata } from '../../bin/release-version.mjs';

function fixture(t, version = '3.24.4') {
	const directory = mkdtempSync(join(tmpdir(), 'parsely-release-'));
	t.after(() => rmSync(directory, { recursive: true, force: true }));
	mkdirSync(join(directory, 'tests/e2e'), { recursive: true });
	const files = {
		'wp-parsely.php': `<?php\n/**\n * Version:           ${version}\n */\nconst PARSELY_VERSION = '${version}';\n`,
		'package.json': JSON.stringify({ version }),
		'package-lock.json': JSON.stringify({ version, packages: { '': { version } } }),
		'README.md': `Stable tag: ${version}  \n`,
		'tests/e2e/utils.ts': `export const PLUGIN_VERSION = '${version}';\n`,
		'CHANGELOG.md': `# Changelog\n\n## [${version}](compare) - 2026-10-20\n\n### Fixed\n\n- A fix.\n\n## [3.24.3]\n\n- Previous release.\n`,
	};
	for (const [file, contents] of Object.entries(files)) {
		writeFileSync(join(directory, file), contents);
	}
	return directory;
}

test('increments patch, minor and major without carrying lower components', () => {
	assert.equal(nextVersion('3.24.3', 'patch'), '3.24.4');
	assert.equal(nextVersion('3.24.3', 'minor'), '3.25.0');
	assert.equal(nextVersion('3.24.3', 'major'), '4.0.0');
	assert.throws(() => nextVersion('3.24.3', 'anything'));
});

test('rejects malformed and unsafe version inputs', () => {
	for (const version of [
		'3.24',
		'v3.24.3',
		'03.24.3',
		'3.24.3\n',
		'3.24.3-rc1',
		'3.24.3; echo bad',
	]) {
		assert.throws(() => parseVersion(version), version);
	}
});

test('ordinary trunk changes do not release or require a new changelog', (t) => {
	const directory = fixture(t);
	writeFileSync(join(directory, 'CHANGELOG.md'), '');
	assert.deepEqual(releaseMetadata('3.24.4', directory), { version: '3.24.4', release: false });
});

test('selects only the exact release changelog section', (t) => {
	const directory = fixture(t);
	const metadata = releaseMetadata('3.24.3', directory);
	assert.equal(metadata.release, true);
	assert.equal(metadata.version, '3.24.4');
	assert.match(metadata.notes, /A fix\./);
	assert.doesNotMatch(metadata.notes, /Previous release/);
});

test('rejects version downgrades', (t) => {
	assert.throws(() => releaseMetadata('4.0.0', fixture(t)), /must increase/);
});

test('rejects each stale version marker before publishing', (t) => {
	for (const file of [
		'wp-parsely.php',
		'package.json',
		'package-lock.json',
		'README.md',
		'tests/e2e/utils.ts',
	]) {
		const directory = fixture(t);
		const path = join(directory, file);
		const contents = readFileSync(path, 'utf8');
		// Keep the PHP header current so this specifically tests its constant.
		writeFileSync(
			path,
			file === 'wp-parsely.php'
				? contents.replace("= '3.24.4'", "= '3.24.3'")
				: contents.replaceAll('3.24.4', '3.24.3'),
		);
		assert.throws(() => releaseMetadata('3.24.3', directory), /expected 3\.24\.4/);
	}
});

test('validates the lockfile root version independently', (t) => {
	const directory = fixture(t);
	writeFileSync(
		join(directory, 'package-lock.json'),
		JSON.stringify({
			version: '3.24.4',
			packages: { '': { version: '3.24.3' } },
		}),
	);
	assert.throws(() => releaseMetadata('', directory), /package-lock root/);
});

test('fails closed for absent or empty release notes', (t) => {
	for (const changelog of ['## [3.24.3]\n\n- Old', '## [3.24.4]\n\n## [3.24.3]\n\n- Old']) {
		const directory = fixture(t);
		writeFileSync(join(directory, 'CHANGELOG.md'), changelog);
		assert.throws(() => releaseMetadata('3.24.3', directory), /Missing changelog/);
	}
});
