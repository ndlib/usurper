import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import HomePageDisplay, { HomePageDisplayContainer } from 'components/Account/Preferences/HomePageDisplay'
import HideHomeFavorites from 'components/Account/Preferences/HomePageDisplay/HideHomeFavorites'
import DefaultSearch from 'components/Account/Preferences/HomePageDisplay/DefaultSearch'
import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'
import RadioList from 'components/Interactive/RadioList'

import { KIND } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let props

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<HomePageDisplay store={store} {...ownProps} />)
}

describe('components/Account/Preferences/HomePageDisplay', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('before update', () => {
    beforeEach(() => {
      props = {
        hideFavorites: true,
        defaultSearch: 'some default',
        cookies: { set: jest.fn(), remove: jest.fn() },
      }
      const state = {
        settings: {
          update: {
            [KIND.hideHomeFavorites]: {
              state: statuses.NOT_FETCHED,
            },
            [KIND.defaultSearch]: {
              state: statuses.NOT_FETCHED,
            },
          },
        },
      }
      enzymeWrapper = setup(state, props)
    })

    it('should render HideHomeFavorites setting', () => {
      const found = enzymeWrapper.dive().dive().find(HideHomeFavorites)
      expect(found.exists()).toBe(true)
      expect(found.props().defaultChecked).toEqual(props.hideFavorites)
    })

    it('should render DefaultSearch setting', () => {
      const found = enzymeWrapper.dive().dive().find(DefaultSearch)
      expect(found.exists()).toBe(true)
      expect(found.props().defaultValue).toEqual(props.defaultSearch)
    })

    it('should not render InlineLoading', () => {
      expect(enzymeWrapper.dive().dive().find(InlineLoading).exists()).toBe(false)
    })
  })

  describe('while updating', () => {
    beforeEach(() => {
      props = {
        hideFavorites: false,
        defaultSearch: 'some default',
        cookies: { set: jest.fn(), remove: jest.fn() },
      }
      const state = {
        settings: {
          update: {
            [KIND.hideHomeFavorites]: {
              state: statuses.NOT_FETCHED,
            },
            [KIND.defaultSearch]: {
              state: statuses.FETCHING,
            },
          },
        },
      }
      enzymeWrapper = setup(state, props)
    })

    it('should render InlineLoading', () => {
      expect(enzymeWrapper.dive().dive().find(InlineLoading).exists()).toBe(true)
    })
  })

  describe('without store', () => {
    beforeEach(() => {
      props = {
        hideFavorites: false,
        defaultSearch: 'some default',
        saveState: statuses.SUCCESS,
        setHideHomeFavorites: jest.fn(),
        cookies: { set: jest.fn(), remove: jest.fn() },
        setDefaultSearch: jest.fn(),
        saveSearchPreference: jest.fn(),
        clearUpdateSettings: jest.fn(),
      }
      enzymeWrapper = shallow(<HomePageDisplayContainer {...props} />)
    })

    it('should save all related settings when submitting form', () => {
      const form = enzymeWrapper.find('form')
      expect(form.exists()).toBe(true)

      form.simulate('submit', { preventDefault: jest.fn() })
      expect(props.setHideHomeFavorites).toHaveBeenCalled()
      expect(props.setDefaultSearch).toHaveBeenCalled()
      expect(props.saveSearchPreference).toHaveBeenCalled()
      expect(props.cookies.remove).toHaveBeenCalled()

      // Make sure cookie is set if hideFavorites is turned on.
      enzymeWrapper.find(HideHomeFavorites).simulate('change', {
        target: {
          name: 'hideHomeFavoritesCheckbox',
          type: 'checkbox',
          checked: true,
        },
      })
      form.simulate('submit', { preventDefault: jest.fn() })
      expect(props.cookies.set).toHaveBeenCalled()
    })

    it('should not submit again if save already in progress', () => {
      enzymeWrapper.setProps({
        saveState: statuses.FETCHING,
      })

      const form = enzymeWrapper.find('form')
      expect(form.exists()).toBe(true)

      form.simulate('submit', { preventDefault: jest.fn() })
      expect(props.setHideHomeFavorites).not.toHaveBeenCalled()
      expect(props.setDefaultSearch).not.toHaveBeenCalled()
      expect(props.saveSearchPreference).not.toHaveBeenCalled()
      expect(props.cookies.set).not.toHaveBeenCalled()
      expect(props.cookies.remove).not.toHaveBeenCalled()
    })

    it('should change value in state when setting changed', () => {
      expect(enzymeWrapper.state().hideHomeFavoritesCheckbox).toEqual(props.hideFavorites)
      expect(enzymeWrapper.state().defaultSearch).toEqual(props.defaultSearch)

      const hideFavorites = enzymeWrapper.find(HideHomeFavorites)
      expect(hideFavorites.exists()).toBe(true)
      const event = {
        target: {
          name: 'hideHomeFavoritesCheckbox',
          type: 'checkbox',
          checked: true,
        },
      }
      hideFavorites.simulate('change', event)
      expect(enzymeWrapper.state().hideHomeFavoritesCheckbox).toBe(event.target.checked)

      const defaultSearch = enzymeWrapper.find(DefaultSearch)
      expect(defaultSearch.exists()).toBe(true)
      const newValue = 'I am what I am'
      defaultSearch.simulate('change', newValue)
      expect(enzymeWrapper.state().defaultSearch).toBe(newValue)
    })

    it('should clear update message when setting changed', () => {
      const defaultSearch = enzymeWrapper.find(DefaultSearch)
      expect(defaultSearch.exists()).toBe(true)
      const newValue = 'chaaaaaaange'
      defaultSearch.simulate('change', newValue)

      expect(props.clearUpdateSettings).toHaveBeenCalled()
    })

    it('should show update message with correct status', () => {
      enzymeWrapper.setProps({
        saveState: statuses.SUCCESS,
      })
      expect(enzymeWrapper.containsMatchingElement(<UpdateStatus status={statuses.SUCCESS} />)).toBe(true)

      enzymeWrapper.setProps({
        saveState: statuses.ERROR,
      })
      expect(enzymeWrapper.containsMatchingElement(<UpdateStatus status={statuses.ERROR} />)).toBe(true)
    })

    it('should update state when certain props change', () => {
      enzymeWrapper.setProps({
        defaultSearch: 'newValue',
        hideFavorites: !props.hideFavorites,
      })
      expect(enzymeWrapper.state().defaultSearch).toEqual('newValue')
      expect(enzymeWrapper.state().hideHomeFavoritesCheckbox).toEqual(!props.hideFavorites)
    })
  })
})
