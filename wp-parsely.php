<?php
/*
Plugin Name: Parse.ly - Dash
Plugin URI: http://www.parsely.com/
Description: This plugin makes it snap to add Parse.ly tracking code to your WordPress blog.
Author: Mike Sukmanowsky (mike@parsely.com)
Version: 0.0.1
Requires at least:
Author URI: http://www.parsely.com/
License: GPL2

Copyright 2012  Mike Sukmanowsky  (email : mike@parsely.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as 
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/* TODO List:
 * Wordpress Network support
 * register_activation_hook(), register_deactivation_hook(), register_uninstall_hook()
 * Add proper URL for updates and such
 * Add readme.txt
 * Add dependancies (e.g. which wordpress version supported)
 * Allow the user to map get_post_types() to Parse.ly post types
 * Option to not track logged in users
*/

if (class_exists('Parsely')) {
    define('PARSELY_VERSION', Parsely::$VERSION);
    $parsely = new Parsely();
}

class Parsely {
    public static $VERSION      = "0.0.1";
    
    private $NAME;
    private $MENU_SLUG          = "parsely-dash";               // Defines the page param passed to options-general.php
    private $MENU_TITLE         = "Parse.ly - Dash";            // Text to be used for the menu as seen in Settings sub-menu
    private $MENU_PAGE_TITLE    = "Parse.ly - Dash > Settings"; // Text shown in <title></title> when the settings screen is viewed
    private $OPTIONS_KEY        = "parsely";                    // Defines the key used to store options in the WP database
    private $CAPABILITY         = "manage_options";             // The capability required for the user to administer settings
    
    /**
    * PHP4 Constructor
    */
    function Parsely() {
        $this->__construct();
    }
    
    /**
    * PHP5 Constructor
    */
    function __construct() {
        $this->NAME = plugin_basename(__FILE__);
        // Create an admin_menu and a settings link
        add_action('admin_menu',                            array(&$this, 'addSettingsSubMenu'));
        add_filter('plugin_action_links_' . $this->NAME,    array(&$this, 'addPluginMetaLinks'));
        
        // Drop a warning on each page of the admin when Parse.ly is activated but not configured
        add_action('admin_footer', 			                array(&$this, 'displayAdminWarning'));
        
        // Actually inserting the proper parsely code
        add_action('wp_head',                               array(&$this, 'insertParselyPage'));
        add_action('wp_footer',                             array(&$this, 'insertParselyJS'));
    }
    
    /**
    * Adds the Parsely settings page to the Wordpress settings menu.
    */
    public function addSettingsSubMenu() {
        add_options_page($this->MENU_PAGE_TITLE, $this->MENU_TITLE, $this->CAPABILITY, $this->MENU_SLUG, array(&$this, 'displaySettings'));
    }
    
    /**
    * Responsible for actually displaying the setting screen when the user visits options-general.php?page=[MENU_SLUG]
    */
    public function displaySettings() {
        if (!current_user_can($this->CAPABILITY)) {
    		wp_die(__('You do not have sufficient permissions to access this page.'));
    	}
    	
    	$options = get_option($this->OPTIONS_KEY);
    	
    	if (isset($_POST["isParselySettings"]) && $_POST["isParselySettings"] == 'Y') {
    	    $options["apikey"]                 = $_POST["apikey"];
    	    $options["tracker_implementation"] = $_POST["tracker_implementation"]; 
    	    update_option($this->OPTIONS_KEY, $options);
    	}
    	include("parsely-settings.php");
    }
    
    /**
    * Adds a 'Settings' link to the Plugins screen in WP admin
    */
    public function addPluginMetaLinks($links) {
        array_unshift($links, '<a href="'. $this->getSettingsURL() . '">' . __('Settings'));
        return $links;
    }
    
    public function displayAdminWarning() {
        $options = get_option($this->OPTIONS_KEY);
        if (!isset($options['apikey']) || empty($options['apikey'])) {
            ?>
            <div id='message' class='error'>
                <p><strong>Parse.ly - Dash is not active.</strong> You need to <a href='<? echo $this->getSettingsURL(); ?>'>provide 
                    your Parse.ly Dash API key</a> before things get cooking.
                </p>
            </div>
            <?
        }
    }
    
    /**
    * Actually inserts the code for the <meta name='parsely-page'> parameter within the <head></head> of a single post
    */
    public function insertParselyPage() {
        global $post;
        $parselyPage = array();
        $parselyOptions = get_option($this->OPTIONS_KEY);
        if (is_single() && $post->post_status == "publish") {
            $author     = get_user_meta($post->post_author, 'first_name', true) . " " . get_user_meta($post->post_author, 'last_name', true);
            $category   = get_the_category();
            $category   = $category[0];
            
            $image_url = "";
            if (has_post_thumbnail()) {
                $image_id = get_post_thumbnail_id();
                $image_url = wp_get_attachment_image_src($image_id);
                $image_url = $image_url[0];
            }
            // TODO: Maping of an install's post types to Parse.ly post types (namely page/post)
            $parselyPage["title"]       = $this->getCleanParselyPageValue(get_the_title());
            $parselyPage["link"]        = get_permalink();
            $parselyPage["image_url"]   = $image_url;
            $parselyPage["type"]        = "post";
            $parselyPage["post_id"]     = (string)get_the_ID();
            $parselyPage["pub_date"]    = gmdate("Y-m-d\TH:i:s\Z", get_post_time('U', true));
            $parselyPage["section"]     = $category->name;
            $parselyPage["author"]      = $author;
        } elseif (is_page() && $post->post_status == "publish") {
            $parselyPage["type"]        = "sectionpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue(get_the_title());
            $parselyPage["link"]        = get_permalink();
        }
        elseif (is_front_page()) {
            $parselyPage["type"]        = "frontpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue(get_bloginfo("name", "raw"));
            $parselyPage["link"]        = home_url(); // site_url();?
        }
        
        if (isset($parselyOptions['apikey']) && !empty($parselyOptions['apikey'])) {
            ?><meta name='parsely-page' value='<? echo json_encode($parselyPage); ?>' /><?
        }
        
    }
    
    /** 
    * Inserts the JavaScript code required to send off beacon requests
    */
    public function insertParselyJS() {
        global $post;
        $display = TRUE;
        $parselyOptions = get_option($this->OPTIONS_KEY);
        
        if (is_single() && $post->post_status != "publish") { $display = FALSE; }
        if (!isset($parselyOptions['apikey']) || empty($parselyOptions['apikey'])) { $display = FALSE; }
        if ($display) {
            include("parsely-javascript.php");
        }
    }
    
    /**
    * Attempts to clean up some of the typical caveats with values in the parsely-page JSON document.
    * Namely, newlines and quotes are properly converted.
    */
    private function getCleanParselyPageValue($val) {
        if (is_string($val)) {
            $val = str_replace("\n", "", $val);
            $val = str_replace("\r\n", "", $val);
            $val = str_replace("\"", "&#34;", $val);
            $val = str_replace("\'", "&#39;", $val);
            return $val;
        } else {
            return $val;
        }
    }
    
    private function getSettingsURL() {
        return admin_url('options-general.php?page='.$this->MENU_SLUG);
    }
}
?>