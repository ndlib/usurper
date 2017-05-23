import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import Header from '../../../components/Header'
import BrandingBanner from '../../../components/Header/BrandingBanner'
import HesburghBanner from '../../../components/Header/HesburghBanner'
import configureStore from 'redux-mock-store'
import createRouterContext from 'react-router-test-context'
import PropTypes from 'prop-types'

const setup = (props, path) => {
  const store = configureStore()(props)
  const context = createRouterContext()
  const childContextTypes = {
    router: PropTypes.object,
  }
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Header {...props} />
      </MemoryRouter>
    </Provider>, { context, childContextTypes }
  )
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
    expect(enzymeWrapper.containsMatchingElement(<BrandingBanner />)).toBe(true)
  })

  it('Renders a Navigation component', () => {
    expect(enzymeWrapper.find('.uNavigation').exists()).toBe(true)
  })

  it('Doesn\'t render a SearchDrawer component when it is closed', () => {
    expect(enzymeWrapper.find('#drawer').exists()).toBe(false)
  })

  it('Renders a SearchDrawer component when it is open', () => {
    enzymeWrapper = setup(Object.assign({}, props, {
      search: {
        drawerOpen: true,
        hasPref: false,
        usePref: false,
        searchType: '',
      } }), '/')
    expect(enzymeWrapper.find('#drawer').exists()).toBe(true)
  })
})
