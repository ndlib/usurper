import React from 'react'
import { shallow } from 'enzyme'

import Card from 'components/Account/ResourceList/Resource/Cards/Card'

let enzymeWrapper

const setup = (props) => {
  return shallow(<Card {...props} />)
}

describe('components/Account/ResourceList/Resource/Cards/Card', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render children when provided instead of value', () => {
    const props = {
      children: <div>just a child</div>,
      value: 'test the things',
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.containsMatchingElement(props.children)).toBe(true)
    expect(enzymeWrapper.findWhere((el) => el.text() === props.value).exists()).toBe(false)
  })

  it('should render value if no children', () => {
    const props = {
      value: 'test the things',
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.findWhere((el) => el.text() === props.value).exists()).toBe(true)
  })
})
