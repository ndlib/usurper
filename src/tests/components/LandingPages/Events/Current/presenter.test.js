import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Events/Current/presenter'
import Calendar from 'components/LandingPages/Events/Current/Calendar'
import LandingPageWrapper from 'components/LandingPages/Wrapper'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/LandingPages/Events/Current/presenter', () => {
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
      pageTitle: 'INTO THE FUTURE',
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
      combinedStatus: statuses.SUCCESS,
      facets: [
        {
          some: 'facet',
        },
      ],
      location: {
        search: '?type=test',
      },
      history: {},
      match: {
        params: {},
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render correct LandingPageWrapper', () => {
    const wrapper = enzymeWrapper.find(LandingPageWrapper)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().pageTitle).toEqual(props.pageTitle)
    expect(wrapper.props().pageDate).toEqual(props.pageDate)
    expect(wrapper.props().entries).toEqual(props.events)
    expect(wrapper.props().filteredEntries).toEqual(props.filteredEvents)
    expect(wrapper.props().allEntriesStatus).toEqual(props.combinedStatus)
    expect(wrapper.props().facets).toEqual(props.facets)
  })

  it('should render a Calendar component as a child of LandingPageWrapper', () => {
    const wrapper = enzymeWrapper.find(LandingPageWrapper)

    expect(wrapper.containsMatchingElement(
      <Calendar
        events={props.events}
        location={props.location}
        history={props.history}
        match={props.match}
      />
    )).toBe(true)
    expect(props.events.length).toBeGreaterThan(0)
  })
})
