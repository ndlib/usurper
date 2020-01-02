import { fetchAllEvents, CF_REQUEST_ALLEVENTS, CF_RECEIVE_ALLEVENTS } from 'actions/contentful/allEvents'
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
      id: 'event123',
      contentType: {
        sys: { type: 'Link', linkType: 'ContentType', id: 'event' },
      },
    },
    fields: {
      title: 'title',
    },
  },
  {
    sys: {
      id: 'event456',
      contentType: {
        sys: { type: 'Link', linkType: 'ContentType', id: 'event' },
      },
    },
    fields: {
      title: 'thingy',
    },
  },
]

describe('all events fetch action creator', () => {
  afterAll(() => {
    nock.restore()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should first create a CF_REQUEST_ALLEVENTS action', () => {
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true) // We don't care what the query string is; just mock it no matter what
      .reply(200, successfulResponse)

    const expectedAction = {
      type: CF_REQUEST_ALLEVENTS,
    }

    const store = mockStore()
    store.dispatch(fetchAllEvents())
    expect(store.getActions()).toContainEqual(expectedAction)
  })

  it('should be able to fetch preview content', () => {
    nock(Config.contentfulAPI)
      .get('/preview/query')
      .query(true)
      .reply(200, successfulResponse)

    const store = mockStore()
    return store.dispatch(fetchAllEvents(true))
      .then(() => {
        expect(nock.isDone()).toBe(true)
      })
  })

  describe('on success', () => {
    it('should create a CF_RECEIVE_ALLEVENTS action with data', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(200, successfulResponse)

      const expectedAction = {
        type: CF_RECEIVE_ALLEVENTS,
        status: statuses.SUCCESS,
        allEvents: successfulResponse,
      }

      const store = mockStore()
      return store.dispatch(fetchAllEvents())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on error', () => {
    it('should create a CF_RECEIVE_ALLEVENTS action with a status of unauthorized if response status === 401', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(401)

      const expectedAction = {
        type: CF_RECEIVE_ALLEVENTS,
        status: statuses.UNAUTHORIZED,
      }

      const store = mockStore()
      return store.dispatch(fetchAllEvents())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_ALLEVENTS action with a status of not found if response status === 404', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(404)

      const expectedAction = {
        type: CF_RECEIVE_ALLEVENTS,
        status: statuses.NOT_FOUND,
      }

      const store = mockStore()
      return store.dispatch(fetchAllEvents())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_ALLEVENTS action with an error if response status some other error', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(500)

      const expectedAction = {
        type: CF_RECEIVE_ALLEVENTS,
        status: statuses.ERROR,
      }

      const store = mockStore()
      return store.dispatch(fetchAllEvents())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_ALLEVENTS action with a status of error if no response body', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(200)

      const expectedAction = {
        type: CF_RECEIVE_ALLEVENTS,
        status: statuses.ERROR,
      }

      const store = mockStore()
      return store.dispatch(fetchAllEvents())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})