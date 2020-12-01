import nock from 'nock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { fetchGrouping, CF_REQUEST_GROUPING, CF_RECEIVE_GROUPING } from 'actions/contentful/grouping'
import * as statuses from 'constants/APIStatuses'
import Config from 'shared/Configuration'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('grouping actions', () => {
  it('fetchGrouping - success', async () => {
    const mockResponse = [
      {
        sys: {
          id: 'groupingId',
          contentType: {
            sys: { id: 'grouping' },
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
    const result = await store.dispatch(fetchGrouping('myGroup'))
    expect(store.getActions()).toContainEqual({
      type: CF_REQUEST_GROUPING,
      id: 'myGroup',
    })
    expect(result).toMatchObject({
      type: CF_RECEIVE_GROUPING,
      status: statuses.SUCCESS,
      id: 'myGroup',
      grouping: mockResponse[0],
    })
  })

  it('fetchGrouping - error status', async () => {
    const mockResponse = {
      status: 404,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .reply(mockResponse.status, mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(fetchGrouping('slug2'))
    expect(result).toMatchObject({
      type: CF_RECEIVE_GROUPING,
      status: statuses.NOT_FOUND,
    })
  })

  it('fetchGrouping - throw error', async () => {
    const mockResponse = {
      message: 'error',
      code: 500,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .replyWithError(mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(fetchGrouping('slug3'))
    expect(result).toMatchObject({
      type: CF_RECEIVE_GROUPING,
      status: statuses.ERROR,
    })
  })
})
