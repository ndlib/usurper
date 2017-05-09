'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import SearchOptionList from '../SearchOptionList'
import { searchOptions } from '../searchOptions.js'
import { openSearchBox } from '../../../actions/search.js'
import '../../../static/css/global.css'
import '../../../static/css/search.css'

const SearchBox = ({ currentSearch, dispatch, search }) => {
  const onClick = () => {
    dispatch(openSearchBox())
  }
  return (
    <span>
      <label htmlFor='q'>
        <ul id='searchAction' >
          <li id='selected-search' onClick={onClick}>
            <p>{ searchOptions.find(op => op.uid === currentSearch).title}</p>
          </li>
          <SearchOptionList search={search} dispatch={dispatch} />
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
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
}
export default SearchBox
