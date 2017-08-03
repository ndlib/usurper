import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageWrapper from './presenter.js'
import { closeSearchBox } from '../../actions/search.js'
import { closeMenus, fetchNavigation } from '../../actions/menu.js'
import * as statuses from '../../constants/APIStatuses'
import APIPresenterFactory from '../APIPresenterFactory'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickOnPage: () => {
      dispatch(closeSearchBox())
      dispatch(closeMenus())
    },
    fetchNavigation: (e) => {
      dispatch(fetchNavigation())
    },
  }
}

class PageWrapperContainer extends Component {
  componentWillMount () {
    this.props.fetchNavigation()
  }

  render () {
    return <APIPresenterFactory
      status={this.props.menus.status}
      presenter={PageWrapper}
      props={this.props}
    />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageWrapperContainer)
