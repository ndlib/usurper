import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'
import QueryString from 'querystring'
import typy from 'typy'

const SearchPager = (props) => {
  const queries = typy(props.queries).safeObjectOrEmpty
  const pagerQuery = QueryString.parse(props.pagerQuery.replace(/.*[?]/, ''))
  const qs = `/search?q=${pagerQuery.q}`

  const resultCount = typy(queries, 'request[0].totalResults').safeNumber
  const pageCount = 10
  const startIndex = typy(queries, 'request[0].startIndex').safeNumber || props.start || 1
  const currentPage = Math.ceil(startIndex / pageCount)
  const length = resultCount > 0 ? Math.ceil(resultCount / pageCount) : currentPage

  // Don't render page links if no results AND on first page.
  // This allows us to show previous page links if the user ends up on a page past the last record.
  if (currentPage === 1 && !resultCount) {
    return null
  }

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
  const previousStartIndex = queries.previousPage ? queries.previousPage[0].startIndex : (startIndex - pageCount)
  if (previousStartIndex > 0) {
    pager.push(
      <span key='0'>
        <Link to={qs + '&start=' + previousStartIndex}>Previous</Link> </span>
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
    <div className={resultCount === 0 ? 'searchPagerSpace' : ''}>{pager}</div>
  )
}

SearchPager.propTypes = {
  queries: PropTypes.object,
  pagerQuery: PropTypes.string,
  start: PropTypes.number,
}

export default SearchPager
