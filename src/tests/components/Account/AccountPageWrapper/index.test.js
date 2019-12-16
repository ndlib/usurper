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
        initLogin: jest.fn(),
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
    const newProps = {
      ...props,
      login: {
        state: statuses.UNAUTHENTICATED,
      },
      getToken: jest.fn(),
      initLogin: jest.fn(),
    }

    beforeEach(() => {
      enzymeWrapper = shallow(<AccountPageWrapperContainer {...newProps} />)
    })

    it('should call initLogin to redirect user', () => {
      expect(newProps.initLogin).toHaveBeenCalled()
    })
  })
})
