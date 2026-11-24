# Releasing

Create an issue from the
[Release template](../.github/ISSUE_TEMPLATE/release-template.md) and follow
its steps. Merging `develop` into `trunk` starts **Release wp-parsely**
(`release-plugin.yml`), which tests the exact source SHA and then publishes the
same package to GitHub and WordPress.org. Pushes to `trunk` that don't change
the plugin version publish nothing.

Version tags contain the compiled assets and production Composer dependencies,
with a `Release-Source:` commit trailer recording the tested source SHA.

## Dry runs

Run **Release wp-parsely** with `ref` set to a branch or SHA and `dry_run`
enabled. It runs the checks and builds the package, uploading the ZIP and
release notes as an Actions artifact, but doesn't tag, publish, or use the SVN
credentials.

## Failed releases and retries

Reruns and retries use the original source SHA's code: rerun the failed jobs,
or dispatch **Release wp-parsely** from `trunk` with that SHA as `ref` and
`dry_run` disabled. If the fix needs a code change, merge it into `trunk`, then
dispatch with `ref` set to `trunk`; the push alone publishes nothing, as the
version is unchanged. The workflow only publishes the current trunk version,
and only if it's newer than all other version tags. It reuses an existing tag
only if it built that tag from the same source SHA. Tags are never replaced, so
if the version's tag already exists, release the next version instead. A
failed WordPress.org deployment leaves the GitHub release in draft.

## Configuration

WordPress.org deployment uses the `SVN_USERNAME` and `SVN_PASSWORD` secrets of
the `wordpress-org` environment, which only `trunk` can deploy to; don't store
them as repository secrets. **Create wp-parsely release PR**
(`bump-version.yml`) needs Actions to be allowed to create PRs.
