'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { setSearchType, closeSearchBox } from '../../../../actions/search.js'

const SearchOption = (props) => {
  const onClick = () => {
    props.dispatch(setSearchType(props.item.uid))
    props.dispatch(closeSearchBox())
  }
  return (
    <li onClick={onClick}>
      <p>{props.item.title}</p>
      <small>{props.item.description}</small>
    </li>
  )
}

export default SearchOption
