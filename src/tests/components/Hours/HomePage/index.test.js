import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {
  HomePageHoursContainer,
  mapStateToProps,
  mapDispatchToProps,
} from 'components/Hours/HomePage'
import Presenter from 'components/Hours/HomePage/presenter'
import HoursError from 'components/Hours/Error'
import InlineLoading from 'components/Messages/InlineLoading'
import { hesburghHoursCode } from 'constants/hours'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props
let store

const setup = (props) => {
  return shallow(<HomePageHoursContainer {...props} />)
}

describe('components/Hours/HomePage', () => {
  beforeEach(() => {
    props = {
      hoursEntry: { status: statuses.NOT_FETCHED },
      fetchHours: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('calls the bound fetch hours action on load', () => {
    expect(props.fetchHours.mock.calls.length).toBe(1)
  })

  it('should not render anything when hoursEntry has not been fetched', () => {
    expect(enzymeWrapper.isEmptyRender()).toBe(true)
  })

  describe('with SUCCESS', () => {
    beforeEach(() => {
      props = {
        hoursEntry: {
          status: statuses.SUCCESS,
          name: 'Some Library IDK',
          today: {
            rendered: '8am - 5pm',
          },
        },
        fetchHours: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render presenter with hoursEntry', () => {
      expect(enzymeWrapper.containsMatchingElement(<Presenter hoursEntry={props.hoursEntry} />)).toBe(true)
    })
  })

  describe('while FETCHING', () => {
    beforeEach(() => {
      props = {
        hoursEntry: {
          status: statuses.FETCHING,
        },
        fetchHours: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render InlineLoading component', () => {
      expect(enzymeWrapper.containsMatchingElement(<InlineLoading />)).toBe(true)
    })
  })

  describe('with ERROR', () => {
    beforeEach(() => {
      props = {
        hoursEntry: {
          status: statuses.ERROR,
        },
        fetchHours: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render presenter HoursError component', () => {
      expect(enzymeWrapper.containsMatchingElement(<HoursError hoursEntry={props.hoursEntry} />)).toBe(true)
    })
  })

  describe('mapDispatchToProps', () => {
    const store = configureStore()(props)

    it('returns a function for fetchHours', () => {
      const result = mapDispatchToProps(store.dispatch)
      expect(result.fetchHours).toEqual(expect.any(Function))
    })
  })

  describe('mapStateToProps', () => {
    const dayHours = {
      currently_open: true,
      status: 'open',
      hours: [
        {
          from: '8am',
          to: '5pm',
          fromLocalDate: '2019-07-08T08:00:00-04:00',
          toLocalDate: '2019-07-08T17:00:00-04:00',
        },
      ],
    }
    const weekHours = {
      Sunday: { times: dayHours, date: '2019-07-07', rendered: '8am - 5pm' },
      Monday: { times: dayHours, date: '2019-07-08', rendered: '8am - 5pm' },
      Tuesday: { times: dayHours, date: '2019-07-09', rendered: '8am - 5pm' },
      Wednesday: { times: dayHours, date: '2019-07-10', rendered: '8am - 5pm' },
      Thursday: { times: dayHours, date: '2019-07-11', rendered: '8am - 5pm' },
      Friday: { times: dayHours, date: '2019-07-12', rendered: '8am - 5pm' },
      Saturday: { times: dayHours, date: '2019-07-13', rendered: '8am - 5pm' },
    }
    const hoursState = {
      status: statuses.SUCCESS,
      json: {
        locations: {
          [hesburghHoursCode]: {
            lid: parseInt(hesburghHoursCode, 10),
            name: 'Hesburgh Library',
            weeks: [ weekHours, weekHours, weekHours, weekHours  ],
          },
          '5564': {
            lid: 5564,
            name: 'Mahaffey Business Library',
            weeks: [ weekHours, weekHours, weekHours, weekHours ],
          },
        },
      },
    }

    it('should use Hesburgh hours code if no service point found in state', () => {
      const state = {
        hours: hoursState,
      }
      const result = mapStateToProps(state)
      expect(result.hoursEntry.servicePoint.hoursCode).toEqual(hesburghHoursCode)
    })

    it('should use service point in cfPageEntry', () => {
      const state = {
        cfPageEntry: {
          json: {
            fields: {
              title: 'Thomas Mahaffey Jr. Business Library',
              slug: 'business',
              servicePoint: {
                sys: { id: '123' },
                fields: {
                  title: 'Mahaffey Business Library',
                  slug: 'mahaffeybusinesslibrary',
                  hoursCode: 5564,
                },
              },
            },
          },
        },
        hours: hoursState,
      }
      const result = mapStateToProps(state)
      expect(result.hoursEntry.servicePoint.hoursCode).toEqual(5564)
    })
  })
})
