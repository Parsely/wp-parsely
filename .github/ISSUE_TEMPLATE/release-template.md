---
name: Release template
about: Internally used for new releases
title: Release x.y.z
labels: 'Type: Maintenance'

---

This is an issue for tracking the X.Y.Z release process.

## Before releasing

- [ ] Notify stakeholders of an upcoming release.
- [ ] Merge any outstanding PRs due for this release to `develop`.
- [ ] Verify that all PRs in the release have an appropriate `Changelog` tag.

## Release process

**1. Update version numbers and changelog**
- [ ] Use the `bin/release.php` script to update version numbers and the changelog, and to push the PR to GitHub.
- [ ] Verify that the PR code looks correct. You can amend it with new commits if needed.
- [ ] Merge the PR into `develop`.

**2. Merge develop into trunk**
- [ ] [Create a PR](https://github.com/Parsely/wp-parsely/compare) that merges `develop` into `trunk`, named _Release wp-parsely x.y.z_.
- [ ] Merge the PR into `trunk`.

**3. Create the GitHub release**
- [ ] [Create a GitHub release](https://github.com/Parsely/wp-parsely/releases/new) that targets `trunk`.
- [ ] For the release's text, use the changelog text that was posted by the `bin/release.php` script into the PR in step 1.
- [ ] Verify that you're using the appropriate name and tag (should be the version that is being released, without a leading 'v' character), and publish the release.

**4. Deploy the release to wordpress.org**
- [ ] Run the [Deploy to WordPress.org](https://github.com/Parsely/wp-parsely/actions/workflows/deploy.yml) GitHub workflow, selecting the new version tag.

## After releasing

**Merge trunk back into develop**
- [ ] [Create a PR](https://github.com/Parsely/wp-parsely/compare/trunk?expand=1) that merges `trunk` into `develop`, named _Merge trunk into develop after the wp-parsely x.y.z release_.
- [ ] Merge the PR into `develop`.

**Manage milestones**
- [ ] Close the current milestone.
- [ ] If needed, open a new milestone for the next release.

**Communicate and release to other platforms**
- [ ] Write an internal P2 post about the release.
- [ ] Inform any applicable Slack channels about the new release.
- [ ] Release the plugin for WordPress VIP and write a release lobby post.
- [ ] Release the plugin for WordPress.com.
