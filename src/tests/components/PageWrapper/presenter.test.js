import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import PageWrapper from '../../../components/PageWrapper/presenter.js'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import configureStore from 'redux-mock-store'
import createRouterContext from 'react-router-test-context'
import PropTypes from 'prop-types'

const setup = (props) => {
  const store = configureStore()(props)
  const context = createRouterContext()
  const childContextTypes = {
    router: PropTypes.object,
  }
  return mount(
    <Provider store={store}>
      <PageWrapper {...props}>
        <div>CHILD CONTENT</div>
      </PageWrapper>
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
  chat: {
    chatOpen: false,
  },
  menus: {
    menuId: 'FAKE_MENU',
  },
  clickOnPage: jest.fn(),
}

describe('components/PageWrapper/presenter.js', () => {
  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('Renders a PageWrapper component with child content', () => {
    expect(enzymeWrapper.containsMatchingElement(<PageWrapper {...props}><div>CHILD CONTENT</div></PageWrapper>)).toBe(true)
  })

  it('Renders a Header component', () => {
    expect(enzymeWrapper.find('.top').exists()).toBe(true)
  })

  it('Renders a Footer component', () => {
    expect(enzymeWrapper.containsMatchingElement(<Footer />)).toBe(true)
  })

  it('Has a div with \'container-fluid\'', () => {
    expect(enzymeWrapper.find('.container-fluid').exists()).toBe(true)
  })
})
