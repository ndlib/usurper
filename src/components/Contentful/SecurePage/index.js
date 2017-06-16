// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage } from '../../../actions/contentful/page'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulPagePresenter from '../Page/presenter.js'
import * as statuses from '../../../constants/APIStatuses'

const mapStateToProps = (state, ownProps) => {
  let personal = state.personal
  let isLoggedIn = (personal && personal.login && personal.login.token)

  return {
    cfPageEntry: state.cfPageEntry,
    isLoggedIn: isLoggedIn,
    loginLoc: (!isLoggedIn && personal && personal.login) ? personal.login.buttonUrl : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPage }, dispatch)
}

export class ContentfulPageContainer extends Component {
  checkLoggedIn (props) {
    let pageSlug = props.match.params.id

    if (props.isLoggedIn && props.cfPageEntry.status === statuses.NOT_FETCHED) {
      props.fetchPage(pageSlug, false, true)
    } else if (props.loginLoc) {
      window.location = props.loginLoc
    }
  }

  componentDidMount () {
    this.checkLoggedIn(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.checkLoggedIn(nextProps)
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulPagePresenter}
      status={this.props.cfPageEntry.status}
      props={{ cfPageEntry: this.props.cfPageEntry.json }} />
  }
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulPageContainer)

export default ContentfulPage
