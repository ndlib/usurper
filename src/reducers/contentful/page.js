import { CF_REQUEST_PAGE, CF_RECEIVE_PAGE } from '../../actions/contentful'

export default(state = { isFetching: true }, action) => {
  switch (action.type) {
    case CF_REQUEST_PAGE:
      return Object.assign({}, state, {
        isFetching: true
      })
    case CF_RECEIVE_PAGE:
      return Object.assign({}, state, {
        isFetching: false,
        json: action.page
      })
    default:
      return state
  }
}
