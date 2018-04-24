// Container component for a Floor content type from Contentful
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFloor } from '../../../actions/contentful/floor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulFloorPresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  const searchParams = new URLSearchParams(ownProps.location.search)
  let extraData = {}

  const extraFields = [ 'title', 'author', 'call_number', 'collection_display' ]
  for (let fieldIndex in extraFields) {
    let field = extraFields[fieldIndex]
    let value = searchParams.get(field)
    if (value) {
      if (field === 'title') {
        // strip out whitespace and [,.] from the start/end of the title
        value = value.replace(/^[\s,.]+|[\s,.]+$/gm, '')
      }

      extraData[field] = value
    }
  }

  return {
    cfFloorEntry: state.cfFloorEntry,
    searchParams: searchParams,
    extraData: extraData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchFloor }, dispatch)
}

export class ContentfulFloorContainer extends Component {
  componentDidMount () {
    let pageSlug = this.props.match.params.id
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
    const sp = floor && floor.fields.building ? floor.fields.building.fields.primaryServicePoint : null

    return <PresenterFactory
      presenter={ContentfulFloorPresenter}
      status={this.props.cfFloorEntry.status}
      props={{
        cfFloorEntry: floor,
        extraData: this.props.extraData,
        cfServicePoint: sp,
      }} />
  }
}

ContentfulFloorContainer.propTypes = {
  fetchFloor: PropTypes.func.isRequired,
  cfFloorEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired,
  extraData: PropTypes.object,
}

const ContentfulFloor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulFloorContainer)

export default ContentfulFloor
