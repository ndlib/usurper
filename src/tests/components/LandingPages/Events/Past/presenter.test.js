import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Events/Past/presenter'
import DateFilter from 'components/Interactive/DateFilter'
import LandingPageWrapper from 'components/LandingPages/Wrapper'
import SideNav from 'components/Layout/Navigation/SideNav'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/LandingPages/Events/Past/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    const someEvent = {
      id: 'some event',
      slug: 'somewhere',
      title: 'something',
      startDate: '2019-09-07',
      endDate: '2019-09-07',
    }
    props = {
      pageTitle: 'BLAST FROM THE PAST',
      pageDate: '20190907',
      events: [
        someEvent,
        {
          startDate: '',
          endDate: '',
        },
      ],
      filteredEvents: [
        someEvent,
      ],
      allEventsStatus: statuses.SUCCESS,
      filterYear: 2019,
      filterMonth: 8,
      location: {
        pathname: '/somewhere',
        search: '?type=test',
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render correct LandingPageWrapper', () => {
    const wrapper = enzymeWrapper.find(LandingPageWrapper)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props()).toEqual(expect.objectContaining({
      pageTitle: props.pageTitle,
      pageDate: props.pageDate,
      entries: props.events,
      filteredEntries: props.filteredEvents,
      allEntriesStatus: props.allEventsStatus,
    }))
  })

  it('should render a DateFilter component as a child of LandingPageWrapper', () => {
    const wrapper = enzymeWrapper.find(LandingPageWrapper)
    expect(wrapper.exists()).toBe(true)

    expect(wrapper.containsMatchingElement(
      <DateFilter entries={props.events} filterYear={props.filterYear} filterMonth={props.filterMonth} location={props.location} />
    )).toBe(true)
    // Make sure those props actually had values otherwise we can't verify it is passing anything
    expect(props.events.length).toBeGreaterThan(0)
    expect(props.filterYear).toBeGreaterThan(0)
    expect(props.filterMonth).toBeGreaterThan(0)
  })
})
