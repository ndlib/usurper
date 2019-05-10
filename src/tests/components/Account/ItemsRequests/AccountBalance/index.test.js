import React from 'react'
import { shallow } from 'enzyme'

import AccountBalance from 'components/Account/ItemsRequests/AccountBalance'

let enzymeWrapper

describe('components/Account/ItemsRequests/AccountBalance/index.js', () => {

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should display balance with dollar sign', () => {
    const props = {
      balance: -13.37,
    }
    enzymeWrapper = shallow(<AccountBalance {...props} />)
    expect(enzymeWrapper.text()).toContain('-$13.37')
  })

  it('should not render if positive balance', () => {
    const props = {
      balance: 9001,
    }
    enzymeWrapper = shallow(<AccountBalance {...props} />)
    expect(enzymeWrapper.isEmptyRender()).toBe(true)
  })

  it('should not render if zero balance', () => {
    const props = {
      balance: 0,
    }
    enzymeWrapper = shallow(<AccountBalance {...props} />)
    expect(enzymeWrapper.isEmptyRender()).toBe(true)
  })

  it('should not render if no balance', () => {
    enzymeWrapper = shallow(<AccountBalance />)
    expect(enzymeWrapper.isEmptyRender()).toBe(true)
  })
})
