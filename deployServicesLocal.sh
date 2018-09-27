#!/bin/bash
#usage ./deployServiceLocal.sh prod|beta|alpha|prep|dev create|update [ --branch branchName ]

if [ -z "$1" ]
then
  echo "Enter a stage prod|beta|alpha|prep|dev "
  echo "usage ./deployServiceLocal.sh prod|beta|alpha|prep|dev create|update [ --branch branchName ]"
  exit
fi

if [ -z "$2" ]
then
  echo "Enter a deploy type create|update "
  echo "usage ./deployServiceLocal.sh prod|beta|alpha|prep|dev create|update [ --branch branchName ]"
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

if [ $3 = "--branch" ]
then
  branch=$4
fi

deploy_project () {
  echo "DEPLOYING: $1 ------------"
  pushd .
  cd ../$1
  git checkout master;
  git pull;
  if [ -z "$branch" ]
  then
    echo "BRANCH: $(cat VERSION)"
    git checkout $(cat VERSION)
  else
    echo "BRANCH: $branch -----------"
    git checkout $branch
  fi

  cd deploy
  echo "/Volumes/vars/WSE/secret_$secretSet/$1/deploy-env"
  source /Volumes/vars/WSE/secret_$secretSet/$1/deploy-env
  #hesdeploy -s $stage --$deployType --yes $hesdeploy_extra
  cd ..
  git checkout master
  popd
}

deploy_project "lambda_auth"
deploy_project "contentful_direct"
deploy_project "contentful_maps"
deploy_project "recommendation_engine"
deploy_project "monarch_libguides"
deploy_project "gatekeeper"
deploy_project "classes_api"

exit
