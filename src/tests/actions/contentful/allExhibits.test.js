import { fetchAllExhibits, CF_REQUEST_ALL_EXHIBITS, CF_RECEIVE_ALL_EXHIBITS } from 'actions/contentful/allExhibits'
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
      id: 'exhibit123',
      contentType: {
        sys: { type: 'Link', linkType: 'ContentType', id: 'exhibit' },
      },
    },
    fields: {
      title: 'title',
    },
  },
  {
    sys: {
      id: 'exhibit456',
      contentType: {
        sys: { type: 'Link', linkType: 'ContentType', id: 'exhibit' },
      },
    },
    fields: {
      title: 'thingy',
    },
  },
]

describe('all exhibits fetch action creator', () => {
  afterAll(() => {
    nock.restore()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should first create a CF_REQUEST_ALL_EXHIBITS action', () => {
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true) // We don't care what the query string is; just mock it no matter what
      .reply(200, successfulResponse)

    const expectedAction = {
      type: CF_REQUEST_ALL_EXHIBITS,
    }

    const store = mockStore()
    store.dispatch(fetchAllExhibits())
    expect(store.getActions()).toContainEqual(expectedAction)
  })

  it('should be able to fetch preview content', () => {
    nock(Config.contentfulAPI)
      .get('/preview/query')
      .query(true)
      .reply(200, successfulResponse)

    const store = mockStore()
    return store.dispatch(fetchAllExhibits(true))
      .then(() => {
        expect(nock.isDone()).toBe(true)
      })
  })

  describe('on success', () => {
    it('should create a CF_RECEIVE_ALL_EXHIBITS action with data', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(200, successfulResponse)

      const expectedAction = {
        type: CF_RECEIVE_ALL_EXHIBITS,
        status: statuses.SUCCESS,
        allExhibits: successfulResponse,
      }

      const store = mockStore()
      return store.dispatch(fetchAllExhibits())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on error', () => {
    it('should create a CF_RECEIVE_ALL_EXHIBITS action with a status of unauthorized if response status === 401', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(401)

      const expectedAction = {
        type: CF_RECEIVE_ALL_EXHIBITS,
        status: statuses.UNAUTHORIZED,
      }

      const store = mockStore()
      return store.dispatch(fetchAllExhibits())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_ALL_EXHIBITS action with a status of not found if response status === 404', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(404)

      const expectedAction = {
        type: CF_RECEIVE_ALL_EXHIBITS,
        status: statuses.NOT_FOUND,
      }

      const store = mockStore()
      return store.dispatch(fetchAllExhibits())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_ALL_EXHIBITS action with an error if response status some other error', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(500)

      const expectedAction = {
        type: CF_RECEIVE_ALL_EXHIBITS,
        status: statuses.ERROR,
      }

      const store = mockStore()
      return store.dispatch(fetchAllExhibits())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_ALL_EXHIBITS action with a status of error if no response body', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(200)

      const expectedAction = {
        type: CF_RECEIVE_ALL_EXHIBITS,
        status: statuses.ERROR,
      }

      const store = mockStore()
      return store.dispatch(fetchAllExhibits())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})