import React from 'react'
import { shallow } from 'enzyme'

import HideHomeFavorites from 'components/Account/Favorites/HomePageDisplay/HideHomeFavorites'
import RadioList from 'components/Interactive/RadioList'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<HideHomeFavorites {...props} />)
}

describe('components/Account/Favorites/HomePageDisplay/HideHomeFavorites', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      defaultChecked: true,
    }
    enzymeWrapper = setup(props)
  })

  it('should render a checkbox', () => {
    const input = enzymeWrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.props().type).toEqual('checkbox')
    expect(input.props().defaultChecked).toEqual(props.defaultChecked)
    expect(input.props().onChange).toEqual(props.onChange)
  })

  it('should render a subheading', () => {
    expect(enzymeWrapper.find('h4').exists()).toBe(true)
  })
})