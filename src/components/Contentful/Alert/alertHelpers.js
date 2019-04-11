const alertMap = (alert, isGlobal = false) => {
  const type = alert.type ? alert.type.toLowerCase() : 'warning'

  let className = 'alert '
  className += isGlobal ? 'global ' : 'page '
  className += type

  return {
    ...alert,

    className: className,
    startTime: new Date(alert.startTime),
    type: type,
  }
}

const alertSort = (left, right) => {
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

const alertCatagorize = (alerts) => {
  const out = {}
  alerts.forEach((alert) => {
    if (out[alert.type]) {
      out[alert.type].push(alert)
    } else {
      out[alert.type] = [alert]
    }
  })

  return out
}

module.exports = {
  alertMap,
  alertSort,
  alertCatagorize,
}
