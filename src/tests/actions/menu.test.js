import nock from 'nock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import * as menuActions from 'actions/menu'
import * as statuses from 'constants/APIStatuses'
import Config from 'shared/Configuration'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

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

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  it('open menu', () => {
    expect(menuActions.openMenu(menuId)).toMatchObject(openMenuAction)
  })

  it('close menu', () => {
    expect(menuActions.closeMenus()).toMatchObject(closeMenuAction)
  })

  it('request navigation', () => {
    expect(menuActions.requestNavigation()).toMatchObject(navigationAction)
  })

  it('fetch navigation - error status', async () => {
    const mockResponse = {
      status: 500,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .reply(mockResponse.status, mockResponse)
      .persist()

    const store = mockStore({ })
    const result = await store.dispatch(menuActions.fetchNavigation(false))
    expect(result).toMatchObject({
      type: menuActions.NAV_RECEIVE,
      status: statuses.ERROR,
    })
  })

  it('fetch navigation - throw error', async () => {
    const mockResponse = {
      message: 'error',
      code: 500,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .replyWithError(mockResponse)
      .persist()

    const store = mockStore({ })
    const result = await store.dispatch(menuActions.fetchNavigation(false))
    expect(result).toMatchObject({
      type: menuActions.NAV_RECEIVE,
      status: statuses.ERROR,
    })
  })

  it('fetch navigation - success', async () => {
    const mockResponse = [{}]
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .reply(200, mockResponse)
      .persist()

    const store = mockStore({ })
    const result = await store.dispatch(menuActions.fetchNavigation(true))
    expect(result).toMatchObject({
      type: menuActions.NAV_RECEIVE,
      status: statuses.SUCCESS,
    })
  })
})
