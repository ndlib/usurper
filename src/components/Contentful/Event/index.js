import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchEvent } from '../../../actions/contentful/event'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulEventPresenter from './presenter.js'
import * as statuses from '../../../constants/APIStatuses'

const mapStateToProps = (state) => {
  return { entry: state.cfEventEntry }
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
    console.log(this.props.entry)
    return <PresenterFactory
      presenter={ContentfulEventPresenter}
      status={this.props.entry.status}
      props={{ entry: this.props.entry.json }} />
  }
}

ContentfulEventContainer.propTypes = {
  fetchEvent: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const ContentfulEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulEventContainer)

export default ContentfulEvent
