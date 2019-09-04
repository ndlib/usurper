import React from 'react'
import { shallow } from 'enzyme'

import PastEvents from 'components/LandingPages/Events/Past'
import DateFilter from 'components/LandingPages/Events/Past/DateFilter'
import EventCard from 'components/EventCard'
import SideNav from 'components/Layout/Navigation/SideNav'
import PageTitle from 'components/Layout/PageTitle'
import Link from 'components/Interactive/Link'
import FilterBox from 'components/Interactive/FilterBox'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<PastEvents {...props} />)
}

const firstEvent = {
  id: 'some event',
  slug: 'somewhere',
  title: 'something',
  startDate: '2017-09-07',
  endDate: '2017-09-07',
}
const filteredEvent = {
  id: 'you will not see me',
  slug: 'in events',
  title: 'but you will in allEvents',
  startDate: '2017-09-07',
  endDate: '2017-09-07',
}
const lastEvent = {
  id: 'in the end',
  slug: 'this is just',
  title: 'a silly test',
  startDate: '2017-09-07',
  endDate: '2017-09-07',
}

describe('components/LandingPages/Events/Past', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      pageTitle: 'BLAST FROM THE PAST',
      events: [
        firstEvent,
        lastEvent,
      ],
      allEvents: [
        firstEvent,
        filteredEvent,
        lastEvent,
      ],
      onFilterChange: jest.fn(),
      filterYear: 2009,
      filterMonth: 8,
      filterValue: 'test',
    }
    enzymeWrapper = setup(props)
  })

  it('should render correct page title', () => {
    expect(enzymeWrapper.containsMatchingElement(<PageTitle title={props.pageTitle} />)).toBe(true)
  })

  it('should render link to current events page', () => {
    expect(enzymeWrapper.containsMatchingElement(<Link to='/events'>{expect.anything()}</Link>)).toBe(true)
  })

  it('should render Event component for each entry', () => {
    expect(props.events.length).toBeGreaterThan(0)
    expect(enzymeWrapper.find(EventCard)).toHaveLength(props.events.length)

    props.events.forEach(event => {
      const found = enzymeWrapper.findWhere(el => el.type() === EventCard && el.props().entry === event)
      expect(found.exists()).toBe(true)
      expect(found.props().isLast).toEqual(event === lastEvent)
    })
  })

  it('should render a DateFilter inside SideNav', () => {
    const nav = enzymeWrapper.find(SideNav)
    expect(nav.exists()).toBe(true)

    expect(nav.containsMatchingElement(
      <DateFilter events={props.allEvents} filterYear={props.filterYear} filterMonth={props.filterMonth} />
    )).toBe(true)
    // Make sure those props actually had values otherwise we can't verify it is passing anything
    expect(props.allEvents.length).toBeGreaterThan(0)
    expect(props.filterYear).toBeGreaterThan(0)
    expect(props.filterMonth).toBeGreaterThan(0)
  })

  it('should call onFilterChange when modifying FilterBox value', () => {
    const filter = enzymeWrapper.find(FilterBox)
    expect(filter.exists()).toBe(true)
    expect(filter.props().value).toEqual(props.filterValue)

    filter.simulate('change')
    expect(props.onFilterChange).toHaveBeenCalled()
  })
})
