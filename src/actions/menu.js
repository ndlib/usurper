import fetch from 'isomorphic-fetch'
import * as statuses from 'constants/APIStatuses'
import Config from 'shared/Configuration'
import { fetchInternalLinks } from './contentful/internalLink'

export const OPEN_MENU = 'OPEN_MENU'
export const CLOSE_MENUS = 'CLOSE_MENUS'
export const ASK_MENU = 'ASK_MENU'
export const USER_MENU = 'USER_MENU'
export const MOBILE_MENU = 'MOBILE_MENU'

export const NAV_REQUEST = 'NAV_REQUEST'
export const NAV_RECEIVE = 'NAV_RECEIVE'

export function openMenu (menuId) {
  return {
    type: OPEN_MENU,
    menuId,
  }
}

export function closeMenus () {
  return {
    type: CLOSE_MENUS,
  }
}

export const actions = {
  openMenu,
  closeMenus,
}

export const requestNavigation = () => {
  return {
    type: NAV_REQUEST,
  }
}

const receiveNavigation = (response, internalLinks) => {
  if (response === 'TypeError: Failed to fetch' || response.errorStatus || response.name === 'FetchError') {
    return {
      type: NAV_RECEIVE,
      status: statuses.ERROR,
      error: response,
      receivedAt: Date.now(),
    }
  } else {
    return {
      type: NAV_RECEIVE,
      status: statuses.SUCCESS,
      data: response[0],
      internalLinks: internalLinks,
      receivedAt: Date.now(),
    }
  }
}

export const fetchNavigation = (preview) => {
  const query = encodeURIComponent('content_type=columnContainer&fields.slug=navigation&include=4')
  let url = `${Config.contentfulAPI}/${preview ? 'livequery' : 'query'}?locale=en-US&query=${query}`
  if (preview) {
    url += `&preview=${preview}`
  }

  return (dispatch) => {
    dispatch(requestNavigation())

    // It's complicated... Internal links are part of navigation. BUT they rely on the "Page" they reference in order to
    // infer their title. This is problematic because at the depth we are fetching navigation, we don't get the page.
    // If we increase the depth to 5, we start getting looping where pages reference other things which reference a page, etc...
    // eventually the response blows up to > 1.5MB which is just too big. To get around this, fetch all the internal links
    // separately (they're small) WITH their pages, and we can connect them at the appropriate spot during post-processing.
    return Promise.all([
      fetch(url).then(response => response.ok ? response.json() : { errorStatus: response.status }),
      fetchInternalLinks(preview),
    ])
      .then(promiseResponse => dispatch(receiveNavigation(promiseResponse[0], promiseResponse[1])))
      .catch(response => dispatch(receiveNavigation(response)))
  }
}
