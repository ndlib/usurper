import nock from 'nock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { fetchFloors, CF_REQUEST_FLOORS, CF_RECEIVE_FLOORS } from 'actions/contentful/floors'
import * as statuses from 'constants/APIStatuses'
import Config from 'shared/Configuration'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('floors search actions', () => {
  it('fetchFloors - success', async () => {
    const mockResponse = [
      {
        sys: {
          id: 'floor',
          contentType: {
            sys: { id: 'floor' },
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
    const result = await store.dispatch(fetchFloors('slug1'))
    expect(store.getActions()).toContainEqual({
      type: CF_REQUEST_FLOORS,
      floors: 'slug1',
    })
    expect(result).toMatchObject({
      type: CF_RECEIVE_FLOORS,
      status: statuses.SUCCESS,
      floor: mockResponse,
    })
  })

  it('fetchFloors - error status', async () => {
    const mockResponse = {
      status: 404,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .reply(mockResponse.status, mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(fetchFloors('slug2'))
    expect(result).toMatchObject({
      type: CF_RECEIVE_FLOORS,
      status: statuses.NOT_FOUND,
    })
  })

  it('fetchFloors - throw error', async () => {
    const mockResponse = {
      message: 'error',
      code: 500,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .replyWithError(mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(fetchFloors('slug3'))
    expect(result).toMatchObject({
      type: CF_RECEIVE_FLOORS,
      status: statuses.ERROR,
    })
  })
})
