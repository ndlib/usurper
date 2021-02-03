import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'

import PresenterFactory from 'components/APIPresenterFactory'
import Presenter from './presenter'

import { fetchGrouping } from 'actions/contentful/grouping'
import { mapFacet } from 'constants/facets'
import * as statuses from 'constants/APIStatuses'

const FACETS_GROUPING = 'event-facets'

export const FilterOptionsContainer = (props) => {
  const location = useLocation()

  React.useEffect(() => {
    const preview = (new URLSearchParams(location.search)).get('preview') === 'true'

    if (props.facetStatus === statuses.NOT_FETCHED) {
      props.fetchGrouping(FACETS_GROUPING, preview, 2)
    }
  }, [location, props.facetStatus, props.fetchGrouping])

  return (
    <PresenterFactory
      status={props.facetStatus}
      presenter={Presenter}
      props={{
        facets: props.facets,
        onOptionChange: props.onOptionChange,
        selectedOptions: props.selectedOptions,
      }}
    />
  )
}

export const mapStateToProps = (state) => {
  const { grouping } = state

  const facetStatus = typy(grouping, `${FACETS_GROUPING}.status`).safeString || statuses.NOT_FETCHED
  const facets = (facetStatus === statuses.SUCCESS)
    ? typy(grouping, `${FACETS_GROUPING}.data.fields.items`).safeArray.map(mapFacet)
    : []

  return {
    facetStatus,
    facets,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchGrouping }, dispatch)
}

FilterOptionsContainer.propTypes = {
  facetStatus: PropTypes.string.isRequired,
  facets: PropTypes.array,
  fetchGrouping: PropTypes.func.isRequired,
  onOptionChange: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object.isRequired,
}

const FilterOptions = connect(mapStateToProps, mapDispatchToProps)(FilterOptionsContainer)

export default FilterOptions
