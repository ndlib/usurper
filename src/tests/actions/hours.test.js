import * as actions from 'actions/hours'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'

import testData from './hours.testdata.json'
import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockPageResponse = testData

const extractHostname = (url) => {
  return url.match(/http[s]?:\/\/.*[.]edu/)[0]
}

describe('hours actions', () => {
  describe('with valid response', () => {
    beforeEach(() => {
      nock(Config.hoursAPIURL)
        .get('/hours')
        .reply(200, mockPageResponse)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should first create a HOURS_REQUEST action for the requested page', () => {
      const expectedAction = {
        type: actions.HOURS_REQUEST,
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchHours())
        .then(() => {
          expect(store.getActions()[0]).toMatchObject(expectedAction)
        })
    })

    it('should create a HOURS_RECEIVE action for the content returned', () => {
      const expectedAction = {
        type: actions.HOURS_RECEIVE,
        status: statuses.SUCCESS,
        hours: mockPageResponse,
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchHours())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('with invalid response', () => {
    const invalidResponse = 'invalid hours json'

    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a HOURS_RECEIVE action with error status if invalid status code', () => {
      nock(Config.hoursAPIURL)
        .get('/hours')
        .reply(404, invalidResponse)

      const expectedAction = {
        type: actions.HOURS_RECEIVE,
        status: statuses.ERROR,
        error: invalidResponse,
        hours: {},
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchHours())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a HOURS_RECEIVE action with error status if invalid object', () => {
      nock(Config.hoursAPIURL)
        .get('/hours')
        .reply(200, invalidResponse)

      const expectedAction = {
        type: actions.HOURS_RECEIVE,
        status: statuses.ERROR,
        error: expect.anything(),
        hours: {},
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchHours())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})
