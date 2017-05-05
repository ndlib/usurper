import * as actions from '../../actions/contentful'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockPageResponse = {
  "sys": {
    "contentType": {
      "sys": {
        "id": "page"
      }
    },
  },
  "fields": {
    "title": "About",
    "shortContent": "Short text about about page.",
    "url": "about",
    "content": "Full content of about page."
  }
}

describe('contentful requestPage action creator', () => {
  it('should create a CF_REQUEST_PAGE action for the requested page', () => {
    const pageUri = 'Page data'
    const expectedAction = {
      page: pageUri,
      type: actions.CF_REQUEST_PAGE
    }
    expect(actions.requestPage(pageUri)).toEqual(expectedAction)
  })
})

describe('contentful fetchPage async action creator', () => {
  it('should first create a CF_REQUEST_PAGE action for the requested page', () => {
    nock(/https:\/\/localhost/)
      .get(/.*.json/)
      .reply(200, mockPageResponse)
    const pageUri = 'Page data'
    const expectedAction = {
      type: actions.CF_REQUEST_PAGE,
      page: pageUri
    }

    const store = mockStore({ })
    return store.dispatch(actions.fetchPage(pageUri))
      .then(() => {
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })
  })

  describe('on search hit', () => {
    beforeEach(() => {
      nock(/https:\/\/localhost/)
        .get(/.*.json/)
        .reply(200, mockPageResponse)
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a CF_RECEIVE_PAGE action for the first page returned in the search', () => {
      const pageUri = 'mypage'
      const expectedAction = {
        type: actions.CF_RECEIVE_PAGE,
        status: 'success',
        page: mockPageResponse
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchPage(pageUri))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on receiving an error from contentful API', () => {
    beforeEach(() => {
      nock(/https:\/\/localhost/)
        .get(/.*.json/)
        .reply(200, { sys: { type: 'Error' }, error: 'Error message' })
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a CF_RECEIVE_PAGE action with a status of error and the full response', () => {
      const pageUri = 'mypage'
      const expectedAction = {
        type: actions.CF_RECEIVE_PAGE,
        status: 'error',
        error: { sys: { type: 'Error' }, error: 'Error message' }
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchPage(pageUri))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on throwing an exception when fetching the page', () => {
    beforeEach(() => {
      nock(/https:\/\/localhost/)
        .get(/.*.json/)
        .replyWithError('Crash Message')
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a CF_RECEIVE_PAGE action with a status of error and the full response', () => {
      const pageUri = 'mypage'
      const expectedAction = {
        type: actions.CF_RECEIVE_PAGE,
        status: 'error',
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchPage(pageUri))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
          expect(store.getActions()[1].error.message).toMatch(/Crash Message/)
        })
    })
  })

  describe('on receiving a 404 from contentful API', () => {
    beforeEach(() => {
      nock(/https:\/\/localhost/)
        .get(/.*.json/)
        .reply(404, {})
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a CF_RECEIVE_PAGE action with a status of error and the full response', () => {
      const pageUri = 'mypage'
      const expectedAction = {
        type: actions.CF_RECEIVE_PAGE,
        status: 'error',
        error: {}
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchPage(pageUri))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})
