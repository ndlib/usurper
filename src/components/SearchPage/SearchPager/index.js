import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'
import QueryString from 'querystring'

const SearchPager = (props) => {
  const queries = props.queries
  const pagerQuery = QueryString.parse(props.pagerQuery.replace(/.*[?]/, ''))
  const qs = `/search?q=${pagerQuery.q}`

  if (queries && queries.request && queries.request[0].totalResults) {
    const resultCount = queries.request[0].totalResults
    const pageCount = 10
    const startIndex = queries.request[0].startIndex
    const currentPage = Math.ceil(startIndex / pageCount)
    const length = Math.ceil(resultCount / pageCount)

    let lastPage = currentPage + 4
    if (lastPage >= length) {
      lastPage = currentPage + (length - currentPage)
    }

    let startPage = 1
    if (currentPage > 2) {
      startPage = currentPage - 2
    }

    let loopEnd = startIndex + 40
    if (loopEnd > resultCount) {
      loopEnd = resultCount
    }

    const pager = []
    if (queries.previousPage) {
      pager.push(
        <span key='0'>
          <Link to={qs + '&start=' + queries.previousPage[0].startIndex}>Previous</Link> </span>
      )
    }

    for (let i = startPage; i <= lastPage; i++) {
      if (i === currentPage) {
        pager.push(<span key={i}>{i} </span>)
      } else {
        pager.push(<span key={i}><Link to={qs + '&start=' + ((i - 1) * pageCount + 1)}>{i}</Link> </span>)
      }
    }

    if (queries.nextPage) {
      pager.push(
        <span key={length + 1}>
          <Link to={qs + '&start=' + queries.nextPage[0].startIndex}>Next</Link>
        </span>
      )
    }

    return (
      <div>{pager}</div>
    )
  }
  return null
}

SearchPager.propTypes = {
  queries: PropTypes.object,
  pagerQuery: PropTypes.string,
}

export default SearchPager
