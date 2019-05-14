import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import UserMenu from 'components/Layout/Navigation/UserMenu'
import Presenter from 'components/Layout/Navigation/UserMenu/presenter'

import { USER_MENU } from 'actions/menu'

let enzymeWrapper
let state

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  const store = mockStore(state)
  return shallow(<UserMenu store={store} {...ownProps} />)
}

describe('components/Layout/Navigation/UserMenu', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    state = {
      menus: {
        menuId: USER_MENU,
      },
    }
    enzymeWrapper = setup(state)
  })

  it('should render a presenter with links', () => {
    const found = enzymeWrapper.dive().dive().find(Presenter)
    expect(found.exists()).toBe(true)
    expect(found.props().links.length).toBeGreaterThan(0)
  })
})
