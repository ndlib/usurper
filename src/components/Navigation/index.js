import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Navigation from './presenter'
import { withErrorBoundary } from '../ErrorBoundary'
import { openSearchDrawer, closeSearchDrawer, closeSearchBox } from '../../actions/search'
import * as statuses from '../../constants/APIStatuses'
import {
  openMenu,
  closeMenus,
  USER_MENU,
  MOBILE_MENU,
} from '../../actions/menu'

const mapStateToProps = (state) => {
  const { personal } = state
  return {
    ...state,
    search: state.search,
    menus: state.menus,
    loggedIn: Boolean(personal && personal.login && personal.login.token),
    loginUrl: (personal && personal.login && personal.login.redirectUrl),
  }
}

const mapDispatchToProps = (dispatch) => {
  const preventDefault = (e) => {
    dispatch(closeSearchBox())
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  return {
    openSearchDrawer: (e) => {
      dispatch(closeMenus())
      dispatch(openSearchDrawer())
      preventDefault(e)
    },
    closeSearchDrawer: (e) => {
      dispatch(closeMenus())
      dispatch(closeSearchDrawer())
      preventDefault(e)
    },
    openMenu: (id, e) => {
      dispatch(openMenu(id))
      preventDefault(e)
    },
    openUser: (e) => {
      dispatch(openMenu(USER_MENU))
      preventDefault(e)
    },
    openMobile: (e) => {
      dispatch(openMenu(MOBILE_MENU))
      preventDefault(e)
    },
    closeMenus: (e) => {
      dispatch(closeMenus())
      preventDefault(e)
    },
  }
}

const mergeProps = (state, dispatchProps, ownProps) => {
  if (state.menus.status !== statuses.SUCCESS) {
    return {
      ...dispatchProps,
      ...ownProps,
    }
  }

  const keyDown = (e) => {
    // key = esc
    if (e.keyCode === 27) {
      dispatchProps.closeMenus(e)
    }
  }

  let dropDowns = []
  if (state.menus && state.menus.data && state.menus.data.fields) {
    state.menus.data.fields.columns.forEach(menu => {
      let current = menu.fields
      dropDowns.push({
        title: current.title,
        landingPage: current.landingPage ? current.landingPage.fields.slug : null,
        menuId: current.slug,
        menuData: current.columns,
        onClick: state.menus.menuId === current.slug
          ? dispatchProps.closeMenus
          : dispatchProps.openMenu.bind(null, current.slug),
        keyDown: keyDown,
        onBlur: dispatchProps.closeMenus,
      })
    })
  }

  const handleUserKeyDown = (e) => {
    if (e.keyCode === 13) {
      ownProps.history.push('/personal')
    }
  }

  const handleDrawer = (e) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 13)) {
      if (state.search.drawerOpen) {
        dispatchProps.closeSearchDrawer(e)
      } else {
        dispatchProps.openSearchDrawer(e)
      }
    }
  }
  const handleMobileMenuKeyDown = (e) => {
    if (e.type === 'keydown' && e.keyCode === 13) {
      if (state.menus.menuId === MOBILE_MENU) {
        dispatchProps.closeMenus(e)
      } else {
        dispatchProps.openMobile(e)
      }
    }
  }
  return {
    dropDowns: dropDowns,
    handleDrawer: handleDrawer,
    handleUserClick: state.menus.menuId === USER_MENU ? dispatchProps.closeMenus : dispatchProps.openUser,
    handleUserKeyDown: handleUserKeyDown,
    handleMobileClick: state.menus.menuId === MOBILE_MENU ? dispatchProps.closeMenus : dispatchProps.openMobile,
    handleMobileMenuKeyDown: handleMobileMenuKeyDown,
    isDrawerOpen: !!state.search.drawerOpen,
    toggleClass: state.search.drawerOpen ? 'open' : 'closed',
    ...state,
    ...dispatchProps,
    ...ownProps,
  }
}

class NavigationContainer extends Component {
  render () {
    if (!this.props.dropDowns) {
      return null
    }
    return (
      <Navigation {...this.props} />
    )
  }
}

NavigationContainer.propTypes = {
  dropDowns: PropTypes.array,
}

const NavigationComponent = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NavigationContainer))

export default withErrorBoundary(NavigationComponent)
