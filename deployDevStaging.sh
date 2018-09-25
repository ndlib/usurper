#!/bin/bash
# this is the prebuilt bucket we will target
export bucketStage="prod"

echo "install build-links modules"
pushd .
cd ./scripts/build-links
yarn install --production

echo "get the apiurls"
node buildApiUrls.js stage=$bucketStage
echo "determine bucket"
BUCKET=$(node getStageBucket.js stage=$bucketStage)
popd

echo "install npm modules"
yarn

echo "build production"
yarn build --production


echo "Push to bucket, $BUCKET"
aws s3 sync --delete build/public s3://$BUCKET
