import React from 'react'
import { connect } from 'react-redux'
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
  MOBILE_MENU,
} from '../../actions/menu'

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.search,
    menus: state.menus,
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
      dispatch(openSearchDrawer())
      preventDefault(e)
    },
    closeSearchDrawer: (e) => {
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
  const dropDowns = [
    {
      title: 'Research',
      landingPage: '/research',
      menuId: RESEARCH_MENU,
      menuData: researchData,
      onClick: state.menus.menuId === RESEARCH_MENU ? dispatchProps.closeMenus : dispatchProps.openResearch,
    },
    {
      title: 'Services',
      landingPage: '/services',
      menuId: SERVICES_MENU,
      menuData: servicesData,
      onClick: state.menus.menuId === SERVICES_MENU ? dispatchProps.closeMenus : dispatchProps.openServices,
    },
    {
      title: 'Libraries',
      landingPage: '/libraries',
      menuId: LIBRARIES_MENU,
      menuData: librariesData,
      onClick: state.menus.menuId === LIBRARIES_MENU ? dispatchProps.closeMenus : dispatchProps.openLibraries,
    },
    {
      title: 'About',
      landingPage: '/about',
      menuId: ABOUT_MENU,
      menuData: aboutData,
      onClick: state.menus.menuId === ABOUT_MENU ? dispatchProps.closeMenus : dispatchProps.openAbout,
    },
  ]
  return {
    dropDowns: dropDowns,
    handleDrawerClick: state.search.drawerOpen ? dispatchProps.closeSearchDrawer : dispatchProps.openSearchDrawer,
    handleAskClick: state.menus.menuId === ASK_MENU ? dispatchProps.closeMenus : dispatchProps.openAsk,
    handleMobileClick: state.menus.menuId === MOBILE_MENU ? dispatchProps.closeMenus : dispatchProps.openMobile,
    ...state,
    ...dispatchProps,
    ...ownProps,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Navigation)
