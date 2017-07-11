import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_SIDEBAR = 'CF_REQUEST_SIDEBAR'
export const requestSidebar = (slug) => {
  return {
    type: CF_REQUEST_SIDEBAR,
    slug: slug,
  }
}

export const CF_RECEIVE_SIDEBAR = 'CF_RECEIVE_SIDEBAR'
const receiveSidebar = (slug, response) => {
  let error = {
    type: CF_RECEIVE_SIDEBAR,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    slug: slug,
    receivedAt: Date.now(),
  }

  let success = {
    type: CF_RECEIVE_SIDEBAR,
    status: statuses.SUCCESS,
    data: response,
    slug: slug,
    receivedAt: Date.now(),
  }

  try {
    if (response.sys.contentType.sys.id === 'dynamicPage') {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchSidebar = (slug, preview) => {
  let url = `${Config.contentfulAPI}/entry?locale=en-US&slug=${slug}&preview=${preview}`
  return (dispatch, getState) => {
    let state = getState()
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
