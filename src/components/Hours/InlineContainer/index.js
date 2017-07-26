import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as statuses from '../../../constants/APIStatuses'

class HoursInlineContainer extends Component {
  render () {
    switch (this.props.hoursEntry.status) {
      case statuses.FETCHING:
        return (<div>Loading</div>)
      case statuses.SUCCESS:
        return this.props.presenter(this.props.hoursEntry, this.props.isOpen, this.props.toggleExpanded, this.props.children)
      default:
        return (<div />)
    }
  }
}

HoursInlineContainer.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  presenter: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  toggleExpanded: PropTypes.func,
}

export default HoursInlineContainer
