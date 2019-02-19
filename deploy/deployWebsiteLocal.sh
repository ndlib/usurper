#!/bin/bash
# this is the prebuilt bucket we will target
# Usage: ./deployDevStaging.sh stage [ -b|--branch branch ]
PROGNAME=$0

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
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

if [ -d "/Volumes/vars/WSE/" ]
then
  base_directory="/Volumes/vars/WSE"
elif [ -d "/Volumes/WSE/" ]
then
  base_directory="/Volumes/WSE"
else
  echo "Make sure you have corpfs mounted"
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

if [ $stage = "alpha" ] || [ $stage = "beta" ]
then
  secretSet="prod"
else
  secretSet=$stage
fi

echo source $base_directory/secret_$secretSet/usurper/deploy-env
source $base_directory/secret_$secretSet/usurper/deploy-env

if [ $2 = "-b" ] || [ $2 = "--branch" ]
then
  git checkout $3
else
  git checkout $(cat VERSION)
fi

version=$(cat ./VERSION)

replace_config_value () {
  if [ $2 ]
  then
    printf -v safeString "%q" "$2"
    sed -i "" "s|\($1:\).*|\1 '$safeString',|" ./config/configurationGen.js
  else
    printf "${YELLOW}WARNING${NC} No environment value for '$1'. Leaving unmodified.\n"
  fi
}

# set environment-specific config values that are not apiUrls
replace_config_value "illiadBaseURL" $ILLIAD_BASE_URL
replace_config_value "serviceNowBaseURL" $SERVICE_NOW_BASE_URL
replace_config_value "onesearchBaseURL" $ONESEARCH_BASE_URL
replace_config_value "gcseKey" $GCSE_KEY
replace_config_value "gcseCx" $GCSE_CX

# set sentry values
sed -i '' 's/ENVIRONMENT/'$stage'/g' ./public/index.html
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
