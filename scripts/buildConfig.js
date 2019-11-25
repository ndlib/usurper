const AWS = require('aws-sdk')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const findExport = require('./lib/findExport');
const getStage = require('./lib/getStage');

const RED = process.env.CI ? '' : '\033[0;31m'
const GREEN = process.env.CI ? '' : '\033[0;32m'
const NC = process.env.CI ? '' : '\033[0m' // No Color

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
  'eventsFilteringEnabled',
  'loginEnabled',
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
        // In test, use prod version of other services
        // Prod does not exist in testlibnd, so we have an environment variable to fake these service urls there
        const exportStage = (stage === 'test' ? 'prod' : stage)
        outputs[apiList[i]] = (process.env.FAKE_SERVICE_URLS === true || process.env.FAKE_SERVICE_URLS === 'true')
          ? `https://${apiList[i]}.test.url`
          : findExport(apiList[i], exportStage, 'api-url', data['Exports'])
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
        if (process.env.CI) {
          console.error(err)
        }
        error = true
      }
    }

    if (error) {
      process.exit(1)
    }

    var stream = fs.createWriteStream(`${__dirname}/../config/configParameters.js`);
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
      stream.write("  version: '" + fs.readFileSync(`${__dirname}/../VERSION`, 'utf8').trim() + "',\n")
      stream.write("}\n")
      stream.end()
    })

    console.log(`Build config complete.`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

handler()
