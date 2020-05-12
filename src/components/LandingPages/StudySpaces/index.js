import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'

import { fetchAllSpaces } from 'actions/contentful/allSpaces'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export class SpacesContainer extends Component {
  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.allSpacesStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllSpaces(preview)
    }
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state) => {
  const { allSpaces } = state
  const studySpaces = typy(allSpaces.json).safeArray.filter(space => space.fields.type.includes('Study Space'))

  return {
    spaces: helper.sortList(studySpaces, 'fields.title', 'asc'),
    allSpacesStatus: allSpaces.status,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllSpaces }, dispatch)
}

SpacesContainer.propTypes = {
  spaces: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.shape({
      type: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  })).isRequired,
  allSpacesStatus: PropTypes.string.isRequired,
  fetchAllSpaces: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }).isRequired,
}

const Spaces = connect(mapStateToProps, mapDispatchToProps)(SpacesContainer)

export default Spaces
