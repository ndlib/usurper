import React from 'react'
import PropTypes from 'prop-types'
import Presenter from 'components/Contentful/Alert/presenter.js'
import { alertMap, alertCategorize } from 'components/Contentful/Alert/alertHelpers.js'

class PageAlert extends React.Component {
  render () {
    let alerts = []
    alerts.push(alertMap({
      title: '',
      type: this.props.type,
      domain: 'library',
      description: this.props.children,
      startTime: new Date(),
      endTime: new Date(9999, 12, 31),
      url: this.props.url,
      global: false,
    }))
    if (this.props.className) {
      alerts[0].className += ' ' + this.props.className
    }

    alerts = alertCategorize(alerts)

    return (
      <Presenter alerts={alerts}>
        {this.props.children}
      </Presenter>
    )
  }
}

PageAlert.propTypes = {
  type: PropTypes.oneOf(['informational', 'warning']),
  url: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
}

PageAlert.defaultProps = {
  type: 'informational',
}

export default PageAlert
