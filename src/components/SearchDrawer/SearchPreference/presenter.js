'use strict'
import React from 'react'
import { searchOptions } from '../searchOptions.js'
import '../../../static/css/global.css'

const SearchPreference = (props) => {
  const HasPref = () => {
    return (
      <div>{
        searchOptions.find(op => op.uid ===
          props.search.pref
        ).title
      } is your default search. <a onClick={props.forgetClick}>clear</a></div>
    )
  }

  const NoPref = () => {
    return (
      <div className='set-default-search'>
        <input type='checkbox' name='sp' onClick={props.saveClick} />
        <label htmlFor='sp'>Save {searchOptions.find(op => op.uid === props.currentSearch).title} as my default search</label>
      </div>
    )
  }

  if (props.search.hasPref) {
    return (<HasPref />)
  }
  return (<NoPref />)
}

export default SearchPreference
