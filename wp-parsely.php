<?php
/*
Plugin Name: Parse.ly - Dash
Plugin URI: http://www.parsely.com/
Description: This plugin makes it snap to add Parse.ly tracking code to your WordPress blog.
Author: Mike Sukmanowsky (mike@parsely.com)
Version: 1.1
Requires at least: 3.0.0
Author URI: http://www.parsely.com/
License: GPL2

Copyright 2012  Parsely Incorporated

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

Authors: Mike Sukmanowsky (mike@parsely.com)
*/

/* TODO List:
 * Wordpress Network support
 * register_activation_hook(), register_deactivation_hook(), register_uninstall_hook()
 * Add proper URL for updates and such
 * Allow the user to map get_post_types() to Parse.ly post types
 * Option to not track logged in users
 * Add unit/functional tests
 * Support: is_search(), is_404()
 * Test pagination
 * Figure out if pages should be "posts" or stay the way they are
 * Figure out how to deal with hierarchical categories
*/

if (class_exists('Parsely')) {
    define('PARSELY_VERSION', Parsely::$VERSION);
    $parsely = new Parsely();
}

class Parsely {
    public static $VERSION      = "1.1";
    
    private $NAME;
    private $MENU_SLUG              = "parsely-dash";               // Defines the page param passed to options-general.php
    private $MENU_TITLE             = "Parse.ly - Dash";            // Text to be used for the menu as seen in Settings sub-menu
    private $MENU_PAGE_TITLE        = "Parse.ly - Dash > Settings"; // Text shown in <title></title> when the settings screen is viewed
    private $OPTIONS_KEY            = "parsely";                    // Defines the key used to store options in the WP database
    private $CAPABILITY             = "manage_options";             // The capability required for the user to administer settings

    public $IMPLEMENTATION_OPTS     = array("standard" => "Standard", "dom_free" => "DOM-Free", "async" => "Asynchronous");
    
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
    	
    	$errors = array();
    	$valuesSaved = false;
    	$options = get_option($this->OPTIONS_KEY);
    	
