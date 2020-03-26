// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage, clearPage } from 'actions/contentful/page'
import PresenterFactory from 'components/APIPresenterFactory'
import ContentfulPagePresenter from './presenter.js'
import * as statuses from 'constants/APIStatuses'
import { withErrorBoundary } from 'components/ErrorBoundary'

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
      status={this.props.cfPageEntry.slug === this.props.match.params.id ? this.props.cfPageEntry.status : statuses.NOT_FETCHED}
      props={{ cfPageEntry: this.props.cfPageEntry.json, history: this.props.history }} />
  }
}

ContentfulPageContainer.propTypes = {
  fetchPage: PropTypes.func.isRequired,
  clearPage: PropTypes.func.isRequired,
  cfPageEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }),
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulPageContainer)

export default withErrorBoundary(ContentfulPage)
