import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import SearchBox from '../../../../../components/Layout/SearchDrawer/SearchBox/presenter.js'
import SearchOptionList from '../../../../../components/Layout/SearchDrawer/SearchOptionList'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <SearchBox {...props} />
    </Provider>
  )
}
let enzymeWrapper
let props = {
  id: 'arbitrary-search-field',
  search: {
    drawerOpen: true,
    hasPref: false,
    usePref: false,
    searchType: '',
  },
  currentSearch: {
    title: 'FAKE SEARCH',
  },
  visible: true,
  onClick: jest.fn(),
  onSubmit: jest.fn(),
}

describe('components/Layout/SearchDrawer/SearchBox/presenter.js', () => {
  beforeEach(() => {
    enzymeWrapper = setup(props)
  })
  afterEach(() => {
    enzymeWrapper = null
  })

  it('Renders a SearchBox component', () => {
    expect(enzymeWrapper.find('.uSearchBox').exists()).toBe(true)
  })

  it('Has an unordered list for the searchAction', () => {
    expect(enzymeWrapper.find('ul#searchAction').exists()).toBe(true)
  })

  it('Has one visible text input field', () => {
    expect(enzymeWrapper.find('input[name=\'q\']').exists()).toBe(true)
  })

  it('Has a search button', () => {
    expect(enzymeWrapper.containsMatchingElement(<button onClick={props.onSubmit}>Search</button>)).toBe(true)
  })

  it('Renders the SearchOptionList component', () => {
    expect(enzymeWrapper.containsMatchingElement(<SearchOptionList {...props} />)).toBe(true)
  })

  it('Shows the current search title', () => {
    expect(enzymeWrapper.containsMatchingElement(<p className='current-search'>FAKE SEARCH</p>)).toBe(true)
  })
})
