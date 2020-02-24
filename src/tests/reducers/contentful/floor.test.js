import reducer from 'reducers/contentful/floor'
import * as actions from 'actions/contentful/floor'
import * as statuses from 'constants/APIStatuses'

describe('Floor reducer', () => {
  const expectedInitialState = {
    status: statuses.FETCHING,
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(expectedInitialState)
  })

  it('should handle CF_REQUEST_FLOOR', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_FLOOR,
      })
    ).toMatchObject({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_FLOOR', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_RECEIVE_FLOOR,
        status: 'status from receive',
        floor: {
          sys: { id: 'test' },
          fields: { title: 'blah' },
        },
      })
    ).toMatchObject({
      status: 'status from receive',
      json: {
        sys: { id: 'test' },
        fields: { title: 'blah' },
      },
    })
  })
})
