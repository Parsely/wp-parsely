import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export function parseVersion(version) {
	if (!semver.test(version)) {
		throw new Error(`Invalid release version: ${version}`);
	}
	return version.split('.').map((part) => BigInt(part));
}

export function nextVersion(version, type) {
	const parts = parseVersion(version);
	const index = ['major', 'minor', 'patch'].indexOf(type);
	if (index === -1) {
		throw new Error('Choose major, minor, or patch.');
	}
	parts[index]++;
	return parts.map((part, i) => (i > index ? 0n : part)).join('.');
}

export function pluginVersion(directory = '.') {
	const plugin = readFileSync(resolve(directory, 'wp-parsely.php'), 'utf8');
	const version = plugin.match(/^ \* Version:\s+(\S+)/m)?.[1];
	parseVersion(version ?? '');
	return version;
}

export function releaseMetadata(previousVersion = '', directory = '.') {
	const version = pluginVersion(directory);
	if (previousVersion === version) {
		return { version, release: false };
	}
	const parts = parseVersion(version);
	if (previousVersion) {
		const previous = parseVersion(previousVersion);
		const difference = parts.findIndex((part, i) => part !== previous[i]);
		if (difference === -1 || parts[difference] < previous[difference]) {
			throw new Error('Release versions must increase.');
		}
	}
	const read = (file) => readFileSync(resolve(directory, file), 'utf8');
	const json = (file) => JSON.parse(read(file));
	const versions = {
		'PHP constant': read('wp-parsely.php').match(/const PARSELY_VERSION\s*=\s*'([^']+)'/)?.[1],
		'package.json': json('package.json').version,
		'package-lock.json': json('package-lock.json').version,
		'package-lock root': json('package-lock.json').packages[''].version,
		'README.md': read('README.md').match(/^Stable tag:\s+(\S+)/m)?.[1],
		'E2E version': read('tests/e2e/utils.ts').match(/export const PLUGIN_VERSION = '([^']+)'/)?.[1],
	};
	for (const [file, value] of Object.entries(versions)) {
		if (value !== version) {
			throw new Error(`${file}: expected ${version}, got ${value}`);
		}
	}
	const sections = read('CHANGELOG.md').split(/(?=^## \[)/m);
	const notes = sections.find((section) => section.startsWith(`## [${version}]`));
	if (!notes || !notes.split('\n').slice(1).join('\n').trim()) {
		throw new Error(`Missing changelog for ${version}.`);
	}
	return { version, release: true, notes: notes.trim() };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	try {
		const [command, argument] = process.argv.slice(2);
		if (command === 'next') {
			console.log(nextVersion(pluginVersion(), argument));
		} else if (command === 'metadata') {
			console.log(JSON.stringify(releaseMetadata(argument)));
		} else {
			throw new Error('Usage: release-version.mjs next <type> | metadata [previous-version]');
		}
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}
