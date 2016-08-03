<?php
/**
 * Class SampleTest
 *
 * @package 
 */


/**
 * Sample test case.
 */
class SampleTest extends WP_UnitTestCase {

    function create_test_post_array() {
        $post_array = array(
            'post_title' => 'Sample Parsely Post',
            'post_author' => 1,
            'post_content' => 'Some sample content just to have here',
            'post_status' => 'publish');
        return $post_array;
    }

    function create_test_category($name) {
        $category = $this->factory->category->create(array(
            'name' => $name,
            'category_description' => $name,
            'category_nicename' => 'category-' . $name,
            'taxonomy' => 'category'
        ));
        return $category;
    }

    function create_test_taxonomy($taxonomy, $taxonomy_value) {
        register_taxonomy(
            $taxonomy,
            'post',
            array(
                'label' => $taxonomy,
                'hierarchical' => true,
            )
        );
        $custom_taxonomy = $this->factory->term->create(array(
            'name' => $taxonomy_value,
            'taxonomy' => $taxonomy
        ));
        return $custom_taxonomy;
    }

    protected static $post;
    protected static $news;
    protected static $local;
    protected static $example_county;
    protected static $parsely;
    protected static $custom_taxonomy;
    protected static $taxonomy_factory;

    public static function setUpBeforeClass() {
    }

    public function setUp() {
        parent::setUp();
        self::$parsely = new Parsely();
        $optionDefaults = array(
            'apikey' => 'blog.parsely.com',
            'content_id_prefix' => '',
            'use_top_level_cats' => false,
            'cats_as_tags' => false,
            'track_authenticated_users' => true,
            'custom_taxonomy_section' => 'category',
            'lowercase_tags' => true);
        update_option('parsely', $optionDefaults);
    }


