import React from 'react'
import { shallow } from 'enzyme'

import EventCard from 'components/EventCard'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import Tags from 'components/Interactive/Tags'
import LibMarkdown from 'components/LibMarkdown'

const testEntry = {
  slug: 'i am slug',
  title: 'i r title',
  shortDescription: 'we is description',
  startDate: new Date(),
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

  describe('not on home page', () => {
    beforeEach(() => {
      props = {
        entry: testEntry,
        isHome: false,
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

    it('should render Tags', () => {
      expect(enzymeWrapper.find(Tags).exists()).toBe(true)
    })

    it('should display date and time', () => {
      expect(enzymeWrapper.find('.date').exists()).toBe(true)
      expect(enzymeWrapper.find('.time').exists()).toBe(true)
    })
  })

  describe('on home page', () => {
    beforeEach(() => {
      props = {
        entry: testEntry,
        isHome: true,
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

    it('should not render Tags', () => {
      expect(enzymeWrapper.find(Tags).exists()).toBe(false)
    })

    it('should display date differently', () => {
      expect(enzymeWrapper.find('.date').exists()).toBe(false)
      expect(enzymeWrapper.find('.dateBlock').exists()).toBe(true)
    })
  })
})
