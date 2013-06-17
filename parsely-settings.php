<style type="text/css">
    .success {padding:0.8em;margin-bottom:1em;border:2px solid #ddd;background:#e6efc2;color:#264409;border-color:#c6d880;}
    .success a {color:#264409;}
    .success p {margin: 0;}
    #wp-parsely_version {color: #777; font-size: 12px; margin-left: 1em;}
</style>
<div class="wrap">
    <?php
    if (!empty($errors)) {
        foreach($errors as $error) {
            $this->printErrorMessage($error);
        }
    }
    ?>
    <h2>Parse.ly - Dash Settings <span id="wp-parsely_version">Version <?php echo Parsely::$VERSION; ?></span></h2>
    <?php
    if ($valuesSaved) {
        $this->printSuccessMessage("Settings saved successfully.");
    }
    ?>
    <p>Thanks again for using Parse.ly's Dash!  Don't forget if you have any questions regarding the plugin you can e-mail us at <a href="mailto:support@parsely.com">support@parsely.com</a></p>
    <form name="parsely" method="post" action="">
        <input type="hidden" name="isParselySettings" value="Y" />
        <h3>Required Settings</h3>
        <table class="form-table">
            <tr valign="top">
                <th scope="row"><label for="apikey"><?php _e('Parse.ly Site ID'); ?></label></th>
                <td>
                    <?php $this->printTextTag("apikey", $options["apikey"], array("size" => "20", "placeholder" => "test.com")); ?>
                    <p class="description">
                        You can grab your Site ID by heading to <a href="http://dash.parsely.com/settings/api" target="_blank">your API settings page</a>
                        and look for the Site ID field.
                    </p>
                    <p class="description">
                        Don't have a Parse.ly account yet? Never fear because you can <a href="http://dash.parsely.com/try" target="_blank">sign up for one here</a>!
                    </p>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row"><label for="tracker_implementation"><?php _e('Tracker Implementation'); ?></label></th>
                <td>
                    <?php $this->printSelectTag("tracker_implementation", $this->IMPLEMENTATION_OPTS, $options["tracker_implementation"]); ?>
                    <p class="description">
                    Parse.ly allows you to choose a few different ways to deploy our tracking code on your site.  In most cases
                    Standard will be fine, but if you'd like to learn more about the other options <a href="http://www.parsely.com/api/tracker.html#javascript-tracker" target="_blank">check out our documentation</a>.
                    </p>
                </td>
        </table>
        <h3>Optional Settings</h3>
        <table class="form-table">
            <tr valign="top">
                <th scope="row"><label for="content_id_prefix"><?php _e('Content ID Prefix'); ?></label></th>
                <td>
                    <?php $this->printTextTag("content_id_prefix", $options["content_id_prefix"], array("size" => "20", "placeholder" => "WP-")); ?>
                    <p class="description">
                        In the event that your site uses more than one content management system (e.g. WordPress and Drupal), there is the possibility
                        that you'll end up with duplicate content IDs.  For example, WordPress will have a post with ID 1 and so will Drupal which causes
                        a conflict for parsely-page.  Adding a <strong>Content ID Prefix</strong> will ensure the content IDs from WordPress will not
                        conflict with those in another content management system.  We recommend you use something like "WP-" for your prefix but any value
                        will work.
                        <br/><br/>
                        <strong style="color: red">Important:</strong> changing this value on a live site currently tracked with Parse.ly will require a recrawl 
                        and potentially a rebuild of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please recrawl <?php echo esc_attr($options["apikey"]); ?>">support@parsely.com</a> 
                        to kick off a recrawl / rebuild of your data.
                    </p>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row"><label><?php _e('Use Top-Level Categories'); ?></label></th>
                <td>
                    <input type="radio" name="use_top_level_cats" id="use_top_level_cats_true" value="true" <?php if ($options["use_top_level_cats"]) { echo 'checked="checked"'; } ?>/> <label for="use_top_level_cats_true">Yes</label>
                    <input type="radio" name="use_top_level_cats" id="use_top_level_cats_false" value="false" <?php if (!$options["use_top_level_cats"]) { echo 'checked="checked"'; } ?> /> <label for="use_top_level_cats_false">No</label>
                    <p class="description">
                        By default, wp-parsely will use the first category assigned to a post that it finds.  If you are using a hierarchy of categories,
                        this may not be the one you hope to see in Parse.ly Dash.  For example, if you post a story to your Florida category which is actually
                        a sub-category of News &gt; National &gt; Florida, you perhaps want to see <strong>News</strong> as the category instead of
                        <strong>Florida</strong>.  Enabling this field will ensure Parse.ly always uses the top-level category to categorize your content.
                        Enabling this option will apply it to all posts for this WordPress site.
                        <br/><br/>
                        <strong style="color: red">Important:</strong> changing this value on a live site currently tracked with Parse.ly will require a recrawl 
                        and potentially a rebuild of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please recrawl <?php echo esc_attr($options["apikey"]); ?>">support@parsely.com</a> 
                        to kick off a recrawl / rebuild of your data.
                    </p>
            </tr>
            <tr valign="top">
                <th scope="row"><label><?php _e('Use Child Categories As Tags'); ?></label></th>
                <td>
                    <input type="radio" name="child_cats_as_tags" id="child_cats_as_tags_true" value="true" <?php if ($options["child_cats_as_tags"]) { echo 'checked="checked"'; } ?>/> <label for="child_cats_as_tags_true">Yes</label>
                    <input type="radio" name="child_cats_as_tags" id="child_cats_as_tags_false" value="false" <?php if (!$options["child_cats_as_tags"]) { echo 'checked="checked"'; } ?> /> <label for="child_cats_as_tags_false">No</label>
                    <p class="description">
                        When assigning one or more categories to a post that are children of a parent category, you can use this option to ensure
                        the child categories are outputted as tags.<br/>
                        If you had a post for example assigned to the categories: Business/Tech, Business/Social (where Business is the parent and
                        Tech and Social are child categories of Business), your parsely-page tags attribute would include the tags: "Business/Tech",
                        "Business/Social".
                        <br/><br/>
                        <strong style="color: red">Important:</strong> changing this value on a live site currently tracked with Parse.ly will require a recrawl 
                        and potentially a rebuild of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please recrawl <?php echo esc_attr($options["apikey"]); ?>">support@parsely.com</a> 
                        to kick off a recrawl / rebuild of your data.
                    </p>
            </tr>
            <tr valign="top">
                <th scope="row"><label><?php _e('Track Logged-in Users'); ?></label></th>
                <td>
                    <input type="radio" name="track_authenticated_users" id="track_authenticated_users_true" value="true" <?php if($options["track_authenticated_users"]) { echo 'checked="checked"'; } ?>/> <label for="track_authenticated_users_true">Yes</label>
                    <input type="radio" name="track_authenticated_users" id="track_authenticated_users_false" value="false" <?php if(!$options["track_authenticated_users"]) { echo 'checked="checked"'; } ?>/> <label for="track_authenticated_users_false">No</label>
                    <p class="description">
                        By default, wp-parsley will track the activity of users that are logged into this site or blog.  You can change this setting here
                        and only track the activity of anonymous visitors (note that you will no longer see the Parse.ly Dash tracking code on your site
                        if you browse while logged in).
                    </p>
            </tr>
            <tr valign="top">
                <th scope="row"><label><?php _e('Lowercase All Tags'); ?></label></th>
                <td>
                    <input type="radio" name="lowercase_tags" id="lowercase_tags_true" value="true" <?php if ($options["lowercase_tags"]) { echo 'checked="checked"'; } ?>/> <label for="lowercase_tags_true">Yes</label>
                    <input type="radio" name="lowercase_tags" id="lowercase_tags_false" value="false" <?php if (!$options["lowercase_tags"]) { echo 'checked="checked"'; } ?>/> <label for="lowercase_tags_false">No</label>
                    <p class="description">
                        By default, wp-parsely will convert all tags on your articles to lowercase versions to correct for potential misspellings.  You can
                        change this setting here to ensure that tag names are used directly as they are created.
                        <br/><br/>
                        <strong style="color: red">Important:</strong> changing this value on a live site currently tracked with Parse.ly will require a recrawl 
                        and potentially a rebuild of your Parse.ly data. Once you have changed this value, please contact <a href="mailto:support@parsely.com?subject=Please recrawl <?php echo esc_attr($options["apikey"]); ?>">support@parsely.com</a> 
                        to kick off a recrawl / rebuild of your data.
                    </p>
                </td>
            </tr>
        </table>
        <p class="submit">
            <input type="submit" name="Submit" class="button-primary" value="<?php esc_attr_e('Save Changes') ?>" />
        </p>
    </form>
</div>