
'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import SearchResultInfo from './SearchResultInfo'
import SearchResults from './SearchResults'
import SearchPager from './SearchPager'
import PageTitle from '../PageTitle'


class SearchPage extends Component {
  componentWillMount () {
    // emit the set to website.
    this.props.setSearchType('LIBRARY')
    // action to set the input
    this.props.fetchResults(window.location.search)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.fetchResults(nextProps.location.search)
    }
  }

  render () {
    let displayQuery = ''
    let pagerQuery = '/search?q='
    if (this.props.query) {
      displayQuery = this.props.query.replace(/(&start=\d+)/, '').replace('?q=', '')
      pagerQuery += displayQuery
    }
    return (
      <div className='search-results'>
        <a href='#search-top' />
        <PageTitle title={`Website Search: ${displayQuery}`} />
        <SearchResultInfo searchInformation={this.props.searchInformation} />
        <SearchResults items={this.props.items} />
        <SearchPager
          queries={this.props.queries}
          pagerQuery={pagerQuery}
        />
      </div>
    )
  }
}

export default SearchPage
