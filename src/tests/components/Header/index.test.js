import React from 'react'
import { shallow } from 'enzyme'
import { Route } from 'react-router'
import Header from '../../../components/Header'
import BrandingBanner from '../../../components/Header/BrandingBanner'
import HesburghBanner from '../../../components/Header/HesburghBanner'
import Navigation from '../../../components/Navigation'
import createRouterContext from 'react-router-test-context'

const setup = (props, path) => {
  const context = createRouterContext({ location: { pathname: path } })
  return shallow(<Header {...props} />, { context })
}

let enzymeWrapper
let props = {
  personal: {
    login: {},
    loggedIn: false,
    label: 'label',
  },
  search: {
    drawerOpen: false,
    hasPref: false,
    usePref: false,
    searchType: '',
  },
  menus: {
    menuId: 'FAKE_MENU',
  },
}

describe('components/Header/index.js', () => {
  beforeEach(() => {
    enzymeWrapper = setup(props, '/somepath')
  })

  afterEach(() => {
    enzymeWrapper = null
  })

  it('Renders a top level div with className \'top\'', () => {
    expect(enzymeWrapper.find('.top').exists()).toBe(true)
  })

  it('Renders a HesburghBanner component', () => {
    expect(enzymeWrapper.containsMatchingElement(<HesburghBanner />)).toBe(true)
  })

  it('Doesn\'t render a BrandingBanner component on most pages', () => {
    expect(enzymeWrapper.containsMatchingElement(<BrandingBanner />)).toBe(false)
  })

  it('Renders a BrandingBanner component on the home page', () => {
    enzymeWrapper = setup(props, '/')
    expect(enzymeWrapper.containsMatchingElement(<Route exact path='/' component={BrandingBanner} />)).toBe(true)
  })

  it('Renders a Navigation component', () => {
    expect(enzymeWrapper.containsMatchingElement(<Navigation />)).toBe(true)
  })
})
