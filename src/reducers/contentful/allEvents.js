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
      const allEvents = []
      typy(action.allEvents).safeArray.forEach(entry => {
        // If there is a recurrence schedule, treat as one event per date specified
        if (typy(entry.fields.dateSchedule, 'length').safeNumber > 0) {
          entry.fields.dateSchedule.forEach(date => {
            allEvents.push(mapEvent(entry, date))
          })
        } else {
          allEvents.push(mapEvent(entry))
        }
      })

      return Object.assign({}, state, {
        status: action.status,
        json: allEvents,
      })
    default:
      return state
  }
}
