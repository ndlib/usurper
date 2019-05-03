import React from 'react'
import { shallow } from 'enzyme'

import { ItemsRequestsContainer, mapStateToProps, mapDispatchToProps } from 'components/Account/ItemsRequests'
import Presenter from 'components/Account/ItemsRequests/presenter'

import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'
import { REQUEST_PERSONAL } from 'actions/personal/constants'

let enzymeWrapper
let spy

const setup = (props) => {
  return shallow(<ItemsRequestsContainer {...props} />)
}

describe('components/Account/ItemsRequests/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    jest.restoreAllMocks()
  })

  describe('initial page load', () => {
    beforeEach(() => {
      // Create a new wrapper without a store for this test... It's easier that way
      const props = {
        loggedIn: true,
        userLoading: true,
        userStatus: statuses.NOT_FETCHED,
        resources: {
          have: {
            items: [],
            loading: false,
            needToFetch: true,
          },
          pending: {
            items: [],
            loading: false,
            needToFetch: true,
          },
        },
        getUser: jest.fn(),
        getResources: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should call getUser', () => {
      expect(enzymeWrapper.props().getUser).toHaveBeenCalled()
    })

    it('should call getResources', () => {
      expect(enzymeWrapper.props().getResources).toHaveBeenCalled()
    })

    it('should render presenter', () => {
      expect(enzymeWrapper.containsMatchingElement(<Presenter />)).toBe(true)
    })

    it('should call checkFullyLoaded when updated', () => {
      const instance = enzymeWrapper.instance()

      spy = jest.spyOn(instance, 'checkFullyLoaded')
      enzymeWrapper.setProps({
        userStatus: statuses.FETCHING,
      })

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
    describe('with no data', () => {
      const state = {
        personal: {
          login: {
            state: statuses.SUCCESS,
            token: 'fake token',
          },
          user: { state: statuses.NOT_FETCHED },
          alephHaveNdu: { state: statuses.NOT_FETCHED },
          alephHaveHcc: { state: statuses.NOT_FETCHED },
          alephPendingNdu: { state: statuses.NOT_FETCHED },
          alephPendingHcc: { state: statuses.NOT_FETCHED },
          illHave: { state: statuses.NOT_FETCHED },
          illPending: { state: statuses.NOT_FETCHED },
        },
      }

      it('should map props as expected', () => {
        const expectedProps = {
          loggedIn: true,
          userLoading: true,
          userStatus: statuses.NOT_FETCHED,
          resources: {
            have: {
              items: [],
              loading: false,
              needToFetch: true,
            },
            pending: {
              items: [],
              loading: false,
              needToFetch: true,
            },
          },
        }
        expect(mapStateToProps(state)).toMatchObject(expectedProps)
      })
    })

    describe('with partially loaded data', () => {
      const state = {
        personal: {
          login: {
            state: statuses.SUCCESS,
            token: 'fake token',
          },
          user: {
            state: statuses.SUCCESS,
            expiryDate: '19980431', // YYYYMMDD - should be expired in this test
            balance: -13.1,
          },
          alephHaveNdu: { state: statuses.NOT_FETCHED },
          alephHaveHcc: { state: statuses.SUCCESS },
          illHave: { state: statuses.FETCHING },
          alephPendingNdu: { state: statuses.ERROR },
          alephPendingHcc: { state: statuses.SUCCESS },
          illPending: { state: statuses.SUCCESS },
        },
      }

      it('should be loading borrowed items', () => {
        const resources = mapStateToProps(state).resources
        expect(resources.have).toBeTruthy()
        expect(resources.have.loading).toBe(true)
      })

      it('should not be loading pending items', () => {
        const resources = mapStateToProps(state).resources
        expect(resources.pending).toBeTruthy()
        expect(resources.pending.loading).toBe(false)
      })

      it('should map user info to props correctly', () => {
        const mappedProps = mapStateToProps(state)
        expect(mappedProps.userLoading).toBe(false)
        expect(mappedProps.userExpired).toBe(true)
        expect(mappedProps.balance).toBe(state.personal.user.balance)
      })
    })

    describe('with data', () => {
      const state = {
        personal: {
          login: {
            state: statuses.SUCCESS,
            token: 'fake token',
          },
          user: {
            state: statuses.SUCCESS,
            expiryDate: 29991231,
            balance: 0,
          },
          alephHaveNdu: {
            state: statuses.SUCCESS,
            items: ['alephCheckedOutNdu'],
          },
          alephHaveHcc: {
            state: statuses.SUCCESS,
            items: ['alephCheckedOutHcc'],
          },
          alephPendingNdu: {
            state: statuses.SUCCESS,
            items: ['alephPendingNdu'],
          },
          alephPendingHcc: {
            state: statuses.SUCCESS,
            items: ['alephPendingHcc'],
          },
          illHave: {
            state: statuses.SUCCESS,
            items: ['illCheckedOut'],
          },
          illPending: {
            state: statuses.SUCCESS,
            items: ['illPending'],
          },
        },
      }

      it('should identify the user as logged in', () => {
        const mappedProps = mapStateToProps(state)
        expect(mappedProps.loggedIn).toBe(true)
      })

      it('should contain checked out state', () => {
        const resources = mapStateToProps(state).resources
        expect(resources.have).toBeTruthy()
        expect(resources.have.loading).toBe(false)
      })

      it('should contain pending state', () => {
        const resources = mapStateToProps(state).resources
        expect(resources.pending).toBeTruthy()
        expect(resources.pending.loading).toBe(false)
      })

      it('should contain checked out items', () => {
        const resources = mapStateToProps(state).resources
        expect(resources.have).toBeTruthy()
        expect(resources.have.items).toEqual(['alephCheckedOutNdu', 'alephCheckedOutHcc', 'illCheckedOut'])
      })

      it('should contain pending items', () => {
        const resources = mapStateToProps(state).resources
        expect(resources.pending).toBeTruthy()
        expect(resources.pending.items).toEqual(['alephPendingNdu', 'alephPendingHcc', 'illPending'])
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('creates expected actions', () => {
      const newProps = mapDispatchToProps(null)
      expect(newProps.getResources).toBeTruthy()
      expect(newProps.getUser).toBeTruthy()
    })
  })
})
