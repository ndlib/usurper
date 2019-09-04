import React from 'react'
import { shallow } from 'enzyme'

import CurrentEvents from 'components/LandingPages/Events/Current'
import Calendar from 'components/LandingPages/Events/Current/Calendar'
import EventCard from 'components/EventCard'
import PageTitle from 'components/Layout/PageTitle'
import Link from 'components/Interactive/Link'
import FilterBox from 'components/Interactive/FilterBox'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<CurrentEvents {...props} />)
}

const firstEvent = {
  id: 'some event',
  slug: 'somewhere',
  title: 'something',
  startDate: '2019-09-07',
  endDate: '2019-09-07',
}
const filteredEvent = {
  id: 'you will not see me',
  slug: 'in events',
  title: 'but you will in allEvents',
  startDate: '2019-09-07',
  endDate: '2019-09-07',
}
const lastEvent = {
  id: 'in the end',
  slug: 'this is just',
  title: 'a silly test',
  startDate: '2019-09-07',
  endDate: '2019-09-07',
}

describe('components/LandingPages/Events/Current', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      pageTitle: 'INTO THE FUTURE',
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
      filterValue: 'test',
      history: {
        test: 'testing',
      },
      match: {
        params: {
          date: '20190907',
        },
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render correct page title', () => {
    expect(enzymeWrapper.containsMatchingElement(<PageTitle title={props.pageTitle} />)).toBe(true)
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

  it('should render a Calendar with events', () => {
    expect(props.allEvents.length).toBeGreaterThan(0)

    expect(enzymeWrapper.containsMatchingElement(
      <Calendar
        events={props.allEvents}
        history={props.history}
        match={props.match}
      />
    )).toBe(true)
  })

  it('should call onFilterChange when modifying FilterBox value', () => {
    const filter = enzymeWrapper.find(FilterBox)
    expect(filter.exists()).toBe(true)
    expect(filter.props().value).toEqual(props.filterValue)

    filter.simulate('change')
    expect(props.onFilterChange).toHaveBeenCalled()
  })

  describe('without date filter', () => {
    it('should render link to past events page', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to='/events/past'>{expect.anything()}</Link>)).toBe(true)
    })
  })

  describe('with date filter', () => {
    beforeEach(() => {
      enzymeWrapper.setProps({
        filterDay: 7,
      })
    })

    it('should render link to current events without date', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to='/events'>{expect.anything()}</Link>)).toBe(true)
    })
  })
})
