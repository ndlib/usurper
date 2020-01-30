import nock from 'nock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { fetchFloor, CF_REQUEST_FLOOR, CF_RECEIVE_FLOOR } from 'actions/contentful/floor'
import * as statuses from 'constants/APIStatuses'
import Config from 'shared/Configuration'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('floor search actions', () => {
  it('fetchFloor - success', async () => {
    const mockResponse = [
      {
        sys: {
          id: 'floorId',
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
    const result = await store.dispatch(fetchFloor('slug1'))
    expect(store.getActions()).toContainEqual({
      type: CF_REQUEST_FLOOR,
      floor: 'slug1',
    })
    expect(result).toMatchObject({
      type: CF_RECEIVE_FLOOR,
      status: statuses.SUCCESS,
      floor: mockResponse[0],
    })
  })

  it('fetchFloor - error status', async () => {
    const mockResponse = {
      status: 404,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .reply(mockResponse.status, mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(fetchFloor('slug2'))
    expect(result).toMatchObject({
      type: CF_RECEIVE_FLOOR,
      status: statuses.NOT_FOUND,
    })
  })

  it('fetchFloor - throw error', async () => {
    const mockResponse = {
      message: 'error',
      code: 500,
    }
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .replyWithError(mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(fetchFloor('slug3'))
    expect(result).toMatchObject({
      type: CF_RECEIVE_FLOOR,
      status: statuses.ERROR,
    })
  })
})
