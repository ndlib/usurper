import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import SearchDrawer from '../../../components/SearchDrawer/presenter'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <SearchDrawer {...props} />
      </MemoryRouter>
    </Provider>
  )
}

let props
let enzymeWrapper
describe('components/SearchDrawer/presenter', () => {
  it('should render the open SearchDrawer component', () => {
    props = {
      search: {
        advancedSearch: false,
        drawerOpen: true,
        hasPref: false,
        usePref: false,
        searchType: 'FAKE_TYPE',
        pref: null,
      },
      currentSearch: { searchType: 'FAKE_TYPE' },
    }
    enzymeWrapper = setup(props)
    expect(enzymeWrapper.containsMatchingElement(<SearchDrawer {...props} />)).toBe(true)
  })

  it('should render the closed SearchDrawer component', () => {
    props = {
      search: {
        advancedSearch: false,
        drawerOpen: false,
        hasPref: false,
        usePref: false,
        searchType: 'FAKE_TYPE',
        pref: null,
      },
      currentSearch: { searchType: 'FAKE_TYPE' },
    }
    enzymeWrapper = setup(props)
    expect(enzymeWrapper.containsMatchingElement(<SearchDrawer {...props} />)).toBe(true)
  })
})
