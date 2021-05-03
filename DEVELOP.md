# Getting Started

Plugin development is a little tricky given that we host on github, but have to
publish to SVN.

### Get added as a committer to wp-parsely

Ask one of the owners of the plugin (currently, Mike Sukmanowsky) to add you as
a committer which provides you with write access to the SVN repo. You will need
to provide your wordpress.org username.

### Run init.py

Run `python init.py` which will pull the wp-parsely repo and configure git so
that you will be able to eventually run `git svn dcommit` to push changes to
wordpress.org.

# Making Changes

If you hit merge conflicts when you try to `dcommit`, you can try creating a
local tracking branch of `svn/trunk`, rebasing your local working branch with
it, and then merging that back onto local `trunk` before trying to `dcommit`
again. Otherwise, you may end up taking over every conflict and wrecking the
commit history.

1. Make changes and commit locally to master branch
2. Test all changes and ensure no bugs have been introduced
3. Validate `readme.txt` with https://wordpress.org/plugins/about/validator/
4. Run `git svn dcommit` to push changes to WordPress.org SVN repo
5. Tag any releases as needed `git tag -a vx.x <commit hash>`
6. `git push -f origin master` to update GitHub repo

**WARNING**: Unfortunately, `git push -f origin master` is required because
running `git svn dcommit` will usually modify commit history to change the
author of each commit to that of the user you use for wordpress.org (and often
that author does not match that of `git config --get user.name`).

Be very careful to not overwrite commits that you have not yet pulled from
github.

## Building Included Assets

JavaScript files which are included in the released plugin are built with the
[wp-scripts tool](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/).

Here's how to get started making changes to them:

- Install the LTS release of node (if you don't have it already)
- Update to the latest version of npm
- Install the dependencies: `npm i`
- Start the build tool: `npm run start`
- Make and test your changes -- assets are rebuilt automatically
- Create a branch / PR with all applicable changes to:
  - Source files (in the `src` directory)
  - Build tooling (including an updated `package-lock.json` if you've altered dependencies)
  - Built files (in the `build` directory)
    - When you're ready to do this, stop your `start` script and run `npm run build` instead
