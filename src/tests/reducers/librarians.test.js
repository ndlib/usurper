import reducer from 'reducers/librarians'
import * as actions from 'actions/librarians'
import * as statuses from 'constants/APIStatuses'

describe('Page reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.FETCHING,
    })
  })

  it('should handle REQUEST_LIBRARIANS', () => {
    expect(
      reducer(undefined, {
        type: actions.REQUEST_LIBRARIANS,
      })
    ).toEqual({
      status: statuses.FETCHING,
    })
  })

  it('should handle RECEIVE_LIBRARIANS', () => {
    expect(
      reducer(undefined, {
        type: actions.RECEIVE_LIBRARIANS,
        status: 'status from receiveLibrarians',
        data: 'page from receiveLibrarians',
      })
    ).toEqual({
      status: 'status from receiveLibrarians',
      json: 'page from receiveLibrarians',
    })
  })
})
