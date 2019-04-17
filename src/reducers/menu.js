import {
  OPEN_MENU,
  CLOSE_MENUS,
  NAV_REQUEST,
  NAV_RECEIVE,
} from '../actions/menu'
import * as statuses from 'constants/APIStatuses'

export default (
  state = {
    openMenuId: null,
  },
  action
) => {
  switch (action.type) {
    case OPEN_MENU:
      return Object.assign({}, state, {
        menuId: action.menuId,
      })
    case CLOSE_MENUS:
      return Object.assign({}, state, {
        menuId: null,
      })
    case NAV_REQUEST:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case NAV_RECEIVE:
      return Object.assign({}, state, {
        status: action.status,
        data: action.data,
      })
    default:
      return state
  }
}

export const hasNavigation = (state, action) => {
  switch (action.type) {
    case NAV_RECEIVE:
      if (action.status === statuses.SUCCESS) {
        return true
      }
      return false
    default:
      return state === true // same thing as `state : state ? false`
  }
}
