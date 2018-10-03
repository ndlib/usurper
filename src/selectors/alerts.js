import { createSelector } from 'reselect'
import * as statuses from '../constants/APIStatuses'
import { flattenLocale } from '../shared/ContentfulLibs'

const getAlerts = (state, props) => {
  let allAlerts = []
  if (state.allAlerts && state.allAlerts.status === statuses.SUCCESS && state.allAlerts.json) {
    let now = new Date()

    allAlerts = state.allAlerts.json
      .map((entry) => {
        flattenLocale(entry.fields, 'en-US')
        return entry
      })
      .filter((entry) => {
        let start = new Date(entry.fields.startTime)
        let end = new Date(entry.fields.endTime)
        return start <= now && end >= now && entry.fields.global
      })
  }
  return allAlerts
}

const makeAlertSelector = () => {
  return createSelector(
    getAlerts,
    (alerts) => alerts
  )
}

export default makeAlertSelector
