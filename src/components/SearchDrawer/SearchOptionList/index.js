'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchOption from './SearchOption'
import { searchOptions } from '../searchOptions.js'

const SearchOptionList = ({ search, dispatch }) => {
  const options = searchOptions.map(
    (item, index) => {
      return (
        <SearchOption dispatch={dispatch} item={item} key={index} />
      )
    }
  )
  return <span>{ options }</span>
}

const Presenter = ({ search, dispatch }) => {
  if (search.searchBoxOpen) {
    return <SearchOptionList search={search} dispatch={dispatch} />
  }
  return null
}

SearchOptionList.propTypes = {
  search: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Presenter
