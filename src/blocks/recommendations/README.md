# Parse.ly Recommendations Block

This block is designed to showcase links to content on your site as provided by the [Parse.ly `/related` API endpoint](https://www.parse.ly/help/api/recommendations#get-related).

You can use the Parse.ly Recommendations Block wherever you use the WordPress Block Editor ("Gutenberg") to build your site. That means that not only can leverage this feature in single `Post`'s content (or `Page` or nearly any custom post type), you can also leverage it in the Full Site Editor's template editor [slated to debut with WordPress version 5.8](https://make.wordpress.org/core/2021/06/16/introducing-the-template-editor-in-wordpress-5-8/) to add it to various layout elements (e.g. a Header, Footer, or Sidebar).

## How to Use

- Inside the Block Editor, add the `Parse.ly Related` block via the [standard block controls](https://wordpress.org/support/article/adding-a-new-block/).
- Use the Block and Inspector Controls to configure the [block attributes](#block-attributes)

## Block Attributes

### `boost`

Passed to the API endpoint to determine how to rank prospective results.

Default: `views`

### `imagestyle`

Default: `original`

### `layoutstyle`

#### Options

- `grid`

  Display the results in a grid of cards that fills the available space horizontally and adds rows as needed.

- `list`

  Display the results in a vertically-oriented list.

Default: `grid`

### `limit`

Default: `3`

### `personalized`

Default: `true`

### `showimages`

Default: `true`

### `saveresults`

Store the results of the API in the `savedresults` block attributes (so visitors will see what showed up in the Editor preview). Incompatible with `personalized` (since that requires the API call to occur on the front end when the visitor browses).

Default: `false`

### `savedresults`

There is currently no UI for this attribute -- it is populated with the validated results of the `/related` API call when the `saveresults` block attribute is true.

Links URLs are passed through [`wp_validate_redirect`](https://developer.wordpress.org/reference/functions/wp_validate_redirect/) in attempt prevent misuse of this feature (e.g. storing spam links in block attributes). If you have a use case to link to external domains that you control or trust, you can permit those domains via the [`allowed_redirect_hosts` filter](https://developer.wordpress.org/reference/hooks/allowed_redirect_hosts/).

Example:

```
function yourprefix_allowed_redirect_hosts( $hosts ) {
	return array_merge( (array) $hosts, array(
		'domaintoallow1.example.com',
		'domaintoallow2.example.com',
	) );
}
add_filter( 'allowed_redirect_hosts', 'yourprefix_allowed_redirect_hosts' );
```

Default: `array()`

### `sort`

Default: `score`

### `tag`

Default: none

### `title`

Default: `Related Content`
