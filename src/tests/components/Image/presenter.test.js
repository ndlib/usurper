import React from 'react'
import Image from '../../../components/Image/presenter'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let enzymeWrapper
const setup = (props) => {
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
    it('should return image with no source', () => {
      setup({})
      expect(enzymeWrapper.containsMatchingElement(<img src={undefined} />)).toBe(true)
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
