import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import NoFavorites, { NoFavoritesContainer } from 'components/Account/Favorites/NoFavorites'
import Wizard from 'components/Account/Favorites/Wizard'
import Link from 'components/Interactive/Link'

import { REQUEST_UPDATE_SETTINGS, KIND as SETTINGS_KIND } from 'actions/personal/settings'
import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let spy

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<NoFavorites store={store} {...ownProps} />)
}

describe('components/Account/Favorites/NoFavorites', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  describe('when logged in', () => {
    describe('on home page only', () => {
      const state = {
        personal: {
          login: { state: statuses.SUCCESS, token: 'fake token' },
        },
      }
      const props = {
        isHomePage: true,
        cookies: {
           set: jest.fn(),
        },
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('sees user as logged in', () => {
        expect(enzymeWrapper.dive().props().isLoggedIn).toBe(true)
      })

      it('should show link to settings', () => {
        const settingsPath = '/settings'
        expect(enzymeWrapper.dive().dive().containsMatchingElement(<Link to={settingsPath}>account settings</Link>)).toBe(true)
      })

      it('should update store when hideFavorites called', () => {
        const instance = enzymeWrapper.dive().dive().instance()
        instance.hideFavorites()

        const actions = store.getActions()
        expect(actions).toEqual([
          { type: REQUEST_UPDATE_SETTINGS, kind: SETTINGS_KIND.hideHomeFavorites, }
        ])
      })
    })

    describe('on favorites page', () => {
      const state = {
        personal: {
          login: { state: statuses.SUCCESS, token: 'fake token' },
        },
      }
      const props = {
        isHomePage: false,
        clearUpdateFavorites: jest.fn(),
        setHideHomeFavorites: jest.fn(),
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('sees user as logged in', () => {
        expect(enzymeWrapper.dive().props().isLoggedIn).toBe(true)
      })

      it('should open wizard when clicking add favorites button', () => {
        spy = jest.spyOn(NoFavoritesContainer.prototype, 'openWizard')
        enzymeWrapper = setup(state, props) // set up again because of spy

        const btn = enzymeWrapper.dive().dive().findWhere(n => n.type() === 'button' && n.text() === 'Add Favorites')
        expect(btn).toHaveLength(1)

        btn.simulate('click')
        expect(spy).toHaveBeenCalled()
      })

      it('should render wizard when set to open', () => {
        // Check that the function updates the state
        const instance = enzymeWrapper.dive().dive().instance()
        expect(instance.state.wizardOpen).toBe(false)
        instance.openWizard()
        expect(instance.state.wizardOpen).toBe(true)
        // Also make sure that closing sets it back to false
        instance.closeWizard()
        expect(instance.state.wizardOpen).toBe(false)

        // Check that the wizard is rendered when the state is set properly
        // This doesn't work if wrapped in a higher order component, so test with the container class directly
        enzymeWrapper = shallow(<NoFavoritesContainer {...props} />)
        expect(enzymeWrapper.containsMatchingElement(<Wizard />)).toBe(false)
        enzymeWrapper.setState({ wizardOpen: true}, () => {
          expect(enzymeWrapper.containsMatchingElement(<Wizard />)).toBe(true)
        })
      })

      it('should not show settings or login links', () => {
        const settingsPath = '/settings'
        const loginPath = Config.viceroyAPI + '/login'
        expect(enzymeWrapper.dive().dive().containsMatchingElement(<Link to={settingsPath}>account settings</Link>)).toBe(false)
        expect(enzymeWrapper.dive().dive().containsMatchingElement(<Link to={loginPath}>log in</Link>)).toBe(false)
      })
    })
  })

  describe('when not logged in', () => {
    const state = {
      personal: {
        login: { state: statuses.SUCCESS, token: null },
      },
    }
    const props = {
      clearUpdateFavorites: jest.fn(),
      setHideHomeFavorites: jest.fn(),
    }

    beforeEach(() => {
      enzymeWrapper = setup(state)
    })

    it('sees user as not logged in', () => {
      expect(enzymeWrapper.dive().props().isLoggedIn).toBe(false)
    })

    it('should show link to log in', () => {
      const loginPath = Config.viceroyAPI + '/login'
      expect(enzymeWrapper.dive().dive().containsMatchingElement(<Link to={loginPath}>log in</Link>)).toBe(true)
    })

    it('should disable Wizard button', () => {
      expect(enzymeWrapper.dive().containsMatchingElement(<Wizard />)).toBe(false)
      expect(enzymeWrapper.dive().dive().containsMatchingElement(<button disabled={true}>Add Favorites</button>)).toBe(true)
    })
  })
})
