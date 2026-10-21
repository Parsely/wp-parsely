# Releasing

Use the [Release template](../.github/ISSUE_TEMPLATE/release-template.md) to
track testing, communications, milestones, and distribution to VIP and
WordPress.com. GitHub and WordPress.org publication is automated:

1. Merge the intended changes into `develop`, assign them to the next version's
   milestone, and apply the appropriate `Changelog:` labels.
2. Run **Create wp-parsely release PR** (`bump-version.yml`) on `develop`, choosing
   `patch`, `minor`, or `major`. The next version is calculated from the plugin
   header. The existing scripts update all version markers and generate the
   changelog from the matching milestone. Create that milestone first.
3. Review and merge the generated PR. The workflow explicitly dispatches the
   existing checks, because PRs created with `GITHUB_TOKEN` do not trigger
   `pull_request` workflows. No additional bot credential is needed; Actions
   must be allowed to create PRs, and branch rules should require these checks.
4. Review and merge the release PR from `develop` into `trunk`. **This merge
   authorizes publication to GitHub and WordPress.org.** Do not merge it until
   smoke testing and required communications are complete.
5. The release workflow detects an increasing version, validates the changelog
   and version markers, and runs lint, unit, JavaScript, integration, and E2E
   checks against the exact source SHA. Only after they pass does it build a
   production snapshot, create the bare version tag, deploy to WordPress.org,
   and publish the GitHub release with the same ZIP.

Ordinary pushes to `trunk` without a version change do not publish anything.
Installing this automation without a version bump does not release the current
version. The `develop`, `trunk`, and their `*-built` branches remain available;
the release no longer waits for or reads from a moving built branch. Version
tags continue to contain compiled assets and production Composer dependencies
for existing consumers, with a `Release-Source:` commit trailer recording the
tested source SHA. No plugin version is bumped by this migration.

## Dry runs

Run **Release wp-parsely** (`release-plugin.yml`), choose the workflow branch,
set `ref` to the source branch or SHA, and leave `dry_run` enabled. It runs the
same validation, checks, build, and package inspection, uploading the ZIP and
release notes as Actions artifacts. It does **not** push tags, create releases,
or use SVN credentials. A dry run requires consistent version markers and
nonempty notes for that version. It builds a fresh local snapshot even if that
version was published previously, so the migration can be rehearsed without
bumping the plugin version.

## Failed releases and retries

Rerun a failed release's jobs, or dispatch **Release wp-parsely** with the
original source SHA and `dry_run` disabled. Real releases require a commit
reachable from `trunk` with the current trunk version, preventing branch
releases and stale-version rollbacks. Releases are serialized and never
automatically cancelled in progress. There is no skip-tests option.

An existing tag is reused only when its built snapshot has that exact source
SHA as its parent and `Release-Source:` trailer. Tags are never replaced. If
WordPress.org already has the version, its contents must match the package
before the workflow resumes GitHub publication. Existing tags from the legacy
workflow fail this provenance check: do not retag an old published version.

The existing `SVN_USERNAME` and `SVN_PASSWORD` repository secrets are still
required for actual WordPress.org deployment. GitHub publication uses the
repository token. A deployment failure leaves the GitHub release in draft.
Verify both destinations after success; this automation does not deploy to
WordPress VIP or WordPress.com, send announcements, or close milestones.
