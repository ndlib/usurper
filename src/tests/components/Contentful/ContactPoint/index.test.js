import React from 'react'
import { shallow } from 'enzyme'
import ContactPoint from '../../../../components/Contentful/ContactPoint'
import Image from '../../../../components/Image'

const setup = (cfPageEntry) => {
  return shallow(<ContactPoint cfPageEntry={cfPageEntry} />)
}

let enzymeWrapper
describe('components/Contentful/ContactPoint/index', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      fields: {
        image: 'Fake image',
      },
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render Image for image', () => {
    expect(enzymeWrapper.containsMatchingElement(<Image cfImage={'Fake image'} />)).toBe(true)
  })
})
