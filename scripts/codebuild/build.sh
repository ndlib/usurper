#!/bin/bash
blue=`tput setaf 4`
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- BUILD -----${reset}"

# build
echo -e "\n${blue}Building code...${reset}"
yarn build --production || { echo "Build failed"; exit 1; }

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
  -c usurperBuildPath="$BUILD_PATH" \
  -c contact=$CONTACT \
  -c owner=$OWNER \
  --require-approval=$APPROVAL \
  --exclusively "$@" \
  || { echo "CDK deployment failed"; exit 1; }
