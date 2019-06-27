import {
  OPEN_MENU,
  CLOSE_MENUS,
  NAV_REQUEST,
  NAV_RECEIVE,
} from 'actions/menu'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'
import typy from 'typy'

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
      const outObj = Object.assign({}, state, {
        status: action.status,
        data: action.data,
      })
      // Dive through the data and add the full internal links when you find them
      if (action.internalLinks) {
        typy(outObj.data, 'fields.columns').safeArray.forEach((columnContainer) => {
          typy(columnContainer, 'fields.columns').safeArray.forEach((column) => {
            typy(column, 'fields.sections').safeArray.forEach((section) => {
              typy(section, 'fields.links').safeArray.forEach((link) => {
                if (typy(link, 'sys.contentType.sys.id').safeString === 'internalLink') {
                  // Reassign the properties on the link to match the fully-populated internal link with the same id
                  Object.assign(link, helper.mergeInternalLink(link, action.internalLinks))
                }
              })
            })
          })
        })
      }
      return outObj
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
