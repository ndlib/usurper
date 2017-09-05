import { createSelector } from 'reselect'
import * as statuses from '../constants/APIStatuses'

const getHoursStatus = (state, props) => {
  //const key = props.servicePoint.fields.hoursCode
  if (state.hours.status === statuses.SUCCESS && !state.hours.json['locations'][426]) {
    return statuses.NOT_FOUND
  }
  return state.hours.status
}

const getHours = (state, props) => {
  //const key = props.servicePoint.fields.hoursCode
  if (state.hours.json['locations']) {
    return Object.assign({}, state.hours.json['locations'][426])
  } else {
    return Object.assign({}, '')
  }
}

const getHoursName = (state, props) => {
  if (state.hours.status !== statuses.SUCCESS) {
    return ''
  }

  return props.servicePoint.fields.title
}

const getServicePoint = (state, props) => {
  return props.servicePoint.fields
}

const makeGetHoursForServicePoint = () => {
  return createSelector(
    [getHoursStatus, getHours, getHoursName, getServicePoint],
    (status, hours, name, servicePoint) => {
      console.log(hours)
      if (!hours) {
        hours = { today: {} }
      } else {
        hours.today = getTodaysHours(hours)
      }

      hours.name = name
      hours.status = status
      hours.servicePoint = servicePoint
      return hours
    }
  )
}

const getTodaysHours = (hours) => {
  if (Object.keys(hours).length === 0) {
    return {}
  }
  let d = new Date()
  let weekday = new Array(7)
  weekday[0] = "Sunday"
  weekday[1] = "Monday"
  weekday[2] = "Tuesday"
  weekday[3] = "Wednesday"
  weekday[4] = "Thursday"
  weekday[5] = "Friday"
  weekday[6] = "Saturday"

  let n = weekday[d.getDay()]
  return hours.weeks[0][n]
}

export default makeGetHoursForServicePoint
