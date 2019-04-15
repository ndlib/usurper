import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import SearchPreference from '../../../../../components/Layout/SearchDrawer/SearchPreference/presenter.js'

let enzymeWrapper
function setup (props) {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <SearchPreference {...props} />
    </Provider>
  )
}

const noPref = {
  search: {
    drawerOpen: true,
    hasPref: false,
    usePref: false,
    searchType: 'FAKE_TYPE',
  },
  currentSearch: {
    currentSearch: { searchType: 'FAKE_TYPE' },
  },
  saveClick: () => {},
  forgetClick: () => {},
}

const hasPref = {
  search: {
    drawerOpen: true,
    hasPref: true,
    usePref: false,
    searchType: 'FAKE_TYPE',
    pref: { uid: 'FAKE_UID', title: 'FAKE TITLE' },
  },
  currentSearch: {
    currentSearch: { searchType: 'FAKE_TYPE' },
  },
  saveClick: () => {},
  forgetClick: () => {},
}

describe('components/Layout/SearchDrawer/SearchPreference/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  // No Preference
  it('should always render something when no pref', () => {
    enzymeWrapper = setup(noPref)
    expect(enzymeWrapper).not.toBeNull()
  })
  it('should render NoPref when no pref', () => {
    enzymeWrapper = setup(noPref)
    expect(enzymeWrapper.find('.set-default-search')).toHaveLength(1)
  })
  it('should not render HasPref when no pref', () => {
    enzymeWrapper = setup(noPref)
    expect(enzymeWrapper.find('.has-default-search')).toHaveLength(0)
  })

  // Has Preference
  it('should always render something with pref', () => {
    enzymeWrapper = setup(hasPref)
    expect(enzymeWrapper).not.toBeNull()
  })
  it('should render HasPref with pref', () => {
    enzymeWrapper = setup(hasPref)
    expect(enzymeWrapper.find('.has-default-search')).toHaveLength(1)
  })
  it('should not render NoPref when no pref', () => {
    enzymeWrapper = setup(hasPref)
    expect(enzymeWrapper.find('.set-default-search')).toHaveLength(0)
  })
})
