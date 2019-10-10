#!/bin/bash
blue=`tput setaf 4`
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- BUILD -----${reset}"

# build
echo -e "\n${blue}Building code...${reset}"
yarn build --production || { echo "Build failed"; exit 1; }

# upload source maps to sentry (unless local deploy)
# ignore prep because prep generally builds before the version number is incremented... This means it would
# overwrite the source maps from the latest production deploy, which is not what we want.
if [ ${LOCAL_DEPLOY:=false} != true ] && [ $STAGE != "prep" ]
then
  VERSION=$(cat VERSION)
  yarn sentry-cli releases files usurper@$VERSION upload-sourcemaps ./build --validate --no-rewrite
fi

cd deploy/blueprints
if [ ${LOCAL_DEPLOY:=false} = true ]
then
  APPROVAL='any-change'
else
  APPROVAL='never'
fi
export BUILD_PATH=$(cd '../../build'; pwd)

echo -e "\n${blue}Deploying with cdk...${reset}"
npm run -- cdk deploy $STACK_NAME \
  -c stage="$STAGE" \
  -c usurperBuildPath="$BUILD_PATH" \
  -c contact=$CONTACT \
  -c owner=$OWNER \
  -c createDns=$CREATE_DNS \
  -c domainStackName=$DOMAIN_STACK_NAME \
  -c hostnamePrefix=$HOSTNAME_PREFIX \
  --require-approval=$APPROVAL \
  --exclusively "$@" \
  || { echo "CDK deployment failed"; exit 1; }
