import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchEvent } from 'actions/contentful/event'
import PresenterFactory from 'components/APIPresenterFactory'
import ContentfulEventPresenter from './presenter.js'
import { formatDate, hour12, isSameDay, makeLocalTimezone } from 'shared/DateLibs.js'
import { withErrorBoundary } from 'components/ErrorBoundary'

export class ContentfulEventContainer extends Component {
  componentDidMount () {
    const eventSlug = this.props.match.params.id
    this.props.fetchEvent(eventSlug, this.props.preview)
  }

  componentDidUpdate (prevProps) {
    const oldSlug = prevProps.match.params.id
    const newSlug = this.props.match.params.id
    if (newSlug !== oldSlug) {
      this.props.fetchEvent(newSlug, this.props.preview)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulEventPresenter}
      status={this.props.status}
      props={{ entry: this.props.data }} />
  }
}

const mapStateToProps = (state, ownProps) => {
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
    const displayTime = fields.timeOverride ? fields.timeOverride : `${hour12(start)} – ${hour12(end)}`

    data = {
      ...data.fields,
      displayTime: displayTime,
      displayDate: displayDate,
    }
  }

  return {
    status: state.cfEventEntry.status,
    data: data,
    preview: (new URLSearchParams(ownProps.location.search)).get('preview') === 'true',
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEvent }, dispatch)
}

ContentfulEventContainer.propTypes = {
  fetchEvent: PropTypes.func.isRequired,
  data: PropTypes.object,
  status: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  preview: PropTypes.bool,
}

const ContentfulEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulEventContainer)

export default withErrorBoundary(ContentfulEvent)
