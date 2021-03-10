import { CF_REQUEST_ALLEVENTS, CF_RECEIVE_ALLEVENTS } from 'actions/contentful/allEvents'
import * as statuses from 'constants/APIStatuses'
import { mapEvent } from './event'
import typy from 'typy'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALLEVENTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALLEVENTS:
      const allEvents = typy(action.allEvents).safeArray.map(entry => {
        // Check if it is a recurring event before calling event mapping by looking at the eventGroups
        const recurring = typy(action.allEventGroups).safeArray.some(group => {
          return group.eventGroupType === 'recurring' && group.eventIds.includes(entry.sys.id)
        })
        return mapEvent(entry, recurring)
      })

      return Object.assign({}, state, {
        status: action.status,
        json: allEvents,
      })
    default:
      return state
  }
}
