import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHours } from '../../../actions/hours'
import HoursHeaderPresenter from './presenter.js'
import makeGetHoursForServicePoint from '../../../selectors/hours'
import * as statuses from '../../../constants/APIStatuses'

// We  need a way to give each instance of a container access to its own private selector.
// this is done by creating a private instance of the conector for each component.
const makeMapStateToProps = () => {
  const getHoursForServicePoint = makeGetHoursForServicePoint()
  const mapStateToProps = (state, props) => {
    // these props are required for the inline container.
    let ret = {
      jsonHoursApiKey: props.jsonHoursApiKey, // the key to look up hours component in the store used in the selector.
      hoursEntry: getHoursForServicePoint(state, props), // the actual hours used in the selector.
      presenter: HoursHeaderPresenter, // the presenter to show inline.
    }
    return ret
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours }, dispatch)
}

export class HoursHeaderContainer extends Component {
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

HoursHeaderContainer.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  jsonHoursApiKey: PropTypes.string.isRequired,
  fetchHours: PropTypes.func.isRequired,
  presenter: PropTypes.func.isRequired,
}

const HeaderHours = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(HoursHeaderContainer)

export default HeaderHours
