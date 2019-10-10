
module.exports = () => {
  let data = process.argv[2].split('=')
  if (data[0] != 'stage') {
    throw "stage variable not set add stage=StageName  Example: node buildConfig.js stage=devJon."
  }

  return data[1]
}
