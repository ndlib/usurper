from hesburgh import scriptutil, heslog

def run(stage, outputs):
  bucket = None
  for k, stackInfo in outputs.iteritems():
    out = stackInfo.get("outputs", {})
    if "BucketName" in out:
      bucket = out.get("BucketName")
      break

  if not bucket:
    heslog.error("no bucket found to deploy to")
    return {}

  heslog.info("Build URLS")
  scriptutil.executeCommand("cd ../../scripts/build-links && yarn install --production")
  scriptutil.executeCommand("cd ../../scripts/build-links && node buildApiUrls.js stage=" + stage)

  heslog.info("Building Source")
  scriptutil.executeCommand("cd ../.. && yarn install --production")
  scriptutil.executeCommand("cd ../.. && yarn build --production")

  heslog.info("Deploying code to bucket %s" % bucket)

  scriptutil.executeCommand("cd ../../build/public && aws s3 sync . s3://%s --delete --acl public-read" % bucket)

  return {}
