import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Events/Past/presenter'
import DateFilter from 'components/LandingPages/Events/Past/DateFilter'
import EventsWrapper from 'components/LandingPages/Events/Wrapper'
import SideNav from 'components/Layout/Navigation/SideNav'

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
      filterYear: 2019,
      filterMonth: 8,
    }
    enzymeWrapper = setup(props)
  })

  it('should render correct EventsWrapper', () => {
    const wrapper = enzymeWrapper.find(EventsWrapper)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props()).toEqual(expect.objectContaining({
      pageTitle: props.pageTitle,
      pageDate: props.pageDate,
      events: props.events,
      filteredEvents: props.filteredEvents,
    }))
  })

  it('should render a SideNav component as a child of EventsWrapper', () => {
    const wrapper = enzymeWrapper.find(EventsWrapper)
    expect(wrapper.find(SideNav).exists()).toBe(true)
  })

  it('should render a DateFilter component as a child of SideNav', () => {
    const nav = enzymeWrapper.find(SideNav)
    expect(nav.exists()).toBe(true)

    expect(nav.containsMatchingElement(
      <DateFilter events={props.events} filterYear={props.filterYear} filterMonth={props.filterMonth} />
    )).toBe(true)
    // Make sure those props actually had values otherwise we can't verify it is passing anything
    expect(props.events.length).toBeGreaterThan(0)
    expect(props.filterYear).toBeGreaterThan(0)
    expect(props.filterMonth).toBeGreaterThan(0)
  })
})
