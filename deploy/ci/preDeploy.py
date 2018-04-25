from hesburgh import scriptutil, heslog
import boto3

def isBranch(branch):
  gitRet = scriptutil.executeCommand("git branch --all | grep remotes/origin/%s$" % branch)
  return gitRet.get("code") == 0


def isBucket(bucket):
  client = boto3.client('s3')
  try:
    response = client.head_bucket(Bucket=bucket)
  except Exception as e:
    return False
  return True


def run(stage):
  bucket = ""
  while True:
    bucket = scriptutil.userInput("What BUCKET are we building to?")
    if not isBucket(bucket):
      heslog.warn("Please input a bucket that exists")
      continue
    if scriptutil.userConfirm("Build to %s?" % bucket):
      break

  branch = ""
  while True:
    branch = scriptutil.userInput("What BRANCH are we building?")
    if not isBranch(branch):
      heslog.warn("Please input a branch that exists")
      continue
    if scriptutil.userConfirm("Build branch %s?" % branch):
      break

  return {
    "env": {
      "BUCKET": bucket,
      "BRANCH": branch,
    },
  }
