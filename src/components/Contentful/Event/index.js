import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchEvent } from 'actions/contentful/event'
import PresenterFactory from 'components/APIPresenterFactory'
import ContentfulEventPresenter from './presenter.js'
import { withErrorBoundary } from 'components/ErrorBoundary'

export class ContentfulEventContainer extends Component {
  componentDidMount () {
    const eventSlug = this.props.match.params.id
    const recurrenceDate = this.props.match.params.date

    if (!this.props.data || this.props.data.slug !== eventSlug || this.props.data.recurrenceDate !== recurrenceDate) {
      this.props.fetchEvent(eventSlug, this.props.preview, recurrenceDate)
    }
  }

  componentDidUpdate (prevProps) {
    const oldSlug = prevProps.match.params.id
    const newSlug = this.props.match.params.id
    const oldDate = prevProps.match.params.date
    const newDate = this.props.match.params.date
    if (newSlug !== oldSlug || newDate !== oldDate) {
      this.props.fetchEvent(newSlug, this.props.preview, newDate)
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
  return {
    status: state.cfEventEntry.status,
    data: state.cfEventEntry.json,
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

export const ContentfulEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulEventContainer)

export default withErrorBoundary(ContentfulEvent)
