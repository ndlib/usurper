import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Hours/HomePage/presenter'
import Link from '../../../../components/Link'

const setup = (hoursEntry) => {
  return shallow(PagePresenter(hoursEntry))
}

describe('components/Hours/HomePage/presenter', () => {
  let enzymeWrapper

  beforeEach(() => {
    enzymeWrapper = setup({
      hoursEntry: {
        today: {
          date: 'today-date',
          rendered: 'today-display',
          opens: 'opens-time',
          closes: 'closes-time',
        },
        thisWeek: {
          display: 'this-week-display',
          rows:[
            {
              fromDay: 'rows-from-day',
              toDay: 'rows-to-day',
              display: 'rows-display',
              rowDisplay: 'rows-row-display',
            },
          ],
          dates: ['2017-05-14', '2017-05-15', '2017-05-16', '2017-05-17', '2017-05-18', '2017-05-19', '2017-05-20'],
        },
        upcomingDifferentHours: {
          display: 'May 14th - 20th',
          rows:[
            {
              fromDay: 'Sunday',
              toDay: 'Saturday',
              display: '10am - 11pm',
              rowDisplay: 'Sunday - Saturday',
            },
          ],
          dates: ['2017-05-14', '2017-05-15', '2017-05-16', '2017-05-17', '2017-05-18', '2017-05-19', '2017-05-20'],
        },
      },
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('adds the home page className', () => {
    expect(enzymeWrapper.find('section.hours-display').exists()).toBe(true)
  })

  it('Adds a Link to the hours page', () => {
    expect(enzymeWrapper.find("span[itemProp='openingHours']").text()).toBe('today-display')
  })
})
