import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import SearchBox from '../../../../components/SearchDrawer/SearchBox/presenter.js'
import SearchOptionList from '../../../../components/SearchDrawer/SearchOptionList'

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
  search: {
    drawerOpen: true,
    hasPref: false,
    usePref: false,
    searchType: '',
  },
  currentSearch: {
    title: 'FAKE SEARCH',
  },
  onClick: () => {},
}

describe('components/SearchDrawer/SearchBox/presenter.js', () => {
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

  it('Has 3 inputs', () => {
    expect(enzymeWrapper.find('input')).toHaveLength(3)
  })

  it('Has a search button', () => {
    expect(enzymeWrapper.containsMatchingElement(<button type='submit'>Search</button>)).toBe(true)
  })

  it('Renders the SearchOptionList component', () => {
    expect(enzymeWrapper.containsMatchingElement(<SearchOptionList {...props} />)).toBe(true)
  })

  it('Shows the current search title', () => {
    expect(enzymeWrapper.containsMatchingElement(<p className='current-search'>FAKE SEARCH</p>)).toBe(true)
  })
})
