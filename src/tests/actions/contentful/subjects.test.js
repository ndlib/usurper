import { fetchSubjects, CF_REQUEST_SUBJECTS, CF_RECEIVE_SUBJECTS } from 'actions/contentful/subjects'
import Config from 'shared/Configuration'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from 'constants/APIStatuses'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const successfulResponse = [{
  sys: {
    contentType: {
      sys: {
        id: 'grouping',
      },
    },
  },
  fields: {
    items: [
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
          id: 'bobbert',
        },
        fields: {
          title: 'dummy item 2',
          page: {
            sys: {
              id: 'mxzcbniogoer',
            },
            fields: {
              title: 'franky',
              alternateTitles: ['McFrank'],
            },
          },
        },
      },
    ],
  },
}]

describe('subjects fetch action creator', () => {
  afterAll(() => {
    nock.restore()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should first create a CF_REQUEST_SUBJECTS action', () => {
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true) // We don't care what the query string is; just mock it no matter what
      .reply(200, successfulResponse)

    const expectedAction = {
      type: CF_REQUEST_SUBJECTS,
      depth: 1,
    }

    const store = mockStore()
    store.dispatch(fetchSubjects(false, 1))
    expect(store.getActions()).toContainEqual(expectedAction)
  })

  it('should be able to fetch preview content', () => {
    nock(Config.contentfulAPI)
      .get('/preview/query')
      .query(true)
      .reply(200, successfulResponse)

    const store = mockStore()
    return store.dispatch(fetchSubjects(true, 1))
      .then(() => {
        expect(nock.isDone()).toBe(true)
      })
  })

  describe('on success', () => {
    it('should create a CF_RECEIVE_SUBJECTS action with data', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(200, successfulResponse)

      const expectedAction = {
        type: CF_RECEIVE_SUBJECTS,
        status: statuses.SUCCESS,
        data: successfulResponse[0],
      }

      const store = mockStore()
      return store.dispatch(fetchSubjects())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on error', () => {
    it('should create a CF_RECEIVE_SUBJECTS action with a status of unauthorized if response status === 401', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(401)

      const expectedAction = {
        type: CF_RECEIVE_SUBJECTS,
        status: statuses.UNAUTHORIZED,
      }

      const store = mockStore()
      return store.dispatch(fetchSubjects())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_SUBJECTS action with a status of not found if response status === 404', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(404)

      const expectedAction = {
        type: CF_RECEIVE_SUBJECTS,
        status: statuses.NOT_FOUND,
      }

      const store = mockStore()
      return store.dispatch(fetchSubjects())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_SUBJECTS action with an error if response status some other error', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(500)

      const expectedAction = {
        type: CF_RECEIVE_SUBJECTS,
        status: statuses.ERROR,
      }

      const store = mockStore()
      return store.dispatch(fetchSubjects())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a CF_RECEIVE_SUBJECTS action with a status of not found if response status === 200', () => {
      nock(Config.contentfulAPI)
        .get(() => true)
        .query(true)
        .reply(200)

      const expectedAction = {
        type: CF_RECEIVE_SUBJECTS,
        status: statuses.NOT_FOUND,
      }

      const store = mockStore()
      return store.dispatch(fetchSubjects())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})