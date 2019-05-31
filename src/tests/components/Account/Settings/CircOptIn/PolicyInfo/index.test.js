import React from 'react'
import { shallow } from 'enzyme'

import PolicyInfo from 'components/Account/Settings/CircOptIn/PolicyInfo'

let enzymeWrapper

const setup = (props) => {
  return shallow(<PolicyInfo {...props} />)
}

describe('components/Account/Settings/CircOptIn/PolicyInfo', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    enzymeWrapper = setup()
  })

  it('should render a list of bullets with text', () => {
    const ul = enzymeWrapper.find('ul')
    expect(ul.exists()).toBe(true)
    const li = ul.find('li')
    expect(li.length).toBeGreaterThan(0)
    li.forEach((current) => {
      expect(current.text()).not.toEqual('')
    })
  })
})