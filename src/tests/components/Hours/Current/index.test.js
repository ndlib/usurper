import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'

import { CurrentHoursContainer, mapStateToProps, mapDispatchToProps } from 'components/Hours/Current'
import Presenter from 'components/Hours/Current/presenter'
import HoursError from 'components/Hours/Error'
import InlineLoading from 'components/Messages/InlineLoading'
import { hoursOpenStatus, hesburghHoursCode } from 'constants/hours'
import * as statuses from 'constants/APIStatuses'

const setup = (props) => {
  return shallow(<CurrentHoursContainer {...props} />)
}

let enzymeWrapper
let props

const hesburghServicePoint = {
  sys: { id: 'hhhhhhhhhiiiiiii' },
  fields: {
    title: 'Hesburgh Library',
    slug: 'hesburghlibrary',
    type: 'Library',
    hoursCode: hesburghHoursCode,
  },
}

const formatDate = (inDate) => {
  const date = new Date(inDate)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}

describe('components/Hours/Current', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  beforeEach(() => {
    props = {
      hoursEntry: { status: statuses.NOT_FETCHED },
      fetchHours: jest.fn(),
      servicePoint: hesburghServicePoint,
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('calls the bound fetch hours action on load', () => {
    expect(props.fetchHours.mock.calls.length).toBe(1)
  })

  it('should toggle expanded value for click and spacebar events', () => {
    const initialValue = enzymeWrapper.state().expanded
    const instance = enzymeWrapper.instance()

    instance.toggleExpanded({ type: 'click' })
    expect(enzymeWrapper.state().expanded).not.toEqual(initialValue)
    // Now toggle it back
    instance.toggleExpanded({ type: 'click' })
    expect(enzymeWrapper.state().expanded).toEqual(initialValue)
    // Make sure spacebar works as well
    instance.toggleExpanded({ type: 'keydown', keyCode: 13 })
    expect(enzymeWrapper.state().expanded).not.toEqual(initialValue)
  })

  it('should periodically update the open status even without prop/state change', () => {
    const instance = enzymeWrapper.instance()
    instance.setState = jest.fn()
    jest.runOnlyPendingTimers()
    expect(instance.setState).toHaveBeenCalled()
  })

  it('should clean up timer when unmounting', () => {
    global.clearInterval = jest.fn()
    enzymeWrapper.unmount()
    expect(global.clearInterval).toHaveBeenCalled()
  })

  describe('with SUCCESS', () => {
    beforeEach(() => {
      props = {
        hoursEntry: {
          status: statuses.SUCCESS,
          name: 'Some Library IDK',
          today: {
            times: {
              status: '24hours',
            },
            rendered: 'All the time, man',
          },
        },
        fetchHours: jest.fn(),
        servicePoint: hesburghServicePoint,
      }
      enzymeWrapper = setup(props)
    })

    it('should render presenter with hoursEntry', () => {
      expect(enzymeWrapper.containsMatchingElement(<Presenter hoursEntry={props.hoursEntry} />)).toBe(true)
    })

    describe('openStatusCode', () => {
      const currentDate = formatDate(new Date())

      it('should be OPEN when open 24 hours today', () => {
        enzymeWrapper = setup({
          ...props,
          hoursEntry: {
            status: statuses.SUCCESS,
            name: 'Some Library IDK',
            today: {
              times: {
                status: '24hours',
              },
              rendered: 'All the time, man',
            },
          },
        })
        expect(enzymeWrapper.find(Presenter).props().openStatus).toEqual(hoursOpenStatus.OPEN)
      })

      it('should be CLOSED when closed today', () => {
        enzymeWrapper = setup({
          ...props,
          hoursEntry: {
            ...props.hoursEntry,
            today: {
              times: {
                status: 'closed',
              },
              rendered: 'Closed',
            },
          },
        })
        expect(enzymeWrapper.find(Presenter).props().openStatus).toEqual(hoursOpenStatus.CLOSED)
      })

      it('should be PARTIALLY_OPEN when card swipe access only', () => {
        enzymeWrapper = setup({
          ...props,
          hoursEntry: {
            ...props.hoursEntry,
            today: {
              times: {
                status: 'text',
                text: 'card swipe',
              },
              rendered: 'Card swipe 8am - 5pm',
            },
          },
        })
        expect(enzymeWrapper.find(Presenter).props().openStatus).toEqual(hoursOpenStatus.PARTIALLY_OPEN)
      })

      it('should be OPEN if current time is in open hours time window', () => {
        enzymeWrapper = setup({
          ...props,
          hoursEntry: {
            ...props.hoursEntry,
            today: {
              times: {
                status: 'open',
                hours: [{
                  from: '12:00am',
                  fromLocalDate: `${currentDate}T00:00:00`,
                  to: '11:59pm',
                  toLocalDate: `${currentDate}T23:59:59`,
                }],
              },
              rendered: 'Open 12:00am - 11:59pm',
            },
          },
        })
        expect(enzymeWrapper.find(Presenter).props().openStatus).toEqual(hoursOpenStatus.OPEN)
      })

      it('should be CLOSED if current time is outside open hours time window', () => {
        enzymeWrapper = setup({
          ...props,
          hoursEntry: {
            ...props.hoursEntry,
            today: {
              times: {
                status: 'open',
                hours: [{
                  from: '11:59pm',
                  fromLocalDate: `${currentDate}T23:59:59`,
                  to: '11:59pm',
                  toLocalDate: `${currentDate}T23:59:59`,
                }],
              },
              rendered: 'Open 11:59pm - 11:59pm',
            },
          },
        })
        expect(enzymeWrapper.find(Presenter).props().openStatus).toEqual(hoursOpenStatus.CLOSED)
      })
    })
  })

  describe('while FETCHING', () => {
    beforeEach(() => {
      props = {
        hoursEntry: {
          status: statuses.FETCHING,
        },
        fetchHours: jest.fn(),
        servicePoint: hesburghServicePoint,
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
        servicePoint: hesburghServicePoint,
      }
      enzymeWrapper = setup(props)
    })

    it('should render presenter HoursError component', () => {
      expect(enzymeWrapper.containsMatchingElement(<HoursError hoursEntry={props.hoursEntry} />)).toBe(true)
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
            lid: hesburghHoursCode,
            name: 'Hesburgh Library',
            weeks: [ weekHours, weekHours, weekHours, weekHours  ],
          },
        },
      },
    }

    it('should set crucial props with selector', () => {
      const state = {
        hours: hoursState,
      }
      const result = mapStateToProps(state, props)
      expect(result.hoursEntry).toEqual(expect.objectContaining({
        lid: hesburghHoursCode,
        servicePoint: expect.objectContaining({
          ...hesburghServicePoint.fields,
        }),
        name: 'Hesburgh Library',
      }))
    })
  })

  describe('mapDispatchToProps', () => {
    const store = configureStore()(props)

    it('returns a function for fetchHours', () => {
      const result = mapDispatchToProps(store.dispatch)
      expect(result.fetchHours).toEqual(expect.any(Function))
    })
  })
})
