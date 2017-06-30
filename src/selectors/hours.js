import { createSelector } from 'reselect'
import * as statuses from '../constants/APIStatuses'

const getHoursStatus = (state, props) => {
  const key = props.servicePoint ? props.servicePoint.fields.hoursCode : props.jsonHoursApiKey
  if (state.hours.status === statuses.SUCCESS && !state.hours.json[key]) {
    return statuses.NOT_FOUND
  }
  return state.hours.status
}

const getHours = (state, props) => {
  const key = props.servicePoint ? props.servicePoint.fields.hoursCode : props.jsonHoursApiKey
  return Object.assign({}, state.hours.json[key])
}

const getHoursName = (state, props) => {
  if (state.hours.status !== statuses.SUCCESS) {
    return ''
  }
  if (props.servicePoint && props.servicePoint.fields.title) {
    return props.servicePoint.fields.title
  }
  return state.hours.json[props.jsonHoursApiKey].name
}

const makeGetHoursForServicePoint = () => {
  return createSelector(
    [getHoursStatus, getHours, getHoursName],
    (status, hours, name) => {
      if (!hours) {
        hours = {}
      }
      hours.name = name
      hours.status = status
      return hours
    }
  )
}

export default makeGetHoursForServicePoint
