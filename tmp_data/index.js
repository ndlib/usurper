'use strict'
let fs = require('fs')
let contentful = require('contentful')
let hesburgh = require('hesburgh_util')
let heslog = hesburgh.heslog
let hesutil = hesburgh.hesutil

function fetch (params) {
  // Assign from environment variables
  let space = params.space
  let accessToken = params.accessToken
  let contentTypes = params.contentTypes
  let host = params.host

  if (!host) {
    heslog.error('You must provide host param.')
    return
  }

  if (!space) {
    heslog.error('You must provide space param.')
    return
  }

  if (!accessToken) {
    heslog.error('You must provide accessToken param.')
    return
  }

  if (!contentTypes) {
    heslog.error('You must provide contentType param.')
    return
  }
  // If a base directory is given, make sure it exists.

  // Create the contentful client.
  let client = contentful.createClient({
    space: space,
    accessToken: accessToken,
    host: host
  })

  let items = []
  contentTypes.forEach(
    (contentType) => {
      heslog.info('Get entries for content type ' + contentType + '.')
      // Get all the items associated with current content type
      client.getEntries({ content_type: contentType }).then(
        (content) => {
          heslog.info('Writing content for content type ' + contentType)

          content.items.forEach(
            (item) => {
              items.push(JSON.stringify(item))
            }
          )
          fs.writeFile('data.js', 'export default [' + items + ']', function (err) {
            if (err) {
              heslog.error(err)
            }
          })
        },
        (reason) => {
          heslog.error('Contentful get entries failed for content type ' + contentType + '.\n' + reason.stack, { context: 'preview' })
        }
      ).catch((reason) => {
        heslog.error('Contentful get entries failed for content type ' + contentType + '.\n' + reason.stack, { context: 'preview' })
      })
    }
  )
}

fetch({
  space: hesutil.getEnv('CONTENTFUL_SPACE'),
  accessToken: hesutil.getEnv('CONTENTFUL_AUTH'),
  host: 'cdn.contentful.com',
  contentTypes: ['page']
})
