import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moment from 'moment'

import Reservations from 'components/Account/Reservations'
import Presenter from 'components/Account/Reservations/presenter'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let props
let state

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<Reservations store={store} {...ownProps} />)
}

describe('components/Account/Reservations', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
    state = undefined
  })

  describe('before loading', () => {
    beforeEach(() => {
      props = {
        login: {
          state: statuses.UNAUTHENTICATED,
        },
        reservations: {
          state: statuses.NOT_FETCHED,
        },
        startDate: moment(),
        endDate: moment(),
        initLogin: jest.fn(),
        getReservations: jest.fn(),
      }
      enzymeWrapper = shallow(<Reservations.WrappedComponent {...props} />)
    })

    it('should call initLogin on mount', () => {
      expect(props.initLogin).toHaveBeenCalled()
    })

    it('should not fetch reservations before login', () => {
      expect(props.getReservations).not.toHaveBeenCalled()
    })

    it('should render presenter as loading', () => {
      const presenter = enzymeWrapper.find(Presenter)
      expect(presenter.exists()).toBe(true)
      expect(presenter.props().isLoading).toBe(true)
    })

    describe('after login', () => {
      beforeEach(() => {
        enzymeWrapper.setProps({
          login: {
            state: statuses.SUCCESS,
            token: 'fake token',
          },
        })
      })

      it('should fetch reservations after user logged in', () => {
        expect(props.getReservations).toHaveBeenCalled()
      })

      it('should render presenter as loading', () => {
        const presenter = enzymeWrapper.find(Presenter)
        expect(presenter.exists()).toBe(true)
        expect(presenter.props().isLoading).toBe(true)
      })
    })
  })

  describe('with data', () => {
    beforeEach(() => {
      state = {
        personal: {
          login: {
            token: 'fake token',
            state: statuses.SUCCESS,
          },
          reservations: {
            state: statuses.SUCCESS,
            data: [
              {
                example: 'booking',
              },
            ],
          },
        },
      }
      enzymeWrapper = setup(state, null)
    })

    it('should render a Presenter with data', () => {
      const presenter = enzymeWrapper.dive().dive().find(Presenter)
      expect(presenter.exists()).toBe(true)
      expect(presenter.props().reservations).toEqual(state.personal.reservations.data)
    })
  })
})