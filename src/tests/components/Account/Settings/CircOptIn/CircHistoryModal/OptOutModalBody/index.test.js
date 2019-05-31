import React from 'react'
import { shallow } from 'enzyme'

import OptOutModalBody from 'components/Account/Settings/CircOptIn/CircHistoryModal/OptOutModalBody'

let enzymeWrapper

const setup = (props) => {
  return shallow(<OptOutModalBody {...props} />)
}

describe('components/Account/Settings/CircOptIn/CircHistoryModal/OptOutModalBody', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    enzymeWrapper = setup()
  })

  it('should render a title', () => {
    const found = enzymeWrapper.find('#checkoutHistoryModalTitle')
    expect(found.exists()).toBe(true)
    expect(found.text()).not.toEqual('')
  })

  it('should render a description', () => {
    const found = enzymeWrapper.find('#checkoutHistoryModalDesc')
    expect(found.exists()).toBe(true)
    expect(found.text()).not.toEqual('')
  })
})