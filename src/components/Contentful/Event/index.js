import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchEvent } from '../../../actions/contentful/event'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulEventPresenter from './presenter.js'
import { formatDate, hour12, isSameDay, makeLocalTimezone } from 'shared/DateLibs.js'
import { withErrorBoundary } from '../../ErrorBoundary'

const mapStateToProps = (state) => {
  let data = state.cfEventEntry.json

  if (data) {
    const fields = data.fields

    const startDate = new Date(fields.startDate)
    const endDate = new Date(fields.endDate)

    let displayDate = formatDate(startDate)
    if (!isSameDay(startDate, endDate)) {
      displayDate += ' – ' + formatDate(endDate)
    }

    const start = makeLocalTimezone(fields.startDate)
    const end = endDate ? makeLocalTimezone(fields.endDate) : makeLocalTimezone(fields.startDate)
    const displayTime = fields.timeOverride ? fields.timeOverride : `${hour12(start)} &ndash; ${hour12(end)}`

    data = {
      ...data.fields,
      displayTime: displayTime,
      displayDate: displayDate,
    }
  }

  return {
    status: state.cfEventEntry.status,
    data: data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEvent }, dispatch)
}

export class ContentfulEventContainer extends Component {
  componentDidMount () {
    const eventSlug = this.props.match.params.id
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    this.props.fetchEvent(eventSlug, preview)
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    if (slug !== nextSlug) {
      this.props.fetchEvent(nextSlug)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulEventPresenter}
      status={this.props.status}
      props={{ entry: this.props.data }} />
  }
}

ContentfulEventContainer.propTypes = {
  fetchEvent: PropTypes.func.isRequired,
  data: PropTypes.object,
  status: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
}

const ContentfulEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulEventContainer)

export default withErrorBoundary(ContentfulEvent)
