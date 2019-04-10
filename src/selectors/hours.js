import { createSelector } from 'reselect'
import * as statuses from '../constants/APIStatuses'
const _ = require('lodash')
const days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa']
const moment = require('moment')

const getHoursStatus = (state, props) => {
  const key = props.servicePoint.fields.hoursCode
  if (state.hours.status === statuses.SUCCESS &&
    !(state.hours.json['locations'] && state.hours.json['locations'][key])) {
    return statuses.NOT_FOUND
  }
  return state.hours.status
}

const getHours = (state, props) => {
  const key = props.servicePoint.fields.hoursCode
  if (state.hours.json['locations']) {
    return Object.assign({}, state.hours.json['locations'][key])
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

const getTodaysHours = (hours) => {
  if (Object.keys(hours).length === 0) {
    return {}
  }
  const today = hours.weeks[0][moment().format('dddd')]
  today['schemaOpeningHours'] = days[new Date().getDay()] + ' ' + today.rendered

  return today
}

const getUpcomingChangedHours = (hours) => {
  if (!hours.weeks) {
    return {}
  }
  // get all the keys to loop through the days
  const weekdays = Object.keys(hours.weeks[0])

  const test = weekdays.map((day) => {
    return hours.weeks[0][day].rendered
  })
  for (let step = 1; step < hours.weeks.length; step++) {
    const test2 = weekdays.map((day) => {
      return hours.weeks[step][day].rendered
    })
    if (!_.isEqual(test, test2)) {
      return hours.weeks[step]
    }
  }

  return {}
}

const makeGetHoursForServicePoint = () => {
  return createSelector(
    [getHoursStatus, getHours, getHoursName, getServicePoint],
    (status, hours, name, servicePoint) => {
      if (!hours) {
        hours = { }
      }
      hours.today = getTodaysHours(hours)
      hours.name = name
      hours.status = status
      hours.servicePoint = servicePoint
      hours.upcomingChangedHours = getUpcomingChangedHours(hours)
      return hours
    }
  )
}

export default makeGetHoursForServicePoint
