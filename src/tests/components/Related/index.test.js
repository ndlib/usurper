import React from 'react'
import Related from '../../../components/Related'
import { shallow } from 'enzyme'
import Link from '../../../components/Link'
import Image from '../../../components/Image'

let enzymeWrapper
function setup (props) {
  return shallow(<Related {...props} />)
}

describe('components/Related/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with children', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        children: [
          {
            fields: {
              slug: 'foo',
              image: 'fooImage',
              title: 'fooTitle',
            },
          },
          {
            fields: {
              url: 'bar',
              image: 'barImage',
              title: 'barTitle',
            },
          },
        ]
      })
    })

    it('should render all children as li elements', () => {
      expect(enzymeWrapper.find('li').length).toBe(2)
    })

    it('should render all childrens links', () => {
      expect(enzymeWrapper.findWhere(n => n.type() === Link && n.props().to === 'foo').exists()).toBe(true)
      expect(enzymeWrapper.findWhere(n => n.type() === Link && n.props().to === 'bar').exists()).toBe(true)
    })

    it('should render all childrens images', () => {
      expect(enzymeWrapper.findWhere(n => n.type() === Image && n.props().cfImage === 'fooImage').exists()).toBe(true)
      expect(enzymeWrapper.findWhere(n => n.type() === Image && n.props().cfImage === 'barImage').exists()).toBe(true)
    })

    it('should render all childrens titles', () => {
      expect(enzymeWrapper.findWhere(n => n.type() === 'span' && n.text() === 'fooTitle').exists()).toBe(true)
      expect(enzymeWrapper.findWhere(n => n.type() === 'span' && n.text() === 'barTitle').exists()).toBe(true)
    })
  })

  describe('with no children', () => {
    beforeEach(() => {
      enzymeWrapper = setup({})
    })

    it('should render null', () => {
      expect(enzymeWrapper.equals(null)).toBe(true)
    })
  })
})
