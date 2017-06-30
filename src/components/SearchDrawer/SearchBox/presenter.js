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
        <label htmlFor='basic-search-field'>
          <ul id='searchAction' >
            <li
              id='selected-search'
              onClick={props.onClick}
              onKeyDown={props.onKeyDown}
              tabIndex='0'>
              <p className='current-search'>{ props.currentSearch.title}</p>
            </li>
            <SearchOptionList {...props} />
          </ul>
        </label>
        <div className='input'><input id='basic-search-field' role='searchbox' name='q' onChange={props.onChange} /></div>
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
