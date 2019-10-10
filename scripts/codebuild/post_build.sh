#!/bin/bash
green=`tput setaf 2`
blue=`tput setaf 4`
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- POST-BUILD -----${reset}"

# This isn't really necessary in the pipeline so don't waste time bothering unless it's a local deploy
if [ ${LOCAL_DEPLOY:=false} = true ] && [ $STAGE != 'dev' ]
then
  # after deploying, it's kind of annoying and confusing if the configParameters are not set to dev, because your local
  # build can unexpectedly connect to another environment's microservices. Therefore, rebuld dev config if not already.
  node ./scripts/buildConfig.js stage=dev
fi

echo -e "${green}\nDeployment completed successfully.\n${reset}"