# Parse.ly

Stable tag: 2.4.1
Requires at least: 4.0  
Tested up to: 5.6  
Requires PHP: 5.6  
License: GPLv2 or later  
Tags: analytics, post, page  
Contributors: parsely, hbbtstar, jblz, mikeyarce, GaryJ, parsely_mike

The Parse.ly plugin real-time and historical analytics to your content through a platform designed and built for digital publishing.

## Description

Designed and built for digital publishers, Parse.ly helps you understand how your audience is connecting to your content.

Thousands of writers, editors, site managers, and technologists already use Parse.ly to understand what content draws in website visitors, and why. Using our powerful dashboards and APIs, customers build successful digital strategies that allow them to grow and engage a loyal audience.

Join industry leaders -- like Mashable, Slate, News Corp, and Conde Nast -- who already use Parse.ly to bring clarity to content, audience, and analytics.

### Features

- Get started with Parse.ly right away: the plugin automatically inserts the required parsely-page tag and JavaScript on all your published pages and posts.
- Allows you to specify the JavaScript implementation to use: standard, DOM free or asynchronous.
- If you've purchased access to the Parse.ly API, add a widget to your site with story recommendations personalized to individual users.

Feedback, suggestions, questions or concerns? E-mail us at [support@parsely.com](mailto:support@parsely.com) we always want to hear from you.

## Installation

