// Container component for a Page content type from Contentful
import { connect } from 'react-redux'
import { fetchPage } from '../../../actions/contentful'
import React from 'react'
import ContentfulPagePresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return { cfPageEntry: state.cfPageEntry }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let pageSlug = ownProps.match.params.id
  dispatch(fetchPage(pageSlug))
  return {}
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulPagePresenter)

export default ContentfulPage
