// Container component for a Floor content type from Contentful
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFloor } from '../../../actions/contentful/floor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulFloorPresenter from './presenter.js'

const mapStateToProps = (state) => {
  return { cfFloorEntry: state.cfFloorEntry }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchFloor }, dispatch)
}

export class ContentfulFloorContainer extends Component {
  componentDidMount () {
    let pageSlug = this.props.match.params.id
    const preview = this.props.match.path === '/preview/floor/:id'
    this.props.fetchFloor(pageSlug, preview)
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulFloorPresenter}
      status={this.props.cfFloorEntry.status}
      props={{ cfFloorEntry: this.props.cfFloorEntry.json }} />
  }
}

ContentfulFloorContainer.propTypes = {
  fetchFloor: PropTypes.func.isRequired,
  cfFloorEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const ContentfulFloor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulFloorContainer)

export default ContentfulFloor
