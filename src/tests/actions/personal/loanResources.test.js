import Config from '../../../shared/Configuration'
import getResources, { handleResources } from '../../../actions/personal/loanResources'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from '../../../constants/APIStatuses'
import * as constants from '../../../actions/personal/constants'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const url = Config.resourcesAPI + '/items/'

const state = {
  personal: {
    login: {
      token: 'token',
    },
  },
}

describe('resources fetch async action creator', () => {
  let spy

  beforeEach(() => {
    nock(url)
      .persist()
      .get(/[borrowed|pending]/)
      .reply(200, {})

    spy = jest.spyOn(constants, 'startRequest')
  })

  afterEach(() => {
    nock.cleanAll()
    spy.mockReset()
    spy.mockRestore()
  })

  it('should first create fetching actions', () => {
    let expectedAction = {
      type: constants.REQUEST_PERSONAL,
      requestType: 'resources_pending',
    }

    const store = mockStore(state)
    store.dispatch(getResources())
    expect(store.getActions()[0]).toMatchObject(expectedAction)

    expectedAction = {
      type: constants.REQUEST_PERSONAL,
      requestType: 'resources_have',
    }
    expect(store.getActions()[1]).toMatchObject(expectedAction)
  })

  it('should call startRequest twice', () => {
    const store = mockStore(state)
    store.dispatch(getResources())

    expect(spy.mock.calls.length).toBe(2)
  })

  it('should call startRequest with different params', () => {
    const spy = jest.spyOn(constants, 'startRequest')
    const store = mockStore(state)
    store.dispatch(getResources())

    expect(spy.mock.calls[0]).toContain(url + 'pending')
    expect(spy.mock.calls[1]).toContain(url + 'borrowed')
  })
})

describe('handleResources', () => {
  describe('on checked out items', () => {
    const data = {
      checkedOut: [ 'book' ],
      web: [ 'web book' ],
    }

    it('should create a recievePersonal action with checked out items', () => {
      const store = mockStore({})
      handleResources(store.dispatch, data)

      let expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        requestType: 'resources_have',
        payload: data,
        state: statuses.SUCCESS,
      }

      expect(store.getActions()[0]).toMatchObject(expectedAction)
    })
  })

  describe('on pending items', () => {
    const data = {
      pending: [ 'book' ],
    }

    it('should create a recievePersonal action with pending items', () => {
      const store = mockStore({})
      handleResources(store.dispatch, data)

      let expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        requestType: 'resources_pending',
        payload: data,
        state: statuses.SUCCESS,
      }

      expect(store.getActions()[0]).toMatchObject(expectedAction)
    })
  })
})
