// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage } from 'actions/contentful/page'
import PresenterFactory from 'components/APIPresenterFactory'
import ColumnPagePresenter from './presenter.js'
import { NOT_FETCHED } from 'constants/APIStatuses'
import { withErrorBoundary } from 'components/ErrorBoundary'

export class ContentfulColumnPageContainer extends Component {
  componentDidMount () {
    const pageSlug = this.props.match.params[0]
    this.props.fetchPage(pageSlug, this.props.preview, false, 'columnContainer', 4)
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params[0]
    const nextSlug = nextProps.match.params[0]
    if (!slug || slug !== nextSlug) {
      this.props.fetchPage(nextSlug, nextProps.preview, false, 'columnContainer', 4)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ColumnPagePresenter}
      status={this.props.cfPageEntry.status}
      props={{ cfPageEntry: this.props.cfPageEntry.json }} />
  }
}

const mapStateToProps = (state, thisProps) => {
  const slug = thisProps.match.params[0]
  let page = state.cfPageEntry
  if (page && page.json && page.json.fields.slug !== slug) {
    page = { status: NOT_FETCHED }
  }

  return {
    cfPageEntry: page,
    preview: (new URLSearchParams(thisProps.location.search)).get('preview') === 'true',
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPage }, dispatch)
}

ContentfulColumnPageContainer.propTypes = {
  fetchPage: PropTypes.func.isRequired,
  cfPageEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  preview: PropTypes.bool,
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulColumnPageContainer)

export default withErrorBoundary(ContentfulPage)
