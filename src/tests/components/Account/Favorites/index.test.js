import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import FavoritesContainer, { mapStateToProps } from 'components/Account/Favorites'
import Loading from 'components/Messages/Loading'

import {
  getAllFavorites,
  REQUEST_FAVORITES,
  KIND,
  RECEIVE_UPDATE_FAVORITES,
  REQUEST_UPDATE_FAVORITES,
} from 'actions/personal/favorites'
import { REQUEST_PERSONAL } from 'actions/personal/constants'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let spy
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  const props = mapStateToProps(state, ownProps)
  return shallow(<FavoritesContainer store={store} {...props} />)
}

describe('components/Account/Favorites/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  describe('when logged in', () => {
    const state = {
      personal: {
        login: { state: statuses.SUCCESS, token: 'fake token' },
      },
      favorites: {
        dbFavorites: { state: statuses.NOT_FETCHED },
        subjectFavorites: { state: statuses.NOT_FETCHED },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(state)
    })

    it('should not be loading', () => {
      expect(enzymeWrapper.dive().props().loading).toBe(false)
    })

    it('should request all favorites from store', () => {
      enzymeWrapper.dive().dive().simulate('checkFullyLoaded')
      const actions = store.getActions()
      expect(actions).toEqual(
        Object.keys(KIND).map((key) => ({ type: REQUEST_FAVORITES, kind: KIND[key]}))
      )
    })
  })

  describe('when not logged in', () => {
    it('should try fetching user token', () => {
      const state = {
        personal: {
          login: { state: statuses.NOT_FETCHED },
        },
        favorites: {
          dbFavorites: { state: statuses.NOT_FETCHED },
          subjectFavorites: { state: statuses.NOT_FETCHED },
        },
      }
      enzymeWrapper = setup(state)

      enzymeWrapper.dive().dive().instance() // forces constructor and lifecycle events to be called
      expect(store.getActions()).toEqual(expect.arrayContaining([
        { type: REQUEST_PERSONAL, requestType: 'login' },
      ]))
    })

    it('should redirect to login page if no token found', () => {
      const state = {
        personal: {
          login: { state: statuses.SUCCESS, redirectUrl: 'http://www.fake.url' },
        },
        favorites: {
          dbFavorites: { state: statuses.NOT_FETCHED },
          subjectFavorites: { state: statuses.NOT_FETCHED },
        },
      }
      enzymeWrapper = setup(state)

      expect(enzymeWrapper.dive().props().loading).toBe(false)

      // Mock the redirect function so we can spy on it
      window.location.replace = jest.fn()

      let instance = enzymeWrapper.dive().dive().instance()
      spy = jest.spyOn(instance, 'checkFullyLoaded')
      instance.checkFullyLoaded()

      // Check that the redirect was called with the same url we passed in to the object
      expect(window.location.replace).toHaveBeenCalledWith(state.personal.login.redirectUrl)
    })
  })

  describe('when data already fetched', () => {
    const state = {
      personal: {
        login: { state: statuses.SUCCESS, token: 'fake token' },
      },
      favorites: {
        dbFavorites: { state: statuses.SUCCESS },
        subjectFavorites: { state: statuses.SUCCESS },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(state)
    })

    it('should clear update messages from previous page actions', () => {
      enzymeWrapper.dive().dive().instance() // forces constructor and lifecycle events to be called
      expect(store.getActions()).toEqual(expect.arrayContaining([
        { type: RECEIVE_UPDATE_FAVORITES, kind: KIND.databases, state: statuses.NOT_FETCHED },
        { type: RECEIVE_UPDATE_FAVORITES, kind: KIND.subjects, state: statuses.NOT_FETCHED },
      ]))
    })
  })
})
