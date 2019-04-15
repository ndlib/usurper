import React from 'react'
import PropTypes from 'prop-types'

const AdvancedSearchTitle = (props) => {
  let title = 'OneSearch'
  if (props.searchType === 'NDCATALOG') {
    title = 'ND Catalog'
  }
  return (
    <div id='search-type-title'>{title}</div>
  )
}

AdvancedSearchTitle.propTypes = {
  searchType: PropTypes.string,
}

export default AdvancedSearchTitle
