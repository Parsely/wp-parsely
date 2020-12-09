# Parse.ly #
The Parse.ly plugin real-time and historical analytics to your content through a platform designed and built for digital publishing.

## Description ##

Designed and built for digital publishers, Parse.ly helps you understand how your audience is connecting to your content.

Thousands of writers, editors, site managers, and technologists already use Parse.ly to understand what content draws in website visitors, and why. Using our powerful dashboards and APIs, customers build successful digital strategies that allow them to grow and engage a loyal audience.

Join industry leaders -- like Mashable, Slate, News Corp, and Conde Nast -- who already use Parse.ly to bring clarity to content, audience, and analytics.

**Features**

* Get started with Parse.ly right away: the plugin automatically inserts the required parsely-page tag and JavaScript on all your published pages and posts.
* Allows you to specify the JavaScript implementation to use: standard, DOM free or asynchronous.
* If you've purchased access to the Parse.ly API, add a widget to your site with story recommendations personalized to individual users.

Feedback, suggestions, questions or concerns? E-mail us at [support@parsely.com](mailto:support@parsely.com) we always want to hear from you.

## Installation ##

1. This plug-in requires an active version of Parse.ly. We offer a free trial, [sign up here](http://www.parsely.com/trial/?utm_medium=referral&utm_source=wordpress.org&utm_content=wp-parsely)
1. If you haven't already done so, [sign up for a trial of Parse.ly](http://www.parsely.com/trial/?utm_medium=referral&utm_source=wordpress.org&utm_content=wp-parsely)
1. Download the plugin
1. Upload the entire `wp-parsely` folder to your `/wp-content/plugins` directory
1. Activate the plugin through the 'Plugins' menu in WordPress (look for "Parse.ly")
1. Head to the settings page for the plugin (should be /wp-admin/options-general.php?page=parsely)
1. Set your Site ID, which is your own site domain name (e.g., `mysite.com`)
1. Save your changes and enjoy your data!

**NOTE:** This plugin does not currently support dynamic tracking (the tracking of multiple pageviews on a single page). Some common use-cases for dynamic tracking are slideshows or articles loaded via AJAX calls in single-page applications -- situations in which new content is loaded without a full page refresh. Tracking these events requires manually implementing additional JavaScript above [the standard Parse.ly include](http://www.parsely.com/help/integration/basic/) that the plugin injects into your page source. Please consult [the Parse.ly documentation on dynamic tracking](https://www.parsely.com/help/integration/dynamic/) for instructions on implementing dynamic tracking, or contact Parse.ly support for additional assistance.

Feedback, suggestions, questions or concerns? E-mail us at [support@parsely.com](mailto:support@parsely.com) -- we always want to hear from you.

## Tests ##

1. Follow the steps to install VirtualBox, Vagrant and `vagrant-hostsupdater` at [http://vccw.cc/](http://vccw.cc/).
1. Navigate to the directory on your host machine to which you downloaded vccw.
1. Within that directory, navigate to `www/wordpress/wp-content/plugins` and clone this repo -- `git clone https://github.com/Parsely/wp-parsely.git`
1. Checkout the branch on which you've been working
1. Navigate back up to the root of the `vccw` directory and run `vagrant up`
1. Ssh into the Vagrant machine with `vagrant ssh`
1. Delete extra wordpress files in /tmp with `rm -rf /tmp/wordpress*` (see this issue for context: https://github.com/wp-cli/wp-cli/issues/1938)
1. Run the test init script, if you haven't already: `bash bin/install-wp-tests.sh wptest root <db password>`
1. Navigate to `/var/www/wordpress/wp-content/plugins/wp-parsely` and run the test suite with the command `phpunit`


## Frequently Asked Questions ##

### Where do I find my Site ID? ###

Your Site ID is your own site domain name (e.g., `mysite.com`).

### Why can't I see Dash code on my post when I preview? ###

Dash code will only be placed on pages and posts which have been published in WordPress to ensure we don't track traffic generated while you're still writing a post/page.

### How can I edit the values passed to the JSON-LD metadata? ###

You can use the `after_set_parsely_page` filter, which sends three arguments: the array of metadata, the post object, and the `parselyOptions` array:

```
function filter_parsely_page($parselyPage, $post, $parselyOptions ) {
  $parselyPage['articleSection'] = ; // whatever values you want Parse.ly's Section to be
  return $parselyPage;
}

add_filter( 'after_set_parsely_page', 'filter_parsely_page', 10, 3);
```

This filter can go anywhere in your codebase, provided it always gets loaded. We recommend putting it in your header file, so that it gets loaded with wp_head.

### Is the plugin Google AMP/Facebook Instant ready?

It is! We are hooked into Automattic's official plugins for AMP and Facebook Instant. AMP support is enabled automatically if the Automattic AMP plugin is installed, and for Facebook Instant you just have to enable "Parsely Analytics" in the "Advanced Settings" menu of the Facebook Instant Articles plugin.

Official AMP plugin: https://wordpress.org/plugins/amp/  
Official FB Instant plugin: https://wordpress.org/plugins/fb-instant-articles/

### How do I create a local dev environment to make changes to the `wp-parsely` code? ###

See [the wiki](https://github.com/Parsely/wp-parsely/wiki/Setting-up-a-WP-plugin-development-environment).

## Screenshots ##

#### 1. The main settings screen of the wp-parsely plugin ####
![1. The main settings screen of the wp-parsely plugin](https://raw.githubusercontent.com/Parsely/wp-parsely/master/screenshot-1.png)

#### 2. The standard JavaScript include being inserted before `</body>` ####
![2. The standard JavaScript include being inserted before body tag](https://raw.githubusercontent.com/Parsely/wp-parsely/master/screenshot-2.png)

#### 3. A sample `JSON-LD` meta tag for a home page or section page ####
![3. A sample `JSON-LD` meta tag for a home page or section page](https://raw.githubusercontent.com/Parsely/wp-parsely/master/json-ld-section-screenshot.png)

#### 4. A sample `JSON-LD` meta tag for an article or post ####
![4. A sample `JSON-LD` meta tag for an article or post](https://raw.githubusercontent.com/Parsely/wp-parsely/master/json-ld-screenshot.png)

## Changelog ##

### 2.0 ###
* Changes JavaScript integration to directly load tracker bundles that are customized for your specific site ID: https://www.parse.ly/help/integration/basic/. NOTE: Sites that have custom Parse.ly video tracking configured (outside of the Parse.ly WordPress plugin) for a player listed at https://www.parse.ly/help/integration/video_v2/#supported-players should contact support@parsely.com before upgrading.

### 1.14 ###
* Updates AMP analytics implementation
* Adds ability to use a horizontal layout of the widget (for page footers)
* Adds itm campaign parameters to widget links for tracking performance
* Adds option to use original or resized thumbnail in widget
* Improves handling of missing taxonomy terms and other data
* Improves post status check
* Code cleanup to conform to WordPress VIP standards

### 1.13 ###
* Makes AMP integration optional
* Adds support for publisher logo information
* Minor bugfixes

### 1.12 ###
* Adds ability to use repeated meta tags instead of ld+json tags for metadata
* Code cleanup to conform to WordPress VIP standards
* Minor bugfixes

### 1.11 ###
* Adds ability to use Parsely API with widget
* Adds ability to track or not track custom page and post types
* Adds ability to disable Javascript tracking
* Minor bugfixes

### 1.10 ###
* Adds ability to filter final JSON-LD output
* Adds the ability to use a custom taxonomy as tags
* Adds AMP / Facebook Instant integration with official AMP / FBIA plugins from Automattic
* Fixes bug related to HTTPS canonicals

### 1.9 ###
* Ability to assign custom taxonomies as section
* Bug fix related to adding section to tag field

### 1.8 ###
* Updated documentation for installation and local development
* Allow developers to adjust the tag list and the category reported for a post
* Added support for themes to extend the reported authors

### 1.7 ###
* Use JSON-LD / schema.org for parsely-page data instead of proprietary format
* Added support for multiple authors if using the Co-Authors Plus plugin https://wordpress.org/plugins/co-authors-plus/

### 1.6 ###
* Maintenance release with multiple changes needed for WordPress VIP inclusion
* Migrated to WP Settings API
* Various syntax changes in line with Automattic's guidelines
* Removed the tracker_implementation option, plugin now uses Standard implementation for all installs
* Updated much of the copy in settings page
* Updated screenshots

### 1.5 ###
* Added support for new option - "Use Categories as Tags"
* Fixed bug that caused wp-admin bar to be hidden when "Do not track authenticated in users" was selected
* Fixed WP category logic bug that failed on users with custom post types

### 1.4 ###
* Added early support for post tags
* Fixed permalink errors on category/author/tag pages
* Added version output to both templates and settings pages
* Renamed API key to Site ID to avoid confusion

### 1.3 ###
* Added option to not track or not track authenticated users (default is to not track authenticated users)
* Removed async implementation option
* Updated API key retrieval instructions
* Added activation/deactivation hooks
* null categories are now set to "Uncategorized"

### 1.2 ###
* Support for using top-level categories for posts instead of the first active post the plugin finds
* parsely-page meta tag now outputs it's value using 'content' attribute instead of 'value'
* Minor fixes to outputting to use proper WordPress functions

### 1.1 ###
* Added ability to add prefix to content IDs
* Ensured plugin only uses long tags `<?php` instead of `<?`
* Security updates to prevent HTML/JavaScript injection attacks (values are now sanitized)
* Better error checking of values for API key / implementation method
* Bug fixes

### 1.0 ###
* Initial version
* Support for parsely-page and JavaScript on home page and published pages and posts as well as archive pages (date/author/category/tag)

