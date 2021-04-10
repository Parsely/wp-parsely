# Parse.ly

Stable tag: trunk  
Requires at least: 4.0  
Tested up to: 5.6  
Requires PHP: 5.6  
License: GPLv2 or later  
Tags: analytics, post, page  
Contributors: parsely_mike

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

## Frequently Asked Questions

### Where do I find my Site ID?

Your Site ID is your own site domain name (e.g., `mysite.com`).

### Why can't I see Dash code on my post when I preview?

Dash code will only be placed on pages and posts which have been published in WordPress to ensure we don't track traffic generated while you're still writing a post/page.

### How can I edit the values passed to the JSON-LD metadata?

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

### How do I create a local dev environment to make changes to the `wp-parsely` code?

See [the wiki](https://github.com/Parsely/wp-parsely/wiki/Setting-up-a-WP-plugin-development-environment).

## Screenshots

1. The main settings screen of the wp-parsely plugin  
![The main settings screen of the wp-parsely plugin](.wordpress-org/screenshot-1.png)

2. The standard JavaScript include being inserted before `</body>`
![2. The standard JavaScript include being inserted before body tag](.wordpress-org/screenshot-2.png)

3. A sample `JSON-LD` meta tag for a home page or section page
![3. A sample `JSON-LD` meta tag for a home page or section page](.wordpress-org/screenshot-3.png)

4. A sample `JSON-LD` meta tag for an article or post
![4. A sample `JSON-LD` meta tag for an article or post](.wordpress-org/screenshot-4.png)

## Changelog

See the [change log](https://github.com/parsely/wp-parsely/blob/master/CHANGELOG.md).
