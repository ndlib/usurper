// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage } from '../../../actions/contentful/page'
import PresenterFactory from '../../APIPresenterFactory'
import ColumnPagePresenter from './presenter.js'
import { NOT_FETCHED } from '../../../constants/APIStatuses'

const mapStateToProps = (state, thisProps) => {
  const slug = thisProps.match.params[0]
  let page = state.cfPageEntry
  if (page && page.json && page.json.fields.slug !== slug) {
    page = { status: NOT_FETCHED }
  }

  return { cfPageEntry: page }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPage }, dispatch)
}

export class ContentfulColumnPageContainer extends Component {
  componentDidMount () {
    const pageSlug = this.props.match.params[0]
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    this.props.fetchPage(pageSlug, preview, false, 'columnContainer')
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params[0]
    const nextSlug = nextProps.match.params[0]
    console.log(slug, nextSlug)
    if (!slug || slug !== nextSlug) {
      this.props.fetchPage(nextSlug, false, false, 'columnContainer')
    }
  }

  render () {
    return <PresenterFactory
      presenter={ColumnPagePresenter}
      status={this.props.cfPageEntry.status}
      props={{ cfPageEntry: this.props.cfPageEntry.json }} />
  }
}

ContentfulColumnPageContainer.propTypes = {
  fetchPage: PropTypes.func.isRequired,
  cfPageEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulColumnPageContainer)

export default ContentfulPage
