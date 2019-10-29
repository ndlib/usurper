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

const inEvent = {
  audience: ['Epic Developer'],
  type: 'Epicness',
  title: 'Power Level',
  shortDescription: '> 9000',
  content: 'search_for_me',
}

const outEvent = {
  audience: [],
  type: 'Boring',
  title: 'Not interesting',
  shortDescription: 'do not care',
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
      events: [
        inEvent,
        outEvent,
      ],
      filteredEvents: [
        inEvent,
        outEvent,
      ],
      allEventsStatus: statuses.SUCCESS,
      audienceFilter: [],
      typeFilter: [],
      location: {
        search: '',
      },
      history: {
        push: jest.fn(),
      },
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

  describe('filtering', () => {
    it('should filter events when filter value is changed', () => {
      const instance = enzymeWrapper.instance()
      instance.onFilterChange({
        target: { value: 'search_for_me' },
      })

      const presenter = enzymeWrapper.find(PresenterFactory)
      expect(presenter.props().props.filterValue).toEqual('search_for_me')
      expect(presenter.props().props.events).toEqual([inEvent])
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

    it('should update history when filtering audience', () => {
      const instance = enzymeWrapper.instance()
      instance.onFacetApply('audience', ['Epic Developer'])
      expect(props.history.push).toHaveBeenCalled()
      expect(enzymeWrapper.state().events).toEqual([inEvent])
    })

    it('should update history when filtering type', () => {
      const instance = enzymeWrapper.instance()
      instance.onFacetApply('type', ['Epicness'])
      expect(props.history.push).toHaveBeenCalled()
      expect(enzymeWrapper.state().events).toEqual([inEvent])
    })

    it('should update history when removing an audience filter', () => {
      // Set it up with a filter beforehand so we can verify the remove works
      const instance = enzymeWrapper.instance()
      instance.onFacetApply('audience', ['Epic Developer'])
      expect(enzymeWrapper.state().events).toEqual([inEvent])

      instance.onFacetRemove('audience', 'Epic Developer')
      expect(props.history.push).toHaveBeenCalled()
      expect(enzymeWrapper.state().events).toEqual([inEvent, outEvent])
    })

    it('should update history when removing a type filter', () => {
      // Set it up with a filter beforehand so we can verify the remove works
      const instance = enzymeWrapper.instance()
      instance.onFacetApply('type', ['Epicness'])
      expect(enzymeWrapper.state().events).toEqual([inEvent])

      instance.onFacetRemove('type', 'Epicness')
      expect(props.history.push).toHaveBeenCalled()
      expect(enzymeWrapper.state().events).toEqual([inEvent, outEvent])
    })
  })

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = {
        location: {
          search: '?preview=false&audience=me&audience=you&type=cool'
        },
        history: {
          push: jest.fn(),
        },
      }
    })
    it('should get events loading status from store', () => {
      const status = statuses.FETCHING
      const state = {
        allEvents: {
          status: status,
          json: [],
        },
      }
      const result = mapStateToProps(state, props)
      expect(result.allEventsStatus).toEqual(status)
    })

    it('should get audience filter from query string', () => {
      const state = {
        allEvents: {
          status: statuses.SUCCESS,
          json: [],
        },
      }
      const result = mapStateToProps(state, props)
      const expected = ['you', 'me']
      expect(result.audienceFilter).toEqual(expect.arrayContaining(expected))
      expect(result.audienceFilter).toHaveLength(expected.length)
    })

    it('should get event type filter from query string', () => {
      const state = {
        allEvents: {
          status: statuses.SUCCESS,
          json: [],
        },
      }
      const result = mapStateToProps(state, props)
      const expected = ['cool']
      expect(result.typeFilter).toEqual(expect.arrayContaining(expected))
      expect(result.typeFilter).toHaveLength(expected.length)
    })
  })
})