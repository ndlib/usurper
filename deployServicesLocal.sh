#!/bin/bash
# this is the stage that will appear in aws.
export stage="prod"
# this is the set of keys we get from secrets the easy way to think about it
# is that this separates which version of contentful you want.
export secretSet="prod"
# are we updating, creating or deleting
export deployType="create"

if [ $stage = "prod" ] || [ $stage = "beta" ]
then
  export hesdeploy_extra="--useServiceRole --deployBucket libnd-cf"
fi

# lambda auth has to run first
pushd .
cd ../lambda_auth/deploy/
source /Volumes/vars/WSE/secret_$secretSet/lambda_auth/deploy-env
hesdeploy -s $stage --update --yes $hesdeploy_extra
popd

pushd .
cd ../contentful_direct/deploy/
source /Volumes/vars/WSE/secret_$secretSet/contentful_direct/deploy-env
hesdeploy -s $stage --$deployType --yes $hesdeploy_extra
popd

# contentful maps has to run after contentful direct
pushd .
cd ../contentful_maps/deploy/
source /Volumes/vars/WSE/secret_$secretSet/contentful_maps/deploy-env
hesdeploy -s $stage --$deployType --yes $hesdeploy_extra
popd

pushd .
cd ../recommendation_engine/deploy/
source /Volumes/vars/WSE/secret_$secretSet/recommend/deploy-env
hesdeploy -s $stage --$deployType --yes $hesdeploy_extra
popd

pushd .
cd ../monarch_libguides/deploy/
source /Volumes/vars/WSE/secret_$secretSet/monarch_libguides/deploy-env
hesdeploy -s $stage --$deployType --yes $hesdeploy_extra
popd

pushd .
cd ../gatekeeper/deploy/
source /Volumes/vars/WSE/secret_$secretSet/gatekeeper/deploy-env
hesdeploy -s $stage --$deployType --yes $hesdeploy_extra
popd
