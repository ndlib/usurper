import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'
import PresenterFactory from 'components/APIInlinePresenterFactory'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class LandingPageWrapperContainer extends Component {
  constructor (props) {
    super(props)

    this.onFilterChange = this.onFilterChange.bind(this)
    this.filter = this.filter.bind(this)
    this.onFacetApply = this.onFacetApply.bind(this)
    this.onFacetRemove = this.onFacetRemove.bind(this)

    this.state = {
      entries: this.filter(),
      pageTitle: props.pageTitle,
      pageDate: props.pageDate,
      filterValue: '',
    }
  }

  static getDerivedStateFromProps (props, state) {
    // if we clicked on a date filter, make sure the page update removes any search filter
    if (props.pageDate !== state.pageDate) {
      return {
        pageDate: props.pageDate,
        filterValue: '',
      }
    }
    return null
  }

  componentDidUpdate (prevProps) {
    if ((this.props.allEntriesStatus === statuses.SUCCESS && prevProps.allEntriesStatus !== statuses.SUCCESS) ||
      this.props.pageDate !== prevProps.pageDate) {
      // Trigger filter event so the state gets updated to match props
      this.onFilterChange()
    }
  }

  filter (searchFilter, facetValues) {
    // If there is a search value, search all entries regardless of selected date or month
    let entries = searchFilter ? this.props.entries : this.props.filteredEntries
    const valuesObj = facetValues || this.props.facetValues
    Object.keys(valuesObj).forEach(key => {
      if (valuesObj[key].length) {
        const match = this.props.facets.find(facet => facet.key === key)
        const fieldName = match ? match.fieldName : key
        entries = entries.filter(entry => {
          return valuesObj[key].some(val => typy(entry.fields || entry, fieldName).safeArray.includes(val))
        })
      }
    })
    // If searching, filter by search value and limit to 50 results
    if (searchFilter) {
      entries = helper.filterList(entries, this.props.filterFields, searchFilter, false).slice(0, 50)
    }
    return helper.sortList(entries, this.props.sortFields, 'asc')
  }

  onFilterChange (e, facetValues) {
    const searchValue = typy(e, 'target.value').safeString

    this.setState({
      entries: this.filter(searchValue, facetValues),
      filterValue: searchValue,
      pageTitle: searchValue ? `Search for "${searchValue}"` : this.props.pageTitle,
    })
  }

  onFacetApply (facetName, selection) {
    const queryString = helper.buildQueryString(this.props.location.search, facetName, selection)
    this.props.history.push(this.props.location.pathname + queryString)
    // Trigger an update to the filter the same as if the search bar changed
    const facetValues = Object.assign({}, this.props.facetValues)
    this.props.facets.forEach(currentFacet => {
      const currentKey = currentFacet.key || currentFacet.fieldName
      if (facetName === currentKey) {
        facetValues[facetName] = selection
      }
    })
    this.setState({
      entries: this.filter(this.state.filterValue, facetValues),
    })
  }

  onFacetRemove (facetName, valueToRemove) {
    const newFilter = this.props.facetValues[facetName].filter(value => value !== valueToRemove)
    this.onFacetApply(facetName, newFilter)
  }

  render () {
    return (
      <PresenterFactory
        presenter={Presenter}
        props={{
          ...this.props,
          entries: this.state.entries,
          onFilterChange: this.onFilterChange,
          filterValue: this.state.filterValue,
          pageTitle: this.state.pageTitle,
          typeLabel: this.props.typeLabel || this.props.pageTitle,
          onFacetApply: this.onFacetApply,
          onFacetRemove: this.onFacetRemove,
        }}
        status={this.props.allEntriesStatus}
      />
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  // Initialize values object with an empty array for each facet type
  const facetValues = {}
  typy(ownProps, 'facets').safeArray.forEach(facet => {
    const facetKey = facet.key || facet.fieldName
    facetValues[facetKey] = []
  })

  // Get selected facet values from query string
  const queryParams = ownProps.location.search.replace('?', '').split('&')
  queryParams.forEach(param => {
    const split = decodeURIComponent(param).split('=')
    const key = split[0]
    if (key in facetValues) {
      facetValues[key].push(split[1])
    }
  })

  return {
    facetValues,
  }
}

LandingPageWrapperContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
  filteredEntries: PropTypes.array,
  pageDate: PropTypes.string,
  allEntriesStatus: PropTypes.string.isRequired,
  filterFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  facets: PropTypes.arrayOf(PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
  })),
  facetValues: PropTypes.object,
  typeLabel: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

const LandingPageWrapper = connect(mapStateToProps)(LandingPageWrapperContainer)

export default LandingPageWrapper
