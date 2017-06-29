import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InlineLoading from '../../Messages/InlineLoading'
import * as statuses from '../../../constants/APIStatuses'

class InlineContainer extends Component {
  render () {
    switch (this.props.hoursEntry.status) {
      case statuses.FETCHING:
        return (<InlineLoading />)
      case statuses.SUCCESS:
        return this.props.presenter(this.props.hoursEntry, this.props.isOpen, this.props.toggleExpanded, this.props.children)
      default:
        return (<div />)
    }
  }
}

InlineContainer.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  presenter: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  children: PropTypes.object,
  toggleExpanded: PropTypes.func,
}

export default InlineContainer
