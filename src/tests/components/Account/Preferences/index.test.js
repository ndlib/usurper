import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Favorites, { FavoritesContainer, mapStateToProps, mapDispatchToProps } from 'components/Account/Preferences'
import Loading from 'components/Messages/Loading'

import {
  getAllFavorites,
  REQUEST_FAVORITES,
  KIND as FAVORITES_KIND,
  RECEIVE_UPDATE_FAVORITES,
  REQUEST_UPDATE_FAVORITES,
} from 'actions/personal/favorites'
import { REQUEST_PERSONAL } from 'actions/personal/constants'
import { KIND as SETTINGS_KIND, REQUEST_SETTINGS, RECEIVE_UPDATE_SETTINGS } from 'actions/personal/settings'
import { CF_REQUEST_BRANCHES } from 'actions/contentful/branches'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let spy
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const baseState = {
  personal: {
    login: {
      state: statuses.SUCCESS,
      token: 'fake token',
    },
  },
  favorites: {
    dbFavorites: { state: statuses.NOT_FETCHED },
    subjectFavorites: { state: statuses.NOT_FETCHED },
  },
  settings: {
    [SETTINGS_KIND.hideHomeFavorites]: {
      state: statuses.NOT_FETCHED,
    },
    [SETTINGS_KIND.defaultSearch]: {
      state: statuses.NOT_FETCHED,
    },
    [SETTINGS_KIND.homeLibrary]: {
      state: statuses.NOT_FETCHED,
    },
    [SETTINGS_KIND.circStatus]: {
      state: statuses.NOT_FETCHED,
    },
    [SETTINGS_KIND.chatOptOut]: {
      state: statuses.NOT_FETCHED,
    },
    update: {
      [SETTINGS_KIND.homeLibrary]: statuses.NOT_FETCHED,
      [SETTINGS_KIND.chatOptOut]: statuses.NOT_FETCHED,
    },
  },
  cfBranches: {
    status: statuses.NOT_FETCHED,
  },
}

const setup = (state, ownProps) => {
  store = mockStore(state)
  const props = mapStateToProps(state, ownProps)
  return shallow(<Favorites store={store} {...props} />)
}

