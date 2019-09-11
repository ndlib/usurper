import { createSelector } from 'reselect'
import * as statuses from 'constants/APIStatuses'

const getAlerts = (state) => {
  let allAlerts = []
  if (state.allAlerts && state.allAlerts.status === statuses.SUCCESS && state.allAlerts.json) {
    const now = new Date()

    allAlerts = state.allAlerts.json
      .filter((entry) => {
        const start = new Date(entry.fields.startTime)
        const end = new Date(entry.fields.endTime)
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
