# Parse.ly Recommendations Block

The Recommendations Block is designed to showcase links to content on your site as provided by the [Parse.ly `/related` API endpoint](https://www.parse.ly/help/api/recommendations#get-related).

You can add it in `Posts`, `Pages`, or nearly any other custom post type. From WordPress 5.8 and up, the block can also be used as a [Block-based Widget](https://wordpress.org/support/article/block-based-widgets-editor/). Note however, that the Recommendations Block is not available in the Full Site Editor's template editor. This restriction will be lifted in the future.

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
