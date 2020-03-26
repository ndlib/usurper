import typy from 'typy'
import {
  CF_REQUEST_ALL_REDIRECTS,
  CF_RECEIVE_ALL_REDIRECTS,
} from 'actions/contentful/allRedirects'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED, json: [] }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALL_REDIRECTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALL_REDIRECTS:
      return Object.assign({}, state, {
        status: action.status,
        json: action.allRedirects ? action.allRedirects.map(mapRedirect) : [],
      })
    default:
      return state
  }
}

export const mapRedirect = (entry) => {
  let linkPath
  switch (typy(entry, 'fields.toLink.sys.contentType.sys.id').safeString) {
    case 'page':
    case 'dynamicPage':
      linkPath = '/' + entry.fields.toLink.fields.slug
      break
    case 'externalLink':
      linkPath = entry.fields.toLink.fields.url
      break
    case 'internalLink':
      const page = entry.fields.toLink.fields.page
      linkPath = page ? ('/' + page.fields.slug) : null
      break
    default:
      linkPath = null
  }

  return {
    id: entry.sys.id,
    fromPath: entry.fields.fromPath,
    toPath: linkPath || entry.fields.toPath,
    forwardPath: entry.fields.forwardPath,
    forwardQuery: entry.fields.forwardQuery,
  }
}
