#!/bin/bash


usage() {
  cat << EOF >&2
Usage: $PROGNAME prod|beta|alpha|prep|dev

Invalodidates the cloud front associated with the version

EOF
  exit 1
}

if [ -z "$1" ] || [[ ! $1 =~ ^prod$|^beta$|^alpha$|^prep$|^dev$ ]]
then
  echo "Enter a stage prod|beta|alpha|prep|dev "
  echo usage
  exit
fi

stage=$1

if [ $stage = "prod" ] || [ $stage = "beta" ] && [ ! $AWS_VAULT = "prod-invalidator" ]
then
  echo "For production deploys you must assume the prod-invalidator role"
  exit
fi

if [ $stage = "dev" ] || [ $stage = "alpha" ] || [ $stage = "prep" ] && [ ! $AWS_VAULT = "testlib" ]
then
  echo "For production deploys you must assume the testlibnd role"
  exit
fi



if [ stage = "prod"]
then
  CloudFrontID="EE14BFPF6TQIK"
elif [ stage = "beta"]
then
  CloudFrontID="E874ZZB7ZEYT3"
elif [ stage = "alpha"]
then
  CloudFrontID="E874ZZB7ZEYT3"
elif [ stage = "prep"]
then
  CloudFrontID="E874ZZB7ZEYT3"
elif [ stage = "dev"]
then
  CloudFrontID="E874ZZB7ZEYT3"
fi


aws cloudfront create-invalidation --distribution-id  E874ZZB7ZEYT3 --paths /*
