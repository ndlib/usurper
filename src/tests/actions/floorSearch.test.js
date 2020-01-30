import nock from 'nock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { FLOOR_SEARCH_REQUEST, FLOOR_SEARCH_RECEIVE } from 'actions/floorSearch'
import searchFloorMaps from 'actions/floorSearch'
import * as statuses from 'constants/APIStatuses'
import Config from 'shared/Configuration'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('floor search actions', () => {
  it('searchFloorMaps - success', async () => {
    const mockResponse = {
      slug: 'test',
      servicePoint: 'sp',
    }
    nock(Config.mapsAPI)
      .get(() => true)
      .query(true)
      .reply(200, mockResponse)

    const store = mockStore()
    const result = await store.dispatch(searchFloorMaps('?foo=bar'))
    expect(store.getActions()).toContainEqual({
      type: FLOOR_SEARCH_REQUEST,
    })
    expect(result).toMatchObject({
      type: FLOOR_SEARCH_RECEIVE,
      status: statuses.SUCCESS,
      ...mockResponse,
    })
  })

  it('searchFloorMaps - error status', async () => {
    const mockResponse = {
      status: 500,
    }
    nock(Config.mapsAPI)
      .get(() => true)
      .query(true)
      .reply(mockResponse.status, mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(searchFloorMaps('?foo=bar'))
    expect(result).toMatchObject({
      type: FLOOR_SEARCH_RECEIVE,
      status: statuses.ERROR,
    })
  })

  it('searchFloorMaps - throw error', async () => {
    const mockResponse = {
      message: 'error',
      code: 500,
    }
    nock(Config.mapsAPI)
      .get(() => true)
      .query(true)
      .replyWithError(mockResponse)

    const store = mockStore({ })
    const result = await store.dispatch(searchFloorMaps('?foo=bar'))
    expect(result).toMatchObject({
      type: FLOOR_SEARCH_RECEIVE,
      status: statuses.ERROR,
    })
  })
})
