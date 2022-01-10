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

	/**
	 * @return array
	 */
	public function get_columns(): array {
		return array(
			'blog_id'     => __( 'Blog ID', 'wp-parsely' ),
			'blog_domain' => __('Blog Domain', 'wp-parsely'),
			'blog_name'   => __( 'Blog Name', 'wp-parsely' ),
			'api_key_set' => __( 'Status', 'wp-parsely' ),
			'settings'    => __( 'Settings', 'wp-admin' ),
		);
	}

	/**
	 * @return void
	 */
	public function prepare_items(): void {
		$this->_column_headers = $this->get_column_info();
		$this->items           = $this->fetch_table_data();
	}

	/**
	 * @param $item
	 * @param $column_name
	 *
	 * @return string
	 */
	public function column_default( $item, $column_name ): string {
		if ( $column_name == 'settings' ) {
			return '<a href="' . $item[ $column_name ] . '">Parse.ly Site Settings</a>';
		}

		return strval( $item[ $column_name ] );
	}

	protected function get_sortable_columns(): array {
		return array (
			'blog_id' => array( 'id', true ),
			'blog_domain'=>'domain',
		);
	}

	/**
	 * @return array
	 */
	private function fetch_table_data(): array {
		$sites = get_sites(array(
			'orderby' => ( isset( $_GET['orderby'] ) ) ? esc_sql( $_GET['orderby'] ) : 'id',
			'order' => ( isset( $_GET['order'] ) ) ? esc_sql( $_GET['order'] ) : 'ASC'
		));

		$parsely_network_sites = array();
		foreach ( $sites as $site ) {
			switch_to_blog( $site->blog_id );
			$parsely_network_sites[] = array(
				'blog_id'     => $site->blog_id,
				'blog_domain' => $site->domain,
				'blog_name'   => get_bloginfo( 'name' ),
				'api_key_set' => $this->parsely->api_key_is_set() ? 'All OK' : 'API Key is missing',
				'settings'    => admin_url( 'options-general.php?page=parsely' ),
			);
			restore_current_blog();
		}
		return $parsely_network_sites;
	}
}
