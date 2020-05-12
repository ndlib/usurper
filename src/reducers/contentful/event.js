import { CF_REQUEST_EVENT, CF_RECEIVE_EVENT } from 'actions/contentful/event'
import * as statuses from 'constants/APIStatuses'
import * as dateLibs from 'shared/DateLibs'
import typy from 'typy'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_EVENT:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_EVENT:
      return Object.assign({}, state, {
        status: action.status,
        json: mapEvent(action.event, action.recurring),
      })
    default:
      return state
  }
}

export const mapEvent = (entry, recurring) => {
  if (!entry.fields) {
    return entry
  }

  // Adjust start and end dates so they are Date objects
  const start = entry.fields.startDate ? dateLibs.makeLocalTimezone(entry.fields.startDate) : null
  const end = entry.fields.endDate
    ? dateLibs.makeLocalTimezone(entry.fields.endDate)
    : (start ? new Date(start) : null)

  // if end time is 0:00, add 23:59
  if (end instanceof Date && end.getHours() === 0 && end.getMinutes() === 0) {
    end.setTime(end.getTime() + (23 * 60 * 60 * 1000) + (59 * 60 * 1000))
  }

  return {
    ...entry.fields,
    id: entry.sys.id,
    slug: entry.fields.slug,
    recurring: recurring,
    startDate: start,
    endDate: end,
    displayDate: startEndDate(start, end),
    displayTime: typy(entry, 'fields.timeOverride').safeString ? entry.fields.timeOverride : startEndTime(start, end),
  }
}

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
