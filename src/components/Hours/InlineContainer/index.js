import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as statuses from '../../../constants/APIStatuses'

class InlineContainer extends Component {
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
  presenter: PropTypes.func.isRequired,
}

export default InlineContainer
