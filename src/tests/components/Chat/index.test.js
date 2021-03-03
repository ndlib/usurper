import React from 'react'
import { shallow } from 'enzyme'
import Chat from 'components/Chat'

let enzymeWrapper

const setup = (props) => {
  return shallow(<Chat {...props} />)
}

describe('components/Chat', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    enzymeWrapper = setup()
  })

  it('should render a div for libraryh3lp with iframe inside', () => {
    const element = enzymeWrapper.findWhere(el => el.type() === 'div' && el.hasClass('libraryh3lp'))
    expect(element.exists()).toBe(true)
    expect(element.find('iframe').exists()).toBe(true)
  })
})
