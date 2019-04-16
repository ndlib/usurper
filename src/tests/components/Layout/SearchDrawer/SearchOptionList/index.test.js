import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import SearchOptionList from 'components/Layout/SearchDrawer/SearchOptionList'
import { searchOptions } from 'constants/searchOptions'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <SearchOptionList {...props} />
    </Provider>
  )
}
let enzymeWrapper
let props = {
  search: {
    searchBoxOpen: true,
    searchType: searchOptions[0].uid,
  },
}

describe('component/Layout/SearchDrawer/SearchOptionList', () => {
  beforeEach(() => {
    enzymeWrapper = setup(props)
  })
  afterEach(() => {
    enzymeWrapper = null
  })

  it('Renders when searchBoxOpen is true', () => {
    expect(enzymeWrapper.find('.uSearchOptionList').exists()).toBe(true)
  })

  it('Renders correct number of options', () => {
    expect(enzymeWrapper.find('li.uSearchOption')).toHaveLength(searchOptions.length)
  })

  it('Renders hidden when searchBoxOpen is false', () => {
    enzymeWrapper = setup({ search: { searchBoxOpen: false, searchType: searchOptions[0].uid } })
    expect(enzymeWrapper.find('.uSearchOptionList.hidden').exists()).toBe(true)
  })
})
