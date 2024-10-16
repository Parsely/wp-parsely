<?php
/**
 * Unit Tests: PHPUnit bootstrap file.
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

// phpcs:ignore Universal.Namespaces.DisallowCurlyBraceSyntax.Forbidden
namespace Parsely\Tests\Unit {
	// Require any necessary files and autoload the plugin code.
	require_once dirname( __DIR__ ) . '/../vendor/yoast/wp-test-utils/src/BrainMonkey/bootstrap.php';
	require_once dirname( __DIR__ ) . '/../vendor/autoload.php';
}

// Plugin root file is not included during tests, so define the namespaced
// constants here.
// phpcs:ignore Universal.Namespaces.DisallowCurlyBraceSyntax.Forbidden, Universal.Namespaces.OneDeclarationPerFile.MultipleFound
namespace Parsely {
	const PARSELY_VERSION = '123456.78.9';
	const PARSELY_FILE    = __DIR__ . '/../../wp-parsely.php';
}
