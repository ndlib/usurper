import {
  fetchLetter,
  fetchDefaultDbFavorites,
  CF_REQUEST_DATABASE_LETTER,
  CF_RECEIVE_DATABASE_LETTER,
  CF_REQUEST_DATABASE_DEFAULT_FAVORITES,
  CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
} from 'actions/contentful/database'
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
      id: 'napsghspegHIHOWAREYOUafpdasfpdsjhsd',
    },
    fields: {
      title: 'dummy item 1'
    },
  },
  {
    sys: {
      id: 'phillis',
    },
    fields: {
      title: 'dummy item 2',
      alternateTitles: ['wilfred'],
    },
  },
]
const requestLetter = 'd'

describe('database fetch action creator', () => {
  afterAll(() => {
    nock.restore()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('database letter', () => {
    it('should first create a CF_REQUEST_DATABASE_LETTER action', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true) // We don't care what the query string is; just mock it no matter what
        .reply(200, successfulResponse)

      const expectedAction = {
        type: CF_REQUEST_DATABASE_LETTER,
        letter: requestLetter,
      }

      const store = mockStore()
      store.dispatch(fetchLetter(requestLetter))
      expect(store.getActions()).toContainEqual(expectedAction)
    })

    it('should be able to fetch preview content', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query((queryObj) => queryObj.preview === 'true')
        .reply(200, successfulResponse)

      const expectedAction = {
        type: CF_REQUEST_DATABASE_LETTER,
        letter: requestLetter,
      }

      const store = mockStore()
      store.dispatch(fetchLetter(requestLetter, true))
      expect(nock.isDone()).toBe(true)
    })

    describe('on success', () => {
      it('should create a CF_RECEIVE_DATABASE_LETTER action with data', () => {
        nock(Config.contentfulAPI)
          .get(() => true)
          .query(true)
          .reply(200, successfulResponse)

        const expectedAction = {
          type: CF_RECEIVE_DATABASE_LETTER,
          status: statuses.SUCCESS,
          letter: requestLetter,
          data: successfulResponse,
        }

        const store = mockStore()
        return store.dispatch(fetchLetter(requestLetter))
          .then(() => {
            expect(store.getActions()[1]).toMatchObject(expectedAction)
          })
      })
    })

    describe('on error', () => {
      it('should create a CF_RECEIVE_DATABASE_LETTER action with a status of error if response status !== 200', () => {
        nock(Config.contentfulAPI)
          .get(() => true)
          .query(true)
          .reply(401)

        const expectedAction = {
          type: CF_RECEIVE_DATABASE_LETTER,
          status: statuses.ERROR,
          letter: requestLetter,
        }

        const store = mockStore()
        return store.dispatch(fetchLetter(requestLetter))
          .then(() => {
            expect(store.getActions()[1]).toMatchObject(expectedAction)
          })
      })

      it('should create a CF_RECEIVE_DATABASE_LETTER action with a status of not found if response status === 200', () => {
        nock(Config.contentfulAPI)
          .get(() => true)
          .query(true)
          .reply(200)

        const expectedAction = {
          type: CF_RECEIVE_DATABASE_LETTER,
          status: statuses.NOT_FOUND,
          letter: requestLetter,
        }

        const store = mockStore()
        return store.dispatch(fetchLetter(requestLetter))
          .then(() => {
            expect(store.getActions()[1]).toMatchObject(expectedAction)
          })
      })
    })
  })

  describe('database default favorites', () => {
    it('should first create a CF_REQUEST_DATABASE_DEFAULT_FAVORITES action', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true) // We don't care what the query string is; just mock it no matter what
        .reply(200, successfulResponse)

      const expectedAction = {
        type: CF_REQUEST_DATABASE_DEFAULT_FAVORITES,
      }

      const store = mockStore()
      store.dispatch(fetchDefaultDbFavorites())
      expect(store.getActions()).toContainEqual(expectedAction)
    })

    it('should be able to fetch preview content', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query((queryObj) => queryObj.preview === 'true')
        .reply(200, successfulResponse)

      const expectedAction = {
        type: CF_REQUEST_DATABASE_DEFAULT_FAVORITES,
      }

      const store = mockStore()
      store.dispatch(fetchDefaultDbFavorites(true))
      expect(nock.isDone()).toBe(true)
    })

    describe('on success', () => {
      it('should create a CF_RECEIVE_DATABASE_DEFAULT_FAVORITES action with data', () => {
        nock(Config.contentfulAPI)
          .get(() => true)
          .query(true)
          .reply(200, successfulResponse)

        const expectedAction = {
          type: CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
          status: statuses.SUCCESS,
          data: successfulResponse,
        }

        const store = mockStore()
        return store.dispatch(fetchDefaultDbFavorites())
          .then(() => {
            expect(store.getActions()[1]).toMatchObject(expectedAction)
          })
      })
    })

    describe('on error', () => {
      it('should create a CF_RECEIVE_DATABASE_DEFAULT_FAVORITES action with a status of unauthorized if response status === 401', () => {
        nock(Config.contentfulAPI)
          .get(() => true)
          .query(true)
          .reply(401)

        const expectedAction = {
          type: CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
          status: statuses.UNAUTHORIZED,
        }

        const store = mockStore()
        return store.dispatch(fetchDefaultDbFavorites())
          .then(() => {
            expect(store.getActions()[1]).toMatchObject(expectedAction)
          })
      })

      it('should create a CF_RECEIVE_DATABASE_DEFAULT_FAVORITES action with a status of not found if response status === 404', () => {
        nock(Config.contentfulAPI)
          .get(() => true)
          .query(true)
          .reply(404)

        const expectedAction = {
          type: CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
          status: statuses.NOT_FOUND,
        }

        const store = mockStore()
        return store.dispatch(fetchDefaultDbFavorites())
          .then(() => {
            expect(store.getActions()[1]).toMatchObject(expectedAction)
          })
      })

      it('should create a CF_RECEIVE_DATABASE_DEFAULT_FAVORITES action with an error if response status some other error', () => {
        nock(Config.contentfulAPI)
          .get(() => true)
          .query(true)
          .reply(500)

        const expectedAction = {
          type: CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
          status: statuses.ERROR,
        }

        const store = mockStore()
        return store.dispatch(fetchDefaultDbFavorites())
          .then(() => {
            expect(store.getActions()[1]).toMatchObject(expectedAction)
          })
      })

      it('should create a CF_RECEIVE_DATABASE_DEFAULT_FAVORITES action with an error if no response body', () => {
        nock(Config.contentfulAPI)
          .get(() => true)
          .query(true)
          .reply(200)

        const expectedAction = {
          type: CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
          status: statuses.ERROR,
        }

        const store = mockStore()
        return store.dispatch(fetchDefaultDbFavorites())
          .then(() => {
            expect(store.getActions()[1]).toMatchObject(expectedAction)
          })
      })
    })
  })
})