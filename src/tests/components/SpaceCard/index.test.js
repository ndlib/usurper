import React from 'react'
import { shallow, mount } from 'enzyme'

import SpaceCard from 'components/SpaceCard'
import Image from 'components/Image'
import LibMarkdown from 'components/LibMarkdown'
import Link from 'components/Interactive/Link'
import FacetTags from 'components/Interactive/FacetTags'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<SpaceCard {...props} />)
}

describe('components/SpaceCard', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      entry: {
        sys: {},
        fields: {
          title: 'entry title',
          description: 'enter description here',
          reservationUrl: 'link.here',
          photo: {
            image: 'path',
          },
          floor: {
            fields: {
              slug: 'floor slug',
              title: 'floor title',
            },
          },
        },
      },
      facets: [
        {
          foo: 'bar',
        },
      ],
      onTagClick: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render Link to reserve space', () => {
    const link = enzymeWrapper.find(Link).first()
    expect(link.exists()).toBe(true)
    expect(link.props().to).toEqual(props.entry.fields.reservationUrl)
  })

  it('shoul render Image', () => {
    const image = enzymeWrapper.find(Image)
    expect(image.exists()).toBe(true)
    expect(image.props().cfImage).toEqual(props.entry.fields.photo)
  })

  it('should render description in markdown', () => {
    expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>{props.entry.fields.description}</LibMarkdown>)).toBe(true)
  })

  it('should render FacetTags', () => {
    const tags = enzymeWrapper.find(FacetTags)
    expect(tags.exists()).toBe(true)
    expect(tags.props().facets).toEqual(props.facets)
  })
})
