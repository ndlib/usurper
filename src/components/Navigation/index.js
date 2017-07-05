import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Navigation from './presenter'
import { openSearchDrawer, closeSearchDrawer, closeSearchBox } from '../../actions/search'
import { researchData } from './data/research.js'
import { servicesData } from './data/services.js'
import { librariesData } from './data/libraries.js'
import { aboutData } from './data/about.js'
import {
  openMenu,
  closeMenus,
  RESEARCH_MENU,
  SERVICES_MENU,
  LIBRARIES_MENU,
  ABOUT_MENU,
  ASK_MENU,
  USER_MENU,
  MOBILE_MENU,
} from '../../actions/menu'

const mapStateToProps = (state, ownProps) => {
  const { personal } = state
  return {
    ...state,
    search: state.search,
    menus: state.menus,
    loggedIn: (personal && personal.login && personal.login.token),
    loginUrl: (personal && personal.login && personal.login.redirectUrl),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
    openResearch: (e) => {
      dispatch(openMenu(RESEARCH_MENU))
      preventDefault(e)
    },
    openServices: (e) => {
      dispatch(openMenu(SERVICES_MENU))
      preventDefault(e)
    },
    openLibraries: (e) => {
      dispatch(openMenu(LIBRARIES_MENU))
      preventDefault(e)
    },
    openAbout: (e) => {
      dispatch(openMenu(ABOUT_MENU))
      preventDefault(e)
    },
    openAsk: (e) => {
      dispatch(openMenu(ASK_MENU))
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
  // Treat menu dropdowns as links to landing pages for accessibiilty
  const keyDown = (e) => {
    if (e.keyCode === 13) {
      const id = e.target.firstChild.id
      ownProps.history.push(`/${id}`)
    }
  }
  const dropDowns = [
    {
      title: 'Research',
      landingPage: '/research',
      menuId: RESEARCH_MENU,
      menuData: researchData,
      onClick: state.menus.menuId === RESEARCH_MENU ? dispatchProps.closeMenus : dispatchProps.openResearch,
      keyDown: keyDown,
      onBlur: dispatchProps.closeMenus,
    },
    {
      title: 'Services',
      landingPage: '/services',
      menuId: SERVICES_MENU,
      menuData: servicesData,
      onClick: state.menus.menuId === SERVICES_MENU ? dispatchProps.closeMenus : dispatchProps.openServices,
      keyDown: keyDown,
      onBlur: dispatchProps.closeMenus,
    },
    {
      title: 'Libraries',
      landingPage: null,
      menuId: LIBRARIES_MENU,
      menuData: librariesData,
      onClick: state.menus.menuId === LIBRARIES_MENU ? dispatchProps.closeMenus : dispatchProps.openLibraries,
      keyDown: keyDown,
      onBlur: dispatchProps.closeMenus,
    },
    {
      title: 'About',
      landingPage: null,
      menuId: ABOUT_MENU,
      menuData: aboutData,
      onClick: state.menus.menuId === ABOUT_MENU ? dispatchProps.closeMenus : dispatchProps.openAbout,
      keyDown: keyDown,
      onBlur: dispatchProps.closeMenus,
    },

  ]

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
  return {
    dropDowns: dropDowns,
    handleDrawer: handleDrawer,
    handleAskClick: state.menus.menuId === ASK_MENU ? dispatchProps.closeMenus : dispatchProps.openAsk,
    handleUserClick: state.menus.menuId === USER_MENU ? dispatchProps.closeMenus : dispatchProps.openUser,
    handleUserKeyDown: handleUserKeyDown,
    handleMobileClick: state.menus.menuId === MOBILE_MENU ? dispatchProps.closeMenus : dispatchProps.openMobile,
    isDrawerOpen: !!state.search.drawerOpen,
    toggleClass: state.search.drawerOpen ? 'open' : 'closed',
    ...state,
    ...dispatchProps,
    ...ownProps,
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Navigation))
