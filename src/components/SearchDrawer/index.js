'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { searchOptions } from './searchOptions.js'
import SearchOptionList from './SearchOptionList'
import SearchPreference from './SearchPreference'

import '../../static/css/global.css'
import '../../static/css/search.css'

class SearchDrawer extends Component {
  constructor (props) {
    super(props)
    let pref = localStorage.getItem('searchPreference')
    this.state = {
      searchPref: pref !== null ? parseInt(pref) : this.props.search.searchType,
      searchListOpen: false,
      useSearchPreference: true
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({
      searchListOpen: !this.state.searchListOpen,
      useSearchPreference: false
    })
  }

  render () {
    let searchType = this.state.useSearchPreference && this.state.searchPref !== null ? this.state.searchPref : this.props.search.searchType
    return (
      <div id='drawer'>
        <div className='appliance'>
          <form id='searchAppliance' method='get' action={searchOptions[searchType].target}>
            <label htmlFor='q'>
              <ul id='searchAction' onClick={this.onClick}>
                <li id='selected-search'>
                  <p>{ searchOptions[searchType].title}</p>
                </li>
                <SearchOptionList {...this.props} isOpen={this.state.searchListOpen} />
              </ul>
            </label>
            <input name='q' />
            <button type='submit'>Search</button>
            <input className='hidden' name='site' value='library' disabled />
            <input className='hidden' name='client' value='lib_site_srch' disabled />
            <SearchPreference
              currentSearch={parseInt(this.props.search.searchType)}
              savedSearch={
                 localStorage.getItem('searchPreference') ? parseInt(localStorage.getItem('searchPreference')) : null
               }
            />
            <div className='additional-links'>{ searchOptions[parseInt(searchType)].additionalLinks}</div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchDrawer)
