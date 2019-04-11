import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'

const SearchPreference = (props) => {
  if (props.search.hasPref) {
    return (
      <div
        className='has-default-search'
        id='save-preference'
        tabIndex='0'
        onKeyDown={props.forgetClick}
        onClick={props.forgetClick}
      >
        {props.search.pref.title} is your default search. <a>CLEAR</a>
      </div>
    )
  }
  return (
    <div
      className='set-default-search'
      id='save-preference'
      tabIndex='0'
      onKeyDown={props.saveClick}
      onClick={props.saveClick}>
      <a>SAVE</a> {
        props.currentSearch.title
      } as my default search.
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
