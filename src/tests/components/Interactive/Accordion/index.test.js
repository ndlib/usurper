import React from 'react'
import { shallow } from 'enzyme'
import Accordion from 'components/Interactive/Accordion'

const setup = (props) => {
  return shallow(<Accordion {...props} />)
}

let enzymeWrapper
let props
let resizer

const bodyNode = <div>Test for me!</div>

describe('components/Interactive/Accordion', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('event listeners', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn(() => {
          return { matches: false }
        })
      })
      window.addEventListener = jest.fn()
      window.removeEventListener = jest.fn()

      props = {
        header: 'Header Text',
        children: bodyNode,
      }

      enzymeWrapper = setup(props)
    })

    it('should add resize event listener during mounting', () => {
      expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    })

    it('should remove resize event listener during unmounting', () => {
      expect(window.removeEventListener).not.toHaveBeenCalled()
      enzymeWrapper.unmount()
      expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    })
  })

  describe('when mobile view', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn(() => {
          return { matches: false }
        })
      })

      props = {
        header: 'Header Text',
        headerClassName: 'testHeaderClass',
        children: bodyNode,
        bodyClassName: 'bodyClass',
        mobileOnly: true,
      }

      enzymeWrapper = setup(props)
    })

    it('should render a proper header element', () => {
      const found = enzymeWrapper.findWhere(el => el.hasClass(props.headerClassName))
      expect(found.exists()).toBe(true)
      expect(found.text()).toEqual(props.header)
    })

    it('should render a proper body', () => {
      const found = enzymeWrapper.findWhere(el => el.hasClass(props.bodyClassName))
      expect(found.exists()).toBe(true)
      expect(found.containsMatchingElement(bodyNode)).toBe(true)
    })

    it('should toggle expanded state when clicking header', () => {
      const initialState = enzymeWrapper.state('expanded')

      const header = enzymeWrapper.findWhere(el => el.hasClass(props.headerClassName))
      header.simulate('click')
      expect(enzymeWrapper.state('expanded')).not.toEqual(initialState)
      // Now toggle it back to make sure it works the other direction
      header.simulate('click')
      expect(enzymeWrapper.state('expanded')).toEqual(initialState)
    })

    it('should disable collapsing when switching to desktop size', () => {
      expect(enzymeWrapper.findWhere(el => el.hasClass('collapseHandle')).exists()).toBe(true)

      // Pretend the window is desktop size
      window.matchMedia = jest.fn(() => {
        return { matches: true }
      })
      enzymeWrapper.instance().handleResize()

      expect(enzymeWrapper.findWhere(el => el.hasClass('collapseHandle')).exists()).toBe(false)
    })

    it('should disable collapsing when disabled prop set', () => {
      expect(enzymeWrapper.findWhere(el => el.hasClass('collapseHandle')).exists()).toBe(true)

      enzymeWrapper.setProps({
        disabled: true,
      })

      expect(enzymeWrapper.findWhere(el => el.hasClass('collapseHandle')).exists()).toBe(false)
    })
  })

  describe('when not mobile view', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn(() => {
          return { matches: true }
        })
      })
    })

    describe('with mobileOnly = true', () => {
      beforeEach(() => {
        props = {
          header: 'Header Text',
          headerClassName: 'testHeaderClass',
          children: bodyNode,
          bodyClassName: 'bodyClass',
          mobileOnly: true,
        }

        enzymeWrapper = setup(props)
      })

      it('should not enable collapsing or accordion styles', () => {
        expect(enzymeWrapper.findWhere(el => el.hasClass('collapseHandle')).exists()).toBe(false)
        expect(enzymeWrapper.findWhere(el => el.hasClass('accordionBody')).exists()).toBe(false)
      })
    })

    describe('with mobileOnly = false', () => {
      beforeEach(() => {
        props = {
          header: 'Header Text',
          headerClassName: 'testHeaderClass',
          children: bodyNode,
          bodyClassName: 'bodyClass',
          mobileOnly: false,
        }

        enzymeWrapper = setup(props)
      })

      it('should enable collapsing and accordion styles', () => {
        expect(enzymeWrapper.findWhere(el => el.hasClass('collapseHandle')).exists()).toBe(true)
        expect(enzymeWrapper.findWhere(el => el.hasClass('accordionBody')).exists()).toBe(true)
      })
    })
  })
})
