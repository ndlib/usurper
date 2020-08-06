import { getReservations } from 'actions/personal/reservations'
import Config from 'shared/Configuration'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from 'constants/APIStatuses'
import * as constants from 'actions/personal/constants'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const REQUEST_TYPE = 'reservations'

const emptyResponse = {}

const state = {
  personal: {
    login: {
      token: 'fake token',
    },
  },
}

const bookingsResponse = [
  {
    bookId: 'cs_12345678',
    foo: 'bar',
  }
]

describe('reservations action creator', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should first create a REQUEST_PERSONAL action', () => {
    nock(Config.libcalGatewayAPI)
      .get('/space/bookings')
      .query(() => true)
      .reply(200, bookingsResponse)

    const expectedAction = {
      type: constants.REQUEST_PERSONAL,
      requestType: REQUEST_TYPE,
    }

    const store = mockStore(state)
    store.dispatch(getReservations())
    expect(store.getActions()[0]).toMatchObject(expectedAction)
  })

  describe('on success', () => {
    it('should create a RECEIVE_PERSONAL action', async () => {
      nock(Config.libcalGatewayAPI)
        .get('/space/bookings')
        .query(() => true)
        .reply(200, bookingsResponse)

      const expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        state: statuses.SUCCESS,
        requestType: REQUEST_TYPE,
        payload: { 'data': bookingsResponse },
      }

      const store = mockStore(state)
      await store.dispatch(getReservations())
      expect(store.getActions()[1]).toMatchObject(expectedAction)
    })
  })

  describe('on error', () => {
    beforeEach(() => {
      nock(Config.libcalGatewayAPI)
        .get('/space/bookings')
        .query(() => true)
        .reply(401)
    })

    it('should create a RECEIVE_PERSONAL action with a status of error', async () => {
      const expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        state: statuses.ERROR,
        requestType: REQUEST_TYPE,
      }

      const store = mockStore(state)
      await store.dispatch(getReservations())
      expect(store.getActions()[1]).toMatchObject(expectedAction)
    })
  })
})
