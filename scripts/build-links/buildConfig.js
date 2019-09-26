const AWS = require('aws-sdk')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const findExport = require('./lib/findExport');
const getStage = require('./lib/getStage');

const RED = '\033[0;31m'
const GREEN = '\033[0;32m'
const NC = '\033[0m' // No Color

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
  'contentfulCdnToken',
  'contentfulSpace',
  'contentfulEnvironment',
  'favoritesEnabled',
  'subjectFilteringEnabled',
]

let handler = async () => {
  try {
    const { stdout, stderr } = await exec('aws cloudformation list-exports')
    let data = JSON.parse(stdout)
    let outputs = {}
    let stage = getStage()
    let error = false

    for(let i = 0; i < apiList.length; i++) {
      try {
        outputs[apiList[i]] = findExport(apiList[i], stage, 'api-url', data['Exports'])
      } catch(err) {
        console.error(`${RED}${err}${NC}`)
        error = true
      }
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
        console.error(`${RED}Unable to read ${psList[j]} from parameter store.${NC}`)
        error = true
      }
    }

    if (error) {
      throw new Error('Failed to retrieve required parameter(s).')
      process.exit(1)
    }

    var stream = fs.createWriteStream(`${__dirname}/../../config/configParameters.js`);
    stream.once('open', function(fd) {
      stream.write("module.exports = {\n")
      for(let i = 0; i < apiList.length; i++) {
        stream.write("  " + apiList[i] + ": '" + outputs[apiList[i]] + "',\n")
      }
      for(let i = 0; i < psList.length; i++) {
        if (psOutputs[psList[i]]) {
          const isBool = ['true', 'false'].includes(psOutputs[psList[i]].toLowerCase())
          const value = isBool ? (psOutputs[psList[i]].toLowerCase() === 'true') : `'${psOutputs[psList[i]]}'`
          stream.write(`  ${psList[i]}: ${value},\n`)
        }
      }
      stream.write("  environment: '" + stage + "',\n")
      stream.write("  version: '" + fs.readFileSync(`${__dirname}/../../VERSION`, 'utf8').trim() + "',\n")
      stream.write("}\n")
      stream.end()
    })

    console.log(`Build config complete.`)
  } catch (e) {
    console.error(e)
    throw e
  }
}

handler()
