import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Events/Current/presenter'
import Calendar from 'components/LandingPages/Events/Current/Calendar'
import EventsWrapper from 'components/LandingPages/Events/Wrapper'

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
      history: {},
      match: {
        params: {},
      },
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

  it('should render a Calendar component as a child of EventsWrapper', () => {
    const wrapper = enzymeWrapper.find(EventsWrapper)

    expect(wrapper.containsMatchingElement(
      <Calendar
        events={props.events}
        history={props.history}
        match={props.match}
      />
    )).toBe(true)
    expect(props.events.length).toBeGreaterThan(0)
  })
})
