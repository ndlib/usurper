'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import SearchOption from './SearchOption'
import { searchOptions } from '../searchOptions.js'

const SearchOptionList = (props) => {
  if (props.search.searchBoxOpen) {
    const options = searchOptions.map(
      (item, index) => {
        return (
          <SearchOption {...props} item={item} key={index} index={index} />
        )
      }
    )
    return <span className='uSearchOptionList'>{ options }</span>
  }
  return null
}

export default SearchOptionList
