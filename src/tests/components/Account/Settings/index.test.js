import React from 'react'
import { shallow } from 'enzyme'
import { SettingsContainer } from '../../../../components/Account/Settings'
import Loading from '../../../../components/Messages/Loading'
import * as statuses from '../../../../constants/APIStatuses'

const loggedInProps = {
  loggedIn: true,
  alephId: '1234',
  userState: statuses.SUCCESS,
  libraryStatus: statuses.SUCCESS,
}

const loggedOutProps = {
  loggedIn: false,
  redirectUrl: 'https://library.nd.edu/fake/login_path',
  userState: statuses.SUCCESS,
  libraryStatus: statuses.NOT_FETCHED,
}

const setup = (props) => {
  const mockProps = {
    setHomeLibrary: jest.fn(),
    setCircStatus: jest.fn(),
    getCircStatus: jest.fn(),
  }
  return shallow(<SettingsContainer {...props} {...mockProps} />)
}

let enzymeWrapper
let spy

describe('components/Account/Settings/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  describe('logged in', () => {
    it('should not render loading if fully loaded', () => {
      enzymeWrapper = setup(loggedInProps)
      let have = <Loading />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(false)
    })

    it('should render loading if user info fetching', () => {
      enzymeWrapper = setup({
        loggedIn: false,
        userState: statuses.FETCHING,
        libraryStatus: statuses.NOT_FETCHED,
      })

      let have = <Loading />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })

  describe('not logged in', () => {
    const realConsoleError = console.error

    beforeAll(() => {
      // Super hacky. Basically, this stops jsdom from complaining in the console when we mock window.location.
      console.error = jest.fn().mockImplementation((msg) => {
        if (msg.startsWith('Error: Not implemented: navigation')) {
          return
        }
        realConsoleError(msg)
      })
    })

    afterAll(() => {
      console.error = realConsoleError
    })

    beforeEach(() => {
      enzymeWrapper = setup(loggedOutProps)
    })

    it('should redirect to login page', () => {
      // Mock the redirect function so we can spy on it
      window.location.replace = jest.fn()

      let instance = enzymeWrapper.instance()
      spy = jest.spyOn(instance, 'checkLoggedIn')
      instance.checkLoggedIn(instance.props)

      // Check that the redirect was called with the same url we passed in to the object
      expect(window.location.replace).toHaveBeenCalledWith(loggedOutProps.redirectUrl)
    })
  })
})
