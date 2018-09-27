#!/bin/bash

if [ -z "$1" ]
then
  echo "Enter a stage "
  exit
fi

stage=$1
deployType=$2

if [ $stage = "alpha" ] || [ $stage = "beta" ]
then
  secretSet="prod"
else
  secretSet=$stage
fi

if [ $stage = "prod" ] || [ $stage = "beta" ]
then
  export hesdeploy_extra="--useServiceRole --deployBucket libnd-cf"
fi

# lambda auth has to run first
pushd .
cd ../lambda_auth/deploy/
source /Volumes/vars/WSE/secret_$secretSet/lambda_auth/deploy-env
hesdeploy -s $stage --$deployType --yes $hesdeploy_extra
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

pushd .
cd ../classes_api/deploy/
source /Volumes/vars/WSE/secret_$secretSet/classes_api/deploy-env
hesdeploy -s $stage --$deployType --yes $hesdeploy_extra
popd
