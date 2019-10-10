const config = require('../config/configParameters')
const fs = require('fs')
const fetch = require('node-fetch')
const path = require('path')
const { t: typy } = require('typy')

const TODAY = new Date().toISOString().split('T')[0]
const HOST = "https://library.nd.edu"
const LIMIT = 200

const routeInfo = [
  {
    "route": "",
    "field": "fields.slug",
    "type": "page",
    "exclude": "fields.requiresLogin"
  },
  {
    "route": "/floor",
    "field": "fields.slug",
    "type": "floor",
  },
  {
    "route": "/news",
    "field": "fields.slug",
    "type": "news",
  },
  {
    "route": "/event",
    "field": "fields.slug",
    "type": "event",
  },
  {
    "route": "/database",
    "field": "sys.id",
    "type": "resource",
  },
]

// This should basically be the hard-coded routes in App/index.js, excluding those that require login
const staticRoutes = [
  '',
  '/about',
  '/chat',
  '/hours',
  '/events',
  '/news',
  '/libraries',
  '/subjects',
  '/research',
  '/services',
  '/databases',
]

const routeString = (route) => {
  return `  <url>\n    <loc>${HOST}${route}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </url>\n`
}

const query = async (url, contentType, skip = 0) => {
  return fetch(`${url}&skip=${skip}&limit=${LIMIT}`)
    .then(response => response.json())
    .then(json => {
      const data = json.items || []
      const total = json.total || LIMIT
      const fetched = skip + (json.limit || LIMIT)

      if (fetched < total) {
        return query(url, contentType, fetched).then(nextPage => data.concat(nextPage))
      } else {
        console.log(`${contentType} had ${json.total ? total : 0} entries`)
        return data
      }
    })
}

const handler = async () => {
  try {
    const { contentfulSpace, contentfulEnvironment, contentfulCdnToken } = config
    const baseUrl = `https://cdn.contentful.com/spaces/${contentfulSpace}/environments/${contentfulEnvironment}`

    let data = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    let writtenCount = 0
    let skippedCount = 0
    for (let i = 0; i < routeInfo.length; i++) {
      const info = routeInfo[i]
      const fieldIds = info.field + (info.exclude ? `,${info.exclude}` : '')
      const url = `${baseUrl}/entries?select=${fieldIds}&content_type=${info.type}&access_token=${contentfulCdnToken}`

      const queryResults = await query(url, info.type)
      if (queryResults && Array.isArray(queryResults)) {
        const excludeField = info.exclude ? info.exclude.split('.')[1] : ''
        queryResults.forEach(entry => {
          const id = (!excludeField || !entry[excludeField]) ? typy(entry, info.field).safeString : null
          if (id) {
            data += routeString(`${info.route}/${id}`)
            writtenCount++
          } else {
            skippedCount++
          }
        })
      } else {
        console.warn(`No records written for ${info.type}.`)
      }
    }

    staticRoutes.forEach(route => {
      data += routeString(route)
      writtenCount++
    })
    data += '</urlset>'

    fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), data)
    console.log(`Total Routes Written: ${writtenCount}\nTotal Skipped: ${skippedCount}`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

handler()
