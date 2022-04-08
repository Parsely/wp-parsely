# Parse.ly Recommendations Block

**IMPORTANT:** The Recommendations Block is available only in WordPress 5.9 and later.

The Recommendations Block is designed to showcase links to content on your site as provided by the [Parse.ly `/related` API endpoint](https://www.parse.ly/help/api/recommendations#get-related).

You can add it in `Posts`, `Pages`, or nearly any other custom post type. The Block can also be used in Full Site Editing (FSE) mode or as a [Block-based Widget](https://wordpress.org/support/article/block-based-widgets-editor/).

## Disabled by Default

Note that this block is currently behind a feature flag and must be explicitly enabled for the code to load.

To enable the block on your site, add the following line anywhere in your theme code (or a custom plugin) that is sourced [prior to the `init` WordPress action](https://codex.wordpress.org/Plugin_API/Action_Reference) (top-level in your theme or plugin is fine):

`add_filter( 'wp_parsely_recommendations_block_enabled', '__return_true' );`

This restriction will be lifted and the block code loading will become opt-out in a future release.

## How to Use

- Inside the Block Editor, add the `Parse.ly Recommendations` block via the [standard block controls](https://wordpress.org/support/article/adding-a-new-block/).
- Use the Block and Inspector Controls to configure the [block attributes](#block-attributes).

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
