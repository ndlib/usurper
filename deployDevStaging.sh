#!/bin/bash

export HOURS_API_URL='https://677xoyg276.execute-api.us-east-1.amazonaws.com/prep'
export CONTENTFUL_API='https://77qwzi0dp1.execute-api.us-east-1.amazonaws.com/prep'
export
  COURSES_API='https://2dg9hsgeb9.execute-api.us-east-1.amazonaws.com/r20180720'
export
    USER_PREF_API='https://zavpde1pu3.execute-api.us-east-1.amazonaws.com/devdan/'
yarn build

aws s3 sync --delete build/public s3://dev-staging.library.nd.edu
