import React from 'react'
import PropTypes from 'prop-types'
import * as statuses from 'constants/APIStatuses'
import HoursError from '../Error'
import InlineLoading from 'components/Messages/InlineLoading'

const HoursInlineContainer = (props) => {
  switch (props.hoursEntry.status) {
    case statuses.FETCHING:
      return <InlineLoading />
    case statuses.SUCCESS:
      return props.presenter(props.hoursEntry,
        props.openStatus,
        props.toggleExpanded,
        props.children)
    case statuses.ERROR:
      return (<HoursError hoursEntry={props.hoursEntry} />)
    default:
      return null
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
