import Config from 'shared/Configuration'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from 'constants/APIStatuses'
import * as constants from 'actions/personal/constants'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('personal receive action creator', () => {
  it('should first create a RECEIVE_PERSONAL action', () => {
    const expectedAction = {
      type: constants.RECEIVE_PERSONAL,
      requestType: 'test',
      payload: 'payload',
      state: 'state',
    }

    expect(constants.recievePersonal('test', 'state', 'payload')).toMatchObject(expectedAction)
  })
})

describe('personal request action creator', () => {
  it('should first create a REQUEST_PERSONAL action', () => {
    const expectedAction = {
      type: constants.REQUEST_PERSONAL,
      requestType: 'test',
    }

    expect(constants.requestPersonal('test')).toMatchObject(expectedAction)
  })
})

describe('personal clear action creator', () => {
  it('should first create a CLEAR_PERSONAL action', () => {
    const expectedAction = {
      type: constants.CLEAR_PERSONAL,
    }

    expect(constants.clearPersonalInfo()).toMatchObject(expectedAction)
  })
})

describe('personal async fetch', () => {
  describe('on success', () => {
    let url = 'http://example.com'
    let response = { response: 'test' }

    beforeEach(() => {
      nock(url, {
        reqheaders: {
          Authorization: /.*/,
        },
      })
      .get('/')
      .reply(200, response)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should call the success method', () => {
      const success = jest.fn()
      const error = jest.fn()

      constants.startRequest(url, 'GET', null, success, 'token', error)
        .then(() => {
          expect(success.mock.calls.length).toBe(1)
          expect(error.mock.calls.length).toBe(0)
        })
    })
  })

  describe('on error', () => {
    let url = 'http://example.com'
    let response = { message: 'err' }

    beforeEach(() => {
      nock(url, {
        reqheaders: {
          Authorization: /.*/,
        },
      })
      .get('/')
      .reply(404, response)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should call the error method', () => {
      const success = jest.fn()
      const error = jest.fn()

      constants.startRequest(url, 'GET', null, success, 'token', error)
        .then(() => {
          expect(success.mock.calls.length).toBe(0)
          expect(error.mock.calls.length).toBe(1)
        })
    })
  })
})
