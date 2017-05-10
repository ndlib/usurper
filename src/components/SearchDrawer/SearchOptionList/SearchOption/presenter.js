'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SET_SEARCH, setSearchType } from '../../../../actions/search.js'
import { searchOptions } from '../../searchOptions.js'

class SearchOption extends Component {
  constructor (props) {
    super(props)
    this.setSearch = this.setSearch.bind(this)
  }

  setSearch (event) {
    //console.log('clicked - searchType: ', this.props.index)
    setSearchType(this.props.index)
  }

  render () {
    return (
      <li onClick={this.setSearch}>
        <p>{searchOptions[this.props.index].title}</p>
        <small>{searchOptions[this.props.index].description}</small>
      </li>
    )
  }
}

SearchOption.propTypes = {
  index: PropTypes.number
}

SearchOption.defaultProps = {
  index: 0
}
export default SearchOption
