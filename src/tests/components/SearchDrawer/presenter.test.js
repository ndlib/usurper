import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import SearchDrawer from '../../../components/SearchDrawer/presenter'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <SearchDrawer {...props} />
    </Provider>
  )
}

let enzymeWrapper
describe('components/SearchDrawer/presenter', () => {
  it('should render the open SearchDrawer component', () => {
    enzymeWrapper = setup(
      {
        search: {
          drawerOpen: true,
          hasPref: false,
          usePref: false,
          searchType: 'FAKE_TYPE',
        },
        currentSearch: { searchType: 'FAKE_TYPE' },
      }
    )
    expect(enzymeWrapper.containsMatchingElement(
      <SearchDrawer
        search={{ drawerOpen: true, hasPref: false, usePref: false, searchType: 'FAKE_TYPE' }}
        currentSearch={{ searchType: 'FAKE_TYPE' }}
      />)).toBe(true)
  })

  it('should render the closed SearchDrawer component', () => {
    enzymeWrapper = setup(
      {
        search: {
          drawerOpen: false,
          hasPref: false,
          usePref: false,
          searchType: 'FAKE_TYPE',
        },
        currentSearch: { searchType: 'FAKE_TYPE' },
      }
    )
    expect(enzymeWrapper.containsMatchingElement(
      <SearchDrawer
        search={{ drawerOpen: false, hasPref: false, usePref: false, searchType: 'FAKE_TYPE' }}
        currentSearch={{ searchType: 'FAKE_TYPE' }}
      />)).toBe(true)
  })
})
