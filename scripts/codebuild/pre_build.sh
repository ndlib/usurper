#!/bin/bash
blue=`tput setaf 4`
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- PRE-BUILD -----${reset}"

echo -e "\n${blue}Fetching application configuration...${reset}"
node ./scripts/build-links/buildConfig.js stage=$STAGE || { echo "Building config file failed"; exit 1; }

echo -e "\n${blue}Building sitemap...${reset}"
python ./scripts/makeSitemap.py || { echo "Building sitemap failed"; exit 1; }

echo -e "\n${blue}Running unit tests...${reset}"
yarn test || { echo "Unit Tests Failed"; exit 1; }

# copy the blueprints repo into deploy/blueprints so we can run the deploy from there after building
echo -e "\n${blue}Copying blueprints...${reset}"
rm -r -f ./deploy/blueprints && cp -R -f $BLUEPRINTS_DIR/ ./deploy/blueprints || { echo "Failed to copy blueprints. Make sure you have usurper-blueprints checked out."; exit 1; }
# install packages in the blueprints folder
cd ./deploy/blueprints
yarn install || { echo "Failed to install blueprints npm packages."; exit 1; }
