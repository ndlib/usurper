import Config from 'shared/Configuration'
import getResources, { handleResources } from '../../../actions/personal/loanResources'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from 'constants/APIStatuses'
import * as constants from '../../../actions/personal/constants'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const url = Config.resourcesAPI
const userPrefsUrl = Config.userPrefsAPI

const any = () => {
  return expect.anything()
}

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

    nock(userPrefsUrl)
      .persist()
      .get(/[circHistory]/)
      .reply(200, {})

    spy = jest.spyOn(constants, 'startRequest')
  })

  afterEach(() => {
    nock.cleanAll()
    spy.mockReset()
    spy.mockRestore()
  })

  it('should first create fetching actions', () => {

    const store = mockStore(state)
    store.dispatch(getResources())

    let expectedAction = {
      type: constants.REQUEST_PERSONAL,
      requestType: 'user',
    }
    expect(store.getActions()).toContainEqual(expectedAction)
    expectedAction.requestType = 'alephPendingNdu'
    expect(store.getActions()).toContainEqual(expectedAction)
    expectedAction.requestType = 'alephPendingHcc'
    expect(store.getActions()).toContainEqual(expectedAction)
    expectedAction.requestType = 'alephHaveNdu'
    expect(store.getActions()).toContainEqual(expectedAction)
    expectedAction.requestType = 'alephHaveHcc'
    expect(store.getActions()).toContainEqual(expectedAction)
    expectedAction.requestType = 'illHave'
    expect(store.getActions()).toContainEqual(expectedAction)
    expectedAction.requestType = 'illPending'
    expect(store.getActions()).toContainEqual(expectedAction)
    expectedAction.requestType = 'historical'
    expect(store.getActions()).toContainEqual(expectedAction)
  })

  it('should call startRequest eight times', () => {
    const store = mockStore(state)
    store.dispatch(getResources())

    expect(spy.mock.calls.length).toBe(8)
  })

  it('should call startRequest with different params', () => {
    const spy = jest.spyOn(constants, 'startRequest')
    const store = mockStore(state)
    store.dispatch(getResources())

    expect(spy).toHaveBeenCalledWith(url + '/aleph/user', 'GET', any(), any(), any(), any())

    const libs = ['ndu50', 'hcc50']
    for (let i = 0; i < libs.length; i++) {
      expect(spy).toHaveBeenCalledWith(url + '/aleph/borrowed?library=' + libs[i], 'GET', any(), any(), any(), any())
      expect(spy).toHaveBeenCalledWith(url + '/aleph/pending?library=' + libs[i], 'GET', any(), any(), any(), any())
    }

    expect(spy).toHaveBeenCalledWith(url + '/illiad/borrowed', 'GET', any(), any(), any(), any())
    expect(spy).toHaveBeenCalledWith(url + '/illiad/pending', 'GET', any(), any(), any(), any())
    expect(spy).toHaveBeenCalledWith(userPrefsUrl + '/circHistory', 'GET', any(), any(), any(), any())
  })
})

describe('handleResources', () => {
  describe('on checked out items', () => {
    const data = [ { key: 'book' } ]

    it('should create a recievePersonal action with checked out items', () => {
      const store = mockStore({})
      handleResources('aleph', 'borrowed', 'Ndu')(store.dispatch, data)
      handleResources('aleph', 'borrowed', 'Hcc')(store.dispatch, data)

      let expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        requestType: 'alephHaveNdu',
        payload: { checkedOut: data },
        state: statuses.SUCCESS,
      }

      expect(store.getActions()).toContainEqual(expectedAction)
      expectedAction.requestType = 'alephHaveHcc'
      expect(store.getActions()).toContainEqual(expectedAction)
    })
  })

  describe('on pending items', () => {
    const data = [ { key: 'book' } ]

    it('should create a recievePersonal action with pending items', () => {
      const store = mockStore({})
      handleResources('aleph', 'pending', 'Ndu')(store.dispatch, data)
      handleResources('aleph', 'pending', 'Hcc')(store.dispatch, data)

      let expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        requestType: 'alephPendingNdu',
        payload: { pending: data },
        state: statuses.SUCCESS,
      }

      expect(store.getActions()).toContainEqual(expectedAction)
      expectedAction.requestType = 'alephPendingHcc'
      expect(store.getActions()).toContainEqual(expectedAction)
    })
  })
})
