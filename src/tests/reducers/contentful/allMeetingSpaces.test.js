import reducer from 'reducers/contentful/allMeetingSpaces'
import * as actions from 'actions/contentful/allMeetingSpaces'
import * as statuses from 'constants/APIStatuses'

describe('Meeting spaces reducer', () => {
  const expectedInitialState = {
    json: [],
    status: statuses.NOT_FETCHED,
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(expectedInitialState)
  })

  it('should handle CF_REQUEST_MEETING_SPACES', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_MEETING_SPACES,
      })
    ).toMatchObject({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_MEETING_SPACES', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_RECEIVE_MEETING_SPACES,
        status: 'status from receive',
        spaces: {
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
