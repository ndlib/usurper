import {
  OPEN_MENU,
  CLOSE_MENUS,
  NAV_REQUEST,
  NAV_RECEIVE,
} from 'actions/menu'
import * as statuses from 'constants/APIStatuses'
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
                  const match = action.internalLinks.filter(search => search.sys.id === link.sys.id)
                  if (match) {
                    // Reassign the properties on the link to match the fully-populated internal link with the same id
                    Object.assign(link, ...match)
                  }
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
