import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHours } from '../../../actions/hours'
import HoursHomePagePresenter from './presenter.js'
import makeGetHoursForServicePoint from '../../../selectors/hours'
import * as statuses from '../../../constants/APIStatuses'
import InlineContainer from '../InlineContainer'

// We  need a way to give each instance of a container access to its own private selector.
// this is done by creating a private instance of the conector for each component.
const makeMapStateToProps = () => {
  const getHoursForServicePoint = makeGetHoursForServicePoint()
  const mapStateToProps = (state, props) => {
    // these props are required for the inline container.
    let ret = {
      jsonHoursApiKey: props.jsonHoursApiKey, // the key to look up hours component in the store used in the selector.
      hoursEntry: getHoursForServicePoint(state, props), // the actual hours used in the selector.
    }
    return ret
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours }, dispatch)
}

export class HomePageHoursContainer extends Component {
  componentDidMount () {
    if (this.props.hoursEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
  }

  render () {
    return (
      <InlineContainer
        status={this.props.hoursEntry.status}
        hoursEntry={this.props.hoursEntry}
        presenter={HoursHomePagePresenter} />)
  }
}

HomePageHoursContainer.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  jsonHoursApiKey: PropTypes.string.isRequired,
  fetchHours: PropTypes.func.isRequired,
}

const HomePageHours = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(HomePageHoursContainer)

export default HomePageHours
