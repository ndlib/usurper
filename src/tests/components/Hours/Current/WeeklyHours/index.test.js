import React from 'react'
import { shallow } from 'enzyme'

import WeeklyHours from 'components/Hours/Current/WeeklyHours'
import Presenter from 'components/Hours/Current/WeeklyHours/presenter'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<WeeklyHours {...props} />)
}

describe('components/Hours/Current/WeeklyHours', () => {
  beforeEach(() => {
    props = {
      hours: {
        Sunday: {
          date: '2019-09-01',
          rendered: 'Closed',
        },
        Monday: {
          date: '2019-09-02',
          rendered: '8am - 5pm',
        },
        Tuesday: {
          date: '2019-09-03',
          rendered: 'Closes at 11pm',
        },
        Wednesday: {
          date: '2019-09-04',
          rendered: 'Opens at 10am',
        },
        Thursday: {
          date: '2019-09-05',
          rendered: 'Open 24 Hours',
        },
        Friday: {
          date: '2019-09-06',
          rendered: 'Open 24 Hours',
        },
        Saturday: {
          date: '2019-09-07', // That's my birthday! :D
          rendered: 'Open 24 Hours',
        },
      },
      title: 'test',
      showEffectiveDates: true,
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render a presenter', () => {
    expect(enzymeWrapper.find(Presenter).exists()).toBe(true)
  })

  it('should combine consecutive days with the same hours', () => {
    const presenter = enzymeWrapper.find(Presenter)

    expect(props.hours['Thursday'].rendered).toEqual(props.hours['Friday'].rendered)
    expect(props.hours['Friday'].rendered).toEqual(props.hours['Saturday'].rendered)
    expect(presenter.props().hours).toEqual(expect.arrayContaining([
      { title: 'Thursday – Saturday', rendered: props.hours['Thursday'].rendered }
    ]))
    expect(presenter.props().hours).toHaveLength(5)
  })

  it('should get effective date from first day of week', () => {
    const presenter = enzymeWrapper.find(Presenter)
    expect(presenter.props().effectiveDate).toEqual('Sunday, Sept 1')
  })
})
