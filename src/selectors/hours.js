import { createSelector } from 'reselect'
import * as statuses from '../constants/APIStatuses'

const getHoursStatus = (state, props) => {
  const key = props.servicePoint.fields.hoursCode
  if (state.hours.status === statuses.SUCCESS && !state.hours.json[key]) {
    return statuses.NOT_FOUND
  }
  return state.hours.status
}

const getHours = (state, props) => {
  const key = props.servicePoint.fields.hoursCode
  return Object.assign({}, state.hours.json[key])
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
      if (!hours) {
        hours = {}
      }
      hours.name = name
      hours.status = status
      hours.servicePoint = servicePoint
      return hours
    }
  )
}

export default makeGetHoursForServicePoint
