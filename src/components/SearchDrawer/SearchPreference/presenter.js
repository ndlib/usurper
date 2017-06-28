'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'

const SearchPreference = (props) => {
  if (props.search.hasPref) {
    return (
      <div
        className='has-default-search'
        id='save-preference'
        onClick={props.forgetClick}>{
        props.search.pref.title
      } is your default search. <a >CLEAR</a></div>
    )
  }
  return (
    <div
      className='set-default-search'

      id='save-preference'>
      <input type='checkbox' name='sp' onClick={props.saveClick} />
      <label htmlFor='sp' onClick={props.saveClick}>Save {
        props.currentSearch.title
      } as my default search</label>
    </div>
  )
}

SearchPreference.propTypes = {
  currentSearch: PropTypes.object.isRequired,
  saveClick: PropTypes.func.isRequired,
  forgetClick: PropTypes.func.isRequired,
  search: PropTypes.shape({
    hasPref: PropTypes.bool.isRequired,
    pref: PropTypes.object,
  }).isRequired,
}

export default SearchPreference
