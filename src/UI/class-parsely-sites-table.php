<?php

declare(strict_types=1);

namespace Parsely\UI;

use Parsely\Parsely;
use WP_List_Table;

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}


final class Parsely_Sites_Table extends WP_List_Table {
	/**
	 * Instance of Parsely class.
	 *
	 * @var Parsely
	 */
	private $parsely;

	/**
	 * Constructor.
	 *
	 * @param Parsely $parsely Instance of Parsely class.
	 */
	public function __construct( Parsely $parsely ) {
		parent::__construct();

		$this->parsely = $parsely;
	}

	public function get_columns(): array {
		return array(
			'blog_id' => __('Blog ID', 'wp-parsely'),
			'blog_name' => __('Blog Name', 'wp-parsely'),
			'api_key_set' => __('Status', 'wp-parsely'),
			'path' => __('Parsely Site Settings', 'wp-admin'),
		);
	}

	public function prepare_items(): void {
		$this->_column_headers = $this->get_column_info();
		$this->items = $this->fetch_table_data();
	}

	public function column_default( $item, $column_name ): string {
		return strval($item[$column_name]);
	}

	private function fetch_table_data(): array {
		$parsely_network_sites = array();
		foreach (get_sites() as $site) {
			switch_to_blog($site->blog_id);
			$parsely_network_sites[] = array(
				'blog_id' => $site->blog_id,
				'blog_name' => get_bloginfo('name'),
				'path' => $site->path,
				'api_key_set' => $this->parsely->api_key_is_set() ? 'All OK' : 'API Key is missing',
			);
			restore_current_blog();
		}
		return $parsely_network_sites;
	}
}
