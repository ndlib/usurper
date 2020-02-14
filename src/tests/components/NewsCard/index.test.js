import React from 'react'
import { shallow } from 'enzyme'

import NewsCard from 'components/NewsCard'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'

const testEntry = {
  fields: {
    slug: 'i am slug',
    title: 'i r title',
    shortDescription: 'we is description',
    image: {
      somethin: 'it am image',
    },
  },
}

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<NewsCard {...props} />)
}

describe('components/NewsCard', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      entry: testEntry,
      showDescription: true,
      showImage: true,
    }
    enzymeWrapper = setup(props)
  })

  it('should render link to news page', () => {
    const link = enzymeWrapper.find(Link).first()
    expect(link.exists()).toBe(true)
    expect(link.props().to.startsWith(`/news/${props.entry.fields.slug}`)).toBe(true)
  })

  it('should render Image', () => {
    expect(enzymeWrapper.containsMatchingElement(<Image cfImage={props.entry.fields.image} />)).toBe(true)
  })

  it('should render description in markdown', () => {
    expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>{props.entry.fields.shortDescription}</LibMarkdown>)).toBe(true)
  })
})
