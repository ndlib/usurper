const AWS = require('aws-sdk')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

let apiList = [
  'classesAPI',
  'monarchLibguides',
  'contentfuldirect',
  'recommendEngine'
]

let handler = async () => {
  try {
    const { stdout, stderr } = await exec('aws cloudformation list-exports')
    let data = JSON.parse(stdout)
    let outputs = {}
    let stage = getStage()

    for(let i = 0; i < apiList.length; i++) {
      outputs[apiList[i]] = findApi(apiList[i], stage, data['Exports'])
    }

    var stream = fs.createWriteStream("../../config/apiUrls.js");
    stream.once('open', function(fd) {
      stream.write("module.exports = {\n")
      for(let i = 0; i < apiList.length; i++) {
        stream.write("  " + apiList[i] + ": '" + outputs[apiList[i]] + "',\n")
      }
      stream.write("}\n")
      stream.end()
    })

  } catch (e) {
    console.log(e)
  }
}

handler()

let findApi = (api, stage, data) => {
  for(let i = 0; i < data.length; i++) {
    if (data[i].Name == api + '-' + stage + '-api-url') {
      return data[i].Value
    }
  }

  throw api + " is not found in the cloudformation exports for stage, " + stage;
}

let getStage = () => {
  let data = process.argv[2].split('=')
  if (data[0] != 'stage') {
    throw "stage variable not set add stage=StageName  Example: node buildApiUrls.js stage=devJon."
  }

  return data[1]
}
