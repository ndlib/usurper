import React from 'react'
import { shallow } from 'enzyme'

import ServiceLink from 'components/Home/FeaturedServices/ServiceLink'
import Link from 'components/Interactive/Link'

const setup = (props) => {
  return shallow(<ServiceLink {...props} />)
}

let enzymeWrapper
let props

describe('components/Home/FeaturedServices/ServiceLink', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      url: 'test.url',
      title: 'A Page Link!',
      icon: 'path/to/icon',
    }
    enzymeWrapper = setup(props)
  })

  it('should render an image', () => {
    const found = enzymeWrapper.find('.featured-service-image')
    expect(found.exists()).toBe(true)
    expect(found.props().src).toEqual('path/to/icon')
  })

  it('should render a Link', () => {
    const found = enzymeWrapper.find(Link)
    expect(found.exists()).toBe(true)
    expect(found.props().to).toEqual('test.url')
    expect(found.props().title).toEqual('A Page Link!')
  })

  it('should render title text', () => {
    const found = enzymeWrapper.find('.featured-service-title')
    expect(found.exists()).toBe(true)
    expect(found.text()).toEqual('A Page Link!')
  })
})
