import React from 'react'
import { shallow } from 'enzyme'

import TitleCard from 'components/Account/ResourceList/Resource/Cards/TitleCard'
import CoinsObject from 'components/Account/ResourceList/Resource/CoinsObject'
import Link from 'components/Interactive/Link'
import Config from 'shared/Configuration'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<TitleCard {...props} />)
}

describe('components/Account/ResourceList/Resource/Cards/TitleCard', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('non-ILL item', () => {
    beforeEach(() => {
      props = {
        title: 'Boo',
        docNumber: 1234,
        documentType: 'BOOK',
        published: 'Philadelphia, PA',
      }
      enzymeWrapper = setup(props)
    })

    it('should render title as a link to OneSearch', () => {
      const container = enzymeWrapper.find('.title')
      expect(container.exists()).toBe(true)

      const found = container.find(Link)
      expect(found.exists()).toBe(true)
      expect(found.props().to.startsWith(Config.onesearchBaseURL)).toBe(true)
      expect(found.props().children).toEqual(props.title)
    })

    it('should render publication details', () => {
      const found = enzymeWrapper.find('.published')
      expect(found.exists()).toBe(true)
      expect(found.props().value).toEqual(props.published)
    })

    it('should render a COinS object with props', () => {
      expect(enzymeWrapper.containsMatchingElement(<CoinsObject {...props} />)).toBe(true)
    })
  })

  describe('ILL item', () => {
    beforeEach(() => {
      props = {
        title: 'Blargh',
        itemNumberNumber: 1234,
        documentType: 'JOUR',
        published: 'Who knows',
        from: 'ILL',
      }
      enzymeWrapper = setup(props)
    })

    it('should render title as a link to ILLiad', () => {
      const container = enzymeWrapper.find('.title')
      expect(container.exists()).toBe(true)

      const found = container.find(Link)
      expect(found.exists()).toBe(true)
      expect(found.props().to.startsWith(Config.illiadBaseURL)).toBe(true)
      expect(found.props().children).toEqual(props.title)
    })

    it('should render publication details', () => {
      const found = enzymeWrapper.find('.published')
      expect(found.exists()).toBe(true)
      expect(found.props().value).toEqual(props.published)
    })

    it('should render a COinS object with props', () => {
      expect(enzymeWrapper.containsMatchingElement(<CoinsObject {...props} />)).toBe(true)
    })
  })
})
