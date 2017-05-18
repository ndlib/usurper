import React from 'react'
import Contact from '../../../components/Contact'
import { shallow } from 'enzyme'

let enzymeWrapper
let children
const setup = (props) => {
  return shallow(<Contact {...props} />)
}

describe('components/Contact/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    children = undefined
  })

  beforeEach(() => {
    enzymeWrapper = setup({
      name: 'test_name',
      phone: '555.555.5555',
      email: 'test@nd.edu',
      addr1: '555 SR 1',
      addr2: '55555 Notre Dame, IN',
    })
    children = enzymeWrapper.children()
  })

  it('should render name', () => {
    expect(children.someWhere(n => n.text() === 'test_name')).toBe(true)
  })

  it('should render phone number with the tel: prefix', () => {
    expect(children.someWhere(n => n.type() === 'a' && n.props().href === 'tel:555.555.5555')).toBe(true)
  })

  it('should render email with the mailto: prefix', () => {
    expect(children.someWhere(n => n.type() === 'a' && n.props().href === 'mailto:test@nd.edu')).toBe(true)
  })

  it('should render the address on multiple lines', () => {
    expect(children.findWhere(n => n.text() === '555 SR 1').length).toBe(1)
    expect(children.findWhere(n => n.text() === '55555 Notre Dame, IN').length).toBe(1)
  })
})
