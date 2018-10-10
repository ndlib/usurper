RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

awsassumerole(){
  unset AWS_VAULT
  export $(aws-vault exec $1 --assume-role-ttl 1h -- env | grep AWS)
}

libnd_website_role_test() {
  if [ $stage = "prod" ] || [ $stage = "beta" ] && [ ! $AWS_VAULT = "libnd" ]
  then
    printf "${RED}For production deploys you must assume the libnd role ${NC} \n"
    usage
    exit 1
  fi
}

libnd_services_role_test() {
  if [ $stage = "prod" ] || [ $stage = "beta" ] && [ ! $AWS_VAULT = "prod-dev" ]
  then
    printf "${RED}For production deploys you must assume the libnd role ${NC} \n"
    usage
    exit 1
  fi
}

libnd_invalidator_role_test() {
  if [ $stage = "prod" ] || [ $stage = "beta" ] && [ ! $AWS_VAULT = "prod-invalidator" ]
  then
    printf "${RED}For production deploys you must assume the libnd role ${NC} \n"
    usage
    exit 1
  fi
}

testlib_role_test() {
  if [ $stage = "dev" ] || [ $stage = "alpha" ] || [ $stage = "prep" ] && [ ! $AWS_VAULT = "testlib" ]
  then
    printf "${RED}For production deploys you must assume the testlib role ${NC} \n"
    usage
  fi
}

stage_test() {
  if [ -z "$stage" ] || [[ ! $stage =~ ^prod$|^beta$|^alpha$|^prep$|^dev$ ]]
  then
    printf "${RED}Enter a stage prod|beta|alpha|prep|dev  ${NC} \n"
    usage
  fi
}
