import { createSelector } from 'reselect'
import * as statuses from '../constants/APIStatuses'

const getHoursStatus = (state, props) => {
  if (!state.hours.json[props.jsonHoursApiKey]) {
    return statuses.NOT_FOUND
  }
  return state.hours.status
}

const getHours = (state, props) => {
  return state.hours.json[props.jsonHoursApiKey]
}

const makeGetHoursForServicePoint = () => {
  return createSelector(
    [getHoursStatus, getHours],
    (status, hours) => {
      if (!hours) {
        hours = {}
      }
      hours.status = status
      return hours
    }
  )
}

export default makeGetHoursForServicePoint
