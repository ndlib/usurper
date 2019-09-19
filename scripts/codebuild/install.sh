#!/bin/bash
blue=`tput setaf 4`
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- INSTALL -----${reset}"

# install yarn and packages
npm install -g yarn || { echo "Npm install failed"; exit 1; }
yarn install || { echo "Yarn install failed"; exit 1; }
cd scripts/build-links && yarn install --production || { echo "Failed to install packages in scripts/build-links"; exit 1; }
