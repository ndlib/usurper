import { createSelector } from 'reselect'
import * as statuses from '../constants/APIStatuses'
import { flattenLocale } from '../shared/ContentfulLibs'

const getAlerts = (state, props) => {
  let allAlerts = []
  if (state.allAlerts && state.allAlerts.status === statuses.SUCCESS) {
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
      .sort((left, right) => {
        let a = new Date(left.fields.startTime)
        let b = new Date(right.fields.startTime)

        if (a < b) {
          return 1
        } else if (b < a) {
          return -1
        }
        return 0
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
