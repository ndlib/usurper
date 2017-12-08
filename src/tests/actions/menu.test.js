import * as menuActions from '../../actions/menu'

describe('menu actions', () => {
  const menuId = menuActions.USER_MENU;
  const openMenuAction = {
    type: menuActions.OPEN_MENU,
    menuId: menuId
  }
  const closeMenuAction = {
    type: menuActions.CLOSE_MENUS
  }
  const navigationAction = {
    type: menuActions.NAV_REQUEST
  }

  it('open menu', () => {
    expect(menuActions.openMenu(menuId)).toMatchObject(openMenuAction)
  })

  it('close menu', () => {
    expect(menuActions.closeMenus()).toMatchObject(closeMenuAction)
  })

  it('request navigation', () => {
    expect(menuActions.requestNavigation()).toMatchObject(navigationAction)
  })
})
