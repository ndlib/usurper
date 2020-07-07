#!/bin/bash

# export the blueprints directory to an environment variable so we know where to find the infrastructure code
# to do the deploy. For local deploy, this assumes that the usurper-blueprints repo is a "sibling" to usurper in your
# folder structure.
export BLUEPRINTS_DIR="../usurper-blueprints"
export LOCAL_DEPLOY=true

# provide some friendly defaults so the user does not need to assuming they are deploying a dev build
export STAGE=${STAGE:="dev"}
export STACK_NAME=${STACK_NAME:="usurper-${STAGE}"}
export OWNER=${OWNER:=$(id -un)}
export CONTACT=${CONTACT:=$OWNER@nd.edu}
export CREATE_DNS=${CREATE_DNS:="false"}
export DOMAIN_STACK_NAME=${DOMAIN_STACK_NAME:="library-domain"}

./scripts/codebuild/install.sh || { exit 1; }
./scripts/codebuild/pre_build.sh || { exit 1; }
./scripts/codebuild/build.sh || { exit 1; }
./scripts/codebuild/post_build.sh || { exit 1; }
