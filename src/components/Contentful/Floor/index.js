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

  const extraFields = [ 'title', 'author', 'call_number' ]
  for (let fieldIndex in extraFields) {
    let field = extraFields[fieldIndex]
    if (searchParams.get(field)) {
      extraData[field] = searchParams.get(field)
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

  render () {
    return <PresenterFactory
      presenter={ContentfulFloorPresenter}
      status={this.props.cfFloorEntry.status}
      props={{ cfFloorEntry: this.props.cfFloorEntry.json, extraData: this.props.extraData }} />
  }
}

ContentfulFloorContainer.propTypes = {
  fetchFloor: PropTypes.func.isRequired,
  cfFloorEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired,
}

const ContentfulFloor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulFloorContainer)

export default ContentfulFloor
