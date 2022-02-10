<?php
/**
 * Loader for Parsely Remote API functionality.
 *
 * Enables access those various parse.ly-provided services from the back end of this site
 *
 * @package Parsely
 */

declare(strict_types=1);

namespace Parsely;

require_once __DIR__ . '/interface-proxy.php';

/**
 * /v2/related
 */
require_once __DIR__ . '/related/class-related-proxy.php';
require_once __DIR__ . '/related/class-related-caching-decorator.php';
