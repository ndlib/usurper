import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../../components/Embeddable/Hours/Current/presenter'
import WeeklyHours from '../../../../../components/Hours/WeeklyHours'

let enzymeWrapper
const weeklyHours = {
  hours: [],
  title: 'title',
  effectiveDate: 'effective',
  showEffectiveDates: 'false',
}
const upComingWeeklyHours = {
  hours: [],
  title: 'title',
  effectiveDate: 'later',
  showEffectiveDates: 'false',
}
const hoursEntry = {
  name: 'NAME',
  today: {
    rendered: 'rendered hours',
    title: 'title',
    schemaOpeningHours: 'schemaOpeningHours',
  },
  timeZone: 'EST',
  servicePoint: {
    slug: 'SLUG',
  },
  weeks: [ weeklyHours ],
  upcomingChangedHours: upComingWeeklyHours,
}
const isOpen = true

const setup = (hoursEntry, isOpen) => {
  return shallow(PagePresenter(hoursEntry, isOpen))
}

describe('components/Embeddable/Hours/Current/presenter.js', () => {
  beforeEach(() => {
    enzymeWrapper = setup(hoursEntry, isOpen)
  })

  it('renders today\'s hours', () => {
    expect(
      enzymeWrapper.containsMatchingElement(
        <div className='today' itemProp='openingHours' content='schemaOpeningHours'>Today: rendered hours</div>
      )
    ).toBe(true)
  })

  it('renders current WeeklyHours hours', () => {
    expect(
      enzymeWrapper.containsMatchingElement(
        <WeeklyHours hours={weeklyHours} title='Current Hours' />
      )
    ).toBe(true)
  })

  it('renders upcoming WeeklyHours hours', () => {
    expect(
      enzymeWrapper.containsMatchingElement(
        <WeeklyHours hours={upComingWeeklyHours} title='Upcoming Hours' />
      )
    ).toBe(true)
  })
})
