import fetch from 'isomorphic-fetch'
import * as statuses from '../constants/APIStatuses'
import Config from '../shared/Configuration'

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

const receiveNavigation = (response) => {
  if (response === 'TypeError: Failed to fetch') {
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
      data: response,
      receivedAt: Date.now(),
    }
  }
}

export const fetchNavigation = (preview) => {
  let url = `${Config.contentfulAPI}/entry?locale=en-US&slug=navigation&preview=${preview}`
  return (dispatch) => {
    dispatch(requestNavigation())
    return fetch(url)
      .then(response => response.ok ? response.json() : { errorStatus: response.status })
      .then(json => dispatch(receiveNavigation(json)))
      .catch(response => dispatch(receiveNavigation(response)))
  }
}
