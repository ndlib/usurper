import { fetchLetter, CF_REQUEST_DATABASE_LETTER, CF_RECEIVE_DATABASE_LETTER } from 'actions/contentful/databaseLetter'
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

describe('database letter fetch action creator', () => {
  afterAll(() => {
    nock.restore()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should first create a CF_REQUEST_DATABASE_LETTER action for the course lookup', () => {
    nock(Config.contentfulAPI)
      .get('/query')
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
      .get('/query')
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
        .get('/query')
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
        .get('/query')
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
        .get('/query')
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