import reducer from 'reducers/contentful/page'
import * as actions from 'actions/contentful/page'
import * as statuses from 'constants/APIStatuses'

describe('Page reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle CF_REQUEST_PAGE', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_PAGE,
      })
    ).toEqual({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_PAGE', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_RECEIVE_PAGE,
        status: 'status from receivePage',
        page: 'page from receivePage',
      })
    ).toEqual({
      status: 'status from receivePage',
      json: 'page from receivePage',
    })
  })
})
