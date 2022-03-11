# Parse.ly Recommendations Block

This block is designed to showcase links to content on your site as provided by the [Parse.ly `/related` API endpoint](https://www.parse.ly/help/api/recommendations#get-related).

You can use the Parse.ly Recommendations Block wherever you use the WordPress Block Editor to build your site. That means that you can leverage this feature in `Posts`, `Pages`, or nearly any other custom post type. You can also leverage it in the Full Site Editor's template editor [slated to debut with WordPress version 5.8](https://make.wordpress.org/core/2021/06/16/introducing-the-template-editor-in-wordpress-5-8/) to add it to various layout elements (e.g. a Header, Footer, or Sidebar).

### Disabled by Default

Note that this block is currently behind a "feature flag" and must be explicitly enabled for the code to load.

To enable the block on your site, add the following line anywhere in your theme code (or a custom plugin) that is sourced [prior to the `init` WordPress action](https://codex.wordpress.org/Plugin_API/Action_Reference) (top-level in your theme or plugin is fine):

`add_filter( 'wp_parsely_recommendations_block_enabled', '__return_true' );`

This restriction will be lifted and the block code loading will become opt-out in a future release.

## How to Use

- Inside the Block Editor, add the `Parse.ly Recommendations` block via the [standard block controls](https://wordpress.org/support/article/adding-a-new-block/).
- Use the Block and Inspector Controls to configure the [block attributes](#block-attributes)

## Block Attributes

### `boost`

Passed to the API endpoint to determine how to rank prospective results.

Default: `views`

### `imagestyle`

Default: `original`

### `limit`

Default: `3`

### `showimages`

Default: `true`

### `sort`

Default: `score`

### `tag`

Default: none

### `title`

Default: `Related Content`
