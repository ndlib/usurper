import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ContentfulPageContainer } from '../../../../components/Contentful/Page'
import PagePresenter from '../../../../components/Contentful/Page/presenter'
import APIPresenterFactory from '../../../../components/APIPresenterFactory'
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
      <ContentfulPageContainer {...props} />
    </Provider>, { context, childContextTypes }
  )
}

let enzymeWrapper
let props
describe('components/Contentful/Page/Container', () => {
  beforeEach(() => {
    props = {
      cfPageEntry: { status: 'test', json: {} },
      fetchPage: jest.fn(),
      match: { params: { id: 'fake page slug' } },
      personal: {
        login: {},
        loggedIn: true,
        label: 'label',
      },
      search: {
        drawerOpen: false,
        hasPref: false,
        usePref: false,
        searchType: 'FAKE_TYPE',
      },
      menus: {},
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('only renders APIPresenterFactory with cfPageEntry slice and PagePresenter', () => {
    expect(enzymeWrapper
      .containsMatchingElement(<APIPresenterFactory
        status={props.cfPageEntry.status}
        props={{ cfPageEntry: props.cfPageEntry.json }}
        presenter={PagePresenter} />))
      .toBe(true)
  })

  it('calls the bound fetch page action on load', () => {
    expect(props.fetchPage.mock.calls.length).toBe(1)
  })
})
