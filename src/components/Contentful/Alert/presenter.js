import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'

const AlertDisplay = (className, link, text, title) => {
  return (
    <div className={className} key={title}>
      <div className='width'><strong>ATTENTION:</strong> <Link to={link}>
        {text}
      </Link>
      </div>
    </div>
  )
}

const Alert = (props) => {
  if (props.alert) {
    let alert = props.alert.fields

    let now = new Date()
    let start = new Date(alert.startTime)
    let end = new Date(alert.endTime)
    if (start <= now && end >= now) {
      return AlertDisplay('alert page', alert.url, alert.description, alert.title)
    }
  } else if (props.globalAlerts) {
    let out = []
    props.globalAlerts.forEach((entry) => {
      let alert = entry.fields
      out.push(AlertDisplay('alert global', alert.url, alert.description, alert.title))
    })
    return <div>{out}</div>
  }
  return null
}

Alert.propTypes = {
  alert: PropTypes.object,
  globalAlerts: PropTypes.array,
}

export default Alert
