import React from 'react'
import PropTypes from 'prop-types'
import SearchResult from '../SearchResult'
import ErrorBoundary, { withErrorBoundary } from '../../ErrorBoundary'

const SearchResults = (props) => {
  if (props.items && props.items.length > 0) {
    let items = props.items.map((item, index) => {
      return (
        <ErrorBoundary key={index}>
          <SearchResult item={item} />
        </ErrorBoundary>
      )
    })
    return (<div>{items}</div>)
  }
  return (<div>No Results Found</div>)
}

SearchResults.propTypes = {
  items: PropTypes.array,
}

export default withErrorBoundary(SearchResults)
