<?php
/*
Plugin Name: Parse.ly - Dash
Plugin URI: http://www.parsely.com/
Description: This plugin makes it a snap to add Parse.ly tracking code to your WordPress blog.
Author: Mike Sukmanowsky (mike@parsely.com)
Version: 1.5
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
 * Wordpress Network support - going to hold off on any specific support here as content id prefix should work ok for now
 * Allow the user to map get_post_types() to Parse.ly post types
 * Add unit/functional tests
 * Support: is_search(), is_404()
*/

class Parsely {
    public static $VERSION          = "1.5";

    private $NAME;
    private $MENU_SLUG              = "parsely-dash";               // Defines the page param passed to options-general.php
    private $MENU_TITLE             = "Parse.ly - Dash";            // Text to be used for the menu as seen in Settings sub-menu
    private $MENU_PAGE_TITLE        = "Parse.ly - Dash > Settings"; // Text shown in <title></title> when the settings screen is viewed
    private $OPTIONS_KEY            = "parsely";                    // Defines the key used to store options in the WP database
    private $CAPABILITY             = "manage_options";             // The capability required for the user to administer settings
    private $OPTION_DEFAULTS        = array("apikey" => "",
                                            "tracker_implementation" => "standard",
                                            "content_id_prefix" => "",
                                            "use_top_level_cats" => false,
                                            "child_cats_as_tags" => false,
                                            "track_authenticated_users" => true,
                                            "lowercase_tags" => true);
    private $CATEGORY_DELIMITER     = "~-|@|!{-~";

    public $IMPLEMENTATION_OPTS     = array("standard" => "Standard",
                                            "dom_free" => "DOM-Free");

    /* PHP4 Constructor */
    function Parsely() {
        $this->__construct();
    }

    /* PHP5 Constructor */
    function __construct() {
        $this->NAME = plugin_basename(__FILE__);

        // Run upgrade options if they exist for the version currently defined
        $options = $this->getOptions();
        if (empty($options["plugin_version"]) || $options["plugin_version"] != Parsely::$VERSION) {
            $method = "upgradePluginToVersion" . str_replace(".", "_", Parsely::$VERSION);
            if (method_exists($this, $method)) {
                call_user_func_array(array($this, $method), array($options));
            }
            // Update our version info
            $options["plugin_version"] = Parsely::$VERSION;
            update_option($this->OPTIONS_KEY, $options);
        }

        // admin_menu and a settings link
        add_action('admin_menu', array(&$this, 'addSettingsSubMenu'));
        add_filter('plugin_action_links_' . $this->NAME,
                   array(&$this, 'addPluginMetaLinks'));

        // display warning when plugin hasn't been configured
        add_action('admin_footer', array(&$this, 'displayAdminWarning'));

        // inserting parsely code
        add_action('wp_head', array(&$this, 'insertParselyPage'));
        add_action('wp_footer', array(&$this, 'insertParselyJS'));
    }

    /* Parsely settings page in Wordpress settings menu. */
    public function addSettingsSubMenu() {
        add_options_page($this->MENU_PAGE_TITLE,
                         $this->MENU_TITLE,
                         $this->CAPABILITY,
                         $this->MENU_SLUG,
                         array(&$this, 'displaySettings'));
    }

    /* Dash settings screen (options-general.php?page=[MENU_SLUG]) */
    public function displaySettings() {
        if (!current_user_can($this->CAPABILITY)) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }

        $errors = array();
        $valuesSaved = false;

        // Pull our options and merge with defaults to avoid PHP warnings
        // about array indexes that don't exist
        $options = $this->getOptions();

