// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage } from '../../../actions/contentful/page'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulPagePresenter from './presenter.js'

const mapStateToProps = (state) => {
  return { cfPageEntry: state.cfPageEntry }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPage }, dispatch)
}

export class ContentfulPageContainer extends Component {
  componentDidMount () {
    let pageSlug = this.props.match.params.id
    this.props.fetchPage(pageSlug)
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulPagePresenter}
      status={this.props.cfPageEntry.status}
      props={{ cfPageEntry: this.props.cfPageEntry.json }} />
  }
}

ContentfulPageContainer.propTypes = {
  fetchPage: PropTypes.func.isRequired,
  cfPageEntry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulPageContainer)

export default ContentfulPage
