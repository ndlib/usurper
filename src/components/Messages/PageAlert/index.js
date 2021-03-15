import React from 'react'
import PropTypes from 'prop-types'
import Presenter from 'components/Contentful/Alert/presenter.js'
import { alertMap } from 'components/Contentful/Alert/alertHelpers.js'

class PageAlert extends React.Component {
  render () {
    const alerts = []
    alerts.push(alertMap({
      fields: {
        title: '',
        type: this.props.type,
        domains: ['library'],
        description: this.props.children,
        startTime: new Date(),
        endTime: new Date(9999, 12, 31),
        url: this.props.url,
      },
    }, false))
    if (this.props.className) {
      alerts[0].className += ' ' + this.props.className
    }

    return (
      <Presenter alerts={alerts} />
    )
  }
}

PageAlert.propTypes = {
  type: PropTypes.oneOf([
    'informational',
    'informationalYellow',
    'warning',
    'serviceAvailable',
    'serviceLimited',
    'serviceUnavailable',
  ]),
  url: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
}

PageAlert.defaultProps = {
  type: 'informational',
}

export default PageAlert
