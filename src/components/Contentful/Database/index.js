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
  const entry = state.cfEntry[databaseId] ? state.cfEntry[databaseId] : { status: statuses.NOT_FETCHED }

  const fieldsAndTitle = {
    'access': 'Access',
    'includes': 'Includes',
    'platform': 'Platform',
    'publisher': 'Publisher',
    'provider': 'Provider',
  }

  let fieldData = {}
  if (entry.status === statuses.SUCCESS) {
    for (let field in fieldsAndTitle) {
      if (entry.json.fields[field]) {
        fieldData[field] = {
          title: fieldsAndTitle[field],
          data: entry.json.fields[field],
        }
        // Also include accessNotes from contentful in the access field on the site
        if (field === 'access' && entry.json.fields['accessNotes']) {
          fieldData[field].data += '<br />' + entry.json.fields['accessNotes']
        }
      } else if (field === 'access' && entry.json.fields['accessNotes']) {
        // If there is no "access" field but there is "accessNotes", use that instead
        fieldData[field] = {
          title: fieldsAndTitle[field],
          data: entry.json.fields['accessNotes'],
        }
      }
    }
  }

  return {
    databaseId: databaseId,
    cfDatabaseEntry: entry,
    fieldData: fieldData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEntry }, dispatch)
}

export class ContentfulDatabaseContainer extends Component {
  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.cfDatabaseEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchEntry(this.props.databaseId, null, preview)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulDatabasePresenter}
      status={this.props.cfDatabaseEntry.status}
      props={{ cfDatabaseEntry: this.props.cfDatabaseEntry.json, fieldData: this.props.fieldData }} />
  }
}

ContentfulDatabaseContainer.propTypes = {
  fetchEntry: PropTypes.func.isRequired,
  cfDatabaseEntry: PropTypes.object.isRequired,
  fieldData: PropTypes.object,
  match: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  databaseId: PropTypes.string.isRequired,
}

const ContentfulFloor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulDatabaseContainer)

export default ContentfulFloor
