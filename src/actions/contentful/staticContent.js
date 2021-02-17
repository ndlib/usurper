import fetch from 'isomorphic-fetch'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_SIDEBAR = 'CF_REQUEST_SIDEBAR'
export const requestSidebar = (slug) => {
  return {
    type: CF_REQUEST_SIDEBAR,
    slug: slug,
  }
}

export const CF_RECEIVE_SIDEBAR = 'CF_RECEIVE_SIDEBAR'
const receiveSidebar = (slug, response) => {
  const error = {
    type: CF_RECEIVE_SIDEBAR,
    status: (response.status === 404 || response.length === 0) ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    slug: slug,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_SIDEBAR,
    status: statuses.SUCCESS,
    data: response[0],
    slug: slug,
    receivedAt: Date.now(),
  }

  try {
    if (response.length > 0 && response[0].sys.contentType.sys.id === 'dynamicPage') {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchSidebar = (slug, preview) => {
  const url = helper.getContentfulQueryUrl(`content_type=dynamicPage&fields.slug=${slug}&include=3`, preview)

  return (dispatch, getState) => {
    const state = getState()
    if (state.cfStatic.slug === slug && state.cfStatic.status === statuses.FETCHING) {
      return
    }
    dispatch(requestSidebar(slug))
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveSidebar(slug, json)))
      .catch(response => dispatch(receiveSidebar(slug, response)))
  }
}