describe('components/Account/Preferences/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  describe('when logged in', () => {
    beforeEach(() => {
      enzymeWrapper = setup(baseState)
    })

    it('should not be loading', () => {
      expect(enzymeWrapper.dive().props().loading).toBe(false)
    })

    it('should request all favorites from store', () => {
      enzymeWrapper.dive().dive().simulate('checkFullyLoaded')
      expect(store.getActions()).toEqual(expect.arrayContaining(
        Object.keys(FAVORITES_KIND).map((key) => ({ type: REQUEST_FAVORITES, kind: FAVORITES_KIND[key]})),
      ))
    })

    it('should request settings and branches from the store', () => {
      enzymeWrapper.dive().dive().simulate('checkFullyLoaded')
      expect(store.getActions()).toEqual(expect.arrayContaining([
        { type: REQUEST_SETTINGS, kind: SETTINGS_KIND.homeLibrary, data: null },
        { type: REQUEST_SETTINGS, kind: SETTINGS_KIND.hideHomeFavorites, data: null },
        { type: REQUEST_SETTINGS, kind: SETTINGS_KIND.defaultSearch, data: null },
        { type: REQUEST_SETTINGS, kind: SETTINGS_KIND.chatOptOut, data: null },
        { type: CF_REQUEST_BRANCHES, depth: expect.any(Number) },
      ]))
    })

    it('should call clearAllFavorites action when calling clearAll', () => {
      const instance = enzymeWrapper.dive().dive().instance()
      instance.props = {
        ...instance.props,
        clearAllFavorites: jest.fn(),
      }

      instance.clearAll()
      expect(instance.props.clearAllFavorites).toHaveBeenCalled()
    })
  })

  describe('when not logged in', () => {
    const getState = (status) => {
      return {
        ...baseState,
        personal: {
          login: { state: status },
        },
      }
    }

    const getProps = (state) => {
      return {
        ...mapStateToProps(state),
        getToken: jest.fn(),
        initLogin: jest.fn(),
        getAllFavorites: jest.fn(),
        clearUpdateFavorites: jest.fn(),
        clearAllFavorites: jest.fn(),
        getHomeLibrary: jest.fn(),
        fetchBranches: jest.fn(),
        getHideHomeFavorites: jest.fn(),
        getDefaultSearch: jest.fn(),
        getChatOptOut: jest.fn(),
        clearUpdateSettings: jest.fn(),
      }
    }

    it('should try fetching user token', () => {
      const state = getState(statuses.NOT_FETCHED)
      const props = getProps(state)
      enzymeWrapper = shallow(<FavoritesContainer {...props} />)

      expect(props.getToken).toHaveBeenCalled()
    })

    it('should redirect to login page if no token found', () => {
      const state = getState(statuses.UNAUTHENTICATED)
      const props = getProps(state)
      enzymeWrapper = shallow(<FavoritesContainer {...props} />)

      expect(props.loading).toBe(false)

      let instance = enzymeWrapper.instance()
      spy = jest.spyOn(instance, 'checkFullyLoaded')
      instance.checkFullyLoaded()

      expect(props.initLogin).toHaveBeenCalled()
    })

    it('should check if anything needs to be fetched after update', () => {
      const state = getState(statuses.UNAUTHENTICATED)
      const props = getProps(state)
      enzymeWrapper = shallow(<FavoritesContainer {...props} />)

      const instance = enzymeWrapper.instance()
      spy = jest.spyOn(instance, 'checkFullyLoaded')
      instance.setState({
        foo: 'bar',
      })

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('when data already fetched', () => {
    const state = {
      ...baseState,
      favorites: {
        dbFavorites: { state: statuses.SUCCESS },
        subjectFavorites: { state: statuses.SUCCESS },
      },
      settings: {
        [SETTINGS_KIND.homeLibrary]: {
          state: statuses.SUCCESS,
          data: 'someLibrary',
        },
        [SETTINGS_KIND.circStatus]: {
          state: statuses.SUCCESS,
          data: 'true',
        },
        [SETTINGS_KIND.hideHomeFavorites]: {
          state: statuses.SUCCESS,
          data: 'true',
        },
        [SETTINGS_KIND.defaultSearch]: {
          state: statuses.SUCCESS,
          data: 'searchType',
        },
        [SETTINGS_KIND.chatOptOut]: {
          state: statuses.SUCCESS,
          data: 'true',
        },
        update: {
          [SETTINGS_KIND.homeLibrary]: statuses.NOT_FETCHED,
          [SETTINGS_KIND.chatOptOut]: statuses.NOT_FETCHED,
        },
      },
      cfBranches: {
        status: statuses.SUCCESS,
        depth: 0,
        data: [
          {
            fields: {
              title: 'fake branch 1',
            },
            sys: {
              id: 1,
            },
          },
          {
            fields: {
              title: 'fake branch 2',
              alternateTitle: 'show me',
            },
            sys: {
              id: 2,
            },
          },
        ],
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(state)
    })

    it('should clear update messages from previous page actions', () => {
      enzymeWrapper.dive().dive().instance() // forces constructor and lifecycle events to be called
      expect(store.getActions()).toEqual(expect.arrayContaining([
        { type: RECEIVE_UPDATE_FAVORITES, kind: FAVORITES_KIND.databases, state: statuses.NOT_FETCHED },
        { type: RECEIVE_UPDATE_FAVORITES, kind: FAVORITES_KIND.subjects, state: statuses.NOT_FETCHED },
        { type: RECEIVE_UPDATE_SETTINGS, kind: SETTINGS_KIND.homeLibrary, state: statuses.NOT_FETCHED },
        { type: RECEIVE_UPDATE_SETTINGS, kind: SETTINGS_KIND.hideHomeFavorites, state: statuses.NOT_FETCHED },
        { type: RECEIVE_UPDATE_SETTINGS, kind: SETTINGS_KIND.defaultSearch, state: statuses.NOT_FETCHED },
        { type: RECEIVE_UPDATE_SETTINGS, kind: SETTINGS_KIND.circStatus, state: statuses.NOT_FETCHED },
        { type: RECEIVE_UPDATE_SETTINGS, kind: SETTINGS_KIND.chatOptOut, state: statuses.NOT_FETCHED },
      ]))
    })

    it('should get settings props from store', () => {
      expect(enzymeWrapper.dive().props().loggedIn).toBe(true)
      for(const key in SETTINGS_KIND) {
        expect(key).not.toBe(undefined)
      }
      expect(enzymeWrapper.dive().props().libraryStatus).toBe(statuses.SUCCESS)
      expect(enzymeWrapper.dive().props().cfBranches).toBe(state.cfBranches)
      expect(enzymeWrapper.dive().props().hideFavorites).toBe(true)
      expect(enzymeWrapper.dive().props().chatOptOut).toBe(true)
    })
  })
})
