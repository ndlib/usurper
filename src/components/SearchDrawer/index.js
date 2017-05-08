'use strict'
import React, { Component, PropTypes } from 'react'
import { searchOptions } from './searchOptions.js'

import '../../static/css/global.css'
import '../../static/css/search.css'

class SearchDrawer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSearchOption: 0,
      searchListOpen: false
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({ searchListOpen: !this.state.searchListOpen })
  }
  render () {
    return (
      <div id='drawer'>
        <div className='appliance'>
          <form id='searchAppliance' method='get' action={searchOptions[this.state.currentSearchOption].target}>
            <label htmlFor='q'>
              <ul id='searchAction'>
                <li id='selected-search'>
                  <p>{ searchOptions[this.state.currentSearchOption].title}</p>
                </li>
              </ul>
            </label>
            <input name='q' />
            <button type='submit'>Search</button>
            <input className='hidden' name='site' value='library' disabled />
            <input className='hidden' name='client' value='lib_site_srch' disabled />
            <div className='additional-links'>{ searchOptions[this.state.currentSearchOption].additionalLinks}</div>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchDrawer
