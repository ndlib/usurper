import * as statuses from 'constants/APIStatuses'
import { REQUEST_LIBRARIANS, RECEIVE_LIBRARIANS } from 'actions/librarians'
import { mapContact } from './contacts'
import typy from 'typy'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case REQUEST_LIBRARIANS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
        netids: action.netids,
      })
    case RECEIVE_LIBRARIANS:
      return Object.assign({}, state, {
        status: action.status,
        json: typy(action.data).safeArray.map(mapContact),
        netids: action.netids,
      })
    default:
      return state
  }
}
