'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setSearchType } from '../../../../actions/search.js'
import { searchOptions } from '../../searchOptions.js'

class SearchOption extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.props.dispatch(setSearchType(this.props.index))
  }

  render () {
    return (
      <li onClick={this.onClick}>
        <p>{searchOptions[this.props.index].title}</p>
        <small>{searchOptions[this.props.index].description}</small>
      </li>
    )
  }
}

SearchOption.propTypes = {
  index: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

SearchOption.defaultProps = {
  index: 0
}
export default SearchOption
