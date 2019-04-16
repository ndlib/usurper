import Config from 'shared/Configuration'
import * as actions from '../../actions/librarians'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from 'constants/APIStatuses'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockResponse = {
  "librarians": "true",
}

const netids = [
  'fooUser',
  'barUser',
]

describe('librarian request action creator', () => {
  it('should create a REQUEST_LIBRARIANS action for the requested netids', () => {
    const expectedAction = {
      type: actions.REQUEST_LIBRARIANS,
      netids: netids,
    }
    expect(actions.requestLibrarians(netids)).toEqual(expectedAction)
  })
})

describe('contentful fetch librarians async action creator', () => {
  it('should first create a REQUEST_LIBRARIANS action for the requested netids', () => {
    nock(Config.recommendAPI)
      .get('/librarianInfo')
      .query(true)
      .reply(200, mockResponse)

    const expectedAction = {
      type: actions.REQUEST_LIBRARIANS,
      netids: netids,
    }

    const store = mockStore({ })
    return store.dispatch(actions.fetchLibrarians(netids))
      .then(() => {
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })
  })

  describe('on success', () => {
    beforeEach(() => {
      nock(Config.recommendAPI)
      .get('/librarianInfo')
      .query(true)
      .reply(200, mockResponse)
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a RECEIVE_LIBRARIANS action for the librarian info', () => {
      const expectedAction = {
        type: actions.RECEIVE_LIBRARIANS,
        status: statuses.SUCCESS,
        data: mockResponse,
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchLibrarians(netids))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on error', () => {
    beforeEach(() => {
      nock(Config.recommendAPI)
        .get('/librarianInfo')
        .query(true)
        .reply(200, { 'message': 'error' })
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a RECEIVE_LIBRARIANS action with a status of error and the full response', () => {
      const expectedAction = {
        type: actions.RECEIVE_LIBRARIANS,
        status: statuses.ERROR,
        data: { 'message': 'error' },
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchLibrarians(netids))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('with no netids', () => {
    it('should create a RECEIVE_LIBRARIANS action with a status of not found', () => {
      const expectedAction = {
        type: actions.RECEIVE_LIBRARIANS,
        status: statuses.NOT_FOUND,
      }

      const store = mockStore({ })
      store.dispatch(actions.fetchLibrarians([]))
      expect(store.getActions()[0]).toMatchObject(expectedAction)
    })
  })
})
