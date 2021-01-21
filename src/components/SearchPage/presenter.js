
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchResultInfo from './SearchResultInfo'
import SearchResults from './SearchResults'
import SearchPager from './SearchPager'
import PageTitle from 'components/Layout/PageTitle'

class SearchPage extends Component {
  componentDidMount () {
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
    let start = 1
    if (this.props.query) {
      const searchParams = new URLSearchParams(this.props.location.search)
      displayQuery = searchParams.get('q')
      pagerQuery += displayQuery
      start = parseInt(searchParams.get('start') || 1, 10)
    }
    return (
      <div className='search-results'>
        <PageTitle title={`Website Search: ${unescape(displayQuery)}`} />
        <SearchResultInfo searchInformation={this.props.searchInformation} />
        <SearchResults items={this.props.items} />
        <SearchPager
          queries={this.props.queries}
          pagerQuery={pagerQuery}
          start={start}
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
