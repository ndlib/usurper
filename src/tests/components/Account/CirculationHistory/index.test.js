import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import CirculationHistory, { CirculationHistoryContainer } from 'components/Account/CirculationHistory'
import Presenter from 'components/Account/CirculationHistory/presenter'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let props
let state

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<CirculationHistory store={store} {...ownProps} />)
}

describe('components/Account/CirculationHistory', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with store', () => {
    beforeEach(() => {
      state = {
        personal: {
          login: {
            token: 'fake token',
            state: statuses.SUCCESS,
          },
          historical: {
            state: statuses.SUCCESS,
            history: {
              aleph1234: {
                id: '1234',
              },
              aleph5678: {
                id: '5678',
              },
            },
          },
        },
        settings: {
          circStatus: {
            state: statuses.SUCCESS,
            data: {
              saveHistory: true,
              status: 'complete',
            },
          },
          update: {
            circStatus: {
              state: statuses.NOT_FETCHED,
            },
          },
        },
      }
      enzymeWrapper = setup(state, null)
    })

    it('should render a Presenter', () => {
      expect(enzymeWrapper.dive().dive().find(Presenter).exists()).toBe(true)
    })
  })

  describe('without store', () => {
    beforeEach(() => {
      props = {
        loggedIn: true,
        saveHistoryStatus: statuses.NOT_FETCHED,
        historicalStatus: statuses.NOT_FETCHED,
        loading: true,
        items: [],
        optedIn: false,
        getHistorical: jest.fn(),
        setCircStatus: jest.fn(),
        getCircStatus: jest.fn(),
        updateStatus: statuses.NOT_FETCHED,
      }
      enzymeWrapper = shallow(<CirculationHistoryContainer {...props} />)
    })

    it('should fetch opt in status', () => {
      expect(props.getCircStatus).toHaveBeenCalled()
    })

    it('should fetch history after opt in status loaded', () => {
      expect(props.getHistorical).not.toHaveBeenCalled()

      enzymeWrapper.setProps({
        optedIn: true,
        saveHistoryStatus: statuses.SUCCESS,
      })
      expect(props.getHistorical).toHaveBeenCalled()
    })

    it('should remove timer when unmounting', () => {
      expect(setInterval).toHaveBeenCalled()
      enzymeWrapper.unmount()
      expect(clearInterval).toHaveBeenCalled()
    })

    it('should get updated circ status every 5 seconds if inprogress', () => {
      enzymeWrapper.setProps({
        optedIn: true,
        saveHistoryStatus: statuses.SUCCESS,
        processingStatus: 'inprogress',
      })

      props.getCircStatus.mockClear()
      expect(props.getCircStatus).not.toHaveBeenCalled() // just make sure the clear worked ;)

      jest.advanceTimersByTime(5000)
      expect(props.getCircStatus).toHaveBeenCalled()
    })

    it('should fetch history after update finishes', () => {
      enzymeWrapper.setProps({
        optedIn: true,
        saveHistoryStatus: statuses.SUCCESS,
        processingStatus: 'inprogress',
      })
      props.getHistorical.mockClear()
      expect(props.getHistorical).not.toHaveBeenCalled()

      enzymeWrapper.setProps({
        processingStatus: 'complete',
      })
      expect(props.getHistorical).toHaveBeenCalled()
    })

    describe('when opted in', () => {
      it('should fetch history when not already fetched', () => {
        props = {
          loggedIn: true,
          saveHistoryStatus: statuses.SUCCESS,
          historicalStatus: statuses.NOT_FETCHED,
          loading: true,
          items: [],
          optedIn: true,
          getHistorical: jest.fn(),
          setCircStatus: jest.fn(),
          getCircStatus: jest.fn(),
          updateStatus: statuses.NOT_FETCHED,
        }
        enzymeWrapper = shallow(<CirculationHistoryContainer {...props} />)

        expect(props.getHistorical).toHaveBeenCalled()
      })
    })

    describe('when opted out', () => {
      it('should not fetch history', () => {
        props = {
          loggedIn: true,
          saveHistoryStatus: statuses.SUCCESS,
          historicalStatus: statuses.NOT_FETCHED,
          loading: true,
          items: [],
          optedIn: false,
          getHistorical: jest.fn(),
          setCircStatus: jest.fn(),
          getCircStatus: jest.fn(),
          updateStatus: statuses.NOT_FETCHED,
        }
        enzymeWrapper = shallow(<CirculationHistoryContainer {...props} />)

        expect(props.getHistorical).not.toHaveBeenCalled()
      })
    })
  })
})