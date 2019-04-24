import getCourses from 'actions/personal/courses'
import Config from 'shared/Configuration'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from 'constants/APIStatuses'
import * as constants from 'actions/personal/constants'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const REQUEST_TYPE = 'courses'
const enrollmentsResponse = {
  enrollments: {
    current: ['sample'],
  },
}

const instructsResponse = {
  instructs: {
    future: ['blah'],
  },
}

const emptyResponse = {}

const state = {
  personal: {
    login: {
      token: 'fake token',
    },
  },
}

describe('courses fetch action creator', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should first create a REQUEST_PERSONAL action for the course lookup', () => {
    nock(Config.coursesAPI)
      .get('/courses')
      .reply(200, enrollmentsResponse)

    const expectedAction = {
      type: constants.REQUEST_PERSONAL,
      requestType: REQUEST_TYPE,
    }

    const store = mockStore(state)
    store.dispatch(getCourses())
    expect(store.getActions()[0]).toMatchObject(expectedAction)
  })

  describe('on success', () => {
    it('should create a RECEIVE_PERSONAL action if enrolled courses found', () => {
      nock(Config.coursesAPI)
        .get('/courses')
        .reply(200, enrollmentsResponse)

      const expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        state: statuses.SUCCESS,
        requestType: REQUEST_TYPE,
        payload: { 'courseData': enrollmentsResponse },
      }

      const store = mockStore(state)
      return store.dispatch(getCourses())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should create a RECEIVE_PERSONAL action if instructing courses found', () => {
      nock(Config.coursesAPI)
        .get('/courses')
        .reply(200, instructsResponse)

      const expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        state: statuses.SUCCESS,
        requestType: REQUEST_TYPE,
        payload: { 'courseData': instructsResponse },
      }

      const store = mockStore(state)
      return store.dispatch(getCourses())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })

    it('should NOT create a RECEIVE_PERSONAL action if no courses found', () => {
      nock(Config.coursesAPI)
        .get('/courses')
        .reply(200, emptyResponse)

      const expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        state: statuses.SUCCESS,
        requestType: REQUEST_TYPE,
      }

      const store = mockStore(state)
      return store.dispatch(getCourses())
        .then(() => {
          expect(store.getActions()).not.toContainEqual(expectedAction)
        })
    })
  })

  describe('on error', () => {
    beforeEach(() => {
      nock(Config.coursesAPI)
        .get('/token')
        .reply(401)
    })

    it('should create a RECEIVE_PERSONAL action with a status of error', () => {
      const expectedAction = {
        type: constants.RECEIVE_PERSONAL,
        state: statuses.ERROR,
        requestType: REQUEST_TYPE,
      }

      const store = mockStore(state)
      return store.dispatch(getCourses())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})
