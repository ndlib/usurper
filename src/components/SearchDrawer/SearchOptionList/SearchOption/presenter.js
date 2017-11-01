'use strict'
import React from 'react'
import PropTypes from 'prop-types'

const SearchOption = (props) => {
  return (
    <li
      id={`uSearchOption_${props.index}`}
      className='uSearchOption'
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      tabIndex='0'
      role='option'
      value={props.index}>
      <p>{props.item.title}</p>
      <small>{props.item.description}</small>
    </li>
  )
}

SearchOption.PropTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}
export default SearchOption
