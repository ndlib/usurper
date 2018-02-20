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
  return <span
    className='uSearchOptionList'
    style={{ display: props.search.searchBoxOpen ? 'block' : 'none' }}
  >{ options }</span>
}

SearchOptionList.propTypes = {
  search: PropTypes.object.isRequired,
}
export default SearchOptionList
