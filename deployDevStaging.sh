#!/bin/bash

echo "install build-links modules"
pushd .
cd ./scripts/build-links
yarn install --production

echo "get the apiurls"
node buildApiUrls.js stage=dev

popd

echo "install npm modules"
yarn

echo "build production"
yarn build --production

aws s3 sync --delete build/public s3://dev-staging.library.nd.edu
