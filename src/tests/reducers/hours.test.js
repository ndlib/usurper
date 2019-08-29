import reducer from 'reducers/hours'
import * as actions from 'actions/hours'
import * as statuses from 'constants/APIStatuses'

describe('hours reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toMatchObject({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle HOURS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actions.HOURS_REQUEST,
      })
    ).toMatchObject({
      status: statuses.FETCHING,
    })
  })

  it('should handle HOURS_RECEIVE', () => {
    const payload = {
      status: statuses.SUCCESS,
      hours: {
        foo: 'bar',
      },
    }

    expect(
      reducer(undefined, {
        type: actions.HOURS_RECEIVE,
        status: payload.status,
        hours: payload.hours,
      })
    ).toMatchObject({
      status: payload.status,
      json: payload.hours,
    })
  })
})
