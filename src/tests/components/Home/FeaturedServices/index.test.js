import React from 'react'
import { shallow } from 'enzyme'

import FeaturedServices from 'components/Home/FeaturedServices'
import ServiceLink from 'components/Home/FeaturedServices/ServiceLink'

describe('components/Home/FeaturedServices', () => {
  it('should render at least one ServiceLink', () => {
    const enzymeWrapper = shallow(<FeaturedServices />)
    expect(enzymeWrapper.find(ServiceLink).exists()).toBe(true)
  })
})
