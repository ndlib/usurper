'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { setSearchType } from '../../../../actions/search.js'
import { searchOptions } from '../../searchOptions.js'

const SearchOption = ({ index, dispatch }) => {
  const onClick = () => {
    dispatch(setSearchType(index))
  }
  return (
    <li onClick={onClick}>
      <p>{searchOptions[index].title}</p>
      <small>{searchOptions[index].description}</small>
    </li>
  )
}

SearchOption.propTypes = {
  index: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}
SearchOption.defaultProps = {
  index: 0
}
export default SearchOption
