import styles from './style.module.css'

export const alertMap = (alert, isGlobal = false) => {
  const type = styles[alert.fields.type ? alert.fields.type.toLowerCase() : 'warning']
  const className = ['alert', (isGlobal ? 'global' : 'page'), styles.alertSection, type].join(' ')

  return {
    ...alert.fields,
    id: alert.sys.id,
    className: className,
    startTime: new Date(alert.fields.startTime),
    type: type,
  }
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

  if (alerts.length) {
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
