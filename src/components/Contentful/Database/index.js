// Container component for a Floor content type from Contentful
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchEntry } from '../../../actions/contentful/entry'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulDatabasePresenter from './presenter.js'
import * as statuses from '../../../constants/APIStatuses'

const mapStateToProps = (state, thisProps) => {
  const databaseId = thisProps.match.params.id
  return {
    databaseId: databaseId,
    cfDatabaseEntry: state.cfEntry[databaseId] ? state.cfEntry[databaseId] : { state: statuses.NOT_FETCHED },
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEntry }, dispatch)
}

export class ContentfulDatabaseContainer extends Component {
  componentDidMount () {
    let databaseId = this.props.match.params.id
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.cfDatabaseEntry.state === statuses.NOT_FETCHED) {
      this.props.fetchEntry(databaseId, null, preview)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulDatabasePresenter}
      status={this.props.cfDatabaseEntry.status}
      props={{ cfDatabaseEntry: this.props.cfDatabaseEntry.json }} />
  }
}

ContentfulDatabaseContainer.propTypes = {
  fetchEntry: PropTypes.func.isRequired,
  cfDatabaseEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const ContentfulFloor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulDatabaseContainer)

export default ContentfulFloor
