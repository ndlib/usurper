import * as statuses from 'constants/APIStatuses'
import { REQUEST_CONTACTS, RECEIVE_CONTACTS } from 'actions/contacts'
import typy from 'typy'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case REQUEST_CONTACTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
        netids: action.netids,
      })
    case RECEIVE_CONTACTS:
      return Object.assign({}, state, {
        status: action.status,
        contacts: typy(action, 'data.librarians').safeArray.map(row => {
          const directoryUrl = typy(row, 'directoryUrl').safeString
          return {
            ...row,
            netid: directoryUrl.substring(directoryUrl.lastIndexOf('/') + 1),
          }
        }),
        netids: action.netids,
      })
    default:
      return state
  }
}
