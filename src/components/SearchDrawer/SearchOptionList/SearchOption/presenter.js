'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { setSearchType, closeSearchBox } from '../../../../actions/search.js'

const SearchOption = ({ item, dispatch }) => {
  const onClick = () => {
    dispatch(setSearchType(item.uid))
    dispatch(closeSearchBox())
  }
  return (
    <li onClick={onClick}>
      <p>{item.title}</p>
      <small>{item.description}</small>
    </li>
  )
}

SearchOption.propTypes = {
  item: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}
SearchOption.defaultProps = {
  item: {}
}
export default SearchOption
