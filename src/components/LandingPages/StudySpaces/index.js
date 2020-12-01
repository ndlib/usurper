import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'

import { fetchAllSpaces } from 'actions/contentful/allSpaces'
import { fetchGrouping } from 'actions/contentful/grouping'
import { mapFacet } from 'constants/facets'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

const FACETS_GROUPING = 'study-space-facets'

export class SpacesContainer extends Component {
  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.allSpacesStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllSpaces(preview)
    }
    if (this.props.facetStatus === statuses.NOT_FETCHED) {
      this.props.fetchGrouping(FACETS_GROUPING, preview, 2)
    }
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state) => {
  const { allSpaces, grouping } = state

  const studySpaces = typy(allSpaces.json).safeArray.filter(space => space.fields.type.includes('Study Space'))

  const facetStatus = typy(grouping, `${FACETS_GROUPING}.status`).safeString || statuses.NOT_FETCHED
  const combinedStatus = helper.reduceStatuses([
    allSpaces.status,
    facetStatus,
  ])

  const facets = (facetStatus === statuses.SUCCESS)
    ? typy(grouping, `${FACETS_GROUPING}.data.fields.items`).safeArray.map(mapFacet)
    : []

  return {
    spaces: helper.sortList(studySpaces, 'fields.title', 'asc'),
    allSpacesStatus: allSpaces.status,
    facetStatus,
    facets,
    combinedStatus,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllSpaces, fetchGrouping }, dispatch)
}

SpacesContainer.propTypes = {
  spaces: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.shape({
      type: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  })).isRequired,
  allSpacesStatus: PropTypes.string.isRequired,
  fetchAllSpaces: PropTypes.func.isRequired,
  fetchGrouping: PropTypes.func.isRequired,
  facetStatus: PropTypes.string.isRequired,
  facets: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }).isRequired,
}

const Spaces = connect(mapStateToProps, mapDispatchToProps)(SpacesContainer)

export default Spaces
