import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import {
  HomePageHoursContainer,
  makeMapStateToProps,
  mapDispatchToProps,
  HESBURGH_LIBRARY_HOURS_CODE,
} from 'components/Hours/HomePage'
import PagePresenter from 'components/Hours/HomePage/presenter'
import configureStore from 'redux-mock-store'
import * as statuses from 'constants/APIStatuses'
import InlineContainer from 'components/Hours/InlineContainer'

let enzymeWrapper
let props
let store

const setup = (props) => {
  store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <HomePageHoursContainer {...props} />
    </Provider>)
}

describe('components/Hours/HomePage/Container', () => {
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

  it('only renders InlineContainer with hoursEntry status and PagePresenter', () => {
    expect(enzymeWrapper
      .containsMatchingElement(
        <InlineContainer
          status={props.hoursEntry.status}
          hoursEntry={props.hoursEntry}
          presenter={PagePresenter} />))
      .toBe(true)
  })

  it('calls the bound fetch hours action on load', () => {
    expect(props.fetchHours.mock.calls.length).toBe(1)
  })

  describe('mapDispatchToProps', () => {
    it('returns a function for fetchHours', () => {
      const result = mapDispatchToProps(store.dispatch)
      expect(result.fetchHours).toEqual(expect.any(Function))
    })
  })

  describe('makeMapStateToProps', () => {
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
          '426': {
            lid: 426,
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

    it('returns a function', () => {
      const mapStateToProps = makeMapStateToProps()
      expect(mapStateToProps).toEqual(expect.any(Function))
    })

    it('mapStateToProps should use Hesburgh hours code if no service point found in state', () => {
      const mapStateToProps = makeMapStateToProps()
      const state = {
        hours: hoursState,
      }
      const result = mapStateToProps(state)
      expect(result.hoursEntry.servicePoint.hoursCode).toEqual(HESBURGH_LIBRARY_HOURS_CODE)
    })

    it('mapStateToProps should use service point in cfPageEntry', () => {
      const mapStateToProps = makeMapStateToProps()
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
