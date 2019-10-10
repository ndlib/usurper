#!/usr/bin/env bash
# This script will do everything necessary to prepare a new release candidate AFTER all changes have been
# merged into master. The end result should trigger the CI pipeline, which will build to test and await approval.

# This script will update the version number (and tag), then push to master before it finishes.
# We really don't want to do that unless your workspace is clean and you're already on master.
# This reduces the risk of forgetting something you meant to change back, or merge in before release.
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ $CURRENT_BRANCH != 'master' ]
then
  echo "You must checkout 'master' branch in order to create a new release candidate."
  exit 1;
fi

if [ -n "$(git status --porcelain)" ]
then
  echo "The git repository has unsaved changes. Please stash or discard before releasing."
  exit 1;
fi

# check if you have the scripts necessary to tag the build
if ! [[ $(command -v tag-build.sh) && $(command -v next-build-identifier.sh) ]]
then
  printf "\nThis script requires commandline-tools (github.com/ndlib/commandline-tools).\n"
  printf "To install with homebrew:\n"
  printf "brew install ndlib/dlt/commandline-tools\n\n"
  exit 1;
fi

# Make sure local copy is fully up-to-date
echo "Pulling latest git changes..."
git pull || exit 1;
git fetch --tags || exit 1;

# Update the VERSION file and push a tag for the version
tag-build.sh <<< $'y' || exit 1;

# Create a new release version in Sentry and associate
NEW_VERSION=$(cat VERSION)
yarn sentry-cli releases new usurper@$NEW_VERSION
yarn sentry-cli releases set-commits --auto usurper@$NEW_VERSION

# Finally, apply a tag that will trigger the CI pipeline. (Delete first if it exists.)
TAG_NAME=ci
if [ $(git tag -l $TAG_NAME) ]
then
  git tag -d $TAG_NAME || exit 1;
  git push origin :refs/tags/$TAG_NAME || exit 1; # push empty ref to remote to delete
fi
git tag $TAG_NAME || exit 1;
git push origin tag $TAG_NAME || exit 1;