import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import searchFloorMaps from 'actions/floorSearch'
import * as statuses from 'constants/APIStatuses'
import Loading from 'components/Messages/Loading'
import Empty from './Empty'
import { withErrorBoundary } from 'components/ErrorBoundary'

export class FloorSearch extends Component {
  componentDidMount () {
    if (this.props.searchString && this.props.redirect.status === statuses.NOT_FETCHED) {
      this.props.searchFloorMaps(this.props.searchString)
    }
  }

  componentDidUpdate () {
    const { status, slug, servicePoint } = { ...this.props.redirect }
    // if we found a floor, redirect to that floor
    if (status === statuses.SUCCESS && slug) {
      let url = slug + this.props.searchString
      if (servicePoint) {
        url += `&sp=${servicePoint}`
      }
      this.props.history.push(url)
    }
  }

  render () {
    // Show error if fetch has finished and floor was not found
    const { status, slug } = { ...this.props.redirect }
    if (status === statuses.ERROR || (status === statuses.SUCCESS && !slug)) {
      return <Empty location={this.props.location} />
    }

    return <Loading />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { floorSearch } = state

  return {
    redirect: floorSearch,
    searchString: ownProps.location.search,
    history: ownProps.history,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ searchFloorMaps }, dispatch)
}

FloorSearch.propTypes = {
  location: PropTypes.object,
  searchString: PropTypes.string,
  redirect: PropTypes.object,
  searchFloorMaps: PropTypes.func.isRequired,
  history: PropTypes.object,
}

const FloorSearchComponent = connect(mapStateToProps, mapDispatchToProps)(FloorSearch)

export default withErrorBoundary(FloorSearchComponent)
