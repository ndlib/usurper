import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import PageWrapper from './presenter.js'
import { closeSearchBox } from 'actions/search.js'
import { closeMenus, fetchNavigation } from 'actions/menu.js'

const clickOnPage = () => {
  return (dispatch, getState) => {
    const state = getState()
    if (state.search.searchBoxOpen) {
      dispatch(closeSearchBox())
    }
    if (state.menus.menuId || state.menus.openMenuId) {
      dispatch(closeMenus())
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
    // Override children to be null if nav isn't yet loaded
    children: state.renderComponents ? ownProps.children : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clickOnPage, fetchNavigation }, dispatch)
}

class PageWrapperContainer extends Component {
  componentWillMount () {
    this.props.fetchNavigation()
  }

  render () {
    return <PageWrapper {...this.props} />
  }
}

PageWrapperContainer.propTypes = {
  fetchNavigation: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageWrapperContainer)
