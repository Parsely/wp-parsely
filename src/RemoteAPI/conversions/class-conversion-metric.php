<?php
/**
 * Link Suggestion class
 *
 * @package Parsely
 * @since   3.14.0
 */

declare(strict_types=1);

namespace Parsely\RemoteAPI\Conversions;

/**
 * Link Suggestion class
 *
 * Represents a link suggestion returned by the Suggest Links API.
 *
 * @since 3.14.0
 */
class Conversion_Metric {

	public $attribution_type;
	public $conversion_label;
	public $conversion_type;
	public $conversions;
	public $converting_visitors;
}
