---
name: Release template
about: Internally used for new releases
title: Release x.y.z
labels: 'Type: Maintenance'

---

[Remaining work for this Milestone](https://github.com/Parsely/wp-parsely/milestone/xx)

PR for tracking changes for the X.Y.Z release. Target release date: DOW DD MMMM YYYY.

## Before releasing

- [ ] Notify stakeholders of an upcoming release.
- [ ] Merge any outstanding PRs due for this release to `develop`.
- [ ] Verify that all PRs in the release have a `Changelog` tag.

## Release process

**Create the release PR**
- [ ] Create a PR that merges `develop` into `trunk`, named _Release x.y.z_.
- [ ] Have the PR reviewed and merge it into `trunk`.
  > This will create a new release draft. It might take some seconds to appear.

**Promote the release draft to a pre-release**
- [ ] In the release draft page, check the version numbers and changelog data.
- [ ] Make any adjustments if needed.
- [ ] Save the draft as a pre-release.
  > This will push a commit with the updated version number and changelog into `trunk`. Changes might take a couple of minutes to appear.

**Promote the pre-release to a release**
- [ ] Go to `trunk` and inspect the new commit for correctness.
  > If the commit contains any errors, please stop and contact the development team.
- [ ] Go to the pre-release and promote it to a release.
  > This will merge `trunk` into `develop` and also update the `release's tag`. Changes might take a couple of minutes to appear.
- [ ] Inspect the `develop` branch and the `release's tag` to verify that they contain the new commit.
  > If this is not the case, please stop and contact the development team.

**Deploy the release to wordpress.org**
- [ ] Manually run the `Deploy to WordPress.org` GitHub workflow.
  > This will deploy the new version of the plugin to wordpress.org.

## After releasing

**Managing milestones**
- [ ] Close the current milestone.
- [ ] If needed, open a new milestone for the next release.
- [ ] If there are any open PRs/issues that did do not make it into the release, update their milestone.

**Communicating and releasing to other platforms**
- [ ] Write an internal P2 post about the release.
- [ ] Release the plugin for WordPress VIP and write a release lobby post.
- [ ] Release the plugin for WordPress.com.
