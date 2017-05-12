'use strict'
import React from 'react'
import PropTypes from 'prop-types'

const SearchOption = (props) => {
  return (
    <li onClick={props.onClick}>
      <p>{props.item.title}</p>
      <small>{props.item.description}</small>
    </li>
  )
}

SearchOption.propTyeps = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}
export default SearchOption
