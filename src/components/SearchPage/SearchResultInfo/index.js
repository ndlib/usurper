
import React from 'react'
import PropTypes from 'prop-types'

const SearchResultInfo = (props) => {
  if (props.searchInformation && props.searchInformation.totalResults > 0) {
    return (
      <p className='search-result-info'>About {props.searchInformation.totalResults} results ({props.searchInformation.formattedSearchTime}  seconds)</p>
    )
  }
  return null
}

SearchResultInfo.propTypes = {
  searchInformation: PropTypes.object.isRequired,
}

export default SearchResultInfo
