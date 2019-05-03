import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import AccountPageWrapper, { AccountPageWrapperContainer } from 'components/Account/AccountPageWrapper'
import Presenter from 'components/Account/AccountPageWrapper/presenter'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let spy
let state
let store
const props = {
  title: 'Made up Title',
  slug: 'made-up-slug',
}

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<AccountPageWrapper store={store} {...ownProps} />)
}

describe('components/Account/AccountPageWrapper', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  describe('user not loaded', () => {
    beforeEach(() => {
      state = {
        personal: {
          login: {
            state: statuses.NOT_FETCHED,
          },
        },
      }
      enzymeWrapper = setup(state, props)
    })

    it('should render loading presenter', () => {
      const find = <Presenter title={props.title} slug={props.slug} loading />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(false)
    })

    it('should call getToken to fetch user info on update', () => {
      const newProps = {
        ...enzymeWrapper.dive().props(),
        getToken: jest.fn(),
      }

      enzymeWrapper = shallow(<AccountPageWrapperContainer {...newProps} />)
      expect(newProps.getToken).toHaveBeenCalledTimes(1)
      enzymeWrapper.setProps({}) // update
      expect(newProps.getToken).toHaveBeenCalledTimes(2)
    })
  })

  describe('logged in', () => {
    beforeEach(() => {
      state = {
        personal: {
          login: {
            state: statuses.SUCCESS,
            token: 'abcdefg',
            redirectUrl: '',
          },
        },
      }
      enzymeWrapper = setup(state, props)
    })

    it('should not be marked as loading', () => {
      expect(enzymeWrapper.dive().props().loading).toBe(false)
    })

    it('should render presenter', () => {
      const find = <Presenter title={props.title} slug={props.slug} loading={false} />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(false)
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
      state = {
        personal: {
          login: {
            state: statuses.SUCCESS,
            redirectUrl: 'fake.url/here',
          },
        },
      }
      enzymeWrapper = setup(state, props)
    })

    it('should redirect to login page', () => {
      // Mock the redirect function so we can spy on it
      window.location.replace = jest.fn()

      const instance = enzymeWrapper.dive().dive().instance()
      spy = jest.spyOn(instance, 'checkFullyLoaded')
      instance.checkFullyLoaded()

      // Check that the redirect was called with the same url we passed in to the object
      expect(window.location.replace).toHaveBeenCalledWith(state.personal.login.redirectUrl)
    })
  })
})
