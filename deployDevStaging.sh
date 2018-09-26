#!/bin/bash
# this is the prebuilt bucket we will target

export bucketStage=$1

git checkout master
git pull

echo "install build-links modules"
pushd .
cd ./scripts/build-links
yarn install --production

echo "get the apiurls"
node buildApiUrls.js stage=$bucketStage
echo "determine bucket"
BUCKET=$(node getStageBucket.js stage=$bucketStage)
popd

if [ $2 = "--branch" ]
then
  git checkout $3
else
  git checkout $(cat VERSION)
fi


echo "install npm modules"
yarn

echo "build production"
yarn build --production


echo "Push to bucket, $BUCKET"
aws s3 sync --delete build/public s3://$BUCKET

git checkout master
