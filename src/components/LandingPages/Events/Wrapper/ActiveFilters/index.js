import React from 'react'
import PropTypes from 'prop-types'

import Tags from 'components/Interactive/Tags'
import * as helper from 'constants/HelperFunctions'

const ActiveFilters = (props) => {
  const sortedAudience = helper.sortList(props.audienceFilter)
  const audienceTags = () => {
    const clickHandler = (tag) => {
      props.onRemove('audience', tag.key)
    }
    return sortedAudience.map(audience => ({
      key: audience,
      value: audience,
      onClick: clickHandler,
    }))
  }

  const sortedTypes = helper.sortList(props.typeFilter)
  const typeTags = () => {
    const clickHandler = (tag) => {
      props.onRemove('type', tag.key)
    }
    return sortedTypes.map(audience => ({
      key: audience,
      value: audience,
      onClick: clickHandler,
    }))
  }

  return (
    <div className='activeFilters'>
      <span className='activeFiltersLabel'>Active Filters:</span>
      <Tags groups={[audienceTags(), typeTags()]} inline hasRemove />
    </div>
  )
}

ActiveFilters.propTypes = {
  audienceFilter: PropTypes.array.isRequired,
  typeFilter: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default ActiveFilters
