import Config from '../../../shared/Configuration'
import getResources from '../../../actions/personal/loanResources'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
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
    nock(url)
      .get(/[borrowed|pending]/)
      .reply(200, {})

    const store = mockStore(state)
    store.dispatch(getResources())

    expect(spy.mock.calls.length).toBe(2)
  })

  it('should call startRequest with different params', () => {
    nock(url)
      .get(/[borrowed|pending]/)
      .reply(200, {})

    const spy = jest.spyOn(constants, 'startRequest')
    const store = mockStore(state)
    store.dispatch(getResources())

    expect(spy.mock.calls[0]).toContain(url + 'pending')
    expect(spy.mock.calls[1]).toContain(url + 'borrowed')
  })
})
