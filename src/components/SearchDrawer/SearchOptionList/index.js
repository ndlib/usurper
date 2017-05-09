'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchOption from './SearchOption'
import { searchOptions } from '../searchOptions.js'

const SearchOptionList = (props) => {
  const options = searchOptions.map(
    (item, index) => {
      return (
        <SearchOption {...props} item={item} key={index} />
      )
    }
  )
  return <span>{ options }</span>
}

const Presenter = (props) => {
  if (props.search.searchBoxOpen) {
    return <SearchOptionList {...props} />
  }
  return null
}

export default Presenter
