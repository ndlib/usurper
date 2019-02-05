import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Settings from '../../../components/Settings'
import Loading from '../../../components/Messages/Loading'
import { mapStateToProps } from '../../../components/Settings'
import * as statuses from '../../../constants/APIStatuses'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const loggedInState = {
  personal: {
    login: {
      state: statuses.SUCCESS,
      token: 'anything',
    },
    user: {
      state: statuses.SUCCESS,
      alephId: '1234',
    },
    settings: {
      state: statuses.SUCCESS,
    },
  },
}

const loggedOutState = {
  personal: {
    login: {
      redirectUrl: 'https://library.nd.edu/fake/login_path',
    },
  },
}

const setup = (state) => {
  let ownProps = {
    setHomeLibrary: jest.fn(),
    setCircStatus: jest.fn(),
    getCircStatus: jest.fn(),
    homeLibraries: [],
  }
  let props = { ...ownProps, ...mapStateToProps(state, ownProps) }
  let store = mockStore(state)
  return shallow(<Settings {...props} store={store} />)
}

let enzymeWrapper
let spy

describe('components/Settings/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  describe('logged in', () => {
    it('should identify the user as being logged in', () => {
      enzymeWrapper = setup(loggedInState)
      expect(enzymeWrapper.props().loggedIn).toBe(true)
    })

    it('should not render loading if fully loaded', () => {
      enzymeWrapper = setup(loggedInState)
      let have = <Loading />
      expect(enzymeWrapper.props().alephId).not.toBeNull()
      expect(enzymeWrapper.dive().containsMatchingElement(have)).toBe(false)
    })

    it('should render loading if user info fetching', () => {
      enzymeWrapper = setup({
        personal: {
          login: {
            state: statuses.SUCCESS,
            token: 'anything',
          },
          user: {
            state: statuses.FETCHING,
          },
          settings: {
            state: statuses.SUCCESS,
          },
        },
      })

      let have = <Loading />
      expect(enzymeWrapper.dive().containsMatchingElement(have)).toBe(true)
    })
  })

  describe('not logged in', () => {
    beforeEach(() => {
      enzymeWrapper = setup(loggedOutState)
    })

    it('should redirect to login page', () => {
      expect(enzymeWrapper.props().loggedIn).toBe(false)

      // Mock the redirect function so we can spy on it
      window.location.replace = jest.fn()

      let instance = enzymeWrapper.dive().instance()
      spy = jest.spyOn(instance, 'checkLoggedIn')
      instance.checkLoggedIn(enzymeWrapper.props())

      // Check that the redirect was called with the same url we passed in to the object
      expect(window.location.replace).toHaveBeenCalledWith(loggedOutState.personal.login.redirectUrl)
    })
  })
})
