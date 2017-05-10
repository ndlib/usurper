// Container component for a Floor content type from Contentful
import { connect } from 'react-redux'
import { fetchFloor } from '../../../actions/contentful/floor'
import React from 'react'
import ContentfulFloorPresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return { cfFloorEntry: state.cfFloorEntry }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let slug = ownProps.match.params.id
  dispatch(fetchFloor(slug))
  return {}
}

const ContentfulFloor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulFloorPresenter)

export default ContentfulFloor
