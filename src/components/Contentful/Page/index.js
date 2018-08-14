// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage, clearPage } from '../../../actions/contentful/page'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulPagePresenter from './presenter.js'
import * as statuses from '../../../constants/APIStatuses'

const mapStateToProps = (state) => {
  return { cfPageEntry: state.cfPageEntry }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPage, clearPage }, dispatch)
}

export class ContentfulPageContainer extends Component {
  componentDidMount () {
    const pageSlug = this.props.match.params.id
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    this.props.fetchPage(pageSlug, preview, false)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.cfPageEntry.status === statuses.UNAUTHORIZED) {
      this.props.clearPage()
      this.props.history.replace('/secure/' + nextProps.match.params.id + nextProps.location.search)
    }

    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    if (slug !== nextSlug) {
      this.props.fetchPage(nextSlug)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulPagePresenter}
      status={this.props.cfPageEntry.status}
      props={{ cfPageEntry: this.props.cfPageEntry.json }} />
  }
}

ContentfulPageContainer.propTypes = {
  fetchPage: PropTypes.func.isRequired,
  cfPageEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulPageContainer)

export default ContentfulPage
