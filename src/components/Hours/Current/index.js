import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHours } from 'actions/hours'
import CurrentHoursCollapsedPresenter from './collapsed_presenter.js'
import CurrentHoursExpandedPresenter from './expanded_presenter.js'
import makeGetHoursForServicePoint from 'selectors/hours'
import * as statuses from 'constants/APIStatuses'
import InlineContainer from '../InlineContainer'
import { withErrorBoundary } from 'components/ErrorBoundary'

// We  need a way to give each instance of a container access to its own private selector.
// this is done by creating a private instance of the conector for each component.
const makeMapStateToProps = () => {
  const getHoursForServicePoint = makeGetHoursForServicePoint()
  const mapStateToProps = (state, props) => {
    // these props are required for the inline container.
    const ret = {
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
      expanded: false,
      isOpen: this.checkOpen(props),
    }
    this.toggleExpanded = this.toggleExpanded.bind(this)
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

  toggleExpanded (e) {
    if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 13)) {
      this.setState({ expanded: !this.state.expanded })
    }
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

        const opens = new Date(hoursBlock.fromLocalDate)
        const closes = new Date(hoursBlock.toLocalDate)

        const now = new Date()
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
    let presenter = CurrentHoursCollapsedPresenter
    if (this.state.expanded) {
      presenter = CurrentHoursExpandedPresenter
    }

    return (
      <InlineContainer
        status={this.props.hoursEntry.status}
        hoursEntry={this.props.hoursEntry}
        isOpen={this.state.isOpen}
        presenter={presenter}
        toggleExpanded={this.toggleExpanded}
      >{this.props.children}</InlineContainer>)
  }
}

CurrentHoursContainer.propTypes = {
  hoursEntry: PropTypes.shape({
    status: PropTypes.string,
    today: PropTypes.shape({
      times: PropTypes.shape({
        status: PropTypes.string,
        hours: PropTypes.arrayOf(PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
          from: PropTypes.any, // eslint-disable-line react/no-unused-prop-types
          to: PropTypes.any, // eslint-disable-line react/no-unused-prop-types
          fromLocalDate: PropTypes.any, // eslint-disable-line react/no-unused-prop-types
          toLocalDate: PropTypes.any, // eslint-disable-line react/no-unused-prop-types
        })),
      }),
    }),
  }).isRequired,
  fetchHours: PropTypes.func.isRequired,
  children: PropTypes.any,
}

const CurrentHours = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CurrentHoursContainer)

export default withErrorBoundary(CurrentHours)
