// Container component for a Floor content type from Contentful
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchEntry } from '../../../actions/contentful/entry'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulDatabasePresenter from './presenter.js'

const mapStateToProps = (state) => {
  return { cfDatabaseEntry: state.cfEntry }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEntry }, dispatch)
}

export class ContentfulFloorContainer extends Component {
  componentDidMount () {
    let databaseId = this.props.match.params.id
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    this.props.fetchEntry(databaseId, null, preview)
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulDatabasePresenter}
      status={this.props.cfDatabaseEntry.status}
      props={{ cfDatabaseEntry: this.props.cfDatabaseEntry.json }} />
  }
}

ContentfulFloorContainer.propTypes = {
  fetchEntry: PropTypes.func.isRequired,
  cfDatabaseEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const ContentfulFloor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulFloorContainer)

export default ContentfulFloor
