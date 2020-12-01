import { CF_REQUEST_ALL_EVENT_GROUPS, CF_RECEIVE_ALL_EVENT_GROUPS } from 'actions/contentful/allEventGroups'
import * as statuses from 'constants/APIStatuses'
import typy from 'typy'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALL_EVENT_GROUPS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALL_EVENT_GROUPS:
      return Object.assign({}, state, {
        status: action.status,
        json: typy(action.allEventGroups).safeArray.map(group => ({
          id: group.fields.id || group.sys.id,
          title: group.fields.displayName || group.fields.title,
          eventIds: typy(group.fields.items).safeArray.map(event => event.sys.id),
        })),
      })
    default:
      return state
  }
}
