const AWS = require('aws-sdk')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const findExport = require('./lib/findExport');
const getStage = require('./lib/getStage');

let apiList = [
  'classesAPI',
  'monarchLibguides',
  'contentfuldirect',
  'recommendEngine',
  'gatekeeper',
  'contentfulmaps',
  'userPreferences'
]
const psList = [
  'viceroy',
  'illiad',
  'googleAnalyticsId',
  'gcseCx',
  'gcseKey',
  'onesearch',
]

let handler = async () => {
  try {
    const { stdout, stderr } = await exec('aws cloudformation list-exports')
    let data = JSON.parse(stdout)
    let outputs = {}
    let stage = getStage()

    for(let i = 0; i < apiList.length; i++) {
      outputs[apiList[i]] = findExport(apiList[i], stage, 'api-url', data['Exports'])
    }

    let psOutputs = {}
    const ssm = new AWS.SSM({'region': 'us-east-1'})
    for(let j = 0; j < psList.length; j++) {
      try {
        const params = {
          Name: `/all/usurper/${stage}/${psList[j]}`,
          WithDecryption: true,
        }
        const data = await ssm.getParameter(params).promise()
        psOutputs[psList[j]] = data.Parameter.Value
      } catch(err) {
        console.log(err, err.message)
      }
    }

    var stream = fs.createWriteStream("../../config/configParameters.js");
    stream.once('open', function(fd) {
      stream.write("module.exports = {\n")
      for(let i = 0; i < apiList.length; i++) {
        stream.write("  " + apiList[i] + ": '" + outputs[apiList[i]] + "',\n")
      }
      for(let i = 0; i < psList.length; i++) {
        stream.write("  " + psList[i] + ": '" + psOutputs[psList[i]] + "',\n")
      }
      stream.write("  version: '" + stage + "',\n")
      stream.write("}\n")
      stream.end()
    })
  } catch (e) {
    console.log(e)
  }
}

handler()
