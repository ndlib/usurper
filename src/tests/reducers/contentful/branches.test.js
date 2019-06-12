import reducer from 'reducers/contentful/branches'
import * as actions from 'actions/contentful/branches'
import * as statuses from 'constants/APIStatuses'

describe('branches reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle CF_REQUEST_BRANCHES', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_BRANCHES,
        depth: 12,
      })
    ).toEqual({
      status: statuses.FETCHING,
      depth: 12,
    })
  })

  it('should handle CF_RECEIVE_BRANCHES', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_RECEIVE_BRANCHES,
        status: 'status from receive branches',
        depth: 13,
        branches: [
          {
            sys: {},
            fields: {
              title: 'some data',
            },
          },
        ],
      })
    ).toEqual({
      status: 'status from receive branches',
      depth: 13,
      data: [
        {
          sys: {},
          fields: {
            title: 'some data',
            alternateTitle: 'some data',
          },
        },
      ],
    })
  })
})
