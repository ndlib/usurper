import React from 'react'
import { shallow } from 'enzyme'
import LibLink from '../../../components/Link'
import { Link } from 'react-router-dom'

const setup = (props) => {
  return shallow(<LibLink {...props} />)
}

let enzymeWrapper
describe('components/Link', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('on Internal url', () => {
    describe('with children', () => {
      beforeEach(() => {
        enzymeWrapper = setup({
          to: '/internal',
          className: 'testClass',
          children: <div />,
        })
      })

      it('should render Link with children', () => {
        expect(enzymeWrapper.find('Link').childAt(0).type()).toBe('div')
      })
    })

    describe('with query', () => {
      it('should render with the correct single query string', () => {
        enzymeWrapper = setup({
          to: '/internal',
          query: {
            foo: 'bar',
          },
        })
        expect(enzymeWrapper.containsMatchingElement(<Link to='/internal?foo=bar' />)).toBe(true)
      })

      it('should render with the correct multi query', () => {
        enzymeWrapper = setup({
          to: '/internal',
          query: {
            foo: 'bar',
            bar: 'baz',
          },
        })
        expect(enzymeWrapper.containsMatchingElement(<Link to='/internal?foo=bar&bar=baz' />)).toBe(true)
      })
    })

    beforeEach(() => {
      enzymeWrapper = setup({
        to: '/internal',
        className: 'testClass',
        title: 'foo',
      })
    })

    it('should render a react Link', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to='/internal' />)).toBe(true)
    })

    it('should render a react Link with title tag', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to='/internal' title='foo' />)).toBe(true)
    })

    it('should render a react Link with the correct class', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to='/internal' className='testClass' />)).toBe(true)
    })
  })

  describe('on External url', () => {
    describe('with children', () => {
      beforeEach(() => {
        enzymeWrapper = setup({
          to: 'http://example.org',
          className: 'testClass',
          children: <div />,
        })
      })

      it('should render an a tag with children', () => {
        expect(enzymeWrapper.find('a').childAt(0).type()).toBe('div')
      })
    })

    describe('with query', () => {
      it('should render with the correct single query string', () => {
        enzymeWrapper = setup({
          to: 'http://example.org',
          query: {
            foo: 'bar',
          },
        })
        expect(enzymeWrapper.containsMatchingElement(<a href='http://example.org?foo=bar' />)).toBe(true)
      })

      it('should render with the correct multi query', () => {
        enzymeWrapper = setup({
          to: 'http://example.org',
          query: {
            foo: 'bar',
            bar: 'baz',
          },
        })
        expect(enzymeWrapper.containsMatchingElement(<a href='http://example.org?foo=bar&bar=baz' />)).toBe(true)
      })
    })

    beforeEach(() => {
      enzymeWrapper = setup({
        to: 'http://example.org',
        className: 'testClass',
        title: 'foo',
      })
    })

    it('should render an a tag', () => {
      expect(enzymeWrapper.containsMatchingElement(<a href='http://example.org' />)).toBe(true)
    })

    it('should render an a tag with title tag', () => {
      expect(enzymeWrapper.containsMatchingElement(<a title='foo' />)).toBe(true)
    })

    it('should render an a tag with the correct classname', () => {
      expect(enzymeWrapper.containsMatchingElement(<a className='testClass' />)).toBe(true)
    })
  })

  describe('on null link', () => {
    describe('with children', () => {
      beforeEach(() => {
        enzymeWrapper = setup({
          to: null,
          className: 'testClass',
          children: <div />,
        })
      })

      it('should render a div tag with children', () => {
        expect(enzymeWrapper.first('div').childAt(0).type()).toBe('div')
      })
    })

    beforeEach(() => {
      enzymeWrapper = setup({
        to: null,
        className: 'testClass',
        alt: 'foo',
      })
    })

    it('should render a div instead', () => {
      expect(enzymeWrapper.containsMatchingElement(<div />)).toBe(true)
    })

    it('should render a div with NO alt tag', () => {
      expect(enzymeWrapper.containsMatchingElement(<div alt='foo' />)).toBe(false)
    })

    it('should render a div with the correct class', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='testClass' />)).toBe(true)
    })
  })

  describe('on hidden with null link', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        to: null,
        hideIfNull: true,
      })
    })

    it('should render null', () => {
      expect(enzymeWrapper.equals(null)).toBe(true)
    })
  })
})
