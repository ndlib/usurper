const AWS = require('aws-sdk')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const findExport = require('./lib/findExport');
const getStage = require('./lib/getStage');

let handler = async () => {
  try {
    const { stdout, stderr } = await exec('aws cloudformation list-exports')
    let data = JSON.parse(stdout)
    let outputs = {}
    let stage = getStage()

    console.log(findExport('usurperbucket', stage, '', data['Exports']))
    return findExport('usurperbucket', stage, '', data['Exports'])
    
  } catch (e) {
    console.log(e)
  }
}

handler()
