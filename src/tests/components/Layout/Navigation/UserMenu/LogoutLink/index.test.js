import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import LogoutLink from 'components/Layout/Navigation/UserMenu/LogoutLink'
import Link from 'components/Interactive/Link'

import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props
let state

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  const store = mockStore(state)
  return shallow(<LogoutLink store={store} {...ownProps} />)
}

describe.skip('components/Layout/Navigation/UserMenu/LogoutLink', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    props = {
      buttonText: 'Log me out, man',
    }
    state = {
      personal: {
        login: {
          token: 'fake token',
          state: statuses.SUCCESS,
        },
      },
    }
    enzymeWrapper = setup(state, props)
  })

  it('should render a Link to viceroy to log off', () => {
    const found = enzymeWrapper.dive().dive().find(Link)
    expect(found.exists()).toBe(true)
    expect(found.props().to.startsWith(Config.viceroyAPI)).toBe(true)
  })

  it('link text should match prop passed in', () => {
    const found = enzymeWrapper.dive().dive().find(Link)
    expect(found.exists()).toBe(true)
    expect(found.props().children).toEqual(props.buttonText)
  })
})
