import React from 'react'
import { shallow } from 'enzyme'

import AccountPageWrapper from 'components/Account/AccountPageWrapper/presenter'
import PageTitle from 'components/Layout/PageTitle'
import UserMenu from 'components/Layout/Navigation/UserMenu'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import StaticBody from 'components/Contentful/StaticContent/Body'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import InlineLoading from 'components/Messages/InlineLoading'
global.__APP_CONFIG__.features.loginEnabled = true
const setup = (props) => {
  return shallow(<AccountPageWrapper {...props} />)
}

let enzymeWrapper
let props

describe('components/Account/AccountPageWrapper', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('while loading', () => {
    beforeEach(() => {
      props = {
        loading: true,
        title: 'Made up Title',
        slug: 'made-up-slug',
        preview: false,
        className: 'accountPageClass',
        children: <span id='lookForMe' />,
      }
      enzymeWrapper = setup(props)
    })

    it('should render title and menu for My Account section', () => {
      const find = <PageTitle><UserMenu format='buttons' subheading={props.title} /></PageTitle>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render title for specific page', () => {
      const find = <PageTitle title={props.title} hideInPage />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render static content', () => {
      expect(enzymeWrapper.containsMatchingElement(
        <StaticAlert slug={props.slug} preview={props.preview} hideLoading />
      )).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(
        <StaticBody slug={props.slug} preview={props.preview} hideLoading />
      )).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(
        <StaticSidebar slug={props.slug} preview={props.preview} />
      )).toBe(true)
    })

    it('should render InlineLoading', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(true)
    })

    it('should not render children', () => {
      expect(enzymeWrapper.find(props.className).exists()).toBe(false)
      expect(enzymeWrapper.find('#lookForMe').exists()).toBe(false)
    })
  })

  describe('after load', () => {
    beforeEach(() => {
      props = {
        loading: false,
        title: 'Made up Title',
        slug: 'made-up-slug',
        preview: true,
        className: 'accountPageClass',
        children: <span id='lookForMe' />,
      }
      enzymeWrapper = setup(props)
    })

    it('should render title and menu for My Account section', () => {
      const find = <PageTitle><UserMenu format='buttons' subheading={props.title} /></PageTitle>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render title for specific page', () => {
      const find = <PageTitle title={props.title} hideInPage />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render static content', () => {
      expect(enzymeWrapper.containsMatchingElement(
        <StaticAlert slug={props.slug} preview={props.preview} hideLoading />
      )).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(
        <StaticBody slug={props.slug} preview={props.preview} hideLoading />
      )).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(
        <StaticSidebar slug={props.slug} preview={props.preview} />
      )).toBe(true)
    })

    it('should render children in element with provided className', () => {
      const contentWrapper = enzymeWrapper.find(props.className)
      expect(contentWrapper.exists()).toBe(false)
      expect(contentWrapper.find('#lookForMe').exists()).toBe(false)
    })

    it('should not render InlineLoading', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(false)
    })
  })

  describe('with custom sidebar', () => {
    beforeEach(() => {
      props = {
        loading: false,
        title: 'Made up Title',
        slug: 'made-up-slug',
        preview: true,
        className: 'accountPageClass',
        children: <span id='lookForMe' />,
        customSidebar: <span id='lookForMeSidebar' />,
      }
      enzymeWrapper = setup(props)
    })

    it('should not render static sidebar', () => {
      expect(enzymeWrapper.find(StaticSidebar).exists()).toBe(false)
    })

    it('should render component passed in', () => {
      expect(enzymeWrapper.find('#lookForMeSidebar').exists()).toBe(true)
    })
  })
})
