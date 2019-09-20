#!/bin/bash
blue=`tput setaf 4`
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- BUILD -----${reset}"

# build
echo -e "\n${blue}Building code...${reset}"
yarn build --production || { echo "Build failed"; exit 1; }

cd deploy/blueprints
echo -e "\n${blue}Deploying with cdk...${reset}"
cdk deploy $STACK_NAME -c usurperBuildPath='../../build' || { echo "CDK deployment failed"; exit 1; }
