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
  if (left.type === right.type) {
    if (left.startTime < right.startTime) {
      return 1
    } else if (right.startTime < left.startTime) {
      return -1
    }

    // alphabetical sort if matching dates
    return (left.description < right.description) ? -1 : 1
  }

  // warnings should always be at the top
  if (left.type === 'warning') {
    return -1
  }

  return 1
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
