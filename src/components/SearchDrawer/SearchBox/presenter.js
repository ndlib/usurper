'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import SearchOptionList from '../SearchOptionList'
import { searchOptions } from '../searchOptions.js'
import '../../../static/css/global.css'
import '../../../static/css/search.css'

const SearchBox = (props) => {
  return (
    <span>
      <label htmlFor='q'>
        <ul id='searchAction' >
          <li id='selected-search' onClick={props.onClick}>
            <p>{ searchOptions.find(op => op.uid === props.currentSearch).title}</p>
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
  currentSearch: PropTypes.string.isRequired,
}

export default SearchBox
