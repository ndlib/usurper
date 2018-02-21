import React from 'react'
import PropTypes from 'prop-types'
import SearchOption from './SearchOption'
import { searchOptions } from '../searchOptions.js'

const SearchOptionList = (props) => {
  const options = searchOptions.map(
    (item, index) => {
      return (
        <SearchOption {...props} item={item} key={index} index={index} />
      )
    }
  )
  const classes = props.search.searchBoxOpen ? 'uSearchOptionList' : 'uSearchOptionList hidden'
  return <span
    className={classes}
  >{ options }</span>
}

SearchOptionList.propTypes = {
  search: PropTypes.object.isRequired,
}
export default SearchOptionList
