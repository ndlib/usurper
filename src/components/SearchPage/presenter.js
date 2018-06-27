
import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
        <PageTitle title={`Website Search: ${unescape(displayQuery)}`} />
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

SearchPage.propTypes = {
  fetchResults: PropTypes.func.isRequired,
  setSearchType: PropTypes.func.isRequired,
  items: PropTypes.array,
  searchInformation: PropTypes.object,
  query: PropTypes.string,
  queries: PropTypes.object,
  location: PropTypes.object.isRequired,
}

export default SearchPage
