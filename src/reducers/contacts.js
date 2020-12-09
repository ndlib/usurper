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
        contacts: typy(action.data).safeArray.map(mapContact),
        netids: action.netids,
      })
    default:
      return state
  }
}

export const mapContact = (entry) => {
  return {
    netID: typy(entry, 'netID').safeString,
    name: (typy(entry, 'fname').safeString + ' ' + typy(entry, 'lname').safeString).trim(),
    email: typy(entry, 'email').safeString,
    directoryUrl: typy(entry, 'emp_url').safeString,
    jobTitle: typy(entry, 'jobTitle').safeString,
    mail_addr: typy(entry, 'mail_addr').safeString,
    phone: typy(entry, 'phone').safeString,
    photo: typy(entry, 'pic').safeString,
  }
}