    function test_parsely_tag() {
        ob_start();
        echo self::$parsely->insert_parsely_javascript();
        $output = ob_get_clean();
        $html = "<div id=\"parsely-root\" style=\"display: none\">
  <div id=\"parsely-cfg\" data-parsely-site=\"blog.parsely.com\"></div>
</div>
<script data-cfasync=\"false\">
(function(s, p, d) {
  var h=d.location.protocol, i=p+\"-\"+s,
      e=d.getElementById(i), r=d.getElementById(p+\"-root\"),
      u=h===\"https:\"?\"d1z2jf7jlzjs58.cloudfront.net\"
      :\"static.\"+p+\".com\";
  if (e) return;
  e = d.createElement(s); e.id = i; e.async = true;
  e.setAttribute('data-cfasync', 'false'); e.src = h+\"//\"+u+\"/p.js\"; r.appendChild(e);
})(\"script\", \"parsely\", document);";
        $this->assertTrue(strpos($output, $html) > 0);
    }


    function test_parsely_ppage_output() {
        $this->go_to('/');
        $ppage = self::$parsely->insert_parsely_page();
        $this->assertTrue($ppage['@type'] == 'WebPage');
        $post_array = $this->create_test_post_array();
        $post = $this->factory->post->create($post_array);
        $this->go_to('/?p=' . $post);
        $ppage = self::$parsely->insert_parsely_page();
        $this->assertTrue($ppage['@type'] == 'NewsArticle');
    }

    function test_parsely_categories()
    {
        $post_array = $this->create_test_post_array();
        $cat = $this->create_test_category('Newssss');
        $post_array['post_category'] = array($cat);
        $post = $this->factory->post->create($post_array);
        $this->go_to('/?p=' . $post);
        $ppage = self::$parsely->insert_parsely_page();
        $this->assertTrue($ppage['articleSection'] == 'Newssss');
    }

    function test_parsely_tags_lowercase() {
        $post_array = $this->create_test_post_array();
        $post_array['tags_input'] = array("Sample", "Tag");
        $post = $this->factory->post->create($post_array);
        $options = get_option('parsely');
        $options['lowercase_tags'] = true;
        update_option('parsely', $options);
        $this->go_to('/?p=' . $post);
        $ppage = self::$parsely->insert_parsely_page();
        $this->assertContains('sample', $ppage['keywords']);
        $this->assertContains('tag', $ppage['keywords']);
    }

    function test_parsely_cats_as_tags() {
        $options = get_option('parsely');
        $options['cats_as_tags'] = true;
        update_option('parsely', $options);
        $post_array = $this->create_test_post_array();
        $cat_1 = $this->create_test_category('news');
        $cat_array = array(
            'name' => 'local',
            'parent' => $cat_1
        );
        $cat_2 = $this->factory->category->create($cat_array);
        $cat_array['parent'] = $cat_2;
        $cat_array['name'] = 'sample county';
        $cat_3 = $this->factory->category->create($cat_array);
        $post_array['post_category'] = array($cat_1, $cat_2, $cat_3);
        $post_array['tags_input'] = array('test');
        $post = $this->factory->post->create($post_array);
        $this->go_to('/?p=' . $post);
        $ppage = self::$parsely->insert_parsely_page();
        $this->assertContains('news', $ppage['keywords']);
        $this->assertContains('local', $ppage['keywords']);
        $this->assertContains('sample county', $ppage['keywords']);
    }
    
    function test_use_top_level_cats() {
        $options = get_option('parsely');
        $options['use_top_level_cats'] = true;
        update_option('parsely', $options);
        $post_array = $this->create_test_post_array();
        $cat_1 = $this->create_test_category('news');
        $cat_array = array(
            'name' => 'local',
            'parent' => $cat_1
        );
        $cat_2 = $this->factory->category->create($cat_array);
        $cat_array['parent'] = $cat_2;
        $cat_array['name'] = 'sample county';
        $cat_3 = $this->factory->category->create($cat_array);
        $post_array['post_category'] = array($cat_1, $cat_2, $cat_3);
        $post = $this->factory->post->create($post_array);
        $this->go_to('/?p=' . $post);
        $ppage = self::$parsely->insert_parsely_page();
        $this->assertTrue($ppage['articleSection'] == 'news');
    }

    function test_custom_taxonomy_as_section() {
        $options = get_option('parsely');
        $options['custom_taxonomy_section'] = 'sports';
        update_option('parsely', $options);
        $post_array = $this->create_test_post_array();
        $cat = $this->create_test_category('news');
        $post_array['post_category'] = array($cat);
        $post = $this->factory->post->create($post_array);
        $parent_taxonomy = $this->create_test_taxonomy('sports', 'basketball');
        $child_taxonomy = $this->factory->term->create(array(
            'name' => 'lebron',
            'taxonomy' => 'sports',
            'parent' => $parent_taxonomy
        ));
        wp_set_post_terms($post, array($parent_taxonomy, $child_taxonomy), 'sports');
        $this->go_to('/?p=' . $post);
        $ppage = self::$parsely->insert_parsely_page();
        $this->assertTrue($ppage['articleSection'] == 'lebron');
    }

    function test_custom_taxonomy_tags() {
        $options = get_option('parsely');
        $options['custom_taxonomy_tags'] = true;
        update_option('parsely', $options);
        $post_array = $this->create_test_post_array();
        $post_array['tags_input'] = array("Sample", "Tag");
        $post = $this->factory->post->create($post_array);
        $parent_taxonomy = $this->create_test_taxonomy('sports', 'hockey');
        $child_taxonomy = $this->factory->term->create(array(
            'name' => 'gretzky',
            'taxonomy' => 'sports',
            'parent' => $parent_taxonomy
        ));
        wp_set_post_terms($post, array($parent_taxonomy, $child_taxonomy), 'sports');
        $this->go_to('/?p=' . $post);
        $ppage = self::$parsely->insert_parsely_page();
        $this->assertContains('sample', $ppage['keywords']);
        $this->assertContains('tag', $ppage['keywords']);
        $this->assertContains('gretzky', $ppage['keywords']); 
    }

    function test_top_level_taxonomy_as_section() {
        $options = get_option('parsely');
        $options['custom_taxonomy_section'] = 'sports';
        $options['use_top_level_cats'] = true;
        update_option('parsely', $options);
        $post_array = $this->create_test_post_array();
        $cat = $this->create_test_category('news');
        $post_array['post_category'] = array($cat);
        $post = $this->factory->post->create($post_array);
        $parent_taxonomy = $this->create_test_taxonomy('sports', 'basketball');
        $child_taxonomy = $this->factory->term->create(array(
            'name' => 'lebron',
            'taxonomy' => 'sports',
            'parent' => $parent_taxonomy
        ));
        wp_set_post_terms($post, array($parent_taxonomy, $child_taxonomy), 'sports');
        $this->go_to('/?p=' . $post);
        $ppage = self::$parsely->insert_parsely_page();
        $this->assertTrue($ppage['articleSection'] == 'basketball');
    }

}


