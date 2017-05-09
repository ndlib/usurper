'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { searchOptions } from '../searchOptions.js'
import { saveSearchPreference, clearSearchPreference } from '../../../actions/search.js'
import '../../../static/css/global.css'

const SearchPreference = ({ currentSearch, search, dispatch }) => {
  const saveClick = () => {
    dispatch(saveSearchPreference(currentSearch))
  }

  const forgetClick = () => {
    dispatch(clearSearchPreference())
  }

  const HasPref = () => {
    return (
      <div>{
        searchOptions.find(op => op.uid ===
          search.pref
        ).title
      } is your default search. <a onClick={forgetClick}>clear</a></div>
    )
  }

  const NoPref = () => {
    return (
      <div className='set-default-search'>
        <input type='checkbox' name='sp' onClick={saveClick} />
        <label htmlFor='sp'>Save {searchOptions.find(op => op.uid === currentSearch).title} as my default search</label>
      </div>
    )
  }

  if (search.hasPref) {
    return (<HasPref />)
  }
  return (<NoPref />)
}

SearchPreference.propTypes = {
  currentSearch: PropTypes.string.isRequired,
  search: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default SearchPreference
