import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import EventsWrapper, { EventsWrapperContainer, mapStateToProps, mapDispatchToProps } from 'components/LandingPages/Events/Wrapper'
import Presenter from 'components/LandingPages/Events/Wrapper/presenter'
import PresenterFactory from 'components/APIInlinePresenterFactory'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<EventsWrapperContainer {...props} />)
}

describe('components/LandingPages/Events/Wrapper', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      pageTitle: 'I am the page title',
      pageDate: '20190907',
      events: [],
      filteredEvents: [],
      allEventsStatus: statuses.SUCCESS,
    }
    enzymeWrapper = setup(props)
  })

  it('should render a PresenterFactory with filtered events', () => {
    const presenter = enzymeWrapper.find(PresenterFactory)
    expect(presenter.exists()).toBe(true)

    expect(presenter.props().presenter).toEqual(Presenter)
    expect(presenter.props().status).toEqual(props.allEventsStatus)
    expect(presenter.props().props).toEqual(expect.objectContaining({
      pageTitle: props.pageTitle,
      events: expect.arrayContaining(props.filteredEvents),
    }))
    expect(presenter.props().props.events).toHaveLength(props.filteredEvents.length)
  })

  it('should filter events when filter value is changed', () => {
    const instance = enzymeWrapper.instance()
    instance.onFilterChange({
      target: { value: 'search_for_me' },
    })

    const presenter = enzymeWrapper.find(PresenterFactory)
    expect(presenter.props().props.filterValue).toEqual('search_for_me')
    expect(presenter.props().props.events).toEqual([])
    expect(presenter.props().props.allEvents).toEqual(props.allEvents) // allEvents should not be impacted by filtering
  })

  it('should reset filter when changing date', () => {
    enzymeWrapper.setState({
      filterValue: 'test',
    })
    expect(enzymeWrapper.props().props.filterValue).toEqual('test')
    expect(enzymeWrapper.props().props.pageDate).toEqual(props.pageDate)

    // Set the date to trigger a change
    const newDate = '20200509'
    enzymeWrapper.setProps({
      pageDate: newDate,
    })

    expect(enzymeWrapper.props().props.filterValue).toEqual('')
    expect(enzymeWrapper.props().props.pageDate).toEqual(newDate)
  })

  it('should reset filter when data finishes loading', () => {
    props = {
      ...props,
      allEventsStatus: statuses.FETCHING,
    }
    enzymeWrapper = setup(props)
    enzymeWrapper.setState({
      filterValue: 'test',
    })
    expect(enzymeWrapper.props().props.filterValue).toEqual('test')

    enzymeWrapper.setProps({
      allEventsStatus: statuses.SUCCESS,
    })
    expect(enzymeWrapper.props().props.filterValue).toEqual('')
  })

  describe('mapStateToProps', () => {
    it('should get events loading status from store', () => {
      const status = statuses.FETCHING
      const result = mapStateToProps({
        allEvents: {
          status: status,
          json: [],
        },
      })
      expect(result.allEventsStatus).toEqual(status)
    })
  })
})