<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Php54\Rector\Array_\LongArrayToShortArrayRector;
use Rector\Set\ValueObject\LevelSetList;

return static function (RectorConfig $rectorConfig): void {
	$rectorConfig->paths([
		__DIR__ . '/src',
		__DIR__ . '/tests',
		__DIR__ . '/views',
		__DIR__ . '/uninstall.php',
		__DIR__ . '/wp-parsely.php',
	]);

	// define sets of rules
	$rectorConfig->sets([
		LevelSetList::UP_TO_PHP_71
	]);
	$rectorConfig->skip([
		LongArrayToShortArrayRector::class,
	]);

	$rectorConfig->indent("\t", 1);
};
