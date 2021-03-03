import React from 'react'
import { shallow, mount } from 'enzyme'

import SpaceCard from 'components/SpaceCard'
import ModalImage from 'components/Contentful/ModalImage'
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
          thumbnail: {
            image: 'path2',
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

  it('should render ModalImage', () => {
    const image = enzymeWrapper.find(ModalImage)
    expect(image.exists()).toBe(true)
    expect(image.props().photo).toEqual(props.entry.fields.photo)
    expect(image.props().thumbnail).toEqual(props.entry.fields.thumbnail)
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
