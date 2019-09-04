import React from 'react'
import { shallow } from 'enzyme'
import DatePicker from 'react-datepicker'

import Calendar from 'components/LandingPages/Events/Current/Calendar'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Calendar {...props} />)
}

describe('components/LandingPages/Events/Current/Calendar', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      events: [
        { // This one gets excluded because it is in the past
          startDate: '1970-01-01',
          endDate: '1970-01-02',
        },
        {
          startDate: '2900-03-01',
          endDate: '2900-03-04',
        },
        {
          startDate: '2900-04-01',
          endDate: '2900-04-29',
        },
        {
          startDate: '2900-05-05',
          endDate: '2900-05-05',
        },
      ],
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          date: '29000907',
        },
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render a DatePicker with selected date', () => {
    const picker = enzymeWrapper.find(DatePicker)
    expect(picker.props().selected).toEqual(new Date('2900-09-07T00:00:00'))
  })

  it('should redirect page when changing DatePicker date', () => {
    const picker = enzymeWrapper.find(DatePicker)
    const setTo = new Date('2900-12-25T00:00:00')
    picker.simulate('change', setTo)

    expect(props.history.push).toHaveBeenCalledWith('/events/29001225')
  })

  it('should highlight each day with events (unless > 28 days, then mark start and end date)', () => {
    const picker = enzymeWrapper.find(DatePicker)
    const expectedDates = [
      new Date('2900-03-01'),
      new Date('2900-03-02'),
      new Date('2900-03-03'),
      new Date('2900-03-04'),
      new Date('2900-04-01'),
      new Date('2900-04-29'),
      new Date('2900-05-05'),
    ]

    // Make sure it has the same number and equivalent dates; order does not matter
    expect(picker.props().highlightDates).toEqual(expect.arrayContaining(expectedDates))
    expect(picker.props().highlightDates).toHaveLength(expectedDates.length)
  })
})
