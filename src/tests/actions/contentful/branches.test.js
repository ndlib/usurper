import { fetchBranches, CF_REQUEST_BRANCHES, CF_RECEIVE_BRANCHES } from 'actions/contentful/branches'
import Config from 'shared/Configuration'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from 'constants/APIStatuses'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const successfulResponse = [
  {
    sys: {
      id: 'one',
    },
    fields: {
      title: 'title',
    },
  },
  {
    sys: {
      id: 'billy bo bob brain',
    },
    fields: {
      title: 'do nothing',
      alternateTitle: 'do the thing',
    },
  },
]

const state = {
  personal: {
    login: {
      token: 'fake token',
    },
  },
}

describe('branches fetch action creator', () => {
  afterAll(() => {
    nock.restore()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should first create a CF_REQUEST_BRANCHES action', () => {
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true) // We don't care what the query string is; just mock it no matter what
      .reply(200, successfulResponse)

    const expectedAction = {
      type: CF_REQUEST_BRANCHES,
      depth: 1,
    }

    const store = mockStore(state)
    store.dispatch(fetchBranches(false, 1))
    expect(store.getActions()).toContainEqual(expectedAction)
  })

  it('should be able to fetch preview content', () => {
    nock(Config.contentfulAPI)
      .get('/preview/query')
      .query(true)
      .reply(200, successfulResponse)

    const store = mockStore(state)
    return store.dispatch(fetchBranches(true, 1))
      .then(() => {
        expect(nock.isDone()).toBe(true)
      })
  })

  describe('on success', () => {
    it('should create a CF_RECEIVE_BRANCHES action with data', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(200, successfulResponse)

      const expectedAction = {
        type: CF_RECEIVE_BRANCHES,
        status: statuses.SUCCESS,
        branches: successfulResponse,
      }

      const store = mockStore(state)
      return store.dispatch(fetchBranches())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on error', () => {
    it('should create a CF_RECEIVE_BRANCHES action with a status of unauthorized if response status === 401', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(401)

      const expectedAction = {
        type: CF_RECEIVE_BRANCHES,
        status: statuses.UNAUTHORIZED,
      }

      const store = mockStore(state)
      return store.dispatch(fetchBranches())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_BRANCHES action with a status of not found if response status === 404', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(404)

      const expectedAction = {
        type: CF_RECEIVE_BRANCHES,
        status: statuses.NOT_FOUND,
      }

      const store = mockStore(state)
      return store.dispatch(fetchBranches())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_BRANCHES action with an error if response status some other error', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(500)

      const expectedAction = {
        type: CF_RECEIVE_BRANCHES,
        status: statuses.ERROR,
      }

      const store = mockStore(state)
      return store.dispatch(fetchBranches())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_BRANCHES action with a status of not found if no response body', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(200)

      const expectedAction = {
        type: CF_RECEIVE_BRANCHES,
        status: statuses.ERROR,
      }

      const store = mockStore(state)
      return store.dispatch(fetchBranches())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})