import { CF_REQUEST_ALLALERTS, CF_RECEIVE_ALLALERTS } from 'actions/contentful/allAlerts'
import * as statuses from 'constants/APIStatuses'
import typy from 'typy'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALLALERTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALLALERTS:
      return Object.assign({}, state, {
        status: action.status,
        json: typy(action, 'allAlerts').safeArray.filter(alert => {
          return alert.fields.domains.includes('library')
        }),
      })
    default:
      return state
  }
}
