#!/bin/bash
# deployes all the lambdas associated with usurper
# can do all or 1
# usage "./deplopServiceLocal.sh prod|beta|alpha|prep|dev create|update [ -b|--branch branchName ] [ ]-p|--project single_project_to_deploy" ]

PROGNAME=$0
LOG_DIR_BASE=$(pwd)

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

usage() {
  cat << EOF >&2
Usage: $PROGNAME prod|beta|alpha|prep|dev create|update [-b <branch>] [-p <project>]

deployes all the lambdas associated with usurper
can do all or 1

-b <branch>: The branch to deploy otherwise uses the current VERSION file
-p <project>: The specific project to deploy otherwise delploys all
EOF
  exit 1
}

branch="VERSION"
project="all"

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -b|--branch)
    branch="$2"
    shift # past argument
    shift # past value
    ;;
    -p|--project)
    project="$2"
    shift # past argument
    shift # past value
    ;;
    -h|--help)
    usage
    exit 1
    shift # past argument
    shift # past value
    ;;
    --default)
    DEFAULT=YES
    shift # past argument
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

stage=$1
deployType=$2


if [ -z "$1" ] || [[ ! $1 =~ ^prod$|^beta$|^alpha$|^prep$|^dev$ ]]
then
  echo "Enter a stage prod|beta|alpha|prep|dev "
  echo usage
  exit
fi

if [ -z "$2" ] || [[ ! $2 =~ ^create$|^update$ ]]
then
  echo "Enter a deploy type create|update "
  echo usage
  exit
fi

if [ -d "/Volumes/vars/WSE/" ]
then
  base_directory="/Volumes/vars/WSE"
elif [ -d "/Volumes/WSE/" ]
then
  base_directory="/Volumes/WSE"
else
  echo "Make sure you have corpfs mounted"
  exit
fi

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

if [ $stage = "prod" ] || [ $stage = "beta" ] && [ ! $AWS_VAULT = "prod-dev" ]
then
  echo "For production deploys you must assume the prod-dev role"
  exit
fi

if [ $stage = "dev" ] || [ $stage = "alpha" ] || [ $stage = "prep" ] && [ ! $AWS_VAULT = "testlib" ]
then
  echo "For production deploys you must assume the testlib role"
  exit
fi

deploy_project () {
  current_project=$1
  if [ $project = "all" ] || [ $project = $current_project ]
  then
    echo "------------ DEPLOYING: $current_project ------------"
    pushd .
    cd ../../$current_project
    git checkout master > /dev/null
    git pull > /dev/null
    if [ $branch = "VERSION" ]
    then
      echo "BRANCH: $(cat VERSION)"
      git checkout $(cat VERSION)
    else
      echo "BRANCH: $branch "
      git checkout $branch
    fi

    cd deploy

    echo $base_directory/secret_$secretSet/$current_project/deploy-env
    source $base_directory/secret_$secretSet/$current_project/deploy-env

    echo "CMD: hesdeploy -s $stage --$deployType --yes $hesdeploy_extra" >> $LOG_DIR_BASE/logs/$current_project.log
    if $(hesdeploy -s $stage --$deployType --yes $hesdeploy_extra >> $LOG_DIR_BASE/logs/$current_project.log)
    then
      printf "${GREEN} SUCCESS: $current_project ${NC} \n"
    else
      printf "${RED} Failed: $current_project ${NC} \n"
      echo "See deploy/logs/$current_project.log"
    fi
     echo "" >> $LOG_DIR_BASE/logs/$current_project.log

    cd ..
    git checkout master > /dev/null
    popd
  else
    echo "Skipped $1"
  fi
}

deploy_project "lambda_auth"

deploy_project "contentful_direct"

deploy_project "contentful_maps"

deploy_project "recommendation_engine"

deploy_project "monarch_libguides"

deploy_project "gatekeeper"

deploy_project "classes_api"

printf "${GREEN}Success${NC} \n"
