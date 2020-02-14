import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import LandingPageWrapper, { LandingPageWrapperContainer, mapStateToProps, mapDispatchToProps } from 'components/LandingPages/Wrapper'
import Presenter from 'components/LandingPages/Wrapper/presenter'
import PresenterFactory from 'components/APIInlinePresenterFactory'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<LandingPageWrapperContainer {...props} />)
}

const inEntry = {
  audience: ['Epic Developer'],
  type: 'Epicness',
  title: 'Power Level',
  shortDescription: '> 9000',
  content: 'search_for_me',
}

const outEntry = {
  audience: [],
  type: 'Boring',
  title: 'Not interesting',
  shortDescription: 'do not care',
}

const inFacets = [
  {
    label: 'Audience',
    fieldName: 'audience',
    options: [
      {
        key: 'Human',
        value: 'Human',
      },
      {
        key: 'Epic Developer',
        value: 'Epic Developer',
      },
    ],
  },
  {
    label: 'Type',
    fieldName: 'type',
    options: [
      {
        key: 'Epicness',
        value: 'Epicness',
      },
      {
        key: 'Boring',
        value: 'Boring',
      },
    ],
  },
]

describe('components/LandingPages/Wrapper', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      pageTitle: 'I am the page title',
      pageDate: '20190907',
      filterFields: ['title', 'content', 'shortDescription', 'type', 'audience[*]'],
      sortFields: [],
      facets: inFacets,
      entries: [
        inEntry,
        outEntry,
      ],
      filteredEntries: [
        inEntry,
        outEntry,
      ],
      allEntriesStatus: statuses.SUCCESS,
      facetValues: {
        audience: [],
        type: [],
      },
      location: {
        search: '',
      },
      history: {
        push: jest.fn(),
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render a PresenterFactory with filtered entries', () => {
    const presenter = enzymeWrapper.find(PresenterFactory)
    expect(presenter.exists()).toBe(true)

    expect(presenter.props().presenter).toEqual(Presenter)
    expect(presenter.props().status).toEqual(props.allEntriesStatus)
    expect(presenter.props().props).toEqual(expect.objectContaining({
      pageTitle: props.pageTitle,
      entries: expect.arrayContaining(props.filteredEntries),
    }))
    expect(presenter.props().props.entries).toHaveLength(props.filteredEntries.length)
  })

  describe('filtering', () => {
    it('should filter entries when filter value is changed', () => {
      const instance = enzymeWrapper.instance()
      instance.onFilterChange({
        target: { value: 'search_for_me' },
      })

      const presenter = enzymeWrapper.find(PresenterFactory)
      expect(presenter.props().props.filterValue).toEqual('search_for_me')
      expect(presenter.props().props.entries).toEqual([inEntry])
      expect(presenter.props().props.allEntries).toEqual(props.allEntries) // allEntries should not be impacted by filtering
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
        allEntriesStatus: statuses.FETCHING,
      }
      enzymeWrapper = setup(props)
      enzymeWrapper.setState({
        filterValue: 'test',
      })
      expect(enzymeWrapper.props().props.filterValue).toEqual('test')

      enzymeWrapper.setProps({
        allEntriesStatus: statuses.SUCCESS,
      })
      expect(enzymeWrapper.props().props.filterValue).toEqual('')
    })

    it('should update history when filtering on array field', () => {
      const instance = enzymeWrapper.instance()
      instance.onFacetApply('audience', ['Epic Developer'])
      expect(props.history.push).toHaveBeenCalled()
      expect(enzymeWrapper.state().entries).toEqual([inEntry])
    })

    it('should update history when filtering on simple field', () => {
      const instance = enzymeWrapper.instance()
      instance.onFacetApply('type', ['Epicness'])
      expect(props.history.push).toHaveBeenCalled()
      expect(enzymeWrapper.state().entries).toEqual([inEntry])
    })

    it('should update history when removing a filter on array field', () => {
      // Set it up with a filter beforehand so we can verify the remove works
      const instance = enzymeWrapper.instance()
      instance.onFacetApply('audience', ['Epic Developer'])
      expect(enzymeWrapper.state().entries).toEqual([inEntry])

      instance.onFacetRemove('audience', 'Epic Developer')
      expect(props.history.push).toHaveBeenCalled()
      expect(enzymeWrapper.state().entries).toEqual([inEntry, outEntry])
    })

    it('should update history when removing a filter on simple field', () => {
      // Set it up with a filter beforehand so we can verify the remove works
      const instance = enzymeWrapper.instance()
      instance.onFacetApply('type', ['Epicness'])
      expect(enzymeWrapper.state().entries).toEqual([inEntry])

      instance.onFacetRemove('type', 'Epicness')
      expect(props.history.push).toHaveBeenCalled()
      expect(enzymeWrapper.state().entries).toEqual([inEntry, outEntry])
    })
  })

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = {
        facets: inFacets,
        location: {
          search: '?preview=false&audience=me&audience=you&type=cool'
        },
        history: {
          push: jest.fn(),
        },
      }
    })

    it('should get an array filter from query string', () => {
      const state = {
        allEntries: {
          status: statuses.SUCCESS,
          json: [],
        },
      }
      const result = mapStateToProps(state, props)
      const expected = ['you', 'me']
      expect(result.facetValues['audience']).toEqual(expect.arrayContaining(expected))
      expect(result.facetValues['audience']).toHaveLength(expected.length)
    })

    it('should get a single value filter from query string', () => {
      const state = {
        allEntries: {
          status: statuses.SUCCESS,
          json: [],
        },
      }
      const result = mapStateToProps(state, props)
      const expected = ['cool']
      expect(result.facetValues['type']).toEqual(expect.arrayContaining(expected))
      expect(result.facetValues['type']).toHaveLength(expected.length)
    })
  })
})