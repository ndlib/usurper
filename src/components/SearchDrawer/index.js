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
      currentSearchType: pref !== null ? parseInt(pref) : 0,
      searchListOpen: false
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({ searchListOpen: !this.state.searchListOpen })
  }

  render () {
    //console.log('render - searchType:', this.props)
    return (
      <div id='drawer'>
        <div className='appliance'>
          <form id='searchAppliance' method='get' action={searchOptions[(this.state.currentSearchType)].target}>
            <label htmlFor='q'>
              <ul id='searchAction' onClick={this.onClick}>
                <li id='selected-search'>
                  <p>{ searchOptions[this.state.currentSearchType].title}</p>
                </li>
                <SearchOptionList isOpen={this.state.searchListOpen} />
              </ul>
            </label>
            <input name='q' />
            <button type='submit'>Search</button>
            <input className='hidden' name='site' value='library' disabled />
            <input className='hidden' name='client' value='lib_site_srch' disabled />
            <SearchPreference
              currentSearch={parseInt(this.state.currentSearchType)}
              savedSearch={
                 localStorage.getItem('searchPreference') ? parseInt(localStorage.getItem('searchPreference')) : null
               }
            />
            <div className='additional-links'>{ searchOptions[this.state.currentSearchType].additionalLinks}</div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  //console.log('ms2p SD: ', state)
  return {
    searchType: state.searchType
  }
}

export default connect(mapStateToProps)(SearchDrawer)
