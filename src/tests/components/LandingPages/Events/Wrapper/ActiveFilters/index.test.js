import React from 'react'
import { shallow } from 'enzyme'

import ActiveFilters from 'components/LandingPages/Events/Wrapper/ActiveFilters'
import Tags from 'components/Interactive/Tags'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ActiveFilters {...props} />)
}

describe('components/LandingPages/Events/Wrapper/ActiveFilters', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      audienceFilter: ['me', 'you'],
      typeFilter: ['people'],
      onRemove: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render removable tags', () => {
    const found = enzymeWrapper.find(Tags)
    expect(found.exists()).toBe(true)
    expect(found.props().hasRemove).toBe(true)
  })
})