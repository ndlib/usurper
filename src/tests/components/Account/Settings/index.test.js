import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Settings from 'components/Account/Settings'
import Presenter from 'components/Account/Settings/presenter.js'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state) => {
  store = mockStore(state)
  return shallow(<Settings store={store} />)
}

describe('components/Account/Settings/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    const state = {
      personal: {
        user: {
          state: statuses.SUCCESS,
        },
      },
    }
    enzymeWrapper = setup(state)
  })

  it('should render a Presenter', () => {
    expect(enzymeWrapper.dive().dive().find(Presenter).exists()).toBe(true)
  })
})
