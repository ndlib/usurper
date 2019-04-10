import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHours } from '../../../../actions/hours'
import CurrentHoursPresenter from './presenter.js'
import makeGetHoursForServicePoint from '../../../../selectors/hours'
import * as statuses from '../../../../constants/APIStatuses'
import InlineContainer from '../../../Hours/InlineContainer'

// We  need a way to give each instance of a container access to its own private selector.
// this is done by creating a private instance of the conector for each component.
const makeMapStateToProps = () => {
  const getHoursForServicePoint = makeGetHoursForServicePoint()
  const mapStateToProps = (state, props) => {
    // these props are required for the inline container.
    let ret = {
      hoursEntry: getHoursForServicePoint(state, props), // the actual hours used in the selector.
    }
    return ret
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours }, dispatch)
}

export class CurrentHoursContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: this.checkOpen(props),
    }
  }

  componentDidMount () {
    // check current time every second to update color
    const intervalId = setInterval(this.tick.bind(this), 1000)
    this.setState({ intervalId: intervalId })
    if (this.props.hoursEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
  }
  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }
  componentWillReceiveProps (newProps) {
    this.setState({ isOpen: this.checkOpen(newProps) })
  }

  checkOpen (props) {
    try {
      const entry = props.hoursEntry
      if (entry.today.times.status === 'closed') {
        return false
      }

      if (entry.today.times.status === '24hours') {
        return true
      }

      const currentOpenBlocks = entry.today.times.hours.filter(hoursBlock => {
        if (hoursBlock.from === hoursBlock.to) {
          return false
        }

        let opens = new Date(hoursBlock.fromLocalDate)
        let closes = new Date(hoursBlock.toLocalDate)

        let now = new Date()
        return (opens <= now && now <= closes)
      })
      return (currentOpenBlocks.length > 0)
    } catch (e) {
      return false
    }
  }

  tick () {
    this.setState({ isOpen: this.checkOpen(this.props) })
  }

  render () {
    let presenter = CurrentHoursPresenter

    return (
      <InlineContainer
        status={this.props.hoursEntry.status}
        hoursEntry={this.props.hoursEntry}
        isOpen={this.state.isOpen}
        presenter={presenter}
      >{this.props.children}</InlineContainer>)
  }
}

CurrentHoursContainer.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  fetchHours: PropTypes.func.isRequired,
  children: PropTypes.any,
}

const CurrentHours = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CurrentHoursContainer)

export default CurrentHours
