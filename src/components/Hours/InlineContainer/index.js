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
      case statuses.ERROR:
        return (<section className='hours-display'><h2>The hours are currently unavailable. <br />Please call the circulation desk at (574) 631-6679.</h2></section>)
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
