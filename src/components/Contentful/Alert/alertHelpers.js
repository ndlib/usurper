import styles from './style.module.css'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'

export const alertMap = (alert, isGlobal = false) => {
  const type = typy(alert, 'fields.type').isString ? helper.camelCase(alert.fields.type) : 'warning'
  const className = ['alert', (isGlobal ? 'global' : 'page'), styles.alertSection, styles[type]].join(' ')
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
  // Put "warning" type at top, otherwise sort alphanumeric asc
  if (left.type !== right.type) {
    if (left.type === 'warning' || right.type === 'warning') {
      return left.type === 'warning' ? -1 : 1
    } else {
      return left.type < right.type ? -1 : 1
    }
  } else {
    // If type is the same, sort by start time
    return left.startTime < right.startTime
      ? -1
      : (left.startTime > right.startTime ? 1 : 0)
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
