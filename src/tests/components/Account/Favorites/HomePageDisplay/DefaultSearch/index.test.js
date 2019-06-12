import React from 'react'
import { shallow } from 'enzyme'

import DefaultSearch from 'components/Account/Favorites/HomePageDisplay/DefaultSearch'
import RadioList from 'components/Interactive/RadioList'

let enzymeWrapper

const setup = (props) => {
  return shallow(<DefaultSearch {...props} />)
}

describe('components/Account/Favorites/HomePageDisplay/DefaultSearch', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  const props = {
    onChange: jest.fn(),
    defaultValue: 'search type',
  }
  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  it('should render a RadioList', () => {
    const radio = enzymeWrapper.find(RadioList)
    expect(radio.exists()).toBe(true)
    expect(radio.props().defaultValue).toEqual(props.defaultValue)
    expect(radio.props().onChangeCallback).toEqual(props.onChange)
  })

  it('should render a subheading', () => {
    expect(enzymeWrapper.find('h4').exists()).toBe(true)
  })
})