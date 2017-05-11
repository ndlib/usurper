'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import SearchOptionList from '../SearchOptionList'
import '../../../static/css/global.css'
import '../../../static/css/search.css'

const SearchBox = (props) => {
  return (
    <span>
      <label htmlFor='q'>
        <ul id='searchAction' >
          <li id='selected-search' onClick={props.onClick}>
            <p>{ props.currentSearch.title}</p>
          </li>
          <SearchOptionList {...props} />
        </ul>
      </label>
      <input name='q' />
      <button type='submit'>Search</button>
      <input className='hidden' name='site' value='library' disabled />
      <input className='hidden' name='client' value='lib_site_srch' disabled />
    </span>
  )
}

SearchBox.propTypes = {
  currentSearch: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SearchBox
