import React from 'react'
import PropTypes from 'prop-types'
import SearchResult from '../SearchResult'

const SearchResults = (props) => {
  if (props.items && props.items.length > 0) {
    let items = props.items.map((item, index) => {
      return (<SearchResult key={index} item={item} />)
    })
    return (<div>{items}</div>)
  }
  return (<div>No Results Found</div>)
}

export default SearchResults