        if (isset($_POST["isParselySettings"]) && $_POST["isParselySettings"] == 'Y') {
            if (empty($_POST["apikey"])) {
                array_push($errors, "Please specify the Site ID");
            } else {
                $options["apikey"] = sanitize_text_field($_POST["apikey"]);
            }

            if (!in_array($_POST["tracker_implementation"], array_keys($this->IMPLEMENTATION_OPTS))) {
                array_push($errors, "Invalid tracker implementation value specified " . $options["tracker_implementation"] . ". Must be one of: " . join(", ", array_keys($this->IMPLEMENTATION_OPTS))). ".";
            } else {
                $options["tracker_implementation"] = sanitize_text_field($_POST["tracker_implementation"]);
            }

            $options["content_id_prefix"] = sanitize_text_field($_POST["content_id_prefix"]);

            if ($_POST["use_top_level_cats"] !== "true" && $_POST["use_top_level_cats"] !== "false") {
                array_push($errors, "Value passed for use_top_level_cats must be either 'true' or 'false'.");
            } else {
                $options["use_top_level_cats"] = $_POST["use_top_level_cats"] === "true" ? true : false;
            }

            if ($_POST["child_cats_as_tags"] !== "true" && $_POST["child_cats_as_tags"] !== "false") {
                array_push($errors, "Value passed for child_cats_as_tags must be either 'true' or 'false'.");
            } else {
                $options["child_cats_as_tags"] = $_POST["child_cats_as_tags"] === "true" ? true : false;
            }

            if ($_POST["track_authenticated_users"] !== "true" && $_POST["track_authenticated_users"] !== "false") {
                array_push($errors, "Value passed for track_authenticated_users must be either 'true' or 'false'.");
            } else {
                $options["track_authenticated_users"] = $_POST["track_authenticated_users"] === "true" ? true : false;
            }

            if ($_POST["lowercase_tags"] !== "true" && $_POST["lowercase_tags"] !== "false") {
                array_push($errors, "Value passed for lowercase_tags must be either 'true' or 'false'.");
            } else {
                $options["lowercase_tags"] = $_POST["lowercase_tags"] === "true" ? true : false;
            }

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
        $options = $this->getOptions();
        if (!isset($options['apikey']) || empty($options['apikey'])) {
            ?>
            <div id='message' class='error'>
                <p>
                    <strong>Parse.ly - Dash plugin is not active.</strong>
                    You need to
                    <a href='<?php echo $this->getSettingsURL(); ?>'>
                        provide your Parse.ly Dash Site ID
                    </a>
                    before things get cooking.
                </p>
            </div>
            <?php
        }
    }

    /**
    * Actually inserts the code for the <meta name='parsely-page'> parameter within the <head></head> tag.
    */
    public function insertParselyPage() {
        $parselyOptions = $this->getOptions();

        // If we don't have an API key or if we aren't supposed to show to logged in users, there's no need to proceed.
        if (empty($parselyOptions['apikey']) || (!$parselyOptions['track_authenticated_users'] && is_user_logged_in())) {
            return "";
        }

        global $wp_query;
        global $post;
        $parselyPage = array();
        $currentURL = $this->getCurrentURL();
        if (is_single() && $post->post_status == "publish") {
            $author     = $this->getAuthorName($post);
            $category   = $this->getCategoryName($post, $parselyOptions);
            $postId     = $parselyOptions["content_id_prefix"] . (string)get_the_ID();

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
            $parselyPage["post_id"]     = $postId;
            $parselyPage["pub_date"]    = gmdate("Y-m-d\TH:i:s\Z", get_post_time('U', true));
            $parselyPage["section"]     = $category;
            $parselyPage["author"]      = $author;
            $parselyPage["tags"]        = array_merge($this->getTagsAsString($post->ID, $parselyOptions),
                                                      $this->getCategoriesAsTags($post, $parselyOptions));
        } elseif (is_page() && $post->post_status == "publish") {
            $parselyPage["type"]        = "sectionpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue(get_the_title());
            $parselyPage["link"]        = get_permalink();
        } elseif (is_author()) {
            // TODO: why can't we have something like a WP_User object for all the other cases? Much nicer to deal with than functions
            $author = (get_query_var('author_name')) ? get_user_by('slug', get_query_var('author_name')) : get_userdata(get_query_var('author'));
            $parselyPage["type"]        = "sectionpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue("Author - ".$author->data->display_name);
            $parselyPage["link"]        = $currentURL;
        } elseif (is_category()) {
            $category = get_the_category();
            $category = $category[0];
            $parselyPage["type"]        = "sectionpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue($category->name);
            $parselyPage["link"]        = $currentURL;
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
            $parselyPage["link"]        = $currentURL;
        } elseif (is_tag()) {
            $tag = single_tag_title('', FALSE);
            if (empty($tag)) {
                $tag = single_term_title('', FALSE);
            }
            $parselyPage["type"]        = "sectionpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue("Tagged - ".$tag);
            $parselyPage["link"]        = $currentURL; // get_tag_link(get_query_var('tag_id'));
        } elseif (is_front_page()) {
            $parselyPage["type"]        = "frontpage";
            $parselyPage["title"]       = $this->getCleanParselyPageValue(get_bloginfo("name", "raw"));
            $parselyPage["link"]        = home_url(); // site_url();?
        }
        include("parsely-parsely-page.php");
    }

