import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/Hours/Current/WeeklyHours/presenter'

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

let enzymeWrapper
let props

describe('components/Hours/WeeklyHours/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('with hours data', () => {
    beforeEach(() => {
      props = {
        hours: [
          {
            rendered: 'some ridiculous text that would never be a substring',
            title: 'more ridiculous text, ya know',
          },
          {
            rendered: 'at least 2 records to make sure it works',
            title: 'I like writing non-sense test data',
          },
        ],
        title: 'this-week-display',
        effectiveDate: 'thisIsTheEffectiveDate',
        showEffectiveDates: true,
      }
      enzymeWrapper = setup(props)
    })

    it('should show title text', () => {
      expect(enzymeWrapper.findWhere(el => el.text() === props.title).exists()).toBe(true)
    })

    it('should show the effective dates', () => {
      expect(enzymeWrapper.findWhere(el => el.text().includes(props.effectiveDate)).exists()).toBe(true)
    })

    it('should have a dl for the list of rows', () => {
      expect(enzymeWrapper.find('dl.hours-grid').exists()).toBe(true)
    })

    it('should have a row for the hours', () => {
      const rows = enzymeWrapper.find('dl > *')
      expect(rows.exists()).toBe(true)
      expect(rows).toHaveLength(props.hours.length)

      rows.forEach(row => {
        // Make sure the row we found contains the data from one of the test data "hours" entries we passed in
        expect(row.findWhere(el => props.hours.some(propHours => el.text().includes(propHours.title))).exists()).toBe(true)
        expect(row.findWhere(el => props.hours.some(propHours => el.text().includes(propHours.rendered))).exists()).toBe(true)
      })
    })
  })

  describe('with no hours data', () => {
    beforeEach(() => {
      props = {
        hours: [],
        title: 'this-week-display',
        effectiveDate: 'thisIsTheEffectiveDate',
        showEffectiveDates: true,
      }
      enzymeWrapper = setup(props)
    })

    it('should render nothing', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })
})
