#!/bin/bash

# export the blueprints directory to an environment variable so we know where to find the infrastructure code
# to do the deploy. For local deploy, this assumes that the usurper-blueprints repo is a "sibling" to usurper in your
# folder structure.
export BLUEPRINTS_DIR="../usurper-blueprints"
export CI=true # kind of a lie, but it's what our test script expects in order to run all tests

# provide some friendly defaults so the user does not need to assuming they are deploying a dev build
export STAGE=${STAGE:="dev"}
export STACK_NAME=${STACK_NAME:="cdk-usurperbucket-${STAGE}-library-nd-edu"}

./scripts/codebuild/install.sh || { exit 1; }
./scripts/codebuild/pre_build.sh || { exit 1; }
./scripts/codebuild/build.sh || { exit 1; }
./scripts/codebuild/post_build.sh || { exit 1; }

# after deploying, it's kind of annoying and confusing if the configParameters are not set to dev, because your local
# build can unexpectedly connect to another environment's microservices. Therefore, rebuld dev config if not already.
if [ $STAGE != 'dev' ]
then
  node ./scripts/build-links/buildConfig.js stage=dev
fi
