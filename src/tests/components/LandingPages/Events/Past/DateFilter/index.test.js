import React from 'react'
import { shallow } from 'enzyme'

import DateFilter from 'components/LandingPages/Events/Past/DateFilter'
import Presenter from 'components/LandingPages/Events/Past/DateFilter/presenter'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<DateFilter {...props} />)
}

describe('components/LandingPages/Events/Past/DateFilter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      events: [
        {
          startDate: '2017-01-01T00:00:00',
          endDate: '2017-01-02T00:00:00',
        },
        {
          startDate: '2017-12-29T13:00:00',
          endDate: '2018-01-01T00:00:00',
        },
        {
          startDate: '2018-03-03T00:00:00',
          endDate: '2018-03-03T01:00:00',
        },
        {
          startDate: '2018-03-01T00:00:00',
          endDate: '2018-03-30T23:00:00',
        },
        {
          startDate: '2018-06-01T00:00:00',
          endDate: '2018-08-01T00:00:00',
        },
      ],
      filterYear: 2017,
      filterMonth: 0, // January; months in javascript are zero-indexed
      location: {
        search: '?type=test',
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render presenter with months that have events', () => {
    const presenter = enzymeWrapper.find(Presenter)
    expect(presenter.exists()).toBe(true)
    expect(presenter.props().eventDates).toEqual({
      '2017': {
        '0': {
          url: null, // Should not have url because this is the month filtered to
          display: 'Jan',
          count: 1,
        },
        '11': {
          url: `/events/past/201712${props.location.search}`,
          display: 'Dec',
          count: 1,
        },
      },
      '2018': {
        '0': {
          url: `/events/past/201801${props.location.search}`,
          display: 'Jan',
          count: 1,
        },
        '2': {
          url: `/events/past/201803${props.location.search}`,
          display: 'Mar',
          count: 2,
        },
        '5': {
          url: `/events/past/201806${props.location.search}`,
          display: 'Jun',
          count: 1,
        },
        '6': {
          url: `/events/past/201807${props.location.search}`,
          display: 'Jul',
          count: 1,
        },
        '7': {
          url: `/events/past/201808${props.location.search}`,
          display: 'Aug',
          count: 1,
        },
      },
    })
  })

  it('should toggle expanded state when calling yearCallback', () => {
    const presenter = enzymeWrapper.find(Presenter)
    expect(presenter.props().yearCallback).toEqual(expect.any(Function))

    // Initial state should have none expanded
    expect(enzymeWrapper.state().expanded).toEqual([])
    // expand a year
    presenter.props().yearCallback({ target: { text: '2019' }})
    expect(enzymeWrapper.state().expanded).toEqual([
      '2019',
    ])
    // expand another year
    presenter.props().yearCallback({ target: { text: '2018' }})
    expect(enzymeWrapper.state().expanded).toEqual([
      '2019',
      '2018',
    ])
    // Now test removing one
    presenter.props().yearCallback({ target: { text: '2019' }})
    expect(enzymeWrapper.state().expanded).toEqual([
      '2018',
    ])
  })
})
