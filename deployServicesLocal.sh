#!/bin/bash
# this is the stage that will appear in aws.
export stage="dev"
# this is the set of keys we get from secrets the easy way to think about it
# is that this separates which version of contentful you want.
export secretSet="dev"
# are we updating, creating or deleting
export deployType="update"

pushd .
cd ../lambda_auth/deploy/
source /Volumes/vars/WSE/secret_$secretSet/lambda_auth/deploy-env
hesdeploy -s $stage --update --yes
popd

pushd .
cd ../contentful_direct/deploy/
source /Volumes/vars/WSE/secret_$secretSet/contentful_direct/deploy-env
hesdeploy -s $stage --$deployType --yes
popd .

pushd .
cd ../contentful_maps/deploy/
source /Volumes/vars/WSE/secret_$secretSet/contentful_maps/deploy-env
hesdeploy -s $stage --$deployType --yes
popd .

pushd .
cd ../recommendation_engine/deploy/
source /Volumes/vars/WSE/secret_$secretSet/recommend/deploy-env
hesdeploy -s $stage --$deployType --yes
popd .

pushd .
cd ../monarch_libguides/deploy/
source /Volumes/vars/WSE/secret_$secretSet/monarch_libguides/deploy-env
hesdeploy -s $stage --$deployType --yes
popd .

pushd .
cd ../gatekeeper/deploy/
source /Volumes/vars/WSE/secret_$secretSet/gatekeeper/deploy-env
hesdeploy -s $stage --$deployType --yes
popd .
