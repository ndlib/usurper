import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/Interactive/DateFilter/presenter'
import Link from 'components/Interactive/Link'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/Interactive/DateFilter/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      yearCallback: jest.fn(),
      expanded: ['2018'],
      entryDates: {
        '2017': {
          '0': {
            url: null,
            display: 'Jan',
            count: 1,
          },
          '11': {
            url: '/sample/url/201712',
            display: 'Dec',
            count: 3,
          },
        },
        '2018': {
          '0': {
            url: '/sample/url/201801',
            display: 'Jan',
            count: 1,
          },
          '2': {
            url: '/sample/url/201803',
            display: 'Mar',
            count: 12,
          },
          '7': {
            url: '/sample/url/201808',
            display: 'Aug',
            count: 1,
          },
        },
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render a clickable list item for each year', () => {
    const list = enzymeWrapper.find('ul')
    expect(list.exists()).toBe(true)

    expect(Object.keys(props.entryDates).length).toBeGreaterThan(0)
    Object.keys(props.entryDates).forEach((year) => {
      const yearElement = list.findWhere(el => el.type() === 'a' && el.text() === year)
      expect(yearElement.exists()).toBe(true)
      expect(yearElement.props().onClick).toEqual(props.yearCallback)
      expect(yearElement.parents().find('li').exists()).toBe(true)
    })
  })

  it('should not show list items for non-expanded year', () => {
    const li = enzymeWrapper.findWhere(el => el.type() === 'a' && el.text() === '2017').closest('li')
    const childList = li.find('ul')
    expect(childList.exists()).toBe(true)
    expect(childList.hasClass('hidden'))
  })

  it('should render list items for each month that has entries in a year', () => {
    expect(Object.keys(props.entryDates).length).toBeGreaterThan(0)
    Object.keys(props.entryDates).forEach((year) => {
      const li = enzymeWrapper.findWhere(el => el.type() === 'a' && el.text() === year).closest('li')
      const childList = li.find('ul')
      expect(childList.exists()).toBe(true)

      expect(Object.keys(props.entryDates[year]).length).toBeGreaterThan(0)
      Object.keys(props.entryDates[year]).forEach((month) => {
        const link = childList.findWhere(el => el.type() === Link && el.props().to === props.entryDates[year][month].url)
        expect(link.exists()).toBe(true)
        expect(link.props().children).toEqual(expect.stringMatching(props.entryDates[year][month].display))
        expect(link.props().children).toEqual(expect.stringMatching(`(${props.entryDates[year][month].count})`))
      })
    })
  })
})
