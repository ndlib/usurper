import Config from 'shared/Configuration'
import getToken from 'actions/personal/token'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from 'constants/APIStatuses'
import * as constants from 'actions/personal/constants'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const redirectResponse = {
  redirect: 'redirect',
}

const tokenResponse = {
  jwt: 'token',
}

describe.skip('token fetch async action creator', () => {
  it('should first create a REQUEST_PERSONAL action for the token', () => {
    nock(Config.viceroyAPI)
      .get('/token')
      .reply(200, redirectResponse)

    const expectedAction = {
      type: constants.REQUEST_PERSONAL,
      requestType: 'login',
    }

    const store = mockStore({ })
    return store.dispatch(getToken())
      .then(() => {
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })
  })

  describe('on success', () => {
    beforeEach(() => {
      nock(Config.viceroyAPI)
        .get('/token')
        .reply(200, tokenResponse)
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a RECEIVE_PERSONAL action for the token', () => {
      const expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        state: statuses.SUCCESS,
        requestType: 'login',
        payload: {
          token: 'token',
        },
      }

      const store = mockStore({ })
      return store.dispatch(getToken())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on error', () => {
    beforeEach(() => {
      nock(Config.viceroyAPI)
        .get('/token')
        .reply(401, { message: 'Unauthorized' })
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a RECEIVE_PERSONAL action with a status of error', () => {
      const expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        state: statuses.ERROR,
        requestType: 'login',
        payload: 'Unauthorized',
      }

      const store = mockStore({ })
      return store.dispatch(getToken())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on redirect', () => {
    beforeEach(() => {
      nock(Config.viceroyAPI)
        .get('/token')
        .reply(200, redirectResponse)
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a RECEIVE_PERSONAL with the redirect url', () => {
      const expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        state: statuses.SUCCESS,
        requestType: 'login',
        payload: {
          redirectUrl: redirectResponse.redirect,
        },
      }

      const store = mockStore({ })
      return store.dispatch(getToken())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})
