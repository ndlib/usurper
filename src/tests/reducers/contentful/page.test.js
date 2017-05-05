import reducer from '../../../reducers/contentful/page'
import * as actions from '../../../actions/contentful'

describe('Page reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
    })
  })

  it('should handle CF_REQUEST_PAGE', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_PAGE,
      })
    ).toEqual({
      isFetching: true,
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
      isFetching: false,
      status: 'status from receivePage',
      json: 'page from receivePage',
    })
  })

  it('should handle CF_NO_SUCH_PAGE', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_NO_SUCH_PAGE,
        status: 'status from receivePage',
        page: 'page from receivePage',
      })
    ).toEqual({
      isFetching: false,
      status: 'status from receivePage',
    })
  })
})
