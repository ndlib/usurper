import React from 'react'
import Contact from 'components/Contact'
import { shallow } from 'enzyme'

let enzymeWrapper
const setup = (props) => {
  return shallow(<Contact {...props} />)
}

describe('components/Contact/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    enzymeWrapper = setup({
      name: 'test_name',
      phone: '555.555.5555',
      email: 'test@nd.edu',
      addr1: '555 SR 1',
      addr2: '55555 Notre Dame, IN',
    })
  })

  it('should render name', () => {
    expect(enzymeWrapper.children().someWhere(n => n.text() === 'test_name')).toBe(true)
  })

  it('should render phone number with the tel: prefix', () => {
    expect(enzymeWrapper.containsMatchingElement(<a href="tel:555.555.5555" itemProp="telephone">555.555.5555</a>)).toBe(true)
  })

  it('should render email with the mailto: prefix', () => {
    expect(enzymeWrapper.containsMatchingElement(<a href="mailto:test@nd.edu" itemProp="email">test@nd.edu</a>)).toBe(true)
  })

  it('should render the address on multiple lines', () => {
    expect(enzymeWrapper.find('address').children().length).toBe(4)
  })
})
