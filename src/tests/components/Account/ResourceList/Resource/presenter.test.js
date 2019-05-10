import React from 'react'
import { shallow } from 'enzyme'

import Resource from 'components/Account/ResourceList/Resource/presenter'
import Actions from 'components/Account/ResourceList/Resource/Actions'
import Cards from 'components/Account/ResourceList/Resource/Cards'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Resource {...props} />)
}

describe('components/Account/ResourceList/Resource/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with list type having actions', () => {
    beforeEach(() => {
      props = {
        item: {
          title: 'foobar',
        },
        listType: 'history',
      }
      enzymeWrapper = setup(props)
    })

    it('should render Cards component with props', () => {
      expect(enzymeWrapper.containsMatchingElement(<Cards {...props} />)).toBe(true)
    })

    it('should render Actions component', () => {
      expect(enzymeWrapper.find(Actions).exists()).toBe(true)
    })
  })

  describe('with no actions for list type', () => {
    beforeEach(() => {
      props = {
        item: {
          title: 'baz',
        },
        listType: 'blaaaaaaaaargh',
      }
      enzymeWrapper = setup(props)
    })

    it('should render Cards component with props', () => {
      expect(enzymeWrapper.containsMatchingElement(<Cards {...props} />)).toBe(true)
    })

    it('should not render Actions component', () => {
      expect(enzymeWrapper.find(Actions).exists()).toBe(false)
    })
  })
})
