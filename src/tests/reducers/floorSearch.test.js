import reducer from 'reducers/floorSearch'
import * as actions from 'actions/floorSearch'
import * as statuses from 'constants/APIStatuses'

describe('Floor search reducer', () => {
  const expectedInitialState = {
    status: statuses.NOT_FETCHED,
    slug: undefined,
    servicePoint: undefined,
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(expectedInitialState)
  })

  it('should handle FLOOR_SEARCH_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actions.FLOOR_SEARCH_REQUEST,
      })
    ).toMatchObject({
      status: statuses.FETCHING,
    })
  })

  it('should handle FLOOR_SEARCH_RECEIVE', () => {
    expect(
      reducer(undefined, {
        type: actions.FLOOR_SEARCH_RECEIVE,
        status: 'status from receive',
        slug: 'floor slug',
        servicePoint: 'service point slug',
      })
    ).toMatchObject({
      status: 'status from receive',
      slug: 'floor slug',
      servicePoint: 'service point slug',
    })
  })
})
