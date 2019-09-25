import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import PageWrapper from 'components/Layout/PageWrapper'
import Presenter from 'components/Layout/PageWrapper/presenter'

import { CLOSE_SEARCHBOX } from 'actions/search'
import { CLOSE_MENUS } from 'actions/menu'

let enzymeWrapper
let props
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<PageWrapper store={store} {...ownProps} />)
}

describe('components/Layout/PageWrapper', () => {
  beforeEach(() => {
    const state = {
      search: {
        searchBoxOpen: true,
      },
      menus: {
        openMenuId: 1,
      },
    }
    props = {
      location: {
        search: '?preview=true'
      },
    }
    enzymeWrapper = setup(state, props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render a Presenter', () => {
    expect(enzymeWrapper.dive().dive().find(Presenter).exists()).toBe(true)
  })

  it('should close search and menus when clicking on page', () => {
    enzymeWrapper.dive().props().clickOnPage()
    expect(store.getActions()).toEqual(expect.arrayContaining([
      { type: CLOSE_SEARCHBOX },
      { type: CLOSE_MENUS },
    ]))
  })
})
