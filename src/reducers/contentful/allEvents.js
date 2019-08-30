import { CF_REQUEST_ALLEVENTS, CF_RECEIVE_ALLEVENTS } from 'actions/contentful/allEvents'
import * as statuses from 'constants/APIStatuses'
import * as dateLibs from 'shared/DateLibs'
import typy from 'typy'

const startEndDate = (start, end) => {
  if (!start || !end) {
    return null
  }
  let startYear = ', ' + start.getFullYear()
  const endYear = ', ' + end.getFullYear()
  const options = { weekday: 'long', month: 'long', day: 'numeric' }

  let out = start.toLocaleString('en-US', options)
  if (dateLibs.isSameDay(start, end)) {
    // only show one day with the year
    return out + startYear
  }
  if (start.getFullYear() === end.getFullYear()) {
    // only show the year at the end if the start and end are in the same yar
    startYear = ''
  }
  out += startYear + ' – ' + end.toLocaleString('en-US', options) + endYear
  return out
}

const startEndTime = (start, end) => {
  // Only show time if the event is only 1 day
  if (dateLibs.isSameDay(start, end)) {
    let out = dateLibs.hour12(start)
    if (start.getTime() !== end.getTime()) {
      out += ' – ' + dateLibs.hour12(end)
    }
    return out
  }
  return null
}

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALLEVENTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALLEVENTS:
      return Object.assign({}, state, {
        status: action.status,
        json: typy(action.allEvents).safeArray.map(entry => {
          if (!entry.fields) {
            return entry
          }
          // Adjust start and end dates so they are Date objects
          const start = dateLibs.makeLocalTimezone(entry.fields.startDate)
          const end = entry.fields.endDate
            ? dateLibs.makeLocalTimezone(entry.fields.endDate)
            : dateLibs.makeLocalTimezone(entry.fields.startDate)
          // if end time is 0:00, add 23:59
          if (end.getHours() === 0 && end.getMinutes() === 0) {
            end.setTime(end.getTime() + (23 * 60 * 60 * 1000) + (59 * 60 * 1000))
          }

          return {
            ...entry.fields,
            id: entry.sys.id,
            startDate: start,
            endDate: end,
            displayDate: startEndDate(start, end),
            displayTime: typy(entry, 'fields.timeOverride').safeString ? entry.fields.timeOverride : startEndTime(start, end),
          }
        }),
      })
    default:
      return state
  }
}
