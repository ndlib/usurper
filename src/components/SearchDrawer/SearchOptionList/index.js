'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchOption from './SearchOption'
import { searchOptions } from '../searchOptions.js'

class SearchOptionList extends Component {
  constructor (props) {
    super(props)
    this.options = []
    for (let i = 0; i < searchOptions.length; i++) {
      this.options.push(
        <SearchOption {...this.props} index={i} key={i} />
      )
    }
  }

  render () {
    if (this.props.isOpen) {
      return <span>{ this.options }</span>
    }
    return null
  }
}

SearchOptionList.propTypes = {
  isOpen: PropTypes.bool
}

SearchOptionList.defaultProps = {
  isOpen: false
}
export default SearchOptionList
