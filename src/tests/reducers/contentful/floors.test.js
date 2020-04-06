import reducer from 'reducers/contentful/floors'
import * as actions from 'actions/contentful/floors'
import * as statuses from 'constants/APIStatuses'

describe('Floors reducer', () => {
  const expectedInitialState = {
    json: [],
    status: statuses.FETCHING,
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(expectedInitialState)
  })

  it('should handle CF_REQUEST_FLOORS', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_FLOORS,
      })
    ).toMatchObject({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_FLOORS', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_RECEIVE_FLOORS,
        status: 'status from receive',
        floor: {
          sys: { id: 'blah' },
          fields: { title: 'blah' },
        },
      })
    ).toMatchObject({
      status: 'status from receive',
      json: {
        sys: { id: 'blah' },
        fields: { title: 'blah' },
      },
    })
  })
})
