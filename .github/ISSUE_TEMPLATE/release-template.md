---
name: Release template
about: Internally used for new releases
title: Release wp-parsely x.y.z
labels: "wp-parsely, Maintenance"
---

This is an issue for tracking the next `wp-parsely` release (milestone: [x.y.z](https://github.com/Parsely/wp-parsely/milestone/milestone-id?closed=1)).

This ticket is to be opened the week before the actual release, so we have enough time to complete all the related tasks. The actual release of the plugin should be done on Mondays so we can catch the Tuesday WordPress VIP release window.

## Before releasing

**1. Merge all outstanding work**
- [ ] Merge any outstanding PRs due for this release to the target branch (usually `develop`).
- [ ] Verify that all important PRs have an appropriate `Changelog` tag and the release's milestone. PRs without both won't be added to the changelog.

**2. Conduct additional testing**
We've got automated testing in place and also test under our local development environment during development. For impactful releases we should also:
- [ ] Conduct an additional [smoke test](https://github.com/Parsely/wp-parsely/blob/develop/docs/TESTING.md#manual-smoke-test) under our local development environment.
- [ ] Test under a regular non-local WordPress installation.
- [ ] Test under a real WordPress VIP environment.

**3. Communicate**
- [ ] Inform Parse.ly support of the upcoming release.

The following additional tasks might be needed depending on the release and its impact:
- [ ] Write any needed internal documentation.
- [ ] Write an internal P2 post about the release (to be posted immediately so folks are aware of the release ahead of time).
- [ ] Write a WordPress VIP Lobby post about the release (to be posted immediately to preannounce next week's VIP release - don't forget to get someone to proofread!).
- [ ] Prepare any public documentation (to be posted after the WordPress.org release).

## Release process

**1. Update version numbers and changelog**
- [ ] [Run the "Create wp-parsely release PR"](https://github.com/Parsely/wp-parsely/actions/workflows/create-release-pr.yml) GitHub Action on `develop`, choosing `patch`, `minor`, or `major`. The workflow updates the version markers and changelog and opens a PR.
- [ ] Verify that the generated PR looks correct. You can amend it with new commits if needed.
- [ ] Approve the PR's workflows that are awaiting approval. They run the PR's required checks.
- [ ] Merge the PR into the target branch (usually `develop`). Its commits are unsigned, so this merge and the one into `trunk` need an admin.

**2. Merge develop into trunk**
- [ ] [Create a PR](https://github.com/Parsely/wp-parsely/compare/trunk...develop?quick_pull=1&title=Release+wp-parsely+x.y.z&body=This+PR+merges+the+`develop`+branch+into+the+`trunk`+branch+in+order+to+release+wp-parsely+x.y.z.) that merges the target branch (usually `develop`) into `trunk`, named _Release wp-parsely x.y.z_.
- [ ] Merge the PR into `trunk`. **This automatically starts publication to GitHub and WordPress.org.**

**3. Verify the automated release**
- [ ] Monitor the [Release wp-parsely workflow](https://github.com/Parsely/wp-parsely/actions/workflows/release-plugin.yml) run that the merge started.
- [ ] If a job fails, follow the [retry instructions](https://github.com/Parsely/wp-parsely/blob/develop/docs/RELEASING.md#failed-releases-and-retries).
- [ ] Check the new release and attached ZIP on the [GitHub releases page](https://github.com/Parsely/wp-parsely/releases).
- [ ] Verify the version on the [WordPress.org plugin page](https://wordpress.org/plugins/wp-parsely/).

## After releasing

**1. Communicate**
- [ ] If needed, update the public documentation.
- [ ] Inform the concerned Slack channels about the new release, also preannouncing the WordPress VIP release.

**2. Merge trunk back into develop**
- [ ] [Create a PR](https://github.com/Parsely/wp-parsely/compare/develop...trunk?quick_pull=1&title=Merge+trunk+into+develop+after+the+wp-parsely+x.y.z+release&body=This+PR+merges+the+`trunk`+branch+into+the+`develop`+branch+after+the+release+of+wp-parsely+x.y.z.) that merges `trunk` into `develop`, named _Merge trunk into develop after the wp-parsely x.y.z release_.
- [ ] Merge the PR into `develop`.

**3. Manage milestones**
- [ ] Close the current milestone.
- [ ] If needed, open a new milestone for the next release.

**4. Release to other platforms**
- [ ] Update the `vip-go-mu-plugins` submodule to the latest version.
- [ ] Release the plugin for WordPress VIP.
- [ ] Release the plugin for WordPress.com.
