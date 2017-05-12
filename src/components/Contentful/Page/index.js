// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage } from '../../../actions/contentful/page'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulPagePresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return { cfPageEntry: state.cfPageEntry }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPage }, dispatch)
}

class ContentfulPageContainer extends Component {
  componentDidMount(){
    let pageSlug = this.props.match.params.id
    this.props.fetchPage(pageSlug)
  }

  render () {
    return <PresenterFactory presenter={ ContentfulPagePresenter } slice={ this.props.cfPageEntry } />
  }
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulPageContainer)

export default ContentfulPage
