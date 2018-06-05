import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import searchFloorMaps from '../../actions/floorSearch'
import * as statuses from '../../constants/APIStatuses'
import Loading from '../Messages/Loading'
import Empty from './Empty'

class FloorSearch extends Component {
  constructor (props) {
    super(props)

    this.state = { error: false }
  }

  componentWillMount () {
    if (this.props.searchString && this.props.redirect.status === statuses.NOT_FETCHED) {
      this.props.searchFloorMaps(this.props.searchString)
    }
  }

  componentWillReceiveProps (nextProps) {
    const status = nextProps.redirect.status
    const slug = nextProps.redirect.slug

    // if we found a floor, redirect to that floor, otherwise error
    if (status === statuses.SUCCESS && slug) {
      this.props.history.push(slug + this.props.searchString)
    } else if (status === statuses.ERROR || (status === statuses.SUCCESS && !slug)) {
      this.setState({ error: true })
    }
  }

  render () {
    if (this.state.error) {
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
  return {
    searchFloorMaps: (searchString) => dispatch(searchFloorMaps(searchString)),
  }
}

FloorSearch.propTypes = {
  location: PropTypes.object,
  searchString: PropTypes.string,
  redirect: PropTypes.object,
  searchFloorMaps: PropTypes.func.isRequired,
  history: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorSearch)
