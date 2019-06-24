import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as statuses from 'constants/APIStatuses'
import HoursError from '../Error'

class HoursInlineContainer extends Component {
  render () {
    switch (this.props.hoursEntry.status) {
      case statuses.FETCHING:
        return (<div>Loading</div>)
      case statuses.SUCCESS:
        return this.props.presenter(this.props.hoursEntry,
          this.props.openStatus,
          this.props.toggleExpanded,
          this.props.children)
      case statuses.ERROR:
        return (<HoursError hoursEntry={this.props.hoursEntry} />)
      default:
        return (<div />)
    }
  }
}

HoursInlineContainer.propTypes = {
  hoursEntry: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
  presenter: PropTypes.func.isRequired,
  openStatus: PropTypes.string,
  toggleExpanded: PropTypes.func,
  children: PropTypes.any,
}

export default HoursInlineContainer
