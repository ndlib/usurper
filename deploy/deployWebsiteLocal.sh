#!/bin/bash
# this is the prebuilt bucket we will target
# Usage: ./deployDevStaging.sh stage [ --branch branch ]
PROGNAME=$0

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

usage() {
  cat << EOF >&2
Usage: $PROGNAME prod|beta|alpha|prep|dev create|update [-b <branch>] [-p <project>]

deployes website to the appropriate bucket

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

git checkout master
git pull

cd ..

echo "install build-links modules"
pushd .
cd ./scripts/build-links
yarn install --production

echo "get the apiurls"
node buildApiUrls.js stage=$stage
echo "determine bucket"
BUCKET=$(node getStageBucket.js stage=$stage)
popd

if [ $2 = "--branch" ]
then
  git checkout $3
else
  git checkout $(cat VERSION)
fi

# set sentry values
sed -i '' 's/ENVIRONMENT/'$stage'/g' ./public/index.html
version=$(cat ./VERSION)
sed -i '' 's/SHA/'$version'/g' ./public/index.html

echo "install npm modules"
yarn

echo "build production"
yarn build --production

echo "Push to bucket, $BUCKET"
aws s3 sync --delete build/public s3://$BUCKET

# reset sentry changes
git checkout .
git checkout master

printf "${GREEN}Success${NC} \n"
