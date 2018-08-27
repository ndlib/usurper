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
