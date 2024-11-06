set -e

export LC_ALL=C

if [ -z "$1" ]; then
  echo "Error: You must specify a version number."
  exit 1
fi

VERSION=$1

git checkout -b update/wp-parsely-version-to-$VERSION

# Detect OS to set the proper sed command
if [[ "$(uname)" == "Darwin" ]]; then
  SED_CMD=('sed' '-i' '')
else
  SED_CMD=('sed' '-i')
fi

# Update version in files
"${SED_CMD[@]}" "s/Stable tag: .*  $/Stable tag: $VERSION  /" README.md
"${SED_CMD[@]}" "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json
"${SED_CMD[@]}" "s/export const PLUGIN_VERSION = '.*'/export const PLUGIN_VERSION = '$VERSION'/" tests/e2e/utils.ts
"${SED_CMD[@]}" "s/ \* Version:           .*$/ \* Version:           $VERSION/" wp-parsely.php
"${SED_CMD[@]}" "s/const PARSELY_VERSION = '.*'/const PARSELY_VERSION = '$VERSION'/" wp-parsely.php

 npm install # Update package-lock.json with the new version

 git add README.md package.json package-lock.json tests/e2e/utils.ts wp-parsely.php && git commit -m "Update wp-parsely version number to $VERSION"