    	if (isset($_POST["isParselySettings"]) && $_POST["isParselySettings"] == 'Y') {
    	    if (empty($_POST["apikey"])) {
    	        array_push($errors, "API Key cannot be blank.  Please specify a value.");
    	    } else {
    	        $options["apikey"] = sanitize_text_field($_POST["apikey"]);
    	    }

    	    if (!in_array($_POST["tracker_implementation"], array_keys($this->IMPLEMENTATION_OPTS))) {
    	        array_push($errors, "Invalid tracker implementation value specified " . $options["tracker_implementation"] . ". Must be one of: " . join(", ", array_keys($this->IMPLEMENTATION_OPTS))). ".";
    	    } else {
    	        $options["tracker_implementation"] = sanitize_text_field($_POST["tracker_implementation"]);
    	    }

    	    $options["content_id_prefix"] = sanitize_text_field($_POST["content_id_prefix"]);
    	    
    	    if (empty($errors)) {
    	        update_option($this->OPTIONS_KEY, $options);
    	        $valuesSaved = true;
    	    }
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
                <p><strong>Parse.ly - Dash is not active.</strong> You need to <a href='<?php echo $this->getSettingsURL(); ?>'>provide 
                    your Parse.ly Dash API key</a> before things get cooking.
                </p>
            </div>
            <?php
        }
    }
    
    /**
    * Actually inserts the code for the <meta name='parsely-page'> parameter within the <head></head> tag.
    */
    public function insertParselyPage() {
        $parselyOptions = get_option($this->OPTIONS_KEY);
        // If we don't have an API key, there's no need to proceed.
        if (!isset($parselyOptions['apikey']) || empty($parselyOptions['apikey'])) {
            return "";
        }
        
        global $wp_query;
        global $post;
        $parselyPage = array();
        
        if (is_single() && $post->post_status == "publish") {
            $author     = get_user_meta($post->post_author, 'first_name', true) . " " . get_user_meta($post->post_author, 'last_name', true);
            $category   = get_the_category();
            $category   = $category[0];
            $postId     = (string)get_the_ID();
            
            if (isset($parselyOptions["content_id_prefix"]) && !empty($parselyOptions["content_id_prefix"])) {
                $postId = $parselyOptions["content_id_prefix"] . $postId;
            }
            
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
            $parselyPage["post_id"]     = $parselyOptions["content_id_prefix"] . (string)get_the_ID();
            $parselyPage["pub_date"]    = gmdate("Y-m-d\TH:i:s\Z", get_post_time('U', true));
            $parselyPage["section"]     = $this->getCleanParselyPageValue($category->name);
            $parselyPage["author"]      = $this->getCleanParselyPageValue($author);
        } elseif (is_page() && $post->post_status == "publish") {
            $parselyPage["type"]        = "sectionpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue(get_the_title());
            $parselyPage["link"]        = get_permalink();
        } elseif (is_author()) {
            // TODO: why can't we have something like a WP_User object for all the other cases? Much nicer to deal with than functions
            $author = (get_query_var('author_name')) ? get_user_by('slug', get_query_var('author_name')) : get_userdata(get_query_var('author'));
            $parselyPage["type"]        = "sectionpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue("Author - ".$author->data->display_name);
            $parselyPage["link"]        = get_author_posts_url($author->ID);
        } elseif (is_category()) {
            $category = get_the_category();
            $category = $category[0];
            $parselyPage["type"]        = "sectionpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue($category->name);
            $parselyPage["link"]        = get_category_link($category->cat_ID);
        } elseif (is_date()) {
            $parselyPage["type"]        = "sectionpage";
            if (is_year()) {
                $parselyPage["title"]   = "Yearly Archive - " . get_the_time('Y');
            } elseif(is_month()) {
                $parselyPage["title"]   = "Monthly Archive - " . get_the_time('F, Y');
            } elseif (is_day()) {
                $parselyPage["title"]   = "Daily Archive - " . get_the_time('F jS, Y');
            } elseif (is_time()) {
                $parselyPage["title"]   = "Hourly, Minutely, or Secondly Archive - " . get_the_time('F jS g:i:s A');
            }
            $parselyPage["link"]        = $this->getCurrentURL();
        } elseif (is_tag()) {
            $tag = single_tag_title('', FALSE);
            if (empty($tag)) {
                $tag = single_term_title('', FALSE);
            }
            $parselyPage["type"]        = "sectionpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue("Tagged - ".$tag);
            $parselyPage["link"]        = get_tag_link(get_query_var('tag_id'));
        } elseif (is_front_page()) {
            $parselyPage["type"]        = "frontpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue(get_bloginfo("name", "raw"));
            $parselyPage["link"]        = home_url(); // site_url();?
        }
        
        ?><meta name='parsely-page' value='<?php echo json_encode($parselyPage); ?>' /><?php
    }
    
    /** 
    * Inserts the JavaScript code required to send off beacon requests
    */
    public function insertParselyJS() {
        $parselyOptions = get_option($this->OPTIONS_KEY);
        // If we don't have an API key, there's no need to proceed.
        if (!isset($parselyOptions['apikey']) || empty($parselyOptions['apikey'])) {
            return "";
        }
        
        global $post;
        $display = TRUE;
        
        if (is_single() && $post->post_status != "publish") { $display = FALSE; }
        if ($display) {
            include("parsely-javascript.php");
        }
    }
    
    /** 
    * TODO: figure out the actual classes to use for this or just create our own CSS for a green success message
    */
    public function printSuccessMessage($message) {
        ?>
        <div class='success'>
            <p><strong><?php esc_html_e($message); ?></strong></p>
        </div>
        <?php
    }
    
    public function printErrorMessage($message) {
        ?>
        <div id='message' class='error'>
            <p><strong><?php esc_html_e($message); ?></strong></p>
        </div>
        <?php
    }
    
    public function printSelectTag($name, $options, $selectedOption="") {
        $tag = '<select name="'.esc_attr($name).'" id="'.esc_attr($name).'">';
        foreach ($options as $key => $val) {
            $tag .= '<option value="'.esc_attr($key).'"';            
            if ($selectedOption == $key) { $tag .= ' selected="selected"'; }
            $tag .= '>'.esc_html($val).'</option>';
        }
        $tag .= '</select>';
        echo $tag;
    }
    
    public function printTextTag($name, $value, $options=array()) {
        $tag = '<input type="text" name="' . esc_attr($name). '" id="' . esc_attr($name) . '" value="' . esc_attr($value) . '"';
        foreach ($options as $key => $val) {
            $tag .= ' ' . esc_attr($key) . '="' . esc_attr($val) . '"';
        }
        $tag .= ' />';
        echo $tag;
    }
        
    /**
    * Attempts to clean up some of the typical caveats with values in the parsely-page JSON document.
    * Namely, newlines and quotes are properly converted.
    */
    private function getCleanParselyPageValue($val) {
        if (is_string($val)) {
            $val = str_replace("\n", "", $val);
            $val = str_replace("\r", "", $val);
            $val = str_replace("\"", "&#34;", $val);
            $val = str_replace("\'", "&#39;", $val);
            return $val;
        } else {
            return $val;
        }
    }
    
    /**
    * Get the URL of the plugin settings page.
    */
    private function getSettingsURL() {
        return admin_url('options-general.php?page='.$this->MENU_SLUG);
    }
    
    /**
    * Gets the URL of the current PHP script.  This is a backup which is used in special cases where Wordpress doesn't let
    * us ask for a "permalink" of some kind.
    */
    private function getCurrentURL() {
        $pageURL = 'http';
        if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
        $pageURL .= "://";
        if ($_SERVER["SERVER_PORT"] != "80") {
         $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
        } else {
         $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
        }
        return esc_url($pageURL);
    }
}
?>