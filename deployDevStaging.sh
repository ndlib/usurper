#!/bin/bash
echo "install build-links modules"
pushd .
cd ./scripts/build-links
yarn install --production

echo "get the apiurls"
node buildApiUrls.js stage=prep
echo "determine bucket"
BUCKET=$(node getStageBucket.js stage=prep)
popd

echo "install npm modules"
yarn

echo "build production"
yarn build --production

echo "Push to bucket"
aws s3 sync --delete build/public s3://$BUCKET
