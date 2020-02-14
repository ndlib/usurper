import React from 'react'
import PropTypes from 'prop-types'

import Tags from 'components/Interactive/Tags'
import * as helper from 'constants/HelperFunctions'

const ActiveFilters = (props) => {
  const tagGroups = []
  Object.keys(props.values).forEach(key => {
    const sortedList = helper.sortList(props.values[key])
    const tags = () => {
      const clickHandler = (tag) => {
        props.onRemove(key, tag.key)
      }
      return sortedList.map(val => ({
        key: val,
        value: val,
        onClick: clickHandler,
      }))
    }
    tagGroups.push(tags())
  })

  return (
    <div className='activeFilters'>
      <span className='activeFiltersLabel'>Active Filters:</span>
      <Tags groups={tagGroups} inline hasRemove />
    </div>
  )
}

ActiveFilters.propTypes = {
  values: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default ActiveFilters
