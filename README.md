# Parse.ly #
The Parse.ly plugin real-time and historical analytics to your content through a platform designed and built for digital publishing.

## Description ##

Designed and built for digital publishers, Parse.ly helps you understand how your audience is connecting to your content.

Thousands of writers, editors, site managers, and technologists already use Parse.ly to understand what content draws in website visitors, and why. Using our powerful dashboards and APIs, customers build successful digital strategies that allow them to grow and engage a loyal audience.

Join industry leaders -- like Mashable, Slate, News Corp, and Conde Nast -- who already use Parse.ly to bring clarity to content, audience, and analytics.

**Features**

* Get started with Parse.ly right away: the plug-in automatically inserts the required parsely-page tag and JavaScript on all your published pages and posts.
* Allows you to specify the JavaScript implementation to use: standard, DOM free or asynchronous.

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

Feedback, suggestions, questions or concerns? E-mail us at [support@parsely.com](mailto:support@parsely.com) we always want to hear from you.

## Tests ##

1. Follow the steps to install VirtualBox, Vagrant and `vagrant-hostsupdater` at [http://vccw.cc/](http://vccw.cc/).
1. Navigate to the directory on your host machine to which you downloaded vccw.
1. Within that directory, navigate to `www/wordpress/wp-content/plugins` and clone this repo -- `git clone https://github.com/Parsely/wp-parsely.git`
1. Checkout the branch on which you've been working
1. Navigate back up to the root of the `vccw` directory and run `vagrant up`
1. Ssh into the Vagrant machine with `vagrant ssh`
1. Navigate to `/var/www/wordpress/wp-content/plugins/wp-parsely` and run the test suite with the command `phpunit`

## Frequently Asked Questions ##

### Where do I find my Site ID? ###

Your Site ID is your own site domain name (e.g., `mysite.com`).

### Why can't I see Dash code on my post when I preview? ###

Dash code will only be placed on pages and posts which have been published in WordPress to ensure we don't track traffic generated while you're still writing a post/page.

### How do I create a local dev environment to make changes to the `wp-parsely` code? ###

See [the wiki](https://github.com/Parsely/wp-parsely/wiki/Setting-up-a-WP-plugin-development-environment).

## Screenshots ##

#### 1. The main settings screen of the wp-parsely plugin ####
![1. The main settings screen of the wp-parsely plugin](https://s.w.org/plugins/wp-parsely/screenshot-1.png)

#### 2. The standard JavaScript include being inserted before `</body>` ####
![2. The standard JavaScript include being inserted before body tag](https://s.w.org/plugins/wp-parsely/screenshot-2.png)

#### 3. A sample `parsely-page` meta tag for a home page ####
![3. A sample `parsely-page` meta tag for a home page](https://s.w.org/plugins/wp-parsely/screenshot-3.png)

#### 4. A sample `parsely-page` meta tag for an article or post ####
![4. A sample `parsely-page` meta tag for an article or post](https://s.w.org/plugins/wp-parsely/screenshot-4.png)

## Changelog ##

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

