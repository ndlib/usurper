import React from 'react'
import Image from '../../../components/Image/presenter'
import { shallow } from 'enzyme'

let enzymeWrapper
function setup (props) {
  enzymeWrapper = shallow(<Image {...props} />)
}

describe('components/Image/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with src', () => {
    it('should return img with src', () => {
      setup({ src: 'foo' })
      expect(enzymeWrapper.containsMatchingElement(<img src='foo' />)).toBe(true)
    })
  })

  describe('with no src', () => {
    it('should return null', () => {
      setup({})
      expect(enzymeWrapper.equals(null)).toBe(true)
    })
  })

  describe('with alt', () => {
    it('should return img with src', () => {
      setup({ src: 'foo', alt: 'bar' })
      expect(enzymeWrapper.containsMatchingElement(<img alt='bar' />)).toBe(true)
    })
  })

  describe('with className', () => {
    it('should return img with src', () => {
      setup({ src: 'foo', className: 'bar' })
      expect(enzymeWrapper.containsMatchingElement(<img className='bar' />)).toBe(true)
    })
  })
})
