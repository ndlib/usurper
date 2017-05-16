import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ContentfulPageContainer } from '../../../../components/Contentful/Page'
import PagePresenter from '../../../../components/Contentful/Page/presenter'
import APIPresenterFactory from '../../../../components/APIPresenterFactory'
import configureStore from 'redux-mock-store'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <ContentfulPageContainer {...props} />
    </Provider>)
}

let enzymeWrapper
let props
describe('components/Contentful/Page/Container', () => {
  beforeEach(() => {
    props = {
      cfPageEntry: { status: 'test', json: {} },
      fetchPage: jest.fn(),
      match: { params: { id: 'fake page slug' } }
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('only renders APIPresenterFactory with cfPageEntry slice and PagePresenter', () => {
    expect(enzymeWrapper.
      containsMatchingElement(<APIPresenterFactory presenter={ PagePresenter } props={{ cfPageEntry: props.cfPageEntry.json }} status={props.cfPageEntry.status } />)).
      toBe(true)
  })

  it('calls the bound fetch page action on load', () => {
    expect(props.fetchPage.mock.calls.length).toBe(1)
  })
})
