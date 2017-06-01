'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'

const SearchPreference = (props) => {
  const HasPref = () => {
    return (
      <div className='has-default-search'>{
        props.search.pref.title
      } is your default search. <a onClick={props.forgetClick}>CLEAR</a></div>
    )
  }

  const NoPref = () => {
    return (
      <div className='set-default-search'>
        <input type='checkbox' name='sp' onClick={props.saveClick} />
        <label htmlFor='sp'>Save {
          props.currentSearch.title
        } as my default search</label>
      </div>
    )
  }

  if (props.search.hasPref) {
    return (<HasPref />)
  }
  return (<NoPref />)
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