The plugin requires an active Parse.ly account. Parse.ly gives creators, marketers, and developers the tools to understand content performance, prove content value, and deliver tailored content experiences that drive meaningful results.
[Sign up for a free trial of Parse.ly](http://www.parsely.com/trial/?utm_medium=referral&utm_source=wordpress.org&utm_content=wp-parsely)

### Install WP-Parsely from within WordPress
1. Visit the Plugins page from your WordPress dashboard and click "Add New" at the top of the page.
1. Search for "parse.ly" using the search bar on the right side.
1. Click "Install Now" to install the plugin.
1. After it's installed, click "Activate" to activate the plugin on your site. 

### Install WP-Parsely manually

1. Download the plugin from WordPress.org or get the latest release from our [Github Releases page](https://github.com/Parsely/wp-parsely/releases).
1. Unzip the downloaded archive.
1. Upload the entire `wp-parsely` folder to your `/wp-content/plugins` directory.
1. Visit the the Plugins page from your WordPress dashboard and look for the newly installed Parse.ly plugin.
1. Click "Activate" to activate the plugin on your site.

**NOTE:** This plugin does not currently support dynamic tracking (the tracking of multiple pageviews on a single page). Some common use-cases for dynamic tracking are slideshows or articles loaded via AJAX calls in single-page applications -- situations in which new content is loaded without a full page refresh. Tracking these events requires manually implementing additional JavaScript above [the standard Parse.ly include](http://www.parsely.com/help/integration/basic/) that the plugin injects into your page source. Please consult [the Parse.ly documentation on dynamic tracking](https://www.parsely.com/help/integration/dynamic/) for instructions on implementing dynamic tracking, or contact Parse.ly support for additional assistance.

Feedback, suggestions, questions or concerns? E-mail us at [support@parsely.com](mailto:support@parsely.com) -- we always want to hear from you.

## Frequently Asked Questions

### Where do I find my Site ID?

Your Site ID is your own site domain name (e.g., `mysite.com`).

### Why can't I see Dash code on my post when I preview?

Dash code will only be placed on pages and posts which have been published in WordPress to ensure we don't track traffic generated while you're still writing a post/page.

### How can I edit the values passed to the JSON-LD metadata?

You can use the `after_set_parsely_page` filter, which sends three arguments: the array of metadata, the post object, and the `parselyOptions` array:

    add_filter( 'after_set_parsely_page', 'filter_parsely_page', 10, 3 );
    function filter_parsely_page( $parselyPage, $post, $parselyOptions ) {
        $parselyPage['articleSection'] = '...'; // Whatever values you want Parse.ly's Section to be.
				
        return $parselyPage;
    }

This filter can go anywhere in your codebase, provided it always gets loaded. We recommend putting it in your header file, so that it gets loaded with wp_head.

### Is the plugin Google AMP/Facebook Instant ready?

It is! We are hooked into Automattic's official plugins for AMP and Facebook Instant. AMP support is enabled automatically if the Automattic AMP plugin is installed, and for Facebook Instant you just have to enable "Parsely Analytics" in the "Advanced Settings" menu of the Facebook Instant Articles plugin.

Official AMP plugin: https://wordpress.org/plugins/amp/  
Official FB Instant plugin: https://wordpress.org/plugins/fb-instant-articles/

### How do I create a local dev environment to make changes to the `wp-parsely` code?

See [the wiki](https://github.com/Parsely/wp-parsely/wiki/Setting-up-a-WP-plugin-development-environment).

## Screenshots

1. The main settings screen of the Parse.ly plugin.  
![The main settings screen of the wp-parsely plugin](.wordpress-org/screenshot-1.png)

2. The settings for the Parse.ly Recommended Widget.  Engage your visitors with predictive and personalized recommendations from Parse.ly.  
![The settings for the Parse.ly Recommended Widget](.wordpress-org/screenshot-2.png)
   
3. A view of the Parse.ly Dashboard Overview. Parse.ly offers analytics that empowers you to better understand how your content is peforming.  
![The Parsely Dashboard Overview](.wordpress-org/screenshot-3.png)
   
## Sample Parse.ly metadata

The standard Parse.ly JavaScript tracker inserted before the closing `body` tag:

    <!-- START Parse.ly Include: Standard -->

       <script data-cfasync="false" id="parsely-cfg" data-parsely-site="example.com" src="https://cdn.parsely.com/keys/example.com/p.js"></script>

    <!-- END Parse.ly Include: Standard -->

A sample `JSON-LD` meta tag and structured data for a home page or section page:

    <!-- BEGIN wp-parsely Plugin Version 2.5.0 -->
        <meta name="wp-parsely_version" id="wp-parsely_version" content="2.3"/>
            <script type="application/ld+json">
                {"@context":"http:\/\/schema.org","@type":"WebPage","headline":"WordPress VIP","url":"http:\/\/wpvip.com\/"}
            </script>
    <!-- END wp-parsely Plugin Version 2.5.0 -->

A sample `JSON-LD` meta tag and structured data for an article or post:

    <script type="application/ld+json">
        {"@context":"http:\/\/schema.org","@type":"NewsArticle","mainEntityOfPage":{"@type":"WebPage","@id":"http:\/\/wpvip.com\/2021\/04\/09\/how-the-wordpress-gutenberg-block-editor-empowers-enterprise-content-creators\/"},"headline":"How the WordPress Gutenberg Block Editor Empowers Enterprise Content Creators","url":"http:\/\/wpvip.com\/2021\/04\/09\/how-the-wordpress-gutenberg-block-editor-empowers-enterprise-content-creators\/","thumbnailUrl":"https:\/\/wpvip.com\/wp-content\/uploads\/2021\/04\/ladyatdesk.png?w=120","image":{"@type":"ImageObject","url":"https:\/\/wpvip.com\/wp-content\/uploads\/2021\/04\/ladyatdesk.png?w=120"},"dateCreated":"2021-04-09T15:13:13Z","datePublished":"2021-04-09T15:13:13Z","dateModified":"2021-04-09T15:13:13Z","articleSection":"Gutenberg","author":[{"@type":"Person","name":"Sam Wendland"}],"creator":["Sam Wendland"],"publisher":{"@type":"Organization","name":"The Enterprise Content Management Platform | WordPress VIP","logo":"https:\/\/wpvip.com\/wp-content\/uploads\/2020\/11\/cropped-favicon-dark.png"},"keywords":[]}
    </script>

## Changelog

See the [change log](https://github.com/parsely/wp-parsely/blob/master/CHANGELOG.md).
