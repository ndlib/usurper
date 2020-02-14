import React from 'react'
import { shallow } from 'enzyme'

import EventCard from 'components/EventCard'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'

const testEntry = {
  slug: 'i am slug',
  title: 'i r title',
  shortDescription: 'we is description',
  displayDate: 'him b date',
  displayTime: 'her b time',
  locationText: 'them wer location',
  representationalImage: {
    somethin: 'it am image',
  },
}

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<EventCard {...props} />)
}

describe('components/EventCard', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('with flags on', () => {
    beforeEach(() => {
      props = {
        entry: testEntry,
        showDescription: true,
        showImage: true,
      }
      enzymeWrapper = setup(props)
    })

    it('should render link to event page', () => {
      const link = enzymeWrapper.find(Link).first()
      expect(link.exists()).toBe(true)
      expect(link.props().to.startsWith(`/event/${props.entry.slug}`)).toBe(true)
    })

    it('should render Image', () => {
      expect(enzymeWrapper.containsMatchingElement(<Image cfImage={props.entry.representationalImage} />)).toBe(true)
    })

    it('should render description in markdown', () => {
      expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>{props.entry.shortDescription}</LibMarkdown>)).toBe(true)
    })
  })

  describe('with flags off', () => {
    beforeEach(() => {
      props = {
        entry: testEntry,
        showDescription: false,
        showImage: false,
      }
      enzymeWrapper = setup(props)
    })

    it('should render link to event page', () => {
      const link = enzymeWrapper.find(Link).first()
      expect(link.exists()).toBe(true)
      expect(link.props().to.startsWith(`/event/${props.entry.slug}`)).toBe(true)
    })

    it('should not render Image', () => {
      expect(enzymeWrapper.find(Image).exists()).toBe(false)
    })

    it('should not render description in markdown', () => {
      expect(enzymeWrapper.find(LibMarkdown).exists()).toBe(false)
    })
  })
})
