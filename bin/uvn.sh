#!/usr/bin/env bash

# Script to update version numbers (uvn) in the code. It will create a new
# branch and commit the changes. After inspecting the results, it can be pushed
# to GitHub as a PR.
#
# Usage: Specify the new version as an argument. (e.g. bin/uvn.sh 3.7.0)
# Note: This has only been tested with macOS sed.

git checkout -b update/wp-parsely-version-to-$1

sed -i '' "s/Stable tag: .*  $/Stable tag: $1  /" README.md
sed -i '' "s/\"version\": \".*\"/\"version\": \"$1\"/" package.json
sed -i '' "s/export const PLUGIN_VERSION = '.*'/export const PLUGIN_VERSION = '$1'/" tests/e2e/utils.ts
sed -i '' "s/ \* Version:           .*$/ \* Version:           $1/" wp-parsely.php
sed -i '' "s/const PARSELY_VERSION = '.*'/const PARSELY_VERSION = '$1'/" wp-parsely.php

npm install # Update version numbers in package.lock.json.

git add -A && git commit -m "Update wp-parsely version to $1"
