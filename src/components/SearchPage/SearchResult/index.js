import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'
import './style.css'

const SearchResult = (props) => {
  const item = props.item
  return (<div>
    <Link to={item.link}><div className='search-result-title' dangerouslySetInnerHTML={{ __html: item.htmlTitle }} />
      <p className='search-result-display-link'>{item.formattedUrl}</p>
      <p className='search-result-snippet' dangerouslySetInnerHTML={{ __html: item.htmlSnippet }} />
    </Link>
  </div>)
}

SearchResult.propTypes = {
  item: PropTypes.object.isRequired,
}

export default SearchResult
