// Container component for a Floor content type from Contentful
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import { fetchFloor } from 'actions/contentful/floor'
import PresenterFactory from 'components/APIPresenterFactory'
import ContentfulFloorPresenter from './presenter.js'
import { withErrorBoundary } from 'components/ErrorBoundary'

const mapStateToProps = (state, ownProps) => {
  const searchParams = new URLSearchParams(ownProps.location.search)

  return {
    cfFloorEntry: state.cfFloorEntry,
    searchParams: searchParams,
    location: ownProps.location,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchFloor }, dispatch)
}

export class ContentfulFloorContainer extends Component {
  componentDidMount () {
    const pageSlug = this.props.match.params.id
    const preview = this.props.searchParams.get('preview') === 'true'
    this.props.fetchFloor(pageSlug, preview)
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    const preview = nextProps.searchParams.get('preview') === 'true'
    if (slug !== nextSlug) {
      this.props.fetchFloor(nextSlug, preview)
    }
  }

  render () {
    const floor = this.props.cfFloorEntry.json ? this.props.cfFloorEntry.json : null
    const sp = typy(floor, 'fields.building.fields.primaryServicePoint').safeObject

    return <PresenterFactory
      presenter={ContentfulFloorPresenter}
      status={this.props.cfFloorEntry.status}
      props={{
        cfFloorEntry: floor,
        location: this.props.location,
        cfServicePoint: sp,
      }} />
  }
}

ContentfulFloorContainer.propTypes = {
  fetchFloor: PropTypes.func.isRequired,
  cfFloorEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired,
  location: PropTypes.object,
}

const ContentfulFloor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulFloorContainer)

export default withErrorBoundary(ContentfulFloor)
