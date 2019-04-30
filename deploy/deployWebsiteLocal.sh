#!/bin/bash
# this is the prebuilt bucket we will target
# Usage: ./deployDevStaging.sh stage [ -b|--branch branch ]
PROGNAME=$0

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

usage() {
  cat << EOF >&2
Usage: $PROGNAME prod|beta|alpha|prep|dev [-b <branch>]

deploys website to the appropriate bucket

-b <branch>: The branch to deploy otherwise uses the current VERSION file
EOF
  exit 1
}


if [ -z "$1" ] || [[ ! $1 =~ ^prod$|^beta$|^alpha$|^prep$|^dev$ ]]
then
  printf "${RED}Enter a stage prod|beta|alpha|prep|dev  ${NC} \n"
  echo usage
  exit
fi

stage=$1

if [ $stage = "prod" ] || [ $stage = "beta" ] && [ ! $AWS_VAULT = "libnd" ]
then
  printf "${RED}For production deploys you must assume the libnd role ${NC} \n"
  exit
fi

if [ $stage = "dev" ] || [ $stage = "alpha" ] || [ $stage = "prep" ] && [ ! $AWS_VAULT = "testlib" ]
then
  printf "${RED}For production deploys you must assume the testlib role ${NC} \n"
  exit
fi

bucketStage=$1

# find the current git branch name https://stackoverflow.com/questions/1593051/how-to-programmatically-determine-the-current-checked-out-git-branch
CURRENT_BRANCH_NAME=$(git symbolic-ref -q HEAD)
CURRENT_BRANCH_NAME=${CURRENT_BRANCH_NAME##refs/heads/}
CURRENT_BRANCH_NAME=${CURRENT_BRANCH_NAME:-HEAD}

git checkout master
git pull

cd ..

if [ $2 = "-b" ] || [ $2 = "--branch" ]
then
  git checkout $3
else
  git checkout $(cat VERSION)
fi

echo "install build-links modules"
pushd .
cd ./scripts/build-links
yarn install --production

echo "get the apiurls and other config parameters"
node buildConfig.js stage=$stage

echo "determine bucket"
BUCKET=$(node getStageBucket.js stage=$stage)
popd

echo "generate updated sitemap"
python ./scripts/makeSitemap.py

# set sentry values
sed -i '' 's/ENVIRONMENT/'$stage'/g' ./public/index.html
version=$(cat ./VERSION)
sed -i '' 's/SHA/'$version'/g' ./public/index.html

echo "install npm modules"
yarn

echo "build production"
yarn build --production

echo "Push to bucket, $BUCKET"
aws s3 sync --delete build s3://$BUCKET

# reset sentry changes
if ! git checkout .
then
  printf "${RED}Failed to reset sentry additions please check your branch${NC} \n"
  exit 1
fi

# return to the branch you were previously on
if ! git checkout $CURRENT_BRANCH_NAME
then
  printf "${RED}Unable to return you to branch, ${CURRENT_BRANCH_NAME}. ${NC} \n"
  exit 1
fi

printf "${GREEN}Success${NC} \n"
