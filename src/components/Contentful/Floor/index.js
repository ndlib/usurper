// Container component for a Floor content type from Contentful
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFloor } from '../../../actions/contentful/floor'
import React, { Component } from 'react'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulFloorPresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return { cfFloorEntry: state.cfFloorEntry }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ fetchFloor }, dispatch)
}

export class ContentfulFloorContainer extends Component {
  componentDidMount(){
    let pageSlug = this.props.match.params.id
    this.props.fetchFloor(pageSlug)
  }

  render () {
    return <PresenterFactory
              presenter={ ContentfulFloorPresenter }
              status={ this.props.cfFloorEntry.status }
              props={ {cfFloorEntry: this.props.cfFloorEntry.json} } />
  }
}

const ContentfulFloor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulFloorContainer)

export default ContentfulFloor
