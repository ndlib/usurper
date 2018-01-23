import React from 'react'

import alertImage from '../../../static/images/alert.svg'
import infoImage from '../../Footer/FooterLinks/images/ic_info_outline_white_24px.svg'

const alertMap = (alert, isGlobal = false) => {
  const warnPrefix = (<div><img src={alertImage} alt='Warning' aria-hidden /> </div>)
  const infoPrefix = (<div><img src={infoImage} alt='Information' aria-hidden /> </div>)

  let type = alert.type ? alert.type.toLowerCase() : 'warning'

  let className = 'alert '
  className += isGlobal ? 'global ' : 'page '
  className += type

  return {
    ...alert,

    className: className,
    prefix: type === 'informational' ? infoPrefix : warnPrefix,

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
    return 0
  }

  // warnings should always be at the top
  if (left.type === 'warning') {
    return -1
  }

  return 1
}

const alertCatagorize = (alerts) => {
  let out = {}
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
