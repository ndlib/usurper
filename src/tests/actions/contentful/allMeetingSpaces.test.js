import nock from 'nock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { fetchMeetingSpaces, CF_REQUEST_MEETING_SPACES, CF_RECEIVE_MEETING_SPACES } from 'actions/contentful/allMeetingSpaces'
import * as statuses from 'constants/APIStatuses'
import Config from 'shared/Configuration'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('spaces search actions', () => {
  it('fetchMeetingSpaces - success', async () => {
    const mockResponse = [
      {
        sys: {
          id: 'space',
          contentType: {
            sys: { id: 'space' },
          },
        },
        fields: {},
      },
    ]
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .reply(200, mockResponse)

    const store = mockStore()
    const result = await store.dispatch(fetchMeetingSpaces())
    expect(store.getActions()).toMatchObject([
      {
        "type": "CF_REQUEST_MEETING_SPACES",
      },
      {
      "spaces": [
       {
          "fields": {},
          "sys": {
            "contentType": {
              "sys": {
                "id": "space",
              },
            },
            "id": "space",
          },
        },
      ],
     "status": "API_STATUS_SUCCESS",
     "type": "CF_RECEIVE_MEETING_SPACES",
    },
  ]
)
  })

  it('fetchMeetingSpaces - error status', async () => {
    const mockResponse = {
      status: 404,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .reply(mockResponse.status, mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(fetchMeetingSpaces())
    expect(result).toMatchObject({
      type: CF_RECEIVE_MEETING_SPACES,
      status: statuses.NOT_FOUND,
    })
  })

  it('fetchMeetingSpaces - throw error', async () => {
    const mockResponse = {
      message: 'error',
      code: 500,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .replyWithError(mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(fetchMeetingSpaces())
    expect(result).toMatchObject({
      type: CF_RECEIVE_MEETING_SPACES,
      status: statuses.ERROR,
    })
  })
})
