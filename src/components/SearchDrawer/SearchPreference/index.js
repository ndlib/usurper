'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { searchOptions } from '../searchOptions.js'
import '../../../static/css/global.css'

class SearchPreference extends Component {
  constructor (props) {
    super(props)
    this.saveClick = this.saveClick.bind(this)
    this.forgetClick = this.forgetClick.bind(this)
    this.state = { isSaved: this.props.savedSearch != null }
  }

  saveClick () {
    localStorage.setItem('searchPreference', this.props.currentSearch)
    this.setState({ isSaved: true })
  }

  forgetClick () {
    localStorage.clear('searchPreference')
    this.setState({ isSaved: false })
  }
  render () {
    if (this.state.isSaved) {
      return (
        <div>{searchOptions[parseInt(localStorage.getItem('searchPreference'))].title} is your default search. <a onClick={this.forgetClick}>clear</a></div>
      )
    }
    return (
      <div className='set-default-search'>
        <input type='checkbox' name='sp' onClick={this.saveClick} />
        <label htmlFor='sp'>Save {searchOptions[this.props.currentSearch].title} as my default search</label>
      </div>
    )
  }
}

SearchPreference.propTypes = {
  currentSearch: PropTypes.number.isRequired,
  savedSearch: PropTypes.number
}

export default SearchPreference
