'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import SearchOptionList from '../SearchOptionList'
import '../../../static/css/global.css'
import '../../../static/css/search.css'

const SearchBox = (props) => {
  if (props.visible) {
    return (
      <span className='uSearchBox'>
        <label>
          <ul id='searchAction' >
            <li
              id='selected-search'
              onClick={props.onClick}
              onKeyDown={props.onKeyDown}
              tabIndex='0'>
              <span className="screen-reader-only" id='label-for-current-search-selector'>Select a search option. Your current search option is</span>
              <p className='current-search' aria-labelledby='label-for-current-search-selector'>{ props.currentSearch.title}</p>
            </li>
            <SearchOptionList {...props} />
          </ul>
        </label>
        <div className='input'>
          <span className="screen-reader-only" id='label-for-basic-search-field'>Search in { props.currentSearch.title }</span>
          <input id='basic-search-field' role='searchbox' name='q' onChange={props.onChange} aria-labelledby="label-for-basic-search-field"/>
        </div>
        <button onClick={props.onSubmit}>Search</button>
      </span>
    )
  }
  return null
}

SearchBox.propTypes = {
  currentSearch: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SearchBox
