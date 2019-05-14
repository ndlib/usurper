import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchResult from './SearchResult'
import InlineLoading from 'components/Messages/InlineLoading'

import { searchFavorites } from 'actions/personal/favorites'
import * as states from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class SearchContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      fakeSearching: false,
      searchTimer: null,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    // Clear the search results in the store in case it was leftover from a previous action
    if (props.searchState !== states.NOT_FETCHED) {
      props.searchFavorites(props.kind, null)
    }
  }

  componentWillUnmount () {
    if (this.state.searchTimer) {
      clearTimeout(this.state.searchTimer)
      this.setState({
        searchTimer: null,
      })
    }
  }

  handleChange (event) {
    this.setState({
      searchText: event.target.value,
      fakeSearching: true,
    })
    if (this.state.searchTimer) {
      clearTimeout(this.state.searchTimer)
      this.setState({
        searchTimer: null,
      })
    }
    // This helps reduce the number of requests if you type your search term in quick enough
    this.setState({
      searchTimer: window.setTimeout(this.handleSubmit, event.target.value ? 200 : 0),
    })
  }

  handleSubmit (event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault()
    }
    this.props.searchFavorites(this.props.kind, this.state.searchText)
    this.setState({
      fakeSearching: false,
    })
  }

  render () {
    const resultCount = this.props.searchResults.length
    return (
      <form name={'search-' + this.props.kind} onSubmit={this.handleSubmit} autoComplete='off'>
        <span className='favorites-search'>
          <div className='input'>
            <span className='screen-reader-only' id={'label-for-search-' + this.props.kind}>
              {this.props.buttonText}
            </span>
            <input
              type='text'
              role='searchbox'
              id={this.props.kind + '-search-field'}
              name='searchText'
              aria-labelledby={'label-for-search-' + this.props.kind}
              placeholder={this.props.placeholder}
              value={this.state.searchText}
              onChange={this.handleChange}
            />
          </div>
          <button type='submit'>{this.props.buttonText || 'Search'}</button>
          <div
            className='search-results'
            hidden={this.props.searchState === states.NOT_FETCHED && !this.state.fakeSearching}
          >
            { this.props.searchState === states.FETCHING || this.state.fakeSearching ? (
              <InlineLoading title='Searching...' />
            ) : (
              <React.Fragment>
                { helper.sortList(this.props.searchResults, 'title', 'asc')
                  .map((result, index) => {
                    if (index >= 10) {
                      return null
                    }
                    return (
                      <SearchResult
                        key={result.key}
                        kind={this.props.kind}
                        id={result.key}
                        title={result.title}
                        url={result.url}
                        disabled={this.props.disabled}
                        onAddFavorite={this.props.onAddFavorite}
                      />
                    )
                  })
                }
                <span className='search-results-text'>
                  <em>
                    {
                      resultCount === 0
                        ? 'No results found.'
                        : `Showing ${Math.min(10, resultCount)} of ${resultCount} result${resultCount === 1 ? '' : 's'}.`
                    }
                  </em>
                </span>
              </React.Fragment>
            )}
          </div>
        </span>
      </form>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { favorites } = state

  let searchState = states.NOT_FETCHED
  let searchResults = []
  if (favorites && favorites['search'] && favorites['search'][ownProps.kind]) {
    searchState = favorites['search'][ownProps.kind].state
    searchResults = (favorites['search'][ownProps.kind].results || []).filter((result) => {
      return ownProps.existingFavorites.findIndex((fav) => fav.key === result.key) < 0
    })
  }

  return {
    searchState: searchState,
    searchResults: searchResults,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ searchFavorites }, dispatch)
}

SearchContainer.propTypes = {
  kind: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  existingFavorites: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  searchFavorites: PropTypes.func.isRequired,
  searchState: PropTypes.string,
  searchResults: PropTypes.array,
  onAddFavorite: PropTypes.func,
  disabled: PropTypes.bool,
}

SearchContainer.defaultProps = {
  disabled: false,
}

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchContainer)

export default Search
