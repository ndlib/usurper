import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as statuses from '../../../../constants/APIStatuses'

class InlineContainer extends Component {
  componentDidMount () {
    if (this.props.hoursEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
  }

  render () {
    switch (this.props.hoursEntry.status) {
      case statuses.FETCHING:
        return (<div>Loading</div>)
      case statuses.SUCCESS:
        return this.props.presenter(this.props.hoursEntry)
      default:
        return (<div />)
    }
  }
}

InlineContainer.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  jsonHoursApiKey: PropTypes.string.isRequired,
  fetchHours: PropTypes.func.isRequired,
  presenter: PropTypes.func.isRequired,
}

export default InlineContainer
