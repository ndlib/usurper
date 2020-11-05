import reducer from 'reducers/contentful/grouping'
import * as actions from 'actions/contentful/grouping'
import * as statuses from 'constants/APIStatuses'

describe('Grouping reducer', () => {
  const expectedInitialState = {}

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(expectedInitialState)
  })

  it('should handle CF_REQUEST_GROUPING', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_GROUPING,
        id: 'foo',
      })
    ).toMatchObject({
      foo: {
        status: statuses.FETCHING,
      },
    })
  })

  it('should handle CF_RECEIVE_GROUPING', () => {
    const pass1 = reducer(undefined, {
      type: actions.CF_RECEIVE_GROUPING,
      status: 'foo status',
      id: 'foo',
      grouping: {
        sys: { id: 'test' },
        fields: { title: 'blah' },
      },
    })
    const expected1 = {
      foo: {
        status: 'foo status',
        data: {
          sys: { id: 'test' },
          fields: { title: 'blah' },
        },
      },
    }
    expect(pass1).toMatchObject(expected1)
    
    // Call reducer twice to make sure second call does not replace state after first call
    const pass2 = reducer(pass1, {
      type: actions.CF_RECEIVE_GROUPING,
      status: 'bar status',
      id: 'bar',
      grouping: {
        sys: { id: 'new' },
        fields: { title: 'record' },
      },
    })
    const expected2 = {
      ...expected1,
      bar: {
        status: 'bar status',
        data: {
          sys: { id: 'new' },
          fields: { title: 'record' },
        },
      },
    }
    expect(pass2).toMatchObject(expected2)
  })
})
