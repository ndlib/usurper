import styles from './style.module.css'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'

export const alertMap = (alert, isGlobal = false) => {
  const type = styles[typy(alert, 'fields.type').isString ? helper.camelCase(alert.fields.type) : 'warning']
  const className = ['alert', (isGlobal ? 'global' : 'page'), styles.alertSection, type].join(' ')
  if (typy(alert, 'sys.id').isString) {
    return {
      ...alert.fields,
      id: typy(alert, 'sys.id').safeString,
      className: className,
      startTime: new Date(typy(alert, 'fields.startTime').safeString),
      type: type,
    }
  }
  return null
}

export const alertSort = (left, right) => {
  // Sort type as alphanumeric descending, so "Warning" comes before "Informational"
  if (left.type < right.type) {
    return 1
  } else if (left.type > right.type) {
    return -1
  } else {
    // If type is the same, sort by start time
    return left.startTime < right.startTime
      ? 1
      : (left.startTime > right.startTime ? -1 : 0)
  }
}

export const alertCategorize = (alerts) => {
  const out = {}

  if (alerts.filter(a => typy(a, 'type').isString).length) {
    alerts.forEach((alert) => {
      if (out[alert.type]) {
        out[alert.type].push(alert)
      } else {
        out[alert.type] = [alert]
      }
    })
  }

  return out
}
