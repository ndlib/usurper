import {
  OPEN_MENU,
  CLOSE_MENUS,
  RESEARCH_MENU,
  SERVICES_MENU,
  LIBRARIES_MENU,
  ABOUT_MENU,
  ASK_MENU,
  MOBILE_MENU,
} from '../actions/menu'

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
    default:
      return state
  }
}
