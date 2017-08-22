import React from 'react'

const AdvancedSearchTitle = (props) => {
  let title = 'OneSearch'
  if (props.searchType === 'NDCATALOG') {
    title = 'ND Catalog'
  }
  return (
    <div id='search-type-title'>{title}</div>
  )
}

export default AdvancedSearchTitle
