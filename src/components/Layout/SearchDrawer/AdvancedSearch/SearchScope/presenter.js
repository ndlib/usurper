import React from 'react'
import PropTypes from 'prop-types'

const SearchScope = (props) => {
  if (props.searchType === 'NDCATALOG') {
    return (
      <div>
        <label htmlFor='exlidSearchIn'>Search Scope:</label>
        <span className='selector'>
          <select id='scopesListAdvanced' name='scp.scps' onChange={props.onChange}>
            <option value='nd_campus'>All Notre Dame Campus Libraries</option>
            <option value='NDU'>Hesburgh Libraries &amp; Branches</option>
            <option value='architecture'>Architecture Library</option>
            <option value='bic'>Business Library</option>
            <option value='cslc'>Center for the Study of Language &amp; Cultures</option>
            <option value='chemphys'>Chemistry Physics Library</option>
            <option value='ref'>Hesburgh Reference</option>
            <option value='kellog'>Kellogg Kroc Library</option>
            <option value='ndlaw'>Kresge Law Library</option>
            <option value='math'>Mathematics Library</option>
            <option value='medieval'>Medieval Institute</option>
            <option value='music'>Music</option>
            <option value='radlab'>Radiation Laboratory</option>
            <option value='spec_coll'>Rare Books &amp; Special Collections</option>
            <option value='archv'>University Archives</option>
          </select>
        </span>
      </div>
    )
  }
  return null
}

SearchScope.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchType: PropTypes.string,
}

export default SearchScope
