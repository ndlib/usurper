export const OPEN_MENU = 'OPEN_MENU'
export const CLOSE_MENUS = 'CLOSE_MENUS'
export const RESEARCH_MENU = 'RESEARCH_MENU'
export const SERVICES_MENU = 'SERVICES_MENU'
export const LIBRARIES_MENU = 'LIBRARIES_MENU'
export const ABOUT_MENU = 'ABOUT_MENU'
export const ASK_MENU = 'ASK_MENU'
export const MOBILE_MENU = 'MOBILE_MENU'

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
