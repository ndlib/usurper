import React from 'react'
import { shallow } from 'enzyme'

import OptInModalBody from 'components/Account/CirculationHistory/CircHistoryModal/OptInModalBody'

let enzymeWrapper

const setup = (props) => {
  return shallow(<OptInModalBody {...props} />)
}

describe('components/Account/CirculationHistory/CircHistoryModal/OptInModalBody', () => {
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