    /**
    * Inserts the JavaScript code required to send off beacon requests
    */
    public function insertParselyJS() {
        $parselyOptions = $this->getOptions();
        // If we don't have an API key, there's no need to proceed.
        if (empty($parselyOptions['apikey'])) {
            return "";
        }

        global $post;
        $display = TRUE;

        if (is_single() && $post->post_status != "publish") {
            $display = FALSE;
        }
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
            <p><strong><?php echo esc_html($message); ?></strong></p>
        </div>
        <?php
    }

    public function printErrorMessage($message) {
        ?>
        <div id='message' class='error'>
            <p><strong><?php echo esc_html($message); ?></strong></p>
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
    * Extracts a host (not TLD) from a URL
    */
    private function getHostFromUrl($url) {
        if (preg_match("/^https?:\/\/([^\/]+)\/.*$/", $url, $matches)) {
            return $matches[1];
        } else {
            return $url;
        }
    }
    /**
    * Outputs a checkbox tag to the page.
    */
    public function printCheckboxTag($name, $value, $options=array()) {
        $value = $value === true ? "true" : "false";
        $tag = '<input type="checkbox" name="' . esc_attr($name) . '" id="' . esc_attr($name) . '" value="' . esc_attr($value) .'"';
        foreach ($options as $key => $val) {
            if ($key == "checked" && ($val === false || empty($val))) {
                continue;
            }
            $tag .= ' ' . esc_attr($key) . '="' . esc_attr($val) . '"';
        }
        $tag .= ' />';
        echo $tag;
    }

    /**
    * Returns an array of strings associated with this page or post
    */
    private function getTagsAsString($postId, $parselyOptions) {
        $wpTags = wp_get_post_tags($postId);
        $tags = array();
        foreach ($wpTags as $wpTag) :
            if ($parselyOptions["lowercase_tags"] === true) :
                $wpTag->name = strtolower($wpTag->name);
            endif;
            array_push($tags, $this->getCleanParselyPageValue($wpTag->name));
        endforeach;
        return $tags;
    }

    /**
    * Safely returns options for the plugin by assigning defaults contained in OPTION_DEFAULTS.  As soon as actual
    * options are saved, they override the defaults.  This prevents us from having to do a lot of isset() checking
    * on variables.
    */
    private function getOptions() {
        $options = get_option($this->OPTIONS_KEY);
        if ($options === false) {
            $options = $this->OPTION_DEFAULTS;
        } else {
            $options = array_merge($this->OPTION_DEFAULTS, $options);
        }
        return $options;
    }

    /**
     * Returns an array of all the child categories for the current post delimited by a '/' if instructed
     * to do so via the `child_cats_as_tags` option.
     */
    private function getCategoriesAsTags($postObj, $parselyOptions) {
        $tags = array();
        if (!$parselyOptions["child_cats_as_tags"]) {
            return $tags;
        }

        $categories = get_the_category($postObj->ID);
        $sectionName = $this->getCategoryName($postObj, $parselyOptions);

        if (empty($categories)) {
            return $tags;
        }
        foreach($categories as $category) {
            $hierarchy = get_category_parents($category, FALSE, $this->CATEGORY_DELIMITER);
            $hierarchy = explode($this->CATEGORY_DELIMITER, $hierarchy);
            $hierarchy = array_filter($hierarchy);
            if (sizeof($hierarchy) == 1 && $hierarchy[0] == $sectionName) {
                // Don't take top level categories if we're already tracking
                // using a section
                continue;
            }
            $hierarchy = join("/", $hierarchy);
            if ($parselyOptions["lowercase_tags"] === true) {
                $hierarchy = strtolower($hierarchy);
            }

            array_push($tags, $this->getCleanParselyPageValue($hierarchy));
        }
        $tags = array_unique($tags);

        return $tags;
    }

    /**
    * Returns a properly cleaned category name and will optionally use the top-level category name if so instructed
    * to via the `use_top_level_cats` option.
    */
    private function getCategoryName($postObj, $parselyOptions) {
        $category   = get_the_category($postObj->ID);

        // Customers with different post types may not have categories
        if (!empty($category)) {
            $category   = $parselyOptions["use_top_level_cats"] ? $this->getTopLevelCategory($category[0]->cat_ID) : $category[0]->name;
        } else {
            $category = "Uncategorized";
        }

        return $this->getCleanParselyPageValue($category);
    }

    /**
    * Returns the top most category in the hierarchy given a category ID.
    */
    private function getTopLevelCategory($categoryId) {
        $categories = get_category_parents($categoryId, FALSE, $this->CATEGORY_DELIMITER);
        $categories = explode($this->CATEGORY_DELIMITER, $categories);
        $topLevel = $categories[0];
        return $topLevel;
    }

    /**
    * Determine author name from display name, falling back to
    * firstname + lastname, and finally the nickname.
    */
    private function getAuthorName($postObj) {
        $author = get_user_meta($postObj->post_author, 'display_name', true);
        if (!empty($author)) {
            return $this->getCleanParselyPageValue($author);
        }

        $author = get_user_meta($postObj->post_author, 'first_name', true) . " " . get_user_meta($postObj->post_author, 'last_name', true);
        if ($author != " ") {
            return $this->getCleanParselyPageValue($author);
        }

        // This is the fall back as all users have to have nickname even if they don't have a display name
        // nickname will be their username by default
        $author = get_user_meta($postObj->post_author, 'nickname', true);
        return $this->getCleanParselyPageValue($author);
    }

    /* sanitize content
    */
    private function getCleanParselyPageValue($val) {
        if (is_string($val)) {
            $val = str_replace("\n", "", $val);
            $val = str_replace("\r", "", $val);
            $val = str_replace("\"", "&#34;", $val);
            $val = str_replace("'", "&#39;", $val);
            $val = strip_tags($val);
            $val = trim($val);
            return $val;
        } else {
            return $val;
        }
    }


    /* Get the URL of the plugin settings page */
    private function getSettingsURL() {
        return admin_url('options-general.php?page='.$this->MENU_SLUG);
    }


    /**
    * Get the URL of the current PHP script.
    * A fall-back implementation to determine permalink
    */
    private function getCurrentURL() {
        $pageURL = (is_ssl() ? "https://" : "http://");
        $pageURL .= $_SERVER['HTTP_HOST'];
        if ($_SERVER["SERVER_PORT"] != "80") {
            $pageURL .= ":".$_SERVER["SERVER_PORT"];
        }
        $pageURL .= $_SERVER["REQUEST_URI"];
        return esc_url($pageURL);
    }

    private function upgradePluginToVersion1_3($options) {
        if ($options["tracker_implementation"] == "async") {
            $options["tracker_implementation"] = $this->OPTION_DEFAULTS["tracker_implementation"];
        }
        update_option($this->OPTIONS_KEY, $options);
    }

    private function upgradePluginToVersion1_4($options) {
        $this->upgradePluginToVersion1_3($options);
    }

    private function upgradePluginToVersion1_5($options) {
        $this->upgradePluginToVersion1_4($options);
    }
}

if (class_exists('Parsely')) {
    define('PARSELY_VERSION', Parsely::$VERSION);
    $parsely = new Parsely();
}
?>
