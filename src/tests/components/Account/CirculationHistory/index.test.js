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
          saveHistory: {
            state: statuses.SUCCESS,
            data: true,
          },
          update: {
            saveHistory: {
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
        historicalStatus: statuses.SUCCESS,
        loading: true,
        items: [],
        optedIn: false,
        getHistorical: jest.fn(),
        setCircStatus: jest.fn(),
        updateStatus: statuses.NOT_FETCHED,
      }
      enzymeWrapper = shallow(<CirculationHistoryContainer {...props} />)
    })

    it('should fetch history when not fetched', () => {
      enzymeWrapper.setProps({
        historicalStatus: statuses.NOT_FETCHED,
      })
      expect(props.getHistorical).toHaveBeenCalled()
    })
  })
})