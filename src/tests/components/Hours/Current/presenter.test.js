import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/Hours/Current/presenter'
import { hoursOpenStatus } from 'constants/hours'

const children = <div>I show stuff</div>
const setup = (props) => {
  return shallow(<Presenter {...props}>{children}</Presenter>)
}

let enzymeWrapper
let props

describe('components/Hours/Current/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      hoursEntry: {
        name: 'A place',
        today: {
          rendered: 'Open 24 hours',
        },
        servicePoint: {
          address: '1337 Road Rd',
          hoursCode: '12345678',
          type: 'Library',
          slug: 'slugger',
        },
        weeks: [
          {},
        ],
        upcomingChangedHours: {},
      },
      openStatus: hoursOpenStatus.OPEN,
      expanded: false,
      toggleExpanded: jest.fn(),
    }

    enzymeWrapper = setup(props)
  })

  it('should include appropriate schemaType', () => {
    expect(enzymeWrapper.findWhere(el => el.props().itemType === 'http://schema.org/Library').exists()).toBe(true)
    expect(enzymeWrapper.findWhere(el => el.props().itemType === 'http://schema.org/ContactPoint').exists()).toBe(false)

    // Now try a different type of service point
    enzymeWrapper = setup({
      ...props,
      hoursEntry: {
        ...props.hoursEntry,
        servicePoint: {
          address: '1337 Road Rd',
          hoursCode: '12345678',
          type: 'SomethingElse',
          slug: 'slugger',
        },
      },
    })
    expect(enzymeWrapper.findWhere(el => el.props().itemType === 'http://schema.org/Library').exists()).toBe(false)
    expect(enzymeWrapper.findWhere(el => el.props().itemType === 'http://schema.org/ContactPoint').exists()).toBe(true)
  })

  it('should style service point based on status', () => {
    // First of all, make sure we can identify the correct container element
    const sp = enzymeWrapper.find('.service-point')
    expect(sp.exists()).toBe(true)

    enzymeWrapper = setup({ ...props, openStatus: hoursOpenStatus.CLOSED })
    // We need to find the service point element each time since we have a new wrapper
    enzymeWrapper.find('.service-point').hasClass('closed')

    enzymeWrapper = setup({ ...props, openStatus: hoursOpenStatus.OPEN })
    enzymeWrapper.find('.service-point').hasClass('open')

    enzymeWrapper = setup({ ...props, openStatus: hoursOpenStatus.PARTIALLY_OPEN })
    enzymeWrapper.find('.service-point').hasClass('swipe-only')

    enzymeWrapper = setup({ ...props, openStatus: 'invalid status' })
    enzymeWrapper.find('.service-point').hasClass('closed')
  })

  describe('collapsed', () => {
    beforeEach(() => {
      props = {
        ...props,
        expanded: false,
        toggleExpanded: jest.fn(),
      }

      enzymeWrapper = setup(props)
    })

    it('should not render hours details', () => {
      const found = enzymeWrapper.find('.hours-listing')
      expect(found.exists()).toBe(false)
    })
  })

  describe('expanded', () => {
    beforeEach(() => {
      props = {
        ...props,
        expanded: true,
        toggleExpanded: jest.fn(),
      }

      enzymeWrapper = setup(props)
    })

    it('should render children in hours details', () => {
      const found = enzymeWrapper.find('.hours-listing')
      expect(found.exists()).toBe(true)
      expect(found.containsMatchingElement(children)).toBe(true)
    })
  })
})
